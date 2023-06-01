const getScheduleFile = async (fileObject) => {
    console.log(`URL to call: http://127.0.0.1:${process.env.PORT}/${fileObject.url}`)
    const buffer = await (await fetch(`http://127.0.0.1:${process.env.PORT}/${fileObject.url}`)).arrayBuffer();
    console.log(`Buffer is not undefined: ${Boolean(buffer).toString()}`)
    const decoder = new TextDecoder()
    console.log(`Decoded text: ${decoder.decode(buffer)}`)
    return decoder.decode(buffer)
}

const parseWeeklySchedule = async (csvText: string,
                                   startingLine: number,
                                   classRegex: string,
                                   delimiter: string,
                                   noLessonNumberSubjects: string[],
                                   daysInWeek: number,
                                   rowsPerClass: number,
                                   lessonNumberRegex: string,
                                   dayAliases: { shortName: string, fullName: string }[],
                                   maxNumberOfLessons: number) => {
    csvText = removeStart(csvText, startingLine)
    return extractSchedule(csvText,
        classRegex,
        delimiter,
        noLessonNumberSubjects,
        daysInWeek,
        rowsPerClass,
        lessonNumberRegex,
        dayAliases,
        maxNumberOfLessons)
}

interface Day {
    subjects: String[]
}

interface ClassName {
    days: Map<string, Day>
}

interface WeeklySchedule {
    classes: Map<string, ClassName>
}

const extractSchedule = (text,
                        classRegex,
                        delimiter: string,
                        noLessonNumberSubjects: string[],
                        daysInWeek: number,
                        rowsPerClass: number,
                        lessonNumberRegex: string,
                        dayAliases: { shortName: string, fullName: string }[],
                        maxNumberOfLessons: number) => {
    const schedule: WeeklySchedule = {
        classes: new Map()
    }

    // Split lines and remove empty lines immediately after days lines
    const lines = text.split('\n').filter((value, index) => {
            return (index - 2) % rowsPerClass != 0
    })

    const parse = require('csv-parse/sync').parse

    lines.forEach((line, index) => {
        // Only use rows with classes, avoiding last line
        if (index % (rowsPerClass - 1) == 0 && index + 1 < lines.length) {
            // Extract classes from line
            const classes = line.split(delimiter).filter((str) => str.match(classRegex))

            // Add classes to schedule
            classes.forEach((val) => {
                schedule.classes.set(val, {days: new Map()})
            })

            // Concat class names to respective days
            // This creates unique .csv column names
            // For example, instead of there being 'ПЕТЪК' twice, there will be '5А ПЕТЪК' and '5Б ПЕТЪК'
            lines[index+1] = lines[index+1].split(';').map((val, index) => {
                let classIndex = Math.floor(index / daysInWeek)

                if (val && (typeof val === 'string')) {
                    // Replace short day names with full ones
                    dayAliases.forEach(({shortName, fullName}) => {
                        if (val.trim() === shortName) val = fullName
                    })
                }

                return classes[classIndex] + ' ' + val
            }).join(delimiter)

            // Now the lines are parsable into .csv format
            const schedules = lines.slice(index + 1, index + 2 + maxNumberOfLessons).join('\n')
            const recordList = parse(schedules, {
                columns: true,
                skip_empty_lines: true,
                delimiter: delimiter
            });

            // For every record iterate through all the days with their respective lessons
            for (let i = 0; i < recordList.length; i++) {
                // The key is in format 'CLASS DAY'
                // The value is in format 'lessonNumber.subject'
                for (const [key, value] of Object.entries(recordList[i])) {
                    const [className, day] = key.split(' ')
                    if (!className.match(classRegex)) continue;

                    // The subject often has a . at the end, like 'мат.'
                    // This causes the string to be split in three elements
                    // And the subject loses the dot
                    // This code captures the rest of the elements as ...subjectValues and then joins them into a string
                    let [lessonNumber, ...subjectValues] = String(value).split('.')
                    let subject = subjectValues.join('.').trim()

                    // Ignore any record where the lesson number doesn't satisfy the lesson regex, which isn't empty or
                    // which isn't included in the list of no lesson number subjects
                    if (!lessonNumber.match(lessonNumberRegex) &&
                        value !== '' &&
                        !noLessonNumberSubjects.includes(value.toString())) continue;

                    // Since no lesson number subjects aren't parsed correctly, set them to subject
                    if (noLessonNumberSubjects.includes(value.toString())) {
                        subject = value.toString()
                    }

                    // Get the days for the class
                    const days = schedule.classes.get(className).days

                    if (days.has(day)) {
                        const subjects = days.get(day).subjects
                        // If the lesson number doesn't match the regex, then it is either an empty lesson or
                        // a no lesson number subject
                        // That means that it will always be appended to the top available index
                        if (lessonNumber.match(lessonNumberRegex)) {
                            // Compensate for empty first lessons by moving the lesson index
                            let emptyFirstLessons = 0;
                            while(subjects[emptyFirstLessons] === '') emptyFirstLessons++;
                            subjects[parseInt(lessonNumber) + emptyFirstLessons - 1] = subject
                        } else {
                            subjects.push(subject)
                        }
                    } else {
                        const subjects = []
                        if (lessonNumber.match(lessonNumberRegex)) {
                            // No need to compensate here
                            subjects[parseInt(lessonNumber) - 1] = subject
                        } else {
                            subjects.push(subject)
                        }
                        days.set(day, { subjects })
                    }
                }
            }
        }
    })

    return schedule
}

const removeStart = (text, startingLine) => {
    return text.split('\n').slice(startingLine).join('\n')
}

export { getScheduleFile, parseWeeklySchedule };

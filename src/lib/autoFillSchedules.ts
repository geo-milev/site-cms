import {getFile} from "./getFile";
import {parseWeeklySchedule} from "./parseWeeklySchedule";
import {checksum} from "./checksum";

const autofillSchedules = async ({req , data}) => {
    const payload = req.payload
    if (!payload.local) {
        const config = data.weeklySchedule.weeklySchedulesAutofill

        const fileObject = await req.payload.findByID({
            collection: 'media',
            id: config.fileCsv
        })

        const csvText = await getFile(fileObject)

        let newChecksum = checksum(csvText)

        if (!config.checksum) {
            data.weeklySchedule.weeklySchedulesAutofill.checksum = newChecksum
        } else {
            if (config.checksum === newChecksum) {
                return data;
            } else {
                data.weeklySchedule.weeklySchedulesAutofill.checksum = newChecksum;
            }
        }

        const schedule = await parseWeeklySchedule(csvText,
            config.startingLine,
            config.classRegex,
            config.delimiter,
            config.noLessonNumberSubjects.map((value) => value.subject),
            config.daysInWeek,
            config.rowsPerSchedule,
            config.lessonNumberRegex,
            config.dayAliases,
            config.maxNumberOfLessons)

        const getSubjectId = async (subjectString) => {
            if (subjectString === '') return undefined

            const subject = (await payload.find({
                collection: 'subjects',
                limit: 1,
                where: {
                    shortName: {
                        equals: subjectString
                    }
                }
            })).docs[0]

            if (subject !== undefined) {
                return subject.id
            } else {
                const newSubject = await payload.create({
                    collection: 'subjects',
                    data: {
                        name: subjectString,
                        shortName: subjectString,
                    },
                })

                return newSubject.id
            }
        }

        await payload.delete({
            collection: "weekly-schedules",
            where: {}
        })

        for (const [className, days] of Array.from(schedule.classes.entries())) {
            const dataDays = []

            for (const [day, lessons] of Array.from(days.days.entries())) {
                const hours = []

                for (const [index, subjectString] of Array.from(lessons.subjects.entries())) {
                    const subject = await getSubjectId(subjectString)
                    hours.push({
                        num: index + 1,
                        subject: subject
                    })
                }

                dataDays.push({
                    day: day,
                    hours: hours
                })
            }

            await payload.create({
                collection: 'weekly-schedules',
                data: {
                    class: className,
                    days: dataDays
                }
            })
        }

        return data;
    }
}

export {autofillSchedules}

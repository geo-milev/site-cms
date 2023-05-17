import {GlobalConfig} from 'payload/types';
import {validateDates} from '../lib/validateHourRange';
import {getScheduleFile, parseWeeklySchedule} from '../lib/parseWeeklySchedule';

const dateError = 'Не може началото на час да е след края.'

// @ts-ignore is needed because the generic Field type doesn't recognise the custom date admin properties like 'pickerAppearance'
//@ts-ignore
export const Schedules: GlobalConfig = {
    slug: 'schedules',
    label: {
        en: 'Schedules', bg: 'Графици'
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeValidate: [ async ({req , data}) => {
            const payload = req.payload
            if (!payload.local) {

                const fileObject = await req.payload.findByID({
                    collection: 'media',
                    id: data.weeklySchedule.fileCsv
                })

                const csvText = await getScheduleFile(fileObject)

                const schedule = await parseWeeklySchedule(csvText, 3,
                    '^[0-9][0-9]?[A-Za-zА-Яа-я]$',
                    ';',
                    ['спорт'],
                    5,
                    13,
                    '^[0-9]+$')

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

                for (const [className, days] of schedule.classes) {
                    const dataDays = []

                    for (const [day, lessons] of days.days) {
                        const hours = []

                        for (const [index, subjectString] of lessons.subjects.entries()) {
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
            }
        }]
    },
    fields: [
        {
            name: 'dailySchedule',
            type: 'group',
            label: {
                en: 'Daily hourly schedule', bg: 'Дневна часова програма'
            },
            fields: [
                {
                    name: 'text',
                    type: 'textarea',
                    defaultValue: 'Часът по спортни дейности, часовете за допълнителна подготовка в пети, шести, седми, осми и девети клас, часовете със свободноизбираема подготовка, както и занятията за извънкласни дейности се провеждат от 14:30 часа до 16:10 часа.',
                    required: true,
                    label: {
                        en: 'Important', bg: 'Забележка'
                    }
                },
                {
                    name: 'file',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: { en: 'File', bg: 'Файл' },
                },
                {
                    name: 'bigBreak',
                    type: 'group',
                    label: {
                        en: 'Big break', bg: 'Голямо междучасие'
                    },
                    fields: [
                        {
                          name: 'after',
                          type: 'number',
                          required: true,
                          label: { en: 'After hour', bg: 'След час' }
                        },
                    ]
                },
                {
                    name: 'hours',
                    type: 'array',
                    required: true,
                    minRows: 1,
                    label: { en: 'Hours', bg: 'Часове' },
                    labels: {
                        singular: { en: 'Hour', bg: 'Час' },
                        plural: { en: 'Hours', bg: 'Часове' }
                    },
                    fields: [
                        {
                            name: 'num',
                            type: 'number',
                            required: true,
                            label: {
                                en: 'Hour num', bg: 'Номер на часа'
                            }
                        },
                        {
                            name: 'hour',
                            type: 'group',
                            label: {
                                en: 'Hour', bg: 'Час'
                            },
                            fields: [
                                {
                                    name: 'hourStart',
                                    type: 'date',
                                    required: true,
                                    label: {
                                        en: 'Start of hour', bg: 'Начало на час'
                                    },
                                    admin: {
                                        date: {
                                            pickerAppearance: 'timeOnly',
                                            timeFormat: 'HH:mm',
                                            displayFormat: 'HH:mm'
                                        }
                                    },
                                    validate: (data, {siblingData}) => {
                                        return validateDates(siblingData,
                                            'hourStart',
                                            'hourEnd',
                                            dateError)
                                    }
                                },
                                {
                                    name: 'hourEnd',
                                    type: 'date',
                                    required: true,
                                    label: {
                                        en: 'End of hours', bg: 'Край на час'
                                    },
                                    admin: {
                                        date: {
                                            pickerAppearance: 'timeOnly',
                                            timeFormat: 'HH:mm',
                                            displayFormat: 'HH:mm'
                                        }
                                    },
                                    validate: (data, {siblingData}) => {
                                        return validateDates(siblingData,
                                            'hourStart',
                                            'hourEnd',
                                            dateError)
                                    }
                                },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: 'weeklySchedule',
            type: 'group',
            label: {
                en: 'Weekly hourly', bg: 'Седмична часова програма'
            },
            fields: [
                {
                    name: 'file',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: { en: 'File', bg: 'Файл' },
                },
                {
                    name: 'fileCsv',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: {
                        en: 'File .csv (autofill the weekly schedule)',
                        bg: 'Файл във формат .csv (за автоматично попълване на програмата)'
                    }
                }
            ]
        },
    ]
}

export default Schedules;

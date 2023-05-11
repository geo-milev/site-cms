import {GlobalConfig} from 'payload/types';
import {validateDates} from "../lib/validateHourRange";

const dateError = 'Не може началото на час да е след края.'

// @ts-ignore is needed because the generic Field type doesn't recognise the custom date admin properties like 'pickerAppearance'
//@ts-ignore
export const WeeklySchedule: GlobalConfig = {
    slug: 'weekly-schedule',
    label: {
        en: 'Weekly schedule', bg: 'Седмично разписание'
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'dailySchedule',
            type: 'group',
            required: true,
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
                            name: 'Hour',
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
            required: true,
            label: {
                en: 'Weekly hourly', bg: 'Семична часова програма'
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
                    name: 'classes',
                    type: 'array',
                    required: true,
                    minRows: 1,
                    label: {en: 'Classes', bg: 'Класове'},
                    labels: {
                        singular: {en: 'Class', bg: 'Клас'},
                        plural: {en: 'Classes', bg: 'Класове'}
                    },
                    fields: [
                        {
                            name: 'class',
                            type: 'text',
                            required: true,
                            label: { en: 'Class', bg: 'Класс' },
                        },
                        {
                            name: 'days',
                            type: 'array',
                            required: true,
                            minRows: 1,
                            label: {en: 'Days', bg: 'Дни'},
                            labels: {
                                singular: {en: 'Day', bg: 'Ден'},
                                plural: {en: 'Days', bg: 'Дни'}
                            },
                            defaultValue: [
                                'Понеделник',
                                'Вторник',
                                'Сряда',
                                'Четвъртък',
                                'Петък',
                                'Събота',
                                'Неделя'
                            ].map((day) => {
                                return {
                                    day: day
                                }
                            }),
                            fields: [
                                {
                                    name: 'day',
                                    type: 'text',
                                    required: true,
                                    label: { en: 'Day', bg: 'Ден' },
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
                                    defaultValue: [1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
                                        return {
                                            num: value
                                        }
                                    }),
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
                                            name: 'subject',
                                            type: 'relationship',
                                            relationTo: 'subjects',
                                            required: true,
                                            label: {
                                                en: 'Subject', bg: 'Предмет'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                    ],
                }
            ]
        },
    ]
}

export default WeeklySchedule;
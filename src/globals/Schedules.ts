import {GlobalConfig} from 'payload/types';
import {validateDates} from '../lib/validateHourRange';
import updateLastMod from "../lib/updateLastMod";
import onlyCsv from "../lib/filters/onlyCsv";
import { autofillSchedules } from "../lib/autoFillSchedules";

const dateError = 'Не може началото на час да е след края.'


// @ts-ignore is needed because the generic Field type doesn't recognise the custom date admin properties like 'pickerAppearance'
//@ts-ignore
export const Schedules: GlobalConfig = {
    slug: 'schedules',
    label: {
        en: 'Schedule', bg: 'Програма'
    },
    admin: {
        group: 'Програма'
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeValidate: [autofillSchedules],
        afterChange: [updateLastMod("/student/weekly-schedule")]
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'dailySchedule',
                    label: {en: 'Daily hourly schedule', bg: 'Дневна часова програма'},
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
                            label: {en: 'File', bg: 'Файл за изтегляне от сайта'},
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
                                    label: {en: 'After hour', bg: 'След час'}
                                },
                            ]
                        },
                        {
                            name: 'hours',
                            type: 'array',
                            required: true,
                            minRows: 1,
                            label: {en: 'Hours', bg: 'Часове'},
                            labels: {
                                singular: {en: 'Hour', bg: 'Час'},
                                plural: {en: 'Hours', bg: 'Часове'}
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
                    label: { en: 'Weekly hourly', bg: 'Седмична програма' },
                    fields: [
                        {
                            type: 'tabs',
                            tabs: [
                                {
                                    label: { en: 'General info', bg: 'Обща информация' },
                                    fields: [
                                        {
                                            name: 'year',
                                            type: 'text',
                                            required: true,
                                            defaultValue: "2023/2024, срок I",
                                            label: {
                                                en: 'Year and term of the schedule', bg: 'Учебна година и срок на програмата'
                                            }
                                        },
                                        {
                                            name: 'file',
                                            type: 'upload',
                                            relationTo: 'media',
                                            required: true,
                                            label: { en: 'File', bg: 'Файл за изтегляне от сайта' },
                                        },
                                    ]
                                },
                                {
                                    name: 'weeklySchedulesAutofill',
                                    label: { en: 'Autofill', bg: 'Автоматично попълване' },
                                    description: { en: 'Executes on save', bg: 'Изпълнява се на запазване' },
                                    fields: [
                                        {
                                            name: 'fileCsv',
                                            type: 'upload',
                                            relationTo: 'media',
                                            required: true,
                                            filterOptions: onlyCsv,
                                            label: {
                                                en: 'File .csv (autofill the weekly schedule)',
                                                bg: 'Файл във формат .csv (за автоматично попълване на програмата)'
                                            }
                                        },
                                        {
                                            name: 'checksum',
                                            type: 'text',
                                            admin: {
                                                condition: () => {
                                                    return false;
                                                }
                                            }
                                        },
                                        {
                                            name: 'startingLine',
                                            type: 'number',
                                            required: true,
                                            defaultValue: 3,
                                            label: {
                                                en: 'Starting row (the row after which the first schedule appears)',
                                                bg: 'Начален ред (реда, след който се появява първата пргорама)'
                                            }
                                        },
                                        {
                                            name: 'classRegex',
                                            type: 'text',
                                            required: true,
                                            defaultValue: '^[0-9][0-9]?[A-Za-zА-Яа-я]$',
                                            label: {
                                                en: 'Class regex (used to find classes in the file - for example, \'5А\' satisfies this condition)',
                                                bg: 'Регулярен израз за клас (използва се намиране на класовете във файла - например, \'5А\' изпълнява условието)'
                                            }
                                        },
                                        {
                                            name: 'delimiter',
                                            type: 'text',
                                            required: true,
                                            defaultValue: ';',
                                            label: {
                                                en: 'CSV delimiter',
                                                bg: 'Разделител на CSV стойностите'
                                            }
                                        },
                                        {
                                            name: 'noLessonNumberSubjects',
                                            type: 'array',
                                            defaultValue: [{
                                                subject: 'спорт'
                                            }],
                                            label: {
                                                en: 'Subjects without a lesson number',
                                                bg: 'Предмети, които се появяват в програмата без номер на часа (напр. \'спорт\')'
                                            },
                                            fields: [
                                                {
                                                    name: 'subject',
                                                    type: 'text',
                                                    required: true,
                                                    label: {
                                                        en: 'Subject',
                                                        bg: 'Предмет'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            name: 'daysInWeek',
                                            type: 'number',
                                            required: true,
                                            defaultValue: 5,
                                            label: {
                                                en: 'Number of days in a week',
                                                bg: 'Брой на дни в седмицата'
                                            }
                                        },
                                        {
                                            name: 'rowsPerSchedule',
                                            type: 'number',
                                            required: true,
                                            defaultValue: 13,
                                            label: {
                                                en: 'Number of rows per schedule of a class',
                                                bg: 'Брой на редове на програма на класа'
                                            }
                                        },
                                        {
                                            name: 'lessonNumberRegex',
                                            type: 'text',
                                            required: true,
                                            defaultValue: '^[0-9]+$',
                                            label: {
                                                en: 'Lesson number regex',
                                                bg: 'Регулярен израз за номер на час'
                                            }
                                        },
                                        {
                                            name: 'maxNumberOfLessons',
                                            type: 'number',
                                            required: true,
                                            defaultValue: 9,
                                            label: {
                                                en: 'The latest hour in the schedule',
                                                bg: 'Най-късния час в програмата'
                                            }
                                        },
                                        {
                                            name: 'dayAliases',
                                            type: 'array',
                                            defaultValue: [
                                                {
                                                    shortName: 'ПОНЕД.',
                                                    fullName: 'Понеделник'
                                                },
                                                {
                                                    shortName: 'ВТОРНИК',
                                                    fullName: 'Вторник'
                                                },
                                                {
                                                    shortName: 'СРЯДА',
                                                    fullName: 'Сряда'
                                                },
                                                {
                                                    shortName: 'ЧЕТВ.',
                                                    fullName: 'Четвъртък'
                                                },
                                                {
                                                    shortName: 'ПЕТЪК',
                                                    fullName: 'Петък'
                                                }
                                            ],
                                            label: {
                                                en: 'Day aliases',
                                                bg: 'Заместители на имената на дните'
                                            },
                                            fields: [
                                                {
                                                    name: 'shortName',
                                                    type: 'text',
                                                    required: true,
                                                    label: {
                                                        en: 'Short day name (case-insensitive)',
                                                        bg: 'Съкратено име на деня (нямат значение главните и малки букви)'
                                                    }
                                                },
                                                {
                                                    name: 'fullName',
                                                    type: 'text',
                                                    required: true,
                                                    label: {
                                                        en: 'Full day name (short name will be replaced with this)',
                                                        bg: 'Пълно име на деня (заменя съкратеното име)'
                                                    }
                                                },
                                            ]
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ],
        }
    ]
}

export default Schedules;

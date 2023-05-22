import {CollectionConfig} from 'payload/types';

const WeeklySchedules: CollectionConfig = {
    slug: 'weekly-schedules',
    labels: {
        singular: {
            en: 'Weekly schedule', bg: 'Седмична програма'
        },
        plural: {
            en: 'Weekly schedules', bg: 'Седмични програми'
        }
    },
    admin: {
        useAsTitle: 'class'
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'class',
            type: 'text',
            required: true,
            label: { en: 'Class', bg: 'Клас' },
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
                            label: {
                                en: 'Subject', bg: 'Предмет'
                            }
                        }
                    ]
                }
            ]
        }
    ],
}

export default WeeklySchedules;
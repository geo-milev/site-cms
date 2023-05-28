import {CollectionConfig} from 'payload/types';

const ScheduleEntries: CollectionConfig = {
    slug: 'schedule-entries',
    labels: {
        singular: {
            en: 'Schedule', bg: 'График'
        },
        plural: {
            en: 'Schedules', bg: 'Графици'
        }
    },
    admin: {
        useAsTitle: 'name'
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: { en: 'Name', bg: 'Име'},
            required: true,
        },
        {
            name: 'file',
            type: 'upload',
            label: { en: 'File', bg: 'Файл'},
            relationTo: 'media',
            required: true
        },
    ],
}

export default ScheduleEntries;
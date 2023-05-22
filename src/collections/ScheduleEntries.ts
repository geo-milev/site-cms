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
            required: true,
        },
        {
            name: 'file',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
    ],
}

export default ScheduleEntries;
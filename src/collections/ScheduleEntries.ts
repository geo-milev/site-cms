import {CollectionConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

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
        useAsTitle: 'name',
        defaultColumns: ['name', 'file', 'updatedAt'],
        listSearchableFields: ['name', 'file'],
        group: 'Организация'
    },
    access: {
        read: () => true
    },
    hooks: {
        afterChange: [updateLastMod("/organisation/schedules")]
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

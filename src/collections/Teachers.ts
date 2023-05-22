import {CollectionConfig} from 'payload/types';

const Teachers: CollectionConfig = {
    slug: 'teachers',
    labels: {
        singular: {
            en: 'Teacher', bg: 'Учител'
        },
        plural: {
            en: 'Teachers', bg: 'Учители'
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
            label: { en: 'Name', bg: 'Име' },
        },
        {
            name: 'shortenedName',
            type: 'text',
            required: true,
            label: { en: 'Shortened name', bg: 'Съкратено име' },
        },
        {
            name: 'subjects',
            type: 'array',
            label: { en: 'Subjects', bg: 'Предмети' },
            fields: [
                {
                    name: 'subject',
                    type: 'relationship',
                    relationTo: 'subjects',
                    required: true,
                }
            ]
        },
        {
            name: 'additional',
            type: 'textarea',
            label: { en: 'Additional info', bg: 'Допълнително информация' },
        }
    ],
}

export default Teachers;
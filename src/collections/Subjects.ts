import {CollectionConfig} from 'payload/types';

const Subjects: CollectionConfig = {
    slug: 'subjects',
    labels: {
        singular: {
            en: 'Subject', bg: 'Предмет'
        },
        plural: {
            en: 'Subject', bg: 'Предмети'
        }
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'shortName'],
        listSearchableFields: ['shortName', 'description'],
        group: 'Програма'
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: {
                en: 'Name',
                bg: 'Име'
            },
            required: true,
        },
        {
            name: 'shortName',
            type: 'text',
            label: {
                en: 'Shortened name',
                bg: 'Съкратено име'
            },
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: {
                en: 'Description',
                bg: 'Описание'
            }
        }
    ],
}

export default Subjects;

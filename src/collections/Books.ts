import {CollectionConfig} from 'payload/types';

const Books: CollectionConfig = {
    slug: 'books',
    labels: {
        singular: {
            en: 'Book', bg: 'Учебник'
        },
        plural: {
            en: 'Books', bg: 'Учебници'
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
            name: 'class',
            type: 'text',
            required: true,
            label: { en: 'Class', bg: 'Клас'}
        },
        {
            name: 'name',
            type: 'text',
            required: true,
            label: { en: 'Name', bg: 'Име'}
        },
        {
            name: 'author',
            type: 'text',
            required: true,
            label: { en: 'Authors', bg: 'Автори'}
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: { en: 'Image', bg: 'Снимка' },
        },
    ],
}

export default Books;
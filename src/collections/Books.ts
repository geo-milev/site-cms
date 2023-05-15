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
            name: 'authors',
            type: 'array',
            minRows: 1,
            label: { en: 'Authors', bg: 'Автори' },
            fields: [
                {
                    name: 'author',
                    type: 'text',
                    required: true,
                    label: { en: 'Author', bg: 'Автор' },
                }
            ]
        },
        {
            name: 'year',
            type: 'number',
            required: true,
            label: { en: 'Year', bg: 'Години'}
        },
        {
            name: 'publisher',
            type: 'relationship',
            relationTo: 'publishers',
            required: true,
            label: { en: 'Publisher', bg: 'Издател' }
        },
        {
            name: 'subject',
            type: 'relationship',
            relationTo: 'subjects',
            required: true,
            label: { en: 'Subject', bg: 'Предмет' }
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
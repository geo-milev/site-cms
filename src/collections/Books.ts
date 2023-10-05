import {CollectionConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";
import imageOnly from "../lib/filters/onlyImage";

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
        useAsTitle: 'name',
        defaultColumns: ['name', 'class', 'publisher', 'note'],
        listSearchableFields: ['class', 'year', 'publisher', 'note']
    },
    access: {
        read: () => true
    },
    hooks: {
        afterChange: [updateLastMod("/student/books")]
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
            label: { en: 'Authors', bg: 'Автори' },
            labels: {
                singular: { en: 'Author', bg: 'Автор' },
                plural: { en: 'Authors', bg: 'Автори' }
            },
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
            type: 'text',
            label: { en: 'Year', bg: 'Години'}
        },
        {
            name: 'publisher',
            type: 'text',
            label: { en: 'Publisher', bg: 'Издател' }
        },
        {
            name: 'note',
            type: 'text',
            label: { en: 'Note', bg: 'Забележка' }
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            filterOptions: imageOnly,
            label: { en: 'Image', bg: 'Снимка' },
        },
    ],
}

export default Books;

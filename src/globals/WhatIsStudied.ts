import {GlobalConfig} from 'payload/types';

export const WhatIsStudied: GlobalConfig = {
    slug: 'what-is-studied',
    label: {
        en: 'What is studied', bg: 'Какво се учи'
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'header',
            type: 'text',
            defaultValue: 'Какво се учи в ППМГ “Гео Милев”',
            required: true,
            label: {
                en: 'Header', bg: 'Заглавие'
            }
        },
        {
            name: 'text',
            type: 'textarea',
            required: true,
            label: {
                en: 'Text', bg: 'Текст'
            },
        },
        {
            name: 'profiles',
            type: 'array',
            required: true,
            minRows: 1,
            label: { en: 'Profiles', bg: 'Профили' },
            labels: {
                singular: { en: 'Profile', bg: 'Профил' },
                plural: { en: 'Profiles', bg: 'Профили' }
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: { en: 'Image', bg: 'Картина' },
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: { en: 'Profile description', bg: 'Описание на профила' },
                }
            ]
        },
    ]
}

export default WhatIsStudied;
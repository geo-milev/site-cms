import {GlobalConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";
import imageOnly from "../lib/filters/onlyImage";
import {mainPage} from "../lib/groups";

export const WhatIsStudied: GlobalConfig = {
    slug: 'what-is-studied',
    label: {
        en: 'What is studied', bg: 'Какво се учи'
    },
    admin: {
        group: mainPage
    },
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [updateLastMod("/")]
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
                    filterOptions: imageOnly,
                    label: { en: 'Image', bg: 'Картина' },
                },
                {
                    name: 'name',
                    type: 'text',
                    label: { en: 'Profile name', bg: 'Име на профила' },
                    required: true
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: { en: 'Profile description', bg: 'Описание на профила' },
                    required: true
                }
            ]
        },
    ]
}

export default WhatIsStudied;

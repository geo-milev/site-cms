import {GlobalConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

// @ts-ignore is needed because the admin.placeholder does not exist in the generic Field typescript definition
// This means that the button link text field placeholder is flagged as an error
// @ts-ignore
export const Slideshow: GlobalConfig = {
    slug: 'slideshow',
    label: {
        en: 'Slideshow', bg: 'Слайдшоу'
    },
    admin: {
        group: 'Главна страница'
    },
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [updateLastMod("/")]
    },
    fields: [
        {
            name: 'slides',
            type: 'array',
            required: true,
            minRows: 1,
            label: { en: 'Slides', bg: 'Слайдове' },
            labels: {
                singular: { en: 'Slide', bg: 'Слайд' },
                plural: { en: 'Slides', bg: 'Слайдове' }
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: { en: 'Image', bg: 'Снимка' },
                },
                {
                    name: 'text',
                    type: 'text',
                    label: { en: 'Slide text', bg: 'Текст на слайда' },
                },
                {
                    name: 'button',
                    type: 'group',
                    label: { en: 'Slide button', bg: 'Бутон на слайда' },
                    fields: [
                        {
                            name: 'text',
                            type: 'text',
                            label: { en: 'Button text', bg: 'Текст на бутона' },
                        },
                        {
                            name: 'href',
                            type: 'text',
                            label: { en: 'Button link', bg: 'Връзка на бутона' },
                            admin: {
                                placeholder: '/about-us'
                            }
                        }
                    ]
                },
            ]
        },
    ]
}

export default Slideshow;

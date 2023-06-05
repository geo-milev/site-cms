import {Block} from "payload/types";
import richTextUploadMetadata from "../lib/richTextUploadMetadata";

// The definitions for the admin field on richText don't properly include the upload field, causing errors
const FloatedRichText: Block = {
    slug: 'floated-rich-text',
    labels: {
        singular: {en: 'Floated image with Rich Text', bg: 'Плаваща картина с форматиран текст'},
        plural: {en: 'Floated images with Rich text fields', bg: 'Полета плаваща картини с форматиран текст'}
    },
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: {en: 'Image', bg: 'Картина'},
            required: true,
        },
        {
            name: 'float',
            type: 'select',
            label: {en: 'Float', bg: 'Плаване'},
            options: [
                {
                    label: { en: 'Left', bg: 'Ляво' },
                    value: 'left',
                },
                {
                    label: { en: 'Right', bg: 'Дясно' },
                    value: 'right',
                },
            ]
        },
        {
            name: 'text',
            type: 'richText',
            label: {
                en: 'Text', bg: 'Текст'
            },
            admin: {
                upload: richTextUploadMetadata
            }
        }
    ]
};

export default FloatedRichText;

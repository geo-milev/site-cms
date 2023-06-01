import {Block} from "payload/types";
import richTextUploadMetadata from "../lib/richTextUploadMetadata";

// The definitions for the admin field on richText don't properly include the upload field, causing errors
const RichText: Block = {
    slug: 'rich-text',
    labels: {
        singular: {en: 'Rich Text', bg: 'Форматиран текст'},
        plural: {en: 'Rich text fields', bg: 'Полета форматиран текст'}
    },
    fields: [
        {
          name: 'isCentered',
          type: 'checkbox',
          label: {
              en: 'Centered', bg: 'Центриран'
          },
        },
        {
            name: 'importantInfo',
            type: 'richText',
            label: {
                en: 'Important info', bg: 'Важна информация'
            },
            admin: {
                upload: richTextUploadMetadata
            }
        },
    ]
};

export default RichText;
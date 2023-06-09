import {Block} from "payload/types";
import richTextUploadMetadata from "../lib/richTextUploadMetadata";
import leftAlign from "../richText/leftAlign";
import rightAlign from "../richText/rightAlign";
import centerAlign from "../richText/centerAlign";
import justifiedAlign from "../richText/justifiedAlign";

// The definitions for the admin field on richText don't properly include the upload field, causing errors
// @ts-ignore
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
                upload: richTextUploadMetadata,
                elements: [
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'blockquote',
                    'link',
                    'ol',
                    'ul',
                    'indent',
                    'upload',
                    leftAlign,
                    rightAlign,
                    centerAlign,
                    justifiedAlign
                ],
                leaves: [
                    'bold',
                    'italic',
                    'code',
                    'strikethrough',
                    'underline'
                ]
            }
        },
    ]
};

export default RichText;

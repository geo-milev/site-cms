import {GlobalConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

export const BooksInfo: GlobalConfig = {
    slug: 'books-info',
    label: {
        en: 'Books info', bg: 'Информация за учебниците'
    },
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [updateLastMod("/student/books")]
    },
    fields: [
        {
            name: 'year',
            type: 'text',
            required: true,
            label: {
                en: 'Year of current books', bg: 'Учебна година на учебниците'
            }
        },
        {
            name: 'file',
            type: 'upload',
            relationTo: 'media',
            label: {
                en: 'File', bg: 'Файл с учебниците'
            }
        }
    ]
}

export default BooksInfo;

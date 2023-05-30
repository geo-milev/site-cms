import {GlobalConfig} from 'payload/types';

export const BooksInfo: GlobalConfig = {
    slug: 'books-info',
    label: {
        en: 'Books info', bg: 'Информация за учебниците'
    },
    access: {
        read: () => true,
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

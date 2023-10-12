import {GlobalConfig} from 'payload/types';

export const GeneratedFiles: GlobalConfig = {
    slug: 'generated-files',
    label: {
        en: 'Generated files', bg: 'Генерирани файлове'
    },
    admin: {
        hidden: true
    },
    access: {
        read: () => false,
        update: () => false
    },
    fields: [
        {
            name: 'sitemap',
            type: 'text'
        },
        {
            name: 'rss',
            type: "text"
        }
    ]
}

export default GeneratedFiles;

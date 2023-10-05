import path from 'path';
import {CollectionConfig} from 'payload/types';

export const Media: CollectionConfig = {
    slug: 'media',
    labels: {
       singular: {
           en: 'Media', bg: 'Медия'
       },
       plural: {
           en: 'Media', bg: 'Медия'
       }
    },
    admin: {
        useAsTitle: 'alt',
        defaultColumns: ['alt', 'filename', 'filesize'],
        listSearchableFields: ['filename', 'mimeType'],
        group: 'Администрация'
    },
    upload: {
        staticDir: path.resolve(__dirname, '../../media'),
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        }
    ]
}

export default Media;

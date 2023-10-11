import path from 'path';
import {CollectionConfig} from 'payload/types';
import {isAdmin} from "../lib/access/isAdmin";
import {administration} from "../lib/groups";

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
        group: administration
    },
    upload: {
        staticDir: path.resolve(__dirname, '../../media'),
    },
    access: {
        read: () => true,
        delete: isAdmin
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

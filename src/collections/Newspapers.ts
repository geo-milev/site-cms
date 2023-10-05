import {CollectionConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

const Newspapers: CollectionConfig = {
    slug: 'newspaper',
    labels: {
        singular: {
            en: 'Newspaper', bg: 'Вестник'
        },
        plural: {
            en: 'Newspapers', bg: 'Вестници'
        }
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'file', 'updatedAt'],
        listSearchableFields: ['name', 'file']
    },
    hooks: {
        afterChange: [updateLastMod("/student/newspaper")]
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: { en: 'Name', bg: 'Име'},
            required: true,
        },
        {
            name: 'file',
            type: 'upload',
            label: { en: 'File', bg: 'Файл'},
            relationTo: 'media',
            required: true
        },
    ],
}

export default Newspapers;

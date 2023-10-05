import {CollectionConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

const FormFiles: CollectionConfig = {
    slug: 'form-files',
    labels: {
        singular: {
            en: 'Form file', bg: 'Бланка'
        },
        plural: {
            en: 'Form files', bg: 'Бланки'
        }
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'file', 'updatedAt'],
        listSearchableFields: ['file'],
        group: 'Организация'
    },
    access: {
        read: () => true
    },
    hooks: {
        afterChange: [updateLastMod("/organisation/forms")]
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

export default FormFiles;

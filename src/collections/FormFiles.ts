import {CollectionConfig} from 'payload/types';

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
        useAsTitle: 'name'
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

export default FormFiles;
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
            required: true,
        },
        {
            name: 'file',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
    ],
}

export default FormFiles;
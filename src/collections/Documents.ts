import {CollectionConfig} from 'payload/types';

const Documents: CollectionConfig = {
    slug: 'documents',
    labels: {
        singular: {
            en: 'Document', bg: 'Документ'
        },
        plural: {
            en: 'Documents', bg: 'Документи'
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

export default Documents;
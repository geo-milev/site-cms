import {CollectionConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

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
        useAsTitle: 'name',
        defaultColumns: ['name', 'file', 'updatedAt'],
        listSearchableFields: ['file']
    },
    access: {
        read: () => true
    },
    hooks: {
        afterChange: [updateLastMod("/organisation/documents")]
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

export default Documents;

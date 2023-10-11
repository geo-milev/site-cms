import {CollectionConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";
import {isAdminOrEditor} from "../lib/access/isAdminOrEditor";
import {organisation} from "../lib/groups";

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
        listSearchableFields: ['file'],
        group: organisation,
        hidden: ({user}) => !isAdminOrEditor({req: { user }})
    },
    access: {
        read: () => true,
        update: isAdminOrEditor,
        create: isAdminOrEditor,
        delete: isAdminOrEditor
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

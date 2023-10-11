import {CollectionConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";
import {isAdminOrEditor} from "../lib/access/isAdminOrEditor";

const Exercises: CollectionConfig = {
    slug: 'exercises',
    labels: {
        singular: {
            en: 'Exercise', bg: 'Упражнение за прием'
        },
        plural: {
            en: 'Exercises', bg: 'Упражнения за прием'
        }
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'file', 'updatedAt'],
        listSearchableFields: ['file'],
        group: 'Прием',
        hidden: ({user}) => !isAdminOrEditor({req: { user }})
    },
    access: {
        read: () => true,
        update: isAdminOrEditor,
        create: isAdminOrEditor,
        delete: isAdminOrEditor
    },
    hooks: {
        afterChange: [updateLastMod("/admission/exercises")]
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

export default Exercises;

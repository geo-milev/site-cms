import {CollectionConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

const Exercises: CollectionConfig = {
    slug: 'exercises',
    labels: {
        singular: {
            en: 'Exercise', bg: 'Упражнение'
        },
        plural: {
            en: 'Exercises', bg: 'Упражнения'
        }
    },
    admin: {
        useAsTitle: 'name'
    },
    access: {
        read: () => true
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

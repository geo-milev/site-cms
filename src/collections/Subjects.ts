import {CollectionConfig} from 'payload/types';
import {isAdmin} from "../lib/access/isAdmin";
import {schedule} from "../lib/groups";

const Subjects: CollectionConfig = {
    slug: 'subjects',
    labels: {
        singular: {
            en: 'Subject', bg: 'Предмет'
        },
        plural: {
            en: 'Subject', bg: 'Предмети'
        }
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'shortName'],
        listSearchableFields: ['shortName', 'description'],
        group: schedule,
        hidden: (user) => !isAdmin({ req: user })
    },
    access: {
        read: () => true,
        delete: isAdmin
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: {
                en: 'Name',
                bg: 'Име'
            },
            required: true,
        },
        {
            name: 'shortName',
            type: 'text',
            label: {
                en: 'Shortened name',
                bg: 'Съкратено име'
            },
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: {
                en: 'Description',
                bg: 'Описание'
            }
        }
    ],
}

export default Subjects;

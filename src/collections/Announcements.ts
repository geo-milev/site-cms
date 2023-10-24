import {CollectionConfig} from "payload/types";
import {books, news} from "../lib/groups";
import {isAdminOrEditor} from "../lib/access/isAdminOrEditor";

const Announcements: CollectionConfig = {
    slug: 'announcements',
    labels: {
        singular: {
            en: 'Announcement', bg: 'Обявление'
        },
        plural: {
            en: 'Announcements', bg: 'Обявления'
        }
    },
    admin: {
        useAsTitle: 'text',
        defaultColumns: ['text', 'createdAt'],
        listSearchableFields: ['text', 'link'],
        group: news,
        hidden: (user) => !isAdminOrEditor({ req: user })
    },
    access: {
        read: () => true,
        update: isAdminOrEditor,
        create: isAdminOrEditor,
        delete: isAdminOrEditor
    },
    fields: [
        {
            name: 'text',
            type: 'text',
            label: { en: 'Text', bg: 'Текст'},
            required: true,
        },
        {
            name: 'link',
            type: 'text',
            label: { en: 'Link', bg: 'Връзка'},
            required: true,
        },
    ]
}

export default Announcements;

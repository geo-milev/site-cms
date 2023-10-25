import {CollectionConfig} from "payload/types";
import {isAdminOrEditor} from "../lib/access/isAdminOrEditor";
import {news} from "../lib/groups"

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
    hooks: {
        beforeChange: [
            ({data}) => {
                if (!data.link.startsWith('http')) {
                    if (!data.link.startsWith('/')) data.link = "/" + data.link;
                    data.link = process.env.FRONTEND_URL + data.link;
                }
                return data;
            }
        ]
    },
    fields: [
        {
            name: 'text',
            type: 'text',
            label: { en: 'Text', bg: 'Текст'},
            minLength: 1,
            maxLength: 60,
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

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
        listSearchableFields: ['text', 'href'],
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
                if (data.href && data.href != "" && !data.href.startsWith('http')) {
                    if (!data.href.startsWith('/')) data.href = "/" + data.href;
                    data.href = process.env.FRONTEND_URL + data.href;
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
            name: 'href',
            type: 'text',
            label: { en: 'Link', bg: 'Връзка'}
        },
    ]
}

export default Announcements;

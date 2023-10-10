import {CollectionConfig} from 'payload/types';
import {isAdmin} from "../lib/access/isAdmin";

const NewsCategory: CollectionConfig = {
    slug: 'news-category',
    labels: {
        singular: {
            en: 'News category', bg: 'Категория новини'
        },
        plural: {
            en: 'News categories', bg: 'Категории новини'
        }
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['createdAt', 'updatedAt'],
        group: 'Новини',
        hidden: ({user}) => !isAdmin({req: { user }})
    },
    access: {
        read: () => true,
        delete: isAdmin,
        update: isAdmin
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            minLength: 1,
            maxLength: 60,
            label: {
                en: 'Name',
                bg: 'Име'
            },
            required: true,
        }
    ],
}

export default NewsCategory;

import {CollectionConfig} from 'payload/types';

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
        useAsTitle: 'name'
    },
    access: {
        read: () => true
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
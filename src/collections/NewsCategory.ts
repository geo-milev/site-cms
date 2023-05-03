import {CollectionConfig} from "payload/types";

const NewsCategory: CollectionConfig = {
    slug: 'news-category',
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
            required: true,
        }
    ],
}

export default NewsCategory;
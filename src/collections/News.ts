import { CollectionConfig } from 'payload/types';

const News: CollectionConfig = {
    slug: 'news',
    admin: {
        useAsTitle: 'title'
    },
    versions: {
        drafts: true,
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            minLength: 1,
            maxLength: 60,
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            minLength: 1,
            maxLength: 200
        },
        {
            name: 'postImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'news-category',
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'content',
            type: 'richText',
            required: true
        }
    ],
}

export default News;
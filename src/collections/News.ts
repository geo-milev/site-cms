import { CollectionConfig } from 'payload/types';

const updatePublishDate = ({ data, req, operation }) => {
    if (operation === 'create' || operation === 'update') {
        if (req.body && !req.body.publishDate) {
            const now = new Date()
            return {
                ...data,
                publishDate: now,
            }
        }
    }

    return data
}

const News: CollectionConfig = {
    slug: 'news',
    admin: {
        useAsTitle: 'title'
    },
    hooks: {
        beforeChange: [updatePublishDate]
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
            name: 'publishDate',
            type: 'date',
            admin: {
                position: 'sidebar'
            },
            required: true
        },
        {
            name: 'content',
            type: "richText",
            minLength: 1
        }
    ],
}

export default News;
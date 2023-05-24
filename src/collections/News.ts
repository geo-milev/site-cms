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
    labels: {
        singular: {
            en: 'News', bg: 'Новина'
        },
        plural: {
            en: 'News', bg: 'Новини'
        }
    },
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
            }
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
            name: 'isSuccess',
            type: 'checkbox',
            label: {en: 'Is a success', bg: 'Постижение е'},
            defaultValue: false,
        },
        {
            name: 'successCategory',
            type: 'select',
            options: [
                {
                    label: { en: 'Olympiad', bg: 'Олимпиада' },
                    value: 'olympiads',
                },
                {
                    label: { en: 'Sport', bg: 'Спорт' },
                    value: 'sports',
                },
                {
                    label: { en: 'Art', bg: 'Творчество' },
                    value: 'arts',
                }
            ],
            admin: {
                condition: (data) => {
                    return !!data.isSuccess;
                }
            }
        },
        {
            name: 'content',
            type: 'richText',
            required: true
        },
    ],
}

export default News;
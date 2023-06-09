import { CollectionConfig } from 'payload/types';
import updateLastMod from "../lib/updateLastMod";
import blocks from "../blocks/blocks";

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
        beforeChange: [updatePublishDate],
        afterChange: [updateLastMod("/news")]
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
            label: {en: 'Title', bg: 'Заглавие'},
            required: true,
        },
        {
            name: 'publishDate',
            type: 'date',
            label: {en: 'Publish date', bg: 'Дата на публикуване'},
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'description',
            type: 'textarea',
            label: {en: 'Description', bg: 'Описание'},
            required: true,
            minLength: 1,
            maxLength: 200
        },
        {
            name: 'postImage',
            type: 'upload',
            relationTo: 'media',
            label: {en: 'News image', bg: 'Картина на новината'},
            required: true,
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'news-category',
            label: {en: 'News category', bg: 'Категория на новината'},
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
            label: {en: 'Success category', bg: 'Категория успех'},
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
            type: 'blocks',
            labels: {
                singular: {en: 'Block', bg: 'Блок'},
                plural: {en: 'Blocks', bg: 'Блокове'}
            },
            blocks: blocks,
            required: true
        }
    ],
}

export default News;

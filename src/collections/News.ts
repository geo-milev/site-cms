import { CollectionConfig } from 'payload/types';
import updateLastMod from "../lib/updateLastMod";
import blocks from "../blocks/blocks";
import imageOnly from "../lib/filters/onlyImage";
import createSeoEntry from "../lib/createSeoEntry";
import deleteSeoEntry from "../lib/deleteSeoEntry";
import {news} from "../lib/groups";

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

const setDefaultDescription = ({ data, req, operation }) => {
    if (operation === 'create' || operation === 'update') {
        if (req.body && !req.body.description) {
            return {
                ...data,
                description: ""
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
        useAsTitle: 'title',
        defaultColumns: ['title', 'publishDate'],
        listSearchableFields: ['description'],
        group: news
    },
    hooks: {
        beforeChange: [updatePublishDate, setDefaultDescription],
        afterChange: [updateLastMod("/news"),
            createSeoEntry("/news", (doc) => {
            return {
                title: doc.title,
                description: doc.description,
                image: doc.postImage? doc.postImage: null,
                hideFromSitemap: doc._status !== "published"
            }
        })],
        afterDelete: [deleteSeoEntry("/news")]
    },
    versions: {
        drafts: true,
    },
    access: {
        read: ({ req }) => {
            if (req.user) return true

            return {
                or: [
                    {
                        _status: {
                            equals: 'published',
                        },
                    },
                    {
                        _status: {
                            exists: false,
                        },
                    },
                ],
            }
        },
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
            minLength: 1,
            maxLength: 200
        },
        {
            name: 'postImage',
            type: 'upload',
            relationTo: 'media',
            filterOptions: imageOnly,
            label: {en: 'News image', bg: 'Картина на новината'}
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
            label: {en: 'Content', bg: 'Съдържание'},
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

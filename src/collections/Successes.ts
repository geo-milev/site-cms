import {CollectionConfig} from 'payload/types';

const Books: CollectionConfig = {
    slug: 'successes',
    labels: {
        singular: {
            en: 'Success', bg: 'Постижение'
        },
        plural: {
            en: 'Successes', bg: 'Постижения'
        }
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'article',
            type: 'relationship',
            required: true,
            relationTo: 'news'
        },
        {
            name: 'category',
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
        }
    ],
}

export default Books;
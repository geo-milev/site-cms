import {CollectionConfig} from 'payload/types';

const PagesSeoData: CollectionConfig = {
    slug: 'pages-seo-data',
    labels: {
        singular: {
            en: 'Page SEO Data', bg: 'SEO на страница'
        },
        plural: {
            en: 'Pages SEO Data', bg: 'SEO на страници'
        }
    },
    admin: {
        useAsTitle: 'relativeUrl'
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'relativeUrl',
            type: 'text',
            required: true,
            unique: true,
            label: { en: 'Relative url', bg: 'Относителен адрес'}
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            label: { en: 'Title', bg: 'Заглавие'}
        },
        {
            name: 'description',
            type: 'text',
            label: { en: 'Description', bg: 'Описание' }
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: { en: 'Image', bg: 'Снимка' },
        },
    ],
}

export default PagesSeoData;

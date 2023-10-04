import {CollectionConfig} from 'payload/types';
import imageOnly from "../lib/filters/imageOnly";

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
            required: true,
            label: { en: 'Description', bg: 'Описание' }
        },
        {
            name: 'image',
            type: 'upload',
            required: true,
            relationTo: 'media',
            filterOptions: imageOnly,
            label: { en: 'Image', bg: 'Снимка' },
        },
        {
            name: 'lastUpdate',
            type: 'date',
            required: true,
            label: { en: 'Last update', bg: 'Последна промяна' },
        },
    ],
}

export default PagesSeoData;

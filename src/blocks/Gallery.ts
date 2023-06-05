import {Block} from "payload/types";

const Gallery: Block = {
    slug: 'gallery',
    labels: {
        singular: {en: 'Gallery', bg: 'Галерия'},
        plural: {en: 'Galleries', bg: 'Галерии'}
    },
    graphQL: {
        singularName: 'Gallery'
    },
    fields: [
        {
            name: 'images',
            type: 'array',
            labels: {
                singular: {en: 'Image', bg: 'Картина'},
                plural: {en: 'Images', bg: 'Картина'}
            },
            required: true,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    label: {en: 'Image', bg: 'Картина'},
                    required: true,
                }
            ]
        },
    ]
};

export default Gallery;

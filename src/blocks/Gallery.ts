import {Block} from "payload/types";
import imageOnly from "../lib/filters/onlyImage";

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
            label: {en: 'Images', bg: 'Картини'},
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
                    filterOptions: imageOnly,
                    label: {en: 'Image', bg: 'Картина'},
                    required: true,
                }
            ]
        },
    ]
};

export default Gallery;

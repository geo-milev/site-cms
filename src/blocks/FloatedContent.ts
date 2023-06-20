import {Block} from "payload/types";
import RichText from "./RichText";
import Gallery from "./Gallery";
import Table from "./Table";
import Formula from "./Formula";
import AdmissionRequirements from "./AdmissionRequirements";
import Video from "./Video";
import FileViewer from "./FileViewer";

const FloatedContent: Block = {
    slug: 'floated-content',
    labels: {
        singular: {en: 'Floated image with content', bg: 'Плаваща картина със съдържание'},
        plural: {en: 'Floated images with content', bg: 'Полета плаваща картини със съдържание'}
    },
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: {en: 'Image', bg: 'Картина'},
            required: true,
        },
        {
            name: 'float',
            type: 'select',
            label: {en: 'Float', bg: 'Плаване'},
            options: [
                {
                    label: { en: 'Left', bg: 'Ляво' },
                    value: 'left',
                },
                {
                    label: { en: 'Right', bg: 'Дясно' },
                    value: 'right',
                },
            ]
        },
        {
            name: 'content',
            type: 'blocks',
            labels: {
                singular: {en: 'Block', bg: 'Блок'},
                plural: {en: 'Blocks', bg: 'Блокове'}
            },
            blocks: [
                RichText,
                Gallery,
                Table,
                Formula,
                AdmissionRequirements,
                Video,
                FileViewer
            ],
            required: true
        }
    ]
};

export default FloatedContent;

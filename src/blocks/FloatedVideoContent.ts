import {Block} from "payload/types";
import RichText from "./RichText";
import Gallery from "./Gallery";
import Table from "./Table";
import Formula from "./Formula";
import AdmissionRequirements from "./AdmissionRequirements";
import Video from "./Video";

const FloatedVideoContent: Block = {
    slug: 'floated-video-content',
    labels: {
        singular: {en: 'Floated video with content', bg: 'Плаващо видео със съдържание'},
        plural: {en: 'Floated videos with content', bg: 'Полета плаващи видеа със съдържание'}
    },
    fields: [
        {
            name: 'video',
            type: 'text',
            required: true,
            label: {
                en: 'Video Link (YouTube embed)', bg: 'Видео връзка (YouTube embed)'
            },
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
                Video
            ],
            required: true
        }
    ]
};

export default FloatedVideoContent;

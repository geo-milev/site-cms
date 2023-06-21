import {Block} from "payload/types";

const Video: Block = {
    slug: 'video',
    labels: {
        singular: {en: 'Video', bg: 'Видео'},
        plural: {en: 'Videos', bg: 'Видеа'}
    },
    graphQL: {
        singularName: 'Video'
    },
    fields: [
        {
            name: 'video',
            type: 'text',
            required: true,
            label: {
                en: 'Video Link (YouTube embed)', bg: 'Видео връзка (YouTube embed)'
            },
        }
    ]
};

export default Video;

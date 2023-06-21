import {GlobalConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

export const VideoSection: GlobalConfig = {
    slug: 'video-section',
    label: {
        en: 'Video section', bg: 'Видео секция'
    },
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [updateLastMod("/")]
    },
    fields: [
        {
            name: 'header',
            type: 'text',
            defaultValue: 'Здравейте',
            required: true,
            label: {
                en: 'Header', bg: 'Заглавие'
            }
        },
        {
            name: 'text',
            type: 'textarea',
            required: true,
            label: {
                en: 'Text', bg: 'Текст'
            },
        },
        {
            name: 'video',
            type: 'text',
            required: true,
            label: {
                en: 'Video Link (YouTube embed)', bg: 'Видео връзка (YouTube embed)'
            },
        },
    ]
}

export default VideoSection;

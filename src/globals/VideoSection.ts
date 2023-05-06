import {GlobalConfig} from "payload/types";

export const VideoSection: GlobalConfig = {
    slug: 'video-section',
    label: {
        en: "Video section", bg: "Видео секция"
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'header',
            type: 'text',
            defaultValue: "Здравейте",
            required: true,
            label: {
                en: "Header", bg: "Заглавие"
            }
        },
        {
            name: 'text',
            type: 'textarea',
            required: true,
            label: {
                en: "Text", bg: "Текст"
            },
        },
        {
            name: 'video',
            type: 'text',
            required: true,
            label: {
                en: "Video Link (YouTube)", bg: "Видео връзка (YouTube)"
            },
        },
    ]
}

export default VideoSection;
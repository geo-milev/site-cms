import {GlobalConfig} from 'payload/types';
import richTextUploadMetadata from "../lib/richTextUploadMetadata";

// @ts-ignore
export const Admission: GlobalConfig = {
    slug: 'admission',
    label: {
        en: 'Admission', bg: 'Прием'
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'grades',
            type: 'array',
            label: {
                en: 'Grades', bg: 'Класове'
            },
            fields: [
                {
                    name: 'grade',
                    type: 'number',
                    required: true
                },
                {
                    name: 'importantInfo',
                    type: 'richText',
                    label: {
                        en: 'Important info', bg: 'Важна информация'
                    },
                    admin: {
                        upload: richTextUploadMetadata
                    }
                },
                {
                    name: 'steps',
                    type: 'array',
                    label: {
                        en: 'Steps', bg: 'Стъпки'
                    },
                    fields: [
                        {
                            name: 'stepNumber',
                            type: 'number',
                            required: true
                        },
                        {
                            name: 'info',
                            type: 'blocks',
                            blocks: [

                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export default Admission;

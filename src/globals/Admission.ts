import {GlobalConfig} from 'payload/types';
import richTextUploadMetadata from "../lib/richTextUploadMetadata";
import RichText from "../blocks/RichText";
import AdmissionRequirements from "../blocks/AdmissionRequirements";
import Formula from "../blocks/Formula";

// The definitions for the admin field on richText don't properly include the upload field, causing errors
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
            labels: {
                singular: {en: 'Grade', bg: 'Клас'},
                plural: {en: 'Grades', bg: 'Класове'}
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
                    labels: {
                        singular: {en: 'Step', bg: 'Стъпка'},
                        plural: {en: 'Steps', bg: 'Стъпки'}
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
                                RichText,
                                AdmissionRequirements,
                                Formula
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export default Admission;

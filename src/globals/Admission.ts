import {GlobalConfig} from 'payload/types';
import richTextUploadMetadata from "../lib/richTextUploadMetadata";
import RichText from "../blocks/RichText";
import AdmissionRequirements from "../blocks/AdmissionRequirements";
import Formula from "../blocks/Formula";
import updateLastMod from "../lib/updateLastMod";

// The definitions for the admin field on richText don't properly include the upload field, causing errors
export const Admission: GlobalConfig = {
    slug: 'admission',
    label: {
        en: 'Admission', bg: 'Прием'
    },
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [updateLastMod("/admission")]
    },
    fields: [
        {
            name: 'grades',
            type: 'array',
            label: {en: 'Grades', bg: 'Класове'},
            labels: {
                singular: {en: 'Grade', bg: 'Клас'},
                plural: {en: 'Grades', bg: 'Класове'}
            },
            fields: [
                {
                    name: 'grade',
                    type: 'number',
                    label: {en: 'Grade', bg: 'Клас'},
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
                    label: {en: 'Steps', bg: 'Стъпки'},
                    labels: {
                        singular: {en: 'Step', bg: 'Стъпка'},
                        plural: {en: 'Steps', bg: 'Стъпки'}
                    },
                    fields: [
                        {
                            name: 'stepNumber',
                            type: 'number',
                            label: {en: 'Step number', bg: 'Номер на стъпката'},
                            required: true
                        },
                        {
                            name: 'info',
                            type: 'blocks',
                            label: {en: 'Blocks', bg: 'Блокове'},
                            labels: {
                                singular: {en: 'Block', bg: 'Блок'},
                                plural: {en: 'Blocks', bg: 'Блокове'}
                            },
                            blocks: [
                                RichText,
                                AdmissionRequirements,
                                Formula
                            ]
                        }
                    ]
                },
                {
                    name: 'bonusInfo',
                    type: 'richText',
                    label: {
                        en: 'Bonus info (goes at the bottom of the page)',
                        bg: 'Допълнителна информация (отива най-отдолу в страницата)'
                    },
                    admin: {
                        upload: richTextUploadMetadata
                    }
                },
            ]
        }
    ]
}

export default Admission;

import {GlobalConfig} from 'payload/types';
import richTextUploadMetadata from "../lib/richTextUploadMetadata";
import updateLastMod from "../lib/updateLastMod";
import blocks from "../blocks/blocks";
import {isAdminOrEditor} from "../lib/access/isAdminOrEditor";

// The definitions for the admin field on richText don't properly include the upload field, causing errors
//@ts-ignore
export const Admission: GlobalConfig = {
    slug: 'admission',
    label: {
        en: 'Admission', bg: 'Прием'
    },
    admin: {
        group: 'Прием',
        hidden: ({user}) => !isAdminOrEditor({req: { user }})
    },
    access: {
        read: () => true,
        update: isAdminOrEditor,
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
                            blocks: blocks
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

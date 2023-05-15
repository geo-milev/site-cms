import {GlobalConfig} from 'payload/types';

export const AboutUs: GlobalConfig = {
    slug: 'about-us',
    label: {
        en: 'About Us', bg: 'За нас'
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'aboutUs',
            type: 'group',
            label: {
                en: 'About Us', bg: 'За нас'
            },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    defaultValue: 'За нас',
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
                    }
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: { en: 'Image', bg: 'Снимка' },
                },
            ]
        },
        {
            name: 'history',
            type: 'group',
            label: {
                en: 'History', bg: 'История'
            },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    defaultValue: 'История',
                    required: true,
                    label: {
                        en: 'Header', bg: 'Заглавие'
                    }
                },
                {
                    name: 'events',
                    type: 'array',
                    required: true,
                    minRows: 1,
                    label: { en: 'Events', bg: 'Събития' },
                    labels: {
                        singular: { en: 'Event', bg: 'Събитие' },
                        plural: { en: 'Events', bg: 'Събития' }
                    },
                    fields: [
                        {
                            name: 'year',
                            type: 'number',
                            required: true,
                            label: {
                                en: 'Year', bg: 'Година'
                            }
                        },
                        {
                            name: 'title',
                            type: 'text',
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
                            }
                        },
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            label: { en: 'Image', bg: 'Снимка' },
                        },
                    ]
                }
            ]
        }
    ]
}

export default AboutUs;

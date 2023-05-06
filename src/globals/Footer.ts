import {GlobalConfig} from 'payload/types';

export const Footer: GlobalConfig = {
    slug: 'footer',
    label: {
        en: 'Footer', bg: 'Долен колонтитул'
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'address',
            type: 'text',
            defaultValue: 'Августа Траяна 42, Стара Загора, 6000',
            required: true,
            label: {
                en: 'Address', bg: 'Адрес'
            }
        },
        {
            name: 'contacts',
            type: 'group',
            required: true,
            label: {
                en: 'Contacts', bg: 'Контакти'
            },
            fields: [
                {
                    name: 'email',
                    type: 'email',
                    required: true,
                    label: {
                        en: 'Email', bg: 'Имейл'
                    },
                },
                {
                    name: 'phone',
                    type: 'text',
                    required: true,
                    label: {
                        en: 'Phone', bg: 'Телефон'
                    },
                }
            ]
        },
    ]
}

export default Footer;
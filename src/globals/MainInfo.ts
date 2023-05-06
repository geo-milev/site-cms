import {GlobalConfig} from 'payload/types';

export const MainInfo: GlobalConfig = {
    slug: 'main-info',
    label: {
        en: 'Main info', bg: 'Главна информация'
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            defaultValue: 'Профилирана природоматематическа гимназия “Гео Милев”',
            required: true,
            label: {
                en: 'School name', bg: 'Име на училището'
            }
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: {
                en: 'School logo', bg: 'Лого на училището'
            },
        },
    ]
}

export default MainInfo;
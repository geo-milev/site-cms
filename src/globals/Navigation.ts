import {GlobalConfig} from 'payload/types';
import {mainPage} from "../lib/groups";
import {isAdmin} from "../lib/access/isAdmin";

export const Navigation: GlobalConfig = {
    slug: 'navigation',
    label: {
        en: 'Navigation', bg: 'Навигация'
    },
    admin: {
        group: mainPage,
        description: { en: 'A section with subsections cannot have a link', bg: 'Секция с подсекции не може да има връзка' },
        hidden: ({user}) => !isAdmin({req: { user }})
    },
    access: {
        read: () => true,
        update: isAdmin,
    },
    fields: [
        {
            name: 'sections',
            type: 'array',
            label: { en: 'Navigation sections', bg: 'Секции на навигацията' },
            labels: {
                singular: { en: 'Section', bg: 'Секция' },
                plural: { en: 'Navigation sections', bg: 'Секции на навигацията' }
            },
            fields: [
                {
                    name: 'key',
                    type: 'text',
                    required: true,
                    label: { en: 'Name', bg: 'Име' },
                },
                {
                    name: 'href',
                    type: 'text',
                    label: { en: 'Link', bg: 'Връзка' },
                    admin: {
                        condition: (_, siblingData) => {
                            return !siblingData.subsections;
                        }
                    }
                },
                {
                    name: 'subsections',
                    type: 'array',
                    label: { en: 'Navigation tabs', bg: 'Навигациионни раздели' },
                    labels: {
                        singular: { en: 'Tab', bg: 'Раздел' },
                        plural: { en: 'Navigation tabs', bg: 'Навигациионни раздели' }
                    },
                    fields: [
                        {
                            name: 'key',
                            type: 'text',
                            required: true,
                            minLength: 1,
                            label: { en: 'Name', bg: 'Име' },
                        },
                        {
                            name: 'href',
                            type: 'text',
                            required: true,
                            minLength: 1,
                            label: { en: 'Link', bg: 'Връзка' },
                        }
                    ]
                }
            ]
        },
    ]
}

export default Navigation;

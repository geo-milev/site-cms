import {GlobalConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

export const Budgets: GlobalConfig = {
    slug: 'budgets',
    label: {
        en: 'Budgets', bg: 'Бюджети'
    },
    admin: {
        group: 'Бюджети'
    },
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [updateLastMod("/organisation/budget")]
    },
    fields: [
        {
            name: 'years',
            type: 'array',
            label: { en: 'Years', bg: 'Години' },
            labels: {
                singular: { en: 'Year', bg: 'Година' },
                plural: { en: 'Years', bg: 'Години' }
            },
            validate: (data, {siblingData, operation}) => {
                if (operation == 'update' && siblingData.years) {
                    const years = siblingData.years.map(val => val.year)
                    const hasDuplicates = years.filter((item, index) => years.indexOf(item) !== index).length > 0
                    if (!hasDuplicates) {
                        return true
                    }
                    return 'Трябва всеки елемент да има уникална година'
                }
            },
            fields: [
                {
                    name: 'year',
                    type: 'number',
                    required: true,
                    label: { en: 'Year (should be unique)', bg: 'Година (очаква се да бъде уникална)' },
                },
                {
                    name: 'budgets',
                    type: 'array',
                    label: { en: 'Budgets', bg: 'Бюджети' },
                    labels: {
                        singular: { en: 'Budget', bg: 'Бюджет' },
                        plural: { en: 'Budgets', bg: 'Бюджети' }
                    },

                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            required: true,
                            label: { en: 'Name', bg: 'Име' }
                        },
                        {
                            name: 'isYearly',
                            type: 'checkbox',
                            label: {en: 'Yearly', bg: 'Годишен'},
                            defaultValue: false,
                        },
                        {
                            name: 'yearly',
                            type: 'upload',
                            relationTo: 'media',
                            label: { en: 'Yearly budget', bg: 'Годишен бюджет' },
                            admin: {
                                condition: (_, siblingData) => {
                                    return !!siblingData.isYearly;
                                }
                            }
                        },
                        {
                            name: 'yearlyQuarters',
                            type: 'group',
                            label: { en: 'Yearly quarters', bg: 'Тримесечия' },
                            fields: [
                                {
                                    name: 'first',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: { en: 'First quarter', bg: 'Първо тримесечие' }
                                },
                                {
                                    name: 'second',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: { en: 'Second quarter', bg: 'Второ тримесечие' }
                                },
                                {
                                    name: 'third',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: { en: 'Third quarter', bg: 'Трето тримесечие' }
                                },
                                {
                                    name: 'fourth',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: { en: 'Fourth quarter', bg: 'Четвърто тримесечие' }
                                },
                            ],
                            admin: {
                                condition: (_, siblingData) => {
                                    return !siblingData.isYearly;
                                }
                            }
                        },
                    ]
                }
            ]
        }
    ]
}

export default Budgets;

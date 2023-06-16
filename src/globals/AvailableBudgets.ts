import {GlobalConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

export const AvailableBudgets: GlobalConfig = {
    slug: 'available-budgets',
    label: {
        en: 'Available budgets', bg: 'Налични бюджети'
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
                            name: 'budget',
                            type: 'relationship',
                            relationTo: 'budget',
                            required: true,
                            label: { en: 'Budget', bg: 'Бюджет' }
                        },
                    ]
                }
            ]
        }
    ]
}

export default AvailableBudgets;

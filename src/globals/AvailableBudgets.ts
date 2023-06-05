import {GlobalConfig} from 'payload/types';

export const AvailableBudgets: GlobalConfig = {
    slug: 'available-budgets',
    label: {
        en: 'Available budgets', bg: 'Налични бюджети'
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'years',
            type: 'array',
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

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
            label: { en: 'Years', bg: 'Години' },
            validate: (data, {siblingData}) => {
                const length = siblingData.years.map(val => val.year).filter((e, i, a) => a.indexOf(e) !== i).length
                if (length == 0) {
                    return true
                }
                return 'Трябва всеки елемент да има уникална година'
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
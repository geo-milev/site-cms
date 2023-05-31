import {Block} from "payload/types";

const Formula: Block = {
    slug: 'formula',
    labels: {
        singular: {en: 'Formula', bg: 'Формука'},
        plural: {en: 'Formulas', bg: 'Формули'}
    },
    fields: [
        {
            name: 'formula',
            type: 'text',
            label: { en: 'Formula (uses the variables below). Documentation at https://github.com/silentmatt/expr-eval',
                bg: 'Формула (използва променливите отдолу). Документация на https://github.com/silentmatt/expr-eval' },
            required: true
        },
        {
            name: 'variables',
            type: 'array',
            labels: {
                singular: {en: 'Variable', bg: 'Променлива'},
                plural: {en: 'Variables', bg: 'Променливи'}
            },
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    label: { en: 'Variable name', bg: 'Име на променливата' },
                    required: true
                },
                {
                    name: 'min',
                    type: 'number',
                    label: { en: 'Minimum', bg: 'Минимум' },
                    defaultValue: 0,
                    required: true
                },
                {
                    name: 'max',
                    type: 'number',
                    label: { en: 'Maximum', bg: 'Максимум' },
                    defaultValue: 100,
                    required: true
                },
                {
                    name: 'variable',
                    type: 'text',
                    label: { en: 'Variable (x, y, z)', bg: 'Променлива (x, y, z)' },
                    required: true
                },
            ]
        }
    ]
};

export default Formula;

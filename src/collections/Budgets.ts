import {CollectionConfig} from 'payload/types';

const Budgets: CollectionConfig = {
    slug: 'budget',
    labels: {
        singular: {
            en: 'Budget', bg: 'Бюджет'
        },
        plural: {
            en: 'Budgets', bg: 'Бюджети'
        }
    },
    admin: {
        useAsTitle: 'name'
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: { en: 'Name', bg: 'Име' }
        },
        {
            name: 'year',
            type: 'number',
            required: true,
            label: { en: 'Year', bg: 'Година' },
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
                condition: (data) => {
                    return !!data.isYearly;
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
              condition: (data) => {
                  return !data.isYearly;
              }
          }
        },
    ],
}

export default Budgets;

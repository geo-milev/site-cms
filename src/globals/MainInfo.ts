import {GlobalConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

const icoMimeTypes: any = [
    {
        mimeType: {
            equals: 'image/x-icon'
        }
    },
    {
        mimeType: {
            equals: 'image/vnd.microsoft.icon'
        }
    },
]

export const MainInfo: GlobalConfig = {
    slug: 'main-info',
    label: {
        en: 'Main info', bg: 'Главна информация'
    },
    admin: {
        group: 'Главна информация'
    },
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [updateLastMod("/")]
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
        {
            name: 'seoAutofillImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
            filterOptions: {
                mimeType: { not_equals: 'image/svg+xml' }
            },
            label: {
                en: 'SEO (raster type - no .svg) autofill image (for example, news articles without an image)',
                bg: 'Снимка (растерен формат - без .svg) за автоматично попълване на празни места (напр. при статии без снимка)'
            },
        },
        {
            name: 'favicon',
            type: 'upload',
            relationTo: 'media',
            required: true,
            filterOptions: {
                or: icoMimeTypes
            },
            label: {
                en: 'Favicon (.ico file)', bg: 'Икона (.ico файл)'
            },
        },
        {
          name: 'favicons',
          type: 'array',
          label: {
            en: 'Favicons (.png) (recommended 16x16 and 32x32)', bg: 'Икони (.png) (очаква се да има 16x16 и 32x32 големини)'
          },
          defaultValue: [
              {
                  size: '16x16'
              },
              {
                  size: '32x32'
              }
          ],
          fields: [
              {
                  name: 'size',
                  type: 'text',
                  required: true,
                  label: {
                      en: 'Size', bg: 'Големина'
                  },
                  validate: (data, {}) => {
                      if (data.match(/\d+x\d+/)) return true
                      else return 'Големината трябва да е във формат <число><x><число>'
                  }
              },
              {
                  name: 'favicon',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  filterOptions: {
                      mimeType: { equals: 'image/png'  }
                  },
                  label: {
                      en: 'Favicon (.png file)', bg: 'Икона (.png файл)'
                  },
              }
          ]
        }
    ]
}

export default MainInfo;

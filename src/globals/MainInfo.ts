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
        {
          name: 'favicons',
          type: 'array',
          label: {
            en: 'Favicons (recommended 16x16 and 32x32)', bg: 'Икони (очаква се да има 16x16 и 32x32 големини)'
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
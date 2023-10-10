import {GlobalConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";
import onlyIco from "../lib/filters/onlyIco";
import onlyPng from "../lib/filters/onlyPng";
import nonSvgImage from "../lib/filters/nonSvgImage";

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
            filterOptions: nonSvgImage,
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
            filterOptions: onlyIco,
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
                  filterOptions: onlyPng,
                  label: {
                      en: 'Favicon (.png file)', bg: 'Икона (.png файл)'
                  },
              }
          ]
        }
    ]
}

export default MainInfo;

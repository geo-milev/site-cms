import {GlobalConfig} from 'payload/types';
import {validateDates} from "../lib/validateHourRange";

const dateError = 'Не може началото на работните часове да е след края.'

// @ts-ignore is needed because the generic Field type doesn't recognise the custom date admin properties like 'pickerAppearance'
//@ts-ignore
export const Contact: GlobalConfig = {
    slug: 'contact',
    label: {
        en: 'Contacts', bg: 'Контакти'
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'locationInfo',
            type: 'group',
            label: {
                en: 'Location info', bg: 'Информация за локация'
            },
            fields: [
                {
                    name: 'address',
                    type: 'text',
                    defaultValue: 'Августа Траяна 42, Стара Загора, 6000',
                    required: true,
                    label: {
                        en: 'Address', bg: 'Адрес'
                    }
                },
                {
                    name: 'locationLink',
                    type: 'text',
                    required: true,
                    label: {
                        en: 'Google maps location embed link', bg: 'Връзка за вграждане на Google Карти'
                    }
                }
            ]
        },
        {
            name: 'workingHours',
            type: 'group',
            label: {
                en: 'Working hours', bg: 'Работно време'
            },
            fields: [
                {
                    name: 'workingHoursStart',
                    type: 'date',
                    required: true,
                    label: {
                        en: 'Start of working hours', bg: 'Начало на работните часове'
                    },
                    admin: {
                        date: {
                            pickerAppearance: 'timeOnly',
                            timeFormat: 'HH:mm',
                            displayFormat: 'HH:mm'
                        }
                    },
                    validate: (data, { siblingData }) => {
                        return validateDates(siblingData,
                            'workingHoursStart',
                            'workingHoursEnd',
                            dateError)
                    }
                },
                {
                    name: 'workingHoursEnd',
                    type: 'date',
                    required: true,
                    label: {
                        en: 'End of working hours', bg: 'Край на работните часове'
                    },
                    admin: {
                        date: {
                            pickerAppearance: 'timeOnly',
                            timeFormat: 'HH:mm',
                            displayFormat: 'HH:mm'
                        }
                    },
                    validate: (data, { siblingData }) => {
                        return validateDates(siblingData,
                            'workingHoursStart',
                            'workingHoursEnd',
                            dateError)
                    }
                },
            ]
        },
        {
          name: "emails",
          type: "group",
          label: {
            en: 'Emails', bg: 'Имейли'
          },
          fields: [
              {
                  name: 'mainEmail',
                  type: 'email',
                  required: true,
                  label: {
                      en: 'Main email', bg: 'Главен имейл'
                  },
              },
              {
                  name: 'secondaryEmail',
                  type: 'email',
                  label: {
                      en: 'Secondary email', bg: 'Вторичен имейл'
                  },
              },
          ]
        },
        {
            name: "phones",
            type: "group",
            label: {
                en: 'Phones', bg: 'Телефони'
            },
            fields: [
                {
                    name: 'principalPhone',
                    type: 'text',
                    required: true,
                    label: {
                        en: 'Principal phone', bg: 'Телефон на директора'
                    },
                },
                {
                    name: 'assistantPrincipalPhone',
                    type: 'text',
                    required: true,
                    label: {
                        en: 'Assistant principal phone', bg: 'Телефон на заместник-директора'
                    },
                }
            ]
        }
    ]
}

export default Contact;

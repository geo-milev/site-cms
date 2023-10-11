import {GlobalConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";
import onlyCsv from "../lib/filters/onlyCsv";
import {autofillBooks} from "../lib/autofillBooks";

export const BooksInfo: GlobalConfig = {
    slug: 'books-info',
    label: {
        en: 'Books info', bg: 'Информация за учебниците'
    },
    admin: {
        group: 'Учебници'
    },
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [updateLastMod("/student/books")],
        beforeValidate: [autofillBooks]
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: { en: 'General info', bg: 'Обща информация' },
                    fields: [
                        {
                            name: 'year',
                            type: 'text',
                            required: true,
                            label: {
                                en: 'Year of current books', bg: 'Учебна година на учебниците'
                            }
                        },
                        {
                            name: 'file',
                            type: 'upload',
                            relationTo: 'media',
                            label: {
                                en: 'File', bg: 'Файл с учебниците за изтегляне от сайта'
                            }
                        },
                        {
                            name: 'classes',
                            type: 'array',
                            label: { en: 'Classes', bg: 'Класове' },
                            labels: {
                                singular: { en: 'Class', bg: 'Клас' },
                                plural: { en: 'Classes', bg: 'Класове' }
                            },
                            fields: [
                                {
                                    name: "class",
                                    type: "text",
                                    required: true,
                                    label: { en: 'Class', bg: 'Клас' },
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'booksAutofill',
                    label: { en: 'Autofill', bg: 'Автоматично попълване' },
                    description: { en: 'Executes on save', bg: 'Изпълнява се на запазване' },
                    fields: [
                        {
                            name: 'fileCsv',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            filterOptions: onlyCsv,
                            label: {
                                en: 'File .csv (autofill books)',
                                bg: 'Файл във формат .csv (за автоматично попълване на учебниците)'
                            }
                        },
                        {
                            name: 'checksum',
                            type: 'text',
                            admin: {
                                condition: () => {
                                    return false;
                                }
                            }
                        },
                        {
                            name: 'delimiter',
                            type: 'text',
                            required: true,
                            defaultValue: ';',
                            label: {
                                en: 'CSV delimiter',
                                bg: 'Разделител на CSV стойностите'
                            }
                        },
                        {
                            name: 'authorDelimiter',
                            type: 'text',
                            required: true,
                            defaultValue: ',',
                            label: {
                                en: 'Author delimiter',
                                bg: 'Разделител на авторите'
                            }
                        },
                        {
                            name: 'columnNames',
                            type: 'group',
                            defaultValue: {
                                name: 'Учебен предмет и вид подготовка',
                                class: 'Клас',
                                authors: 'Автор/и/',
                                year: 'Валидни издания',
                                publisher: 'Издателство',
                                note: 'Бележки'
                            },
                            label: {
                                en: 'Column names',
                                bg: 'Имена на колоните'
                            },
                            fields: [
                                {
                                    name: 'name',
                                    type: 'text',
                                    required: true,
                                    label: {
                                        en: 'Subject and study type column',
                                        bg: 'Колона за учебен предмет и вид подготовка'
                                    }
                                },
                                {
                                    name: 'class',
                                    type: 'text',
                                    required: true,
                                    label: { en: 'Class column', bg: 'Колона за клас'}
                                },
                                {
                                    name: 'authors',
                                    type: 'text',
                                    required: true,
                                    label: { en: 'Authors column', bg: 'Колона за автори' },
                                },
                                {
                                    name: 'year',
                                    type: 'text',
                                    required: true,
                                    label: { en: 'Year column', bg: 'Колона за години'}
                                },
                                {
                                    name: 'publisher',
                                    type: 'text',
                                    required: true,
                                    label: { en: 'Publisher column', bg: 'Колона за издател' }
                                },
                                {
                                    name: 'note',
                                    type: 'text',
                                    required: true,
                                    label: { en: 'Note column', bg: 'Колона за забележка' }
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export default BooksInfo;

import {GlobalConfig} from 'payload/types';
import {getFile} from "../lib/getFile";
import {parseBooks} from "../lib/parseBooks";

export const BooksInfo: GlobalConfig = {
    slug: 'books-info',
    label: {
        en: 'Books info', bg: 'Информация за учебниците'
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeValidate: [async ({req, data}) => {
            const payload = req.payload
            if (!payload.local) {
                const config = data.booksAutofill

                const fileObject = await req.payload.findByID({
                    collection: 'media',
                    id: config.fileCsv
                })

                const csvText = await getFile(fileObject)

                const columnNames = new Map<string, string>()

                console.log(config.columnNames)

                for (const [key, value] of Object.entries(config.columnNames)) {
                    if (typeof value === "string") {
                        columnNames.set(value.trim(), key)
                    }
                }

                const books = await parseBooks(csvText,
                    config.delimiter,
                    config.authorDelimiter,
                    columnNames)

                await payload.delete({
                    collection: "books",
                    where: {}
                })

                for (const book of books) {
                    await payload.create({
                        collection: 'books',
                        data: {
                            class: book.class,
                            name: book.name,
                            authors: (!!book.authors ? book.authors.map((author) => {
                                return { author }
                            }): undefined),
                            year: book.year,
                            publisher: book.publisher,
                            note: book.note
                        }
                    })
                }

                return {
                    ...data,
                    classes: books.map((book) => book.class)
                        .filter((value, index, array) => array.indexOf(value) === index)
                        .map((c) => {
                            return { class: c }
                        })
                }
            }
        }]
    },
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
                en: 'File', bg: 'Файл с учебниците'
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
        },
        {
            name: 'booksAutofill',
            type: 'group',
            label: {
                en: 'Books autofill config (executes on save)',
                bg: 'Конфигурация за автоматично попълване на учебниците (изпълнява се на запазване)'
            },
            fields: [
                {
                    name: 'fileCsv',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: {
                        en: 'File .csv (autofill books)',
                        bg: 'Файл във формат .csv (за автоматично попълване на учебниците)'
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

export default BooksInfo;

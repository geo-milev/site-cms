import {getFile} from "./getFile";
import {parseBooks} from "./parseBooks";
import {checksum} from "./checksum";

const autofillBooks = async ({req, data}) => {
    const payload = req.payload
    if (!payload.local) {
        const config = data.booksAutofill

        const fileObject = await req.payload.findByID({
            collection: 'media',
            id: config.fileCsv
        })

        const csvText = await getFile(fileObject)

        let newChecksum = checksum(csvText)

        if (!config.checksum) {
            data.booksAutofill.checksum = newChecksum
        } else {
            if (config.checksum === newChecksum) {
                return data;
            } else {
                data.booksAutofill.checksum = newChecksum;
            }
        }

        const columnNames = new Map<string, string>()

        for (const [key, value] of Object.entries(config.columnNames)) {
            if (typeof value === 'string') {
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
}

export { autofillBooks }

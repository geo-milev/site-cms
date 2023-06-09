const parseBooks = async (csvText: string,
                          delimiter: string,
                          authorDelimiter: string,
                          columnNames: Map<string, string>) => {
    const parse = require('csv-parse/sync').parse

    const records = parse(csvText, {
        columns: true,
        skip_empty_lines: true,
        delimiter: delimiter
    });

    const books: Book[] = []

    for (let i = 0; i < records.length; i++) {
        let book = new Book()
        for (const [key, value] of Object.entries(records[i])) {
            const column = columnNames.get(key.trim());
            if (typeof value != 'string') return
            let val = value.trim()
            switch (column) {
                case 'name':
                case 'year':
                case 'publisher':
                case 'class':
                case 'note':
                    if (val === '')
                        book[column] = undefined
                    else
                        book[column] = val
                    break;
                case "authors":
                    if (val === '')
                        book[column] = undefined
                    else
                        book[column] = val.split(authorDelimiter).map((e) => e.trim())
                    break;
            }
        }

        books.push(book)
    }

    return books
}

class Book {
    name: string
    authors?: string[]
    year?: string
    publisher?: string
    class: string
    note?: string
}

export { parseBooks }

import {Block} from "payload/types";

const Table: Block = {
    slug: 'table',
    labels: {
        singular: {en: 'Table', bg: 'Таблица'},
        plural: {en: 'Tables', bg: 'Таблици'}
    },
    graphQL: {
        singularName: 'Table'
    },
    fields: [
        {
            name: 'head',
            type: 'array',
            label: {en: 'Column headers', bg: 'Заглавия на колони'},
            labels: {
                singular: {en: 'Column header', bg: 'Заглавие на колона'},
                plural: {en: 'Column headers', bg: 'Заглавия на колони'}
            },
            required: true,
            fields: [
                {
                    name: 'header',
                    type: 'text',
                    label: {en: 'Header', bg: 'Заглавие'},
                    required: true,
                }
            ]
        },
        {
            name: 'body',
            type: 'array',
            label: {en: 'Rows', bg: 'Редове'},
            labels: {
                singular: {en: 'Row', bg: 'Ред'},
                plural: {en: 'Rows', bg: 'Редове'}
            },
            required: true,
            fields: [
                {
                    name: 'cells',
                    type: 'array',
                    label: {en: 'Cells', bg: 'Клетки'},
                    labels: {
                        singular: {en: 'Cell', bg: 'Клетка'},
                        plural: {en: 'Cells', bg: 'Клетки'}
                    },
                    required: true,
                    fields: [
                        {
                            name: 'cell',
                            type: 'text',
                            label: {en: 'Text', bg: 'Текст'},
                            required: true,
                        }
                    ]
                }
            ]
        },
    ]
};

export default Table;

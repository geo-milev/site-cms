import {Block} from "payload/types";

const FileViewer: Block = {
    slug: 'file-viewer',
    labels: {
        singular: {en: 'File Viewer', bg: 'Списък файлове'},
        plural: {en: 'File Viewers', bg: 'Списъци файлове'}
    },
    graphQL: {
        singularName: 'DocumentViewer'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: {en: 'Title', bg: 'Заглавие'},
            required: true,
        },
        {
            name: 'hasSearch',
            type: 'checkbox',
            label: {
                en: 'Has search', bg: 'Има търсене'
            },
            defaultValue: true,
        },
        {
            name: 'autoSelect',
            type: 'checkbox',
            label: {
                en: 'Auto select first element', bg: 'Автоматично избиране на първия елемент'
            },
            defaultValue: false,
        },
        {
            name: 'sort',
            type: 'select',
            label: {en: 'Sort', bg: 'Ред на сортиране'},
            options: [
                {
                    label: { en: 'Alphabetical', bg: 'Азбучен А-Я' },
                    value: 'alphabetical',
                },
                {
                    label: { en: 'Reverse alphabetical', bg: 'Азбучен Я-А' },
                    value: 'reverseAlphabetical',
                },
                {
                    label: { en: 'Default', bg: 'По подразбиране' },
                    value: 'default',
                },
                {
                    label: { en: 'Random', bg: 'Случаен' },
                    value: 'random',
                }
            ],
            required: true
        },
        {
            name: 'files',
            type: 'array',
            label: {en: 'Files', bg: 'Файлове'},
            labels: {
                singular: {en: 'File', bg: 'Файл'},
                plural: {en: 'Files', bg: 'Файлове'}
            },
            required: true,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    label: { en: 'Name', bg: 'Име'},
                    required: true,
                },
                {
                    name: 'file',
                    type: 'upload',
                    label: { en: 'File', bg: 'Файл'},
                    relationTo: 'media',
                    required: true
                }
            ]
        },
    ]
};

export default FileViewer;

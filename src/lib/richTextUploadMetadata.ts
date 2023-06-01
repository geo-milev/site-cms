// FIXME
const richTextUploadMetadata: any = {
    collections: {
        media: {
            fields: [
                {
                    name: 'isNonImage',
                    type: 'checkbox',
                    label: {en: 'Is not an image', bg: 'Не е картина'},
                    defaultValue: false,
                },
                {
                    name: 'buttonText',
                    type: 'text',
                    label: {en: 'Download button text', bg: 'Текст на бутона за изтегляне'},
                    admin: {
                        condition: (data) => {
                            return !!data.isNonImage;
                        }
                    }
                }
            ]
        }
    }
}

export default richTextUploadMetadata;

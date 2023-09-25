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
                },
                {
                    name: 'maxImageSize',
                    type: 'group',
                    label: {en: 'Max image size', bg: 'Максимална големина на картината'},
                    admin: {
                        condition: (data) => {
                            return !data.isNonImage;
                        }
                    },
                    fields: [
                        {
                            name: 'maxWidth',
                            type: 'number',
                            label: {en: 'Max image width', bg: 'Максимална широчина на картината'}
                        },
                        {
                            name: 'maxHeight',
                            type: 'number',
                            label: {en: 'Max image height', bg: 'Максимална височина на картината'}
                        }
                    ]
                },
            ]
        }
    }
}

export default richTextUploadMetadata;

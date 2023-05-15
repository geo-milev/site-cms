export const formData = {
    title: 'Свържи се с нас',
    fields: [
        {
            name: 'yourName',
            label: 'Име',
            required: true,
            blockName: 'Вашето име',
            blockType: 'text',
        },
        {
            name: 'email',
            label: 'Имейл',
            required: true,
            blockName: 'Имейл',
            blockType: 'email',
        },
        {
            name: 'topic',
            label: 'Тема',
            required: true,
            blockName: 'Тема',
            blockType: 'text',
        },
        {
            name: 'message',
            label: 'Съобщение',
            required: true,
            blockName: 'Вашето съобщение',
            blockType: 'textarea',
        },
    ],
    submitButtonLabel: 'Изпрати',
    confirmationType: 'message',
    confirmationMessage: [
        {
            type: 'p',
            children: [
                {
                    text: 'Формулярът беше успешно изпратен!',
                },
            ],
        },
    ],
}
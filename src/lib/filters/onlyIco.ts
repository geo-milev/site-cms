const onlyIco: any = {
    or: [
        {
            mimeType: {
                equals: 'image/x-icon'
            }
        },
        {
            mimeType: {
                equals: 'image/vnd.microsoft.icon'
            }
        },
    ]
}

export default onlyIco;

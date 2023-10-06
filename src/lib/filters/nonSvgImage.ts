const nonSvgImage: any = {
    and: [
        {
            mimeType: {
                not_equals: 'image/svg+xml'
            }
        },
        {
            mimeType: {
                contains: 'image/'
            }
        },
    ]
}

export default nonSvgImage;

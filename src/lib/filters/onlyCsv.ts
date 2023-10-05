const onlyCsv: any = {
    or: [
        {
            mimeType: {
                equals: 'text/csv'
            }
        },
        {
            mimeType: {
                equals: 'application/vnd.ms-excel'
            }
        }
    ]
}

export default onlyCsv;

const getFile = async (fileObject) => {
    const buffer = await (await fetch(`http://127.0.0.1:${process.env.PORT}${fileObject.url}`)).arrayBuffer();
    const decoder = new TextDecoder()
    return decoder.decode(buffer)
}

export { getFile }

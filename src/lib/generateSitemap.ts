import {Payload} from "payload";

const toLastModString = (date) => {
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return year + '-' + month + '-' + day;
}

const collectionToPartialSitemap = async (collection: string,
                                          payload: Payload,
                                          extractDocumentData: (doc: any) => {relativeUrl: string, lastMod: Date}) => {
    let partialSitemap = ``

    let entries = await payload.find({
        collection: collection,
        page: 1,
        limit: 50
    });

    do {
        entries.docs.forEach((doc) => {
            const documentData = extractDocumentData(doc)
            partialSitemap += `
<url>
    <loc>${process.env.FRONTEND_URL}${documentData.relativeUrl}</loc>
    <lastmod>${toLastModString(documentData.lastMod)}</lastmod>
</url>
`
        })

        entries = await payload.find({
            collection: collection,
            page: entries.page + 1,
            limit: 50
        });
    } while (entries.hasNextPage)

    return partialSitemap
}

const generateSitemap = async (payload: Payload) => {
    const pages = await collectionToPartialSitemap('pages-seo-data', payload, (doc) => {
        return {
            relativeUrl: doc.relativeUrl,
            lastMod: new Date(doc.lastUpdate)
        }
    })

    return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages}
</urlset>`
}

export default generateSitemap;

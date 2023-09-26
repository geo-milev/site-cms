import {CollectionAfterChangeHook} from "payload/types";

export interface SeoInfoDocument {
    title: string,
    description: string,
    image: any
}

export default function createSeoEntry(relativeUrl: string, filler: (doc) => SeoInfoDocument) {
    const afterChangeHook: CollectionAfterChangeHook = async ({doc, req}) => {
        const url = relativeUrl + "/" + doc.id;
        const entry = await req.payload.find({
            collection: 'pages-seo-data',
            limit: 1,
            where: {
                relativeUrl: {
                    equals: url
                }
            }
        })

        const filledData = filler(doc)

        if (filledData.image == null) {
            const mainInfo = await req.payload.findGlobal({
                slug: 'main-info'
            })

            filledData.image = mainInfo.logo.id
        }

        const data = {
            ...filledData,
            relativeUrl: url,
            lastUpdate: new Date().toString()
        }

        if (entry.docs[0]) {
            const document = entry.docs[0]
            await req.payload.update({
                collection: 'pages-seo-data',
                id: document.id,
                data: data
            })
        } else {
            await req.payload.create({
                collection: 'pages-seo-data',
                data: data
            })
        }

        return doc;
    }

    return afterChangeHook
}

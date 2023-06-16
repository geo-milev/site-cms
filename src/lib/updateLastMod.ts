import {CollectionAfterChangeHook} from "payload/types";

export default function updateLastMod(relativeUrl: string) {
    const afterChangeHook: CollectionAfterChangeHook = async ({doc, req}) => {
        const entry = await req.payload.find({
            collection: 'pages-seo-data',
            limit: 1,
            where: {
                relativeUrl: {
                    equals: relativeUrl
                }
            }
        })

        if (entry.docs[0]) {
            const document = entry.docs[0]
            await req.payload.update({
                collection: 'pages-seo-data',
                id: document.id,
                data: {
                    lastUpdate: new Date().toString()
                },
            })
        }

        return doc;
    }

    return afterChangeHook
}

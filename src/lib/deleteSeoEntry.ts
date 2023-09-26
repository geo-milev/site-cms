import {CollectionAfterDeleteHook} from "payload/types";

export default function deleteSeoEntry(relativeUrl: string) {
    const afterDeleteHook: CollectionAfterDeleteHook = async ({doc, req}) => {
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

        if (entry.docs[0]) {
            const document = entry.docs[0]
            await req.payload.delete({
                collection: 'pages-seo-data',
                id: document.id
            })
        }

        return doc;
    }

    return afterDeleteHook
}

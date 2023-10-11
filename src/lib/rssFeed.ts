import {Payload} from "payload";

const generateRssFeed = async (payload: Payload) => {
    const mainInfo = await payload.findGlobal({
        slug: 'main-info'
    })

    let news = ``

    let entries = await payload.find({
        collection: 'news',
        page: 1,
        limit: 15
    });

    entries.docs.forEach((doc) => {
        news += `
        <item>
            <title><![CDATA[${doc.title}]]></title>
            <link>${process.env.FRONTEND_URL}/news/${doc.id}</link>
            <description><![CDATA[${doc.description ? doc.description: ''}]]></description>
            <pubDate>${new Date(doc.publishDate).toUTCString()}</pubDate>
            <category><![CDATA[${doc.category.name}]]></category>
            <guid>${process.env.FRONTEND_URL}/news/${doc.id}</guid>
        </item> 
`
    })

    return `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
      <title><![CDATA[${mainInfo.name}]]></title>
      <link>${process.env.FRONTEND_URL}</link>
      <description><![CDATA[Получавайте най-новите новини за ${mainInfo.name}]]></description>
      <copyright>
        <![CDATA[© 2023-${new Date().getFullYear()} ${mainInfo.name}. Всички права запазени.]]>
      </copyright>
      <sy:updatePeriod>hourly</sy:updatePeriod>
      <sy:updateFrequency>1</sy:updateFrequency>
      <atom:link href="${process.env.FRONTEND_URL}/news/feed" rel="self" type="application/rss+xml" />
      <language>bg-BG</language>
      ${news}
  </channel>
</rss>`
}


const updateRssFeed = async (payload: Payload) => {
    const feed = await generateRssFeed(payload)
    await payload.updateGlobal({
        slug: "generated-files",
        data: {
            rss: feed
        }
    });
    return feed;
}

const getRssFeed = async (payload: Payload) => {
    let feed;
    const generatedFiles = await payload.findGlobal({
        slug: 'generated-files'
    })

    if (generatedFiles.rss) {
        feed = generatedFiles.rss
    } else {
        feed = updateRssFeed(payload)
    }

    return feed
}

export { generateRssFeed, getRssFeed, updateRssFeed };

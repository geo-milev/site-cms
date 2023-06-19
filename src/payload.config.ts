import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import News from "./collections/News";
import Media from "./collections/Media";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { gcsAdapter } from "@payloadcms/plugin-cloud-storage/gcs";
import formBuilder from "@payloadcms/plugin-form-builder";
import NewsCategory from "./collections/NewsCategory";
import MainInfo from "./globals/MainInfo";
import Slideshow from "./globals/Slideshow";
import VideoSection from "./globals/VideoSection";
import WhatIsStudied from "./globals/WhatIsStudied";
import Contact from "./globals/Contact";
import Schedules from "./globals/Schedules";
import Subjects from "./collections/Subjects";
import AboutUs from "./globals/AboutUs";
import Teachers from "./collections/Teachers";
import WeeklySchedules from "./collections/WeeklySchedules";
import Books from "./collections/Books";
import ScheduleEntries from "./collections/ScheduleEntries";
import Documents from "./collections/Documents";
import AdministrativeServicesInfo from "./collections/AdministrativeServicesInfo";
import FormFiles from "./collections/FormFiles";
import Newspapers from "./collections/Newspapers";
import Budgets from "./collections/Budgets";
import AvailableBudgets from "./globals/AvailableBudgets";
import Projects from "./collections/Projects";
import BooksInfo from "./globals/BooksInfo";
import {Logo} from "./components/logo/Logo";
import {Icon} from "./components/icon/Icon";
import Admission from "./globals/Admission";
import PagesSeoData from "./collections/PagesSeoData";
import {Payload} from "payload";

const adapter = gcsAdapter({
  options: {
    projectId: process.env.GCS_PROJECT_ID,
  },
  bucket: process.env.GCS_BUCKET,
})

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

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- ППМГ "Гео Милев"',
      favicon: '/assets/favicon.png',
      ogImage: '/assets/logo.svg',
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },
  collections: [
    Users,
    News,
    NewsCategory,
    Media,
    Subjects,
    Teachers,
    WeeklySchedules,
    Books,
    ScheduleEntries,
    Documents,
    AdministrativeServicesInfo,
    FormFiles,
    Exercises,
    Newspapers,
    Budgets,
    Projects,
    PagesSeoData,
  ],
  globals: [
    MainInfo, Slideshow, VideoSection, WhatIsStudied, Contact, Schedules, AboutUs, AvailableBudgets, BooksInfo, Admission
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [String(process.env.FRONTEND_URL)],
  plugins: [
    // Only use cloud storage in prod
    process.env.NODE_ENV == 'production' ? cloudStorage({
      collections: {
        'media': {
          adapter,
          disableLocalStorage: true
        },
      },
    }) : null,
    formBuilder({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: false,
        country: false,
        checkbox: true,
        number: true,
        message: true,
        payment: false
      },
      formOverrides: {
        slug: 'forms',
        labels: {
          singular: {
            en: 'Form', bg: 'Формуляр'
          },
          plural: {
            en: 'Forms', bg: 'Формуляри'
          }
        }
      }
    })
  ].filter(value => value !== null),
  endpoints: [
    {
      path: '/sitemap.xml',
      method: 'get',
      handler: async (req, res) => {
        const news = await collectionToPartialSitemap('news', req.payload, (doc) => {
          return {
            relativeUrl: `/news/${doc.id}`,
            lastMod: new Date(doc.updatedAt)
          }
        })

        const pages = await collectionToPartialSitemap('pages-seo-data', req.payload, (doc) => {
          return {
            relativeUrl: doc.relativeUrl,
            lastMod: new Date(doc.lastUpdate)
          }
        })

        const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages}
  ${news}
</urlset>`


        res.header('Content-Type', 'application/xml');
        res.status(200).send(sitemap);
      },
    },
    {
      path: '/rss',
      method: 'get',
      handler: async (req, res) => {
        const mainInfo = await req.payload.findGlobal({
          slug: 'main-info'
        })

        let news = ``

        let entries = await req.payload.find({
          collection: 'news',
          page: 1,
          limit: 15
        });

        entries.docs.forEach((doc) => {
          news += `
        <item>
            <title>${doc.title}</title>
            <link>${process.env.FRONTEND_URL}/news/${doc.id}</link>
            <description>${doc.description}</description>
            <pubDate>${new Date(doc.publishDate).toUTCString()}</pubDate>
            <category>${doc.category.name}</category>
            <image>
              <title>${doc.postImage.alt}</title>  
              <url>${process.env.FRONTEND_URL}${doc.postImage.url}</url>
              <link>${process.env.FRONTEND_URL}/news/${doc.id}</link>
            </image>
        </item> 
`
        })

        const rssFeed = `
<?xml version="1.0" ?>
<rss version="2.0">
  <channel>
      <title>${mainInfo.name}</title>
      <link>${process.env.FRONTEND_URL}</link>
      <description>Получавайте най-новите новини за ${mainInfo.name}</description>
      <copyright>
        © 2023-${new Date().getFullYear()} ${mainInfo.name}. Всички права запазени.
      </copyright>
      <sy:updatePeriod>hourly</sy:updatePeriod>
      <sy:updateFrequency>1</sy:updateFrequency>
      <atom:link href="${process.env.FRONTEND_URL}/news/feed" rel="self" type="application/rss+xml" />
      <language>bg-BG</language>
      ${news}
  </channel>
</rss>`

        res.header('Content-Type', 'application/rss+xml');
        res.status(200).send(rssFeed);
      },
    },
  ],
});

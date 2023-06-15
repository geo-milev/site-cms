import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import News from "./collections/News";
import Media from "./collections/Media";
import Publishers from "./collections/Publishers";
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

  return year + "-" + month + "-" + day;
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
    Publishers,
    Books,
    ScheduleEntries,
    Documents,
    AdministrativeServicesInfo,
    FormFiles,
    Newspapers,
    Budgets,
    Projects,
    PagesSeoData
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
      path: "/partial-sitemap",
      method: "get",
      handler: async (req, res) => {
        let partialSitemap = ``

        let news = await req.payload.find({
          collection: "news",
          page: 1,
          limit: 20
        });

        do {
          news.docs.forEach((doc) => {
            partialSitemap += `
<url>
    <loc>${process.env.FRONTEND_URL}/news/${doc.id}</loc>
    <lastmod>${toLastModString(new Date(doc.updatedAt))}</lastmod>
</url>
`
          })

          news = await req.payload.find({
            collection: "news",
            page: news.page + 1,
            limit: 100
          });
        } while (news.hasNextPage)

        res.header('Content-Type', 'text/plain');
        res.status(200).send(partialSitemap);
      },
    },
  ],
});

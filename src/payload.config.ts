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
import WeeklySchedules from "./collections/WeeklySchedules";
import Books from "./collections/Books";
import ScheduleEntries from "./collections/ScheduleEntries";
import Documents from "./collections/Documents";
import AdministrativeServicesInfo from "./collections/AdministrativeServicesInfo";
import FormFiles from "./collections/FormFiles";
import Newspapers from "./collections/Newspapers";
import Budgets from "./globals/Budgets";
import Projects from "./collections/Projects";
import BooksInfo from "./globals/BooksInfo";
import {Logo} from "./components/logo/Logo";
import {Icon} from "./components/icon/Icon";
import Admission from "./globals/Admission";
import PagesSeoData from "./collections/PagesSeoData";
import Exercises from "./collections/Exercises";
import { getSitemap } from "./lib/sitemap";
import { getRssFeed } from "./lib/rssFeed";
import GeneratedFiles from "./globals/GeneratedFiles";
import {isAdmin} from "./lib/access/isAdmin";
import {isAdminOrEditor} from "./lib/access/isAdminOrEditor";
import {administration} from "./lib/groups";

const adapter = gcsAdapter({
  options: {
    projectId: process.env.GCS_PROJECT_ID,
  },
  bucket: process.env.GCS_BUCKET,
})

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- ППМГ "Гео Милев"',
      favicon: '/assets/favicon.png',
      ogImage: '/assets/logo.svg',
    },
    dateFormat: 'dd.MM.yyyy г. HH:mm',
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },
  upload: {
    defCharset: 'utf8',
    defParamCharset: 'utf8',
  },
  collections: [
    Users,
    News,
    NewsCategory,
    Media,
    Subjects,
    WeeklySchedules,
    Books,
    ScheduleEntries,
    Documents,
    AdministrativeServicesInfo,
    FormFiles,
    Exercises,
    Newspapers,
    Projects,
    PagesSeoData,
  ],
  globals: [
    MainInfo, Slideshow, VideoSection, WhatIsStudied, Contact, Schedules, AboutUs, Budgets, BooksInfo, Admission, GeneratedFiles
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
        admin: {
          group: administration,
          hidden: ({user}) => !isAdmin({req: { user }})
        },
        access: {
          update: isAdmin,
          create: isAdmin
        },
        labels: {
          singular: {
            en: 'Form', bg: 'Формуляр'
          },
          plural: {
            en: 'Forms', bg: 'Формуляри'
          }
        }
      },
      formSubmissionOverrides: {
        admin: {
          group: administration,
          defaultColumns: ['id', 'form', 'createdAt'],
          hidden: ({user}) => !isAdminOrEditor({req: { user }})
        },
        labels: {
          singular: {
            en: 'Form submission', bg: 'Подаден формуляр'
          },
          plural: {
            en: 'Form  submissions', bg: 'Подадени формуляри'
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
        res.header('Content-Type', 'application/xml');
        res.status(200).send((await getSitemap(req.payload)));
      },
    },
    {
      path: '/rss',
      method: 'get',
      handler: async (req, res) => {
        res.header('Content-Type', 'application/rss+xml');
        res.status(200).send((await getRssFeed(req.payload)));
      },
    },
  ],
});

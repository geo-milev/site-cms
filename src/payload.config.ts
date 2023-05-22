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
import WeeklySchedule from "./globals/WeeklySchedule";
import Subjects from "./collections/Subjects";
import AboutUs from "./globals/AboutUs";
import Books from "./collections/Books";
import ScheduleEntries from "./collections/ScheduleEntries";

const adapter = gcsAdapter({
  options: {
    projectId: process.env.GCS_PROJECT_ID,
  },
  bucket: process.env.GCS_BUCKET,
})

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    News,
    NewsCategory,
    Media,
    Subjects,
    Publishers,
    Books,
    ScheduleEntries
  ],
  globals: [
    MainInfo, Slideshow, VideoSection, WhatIsStudied, Contact, WeeklySchedule, AboutUs
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [process.env.FRONTEND_URL],
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
});

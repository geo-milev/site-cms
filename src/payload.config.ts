import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import News from "./collections/News";
import Media from "./collections/Media";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { gcsAdapter } from "@payloadcms/plugin-cloud-storage/gcs";
import NewsCategory from "./collections/NewsCategory";
import MainInfo from "./globals/MainInfo";
import Slideshow from "./globals/Slideshow";
import VideoSection from "./globals/VideoSection";

const adapter = gcsAdapter({
  options: {
    apiEndpoint: process.env.GCS_ENDPOINT,
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
    Media
  ],
  globals: [
    MainInfo, Slideshow, VideoSection
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
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
  ].filter(value => value !== null),
});

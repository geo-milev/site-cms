import express from 'express';
import payload from 'payload';
import { config } from 'dotenv';
import { formData } from "./lib/formData.js";
import * as path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});
app.use('/assets', express.static(path.resolve(__dirname, './assets')));

const start = async () => {
  let mongoURL = `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/`;
  if(process.env.MONGO_OPTIONS !== undefined) mongoURL += `?${process.env.MONGO_OPTIONS}`;

  const fillInForms = async () => {
    const formsCollection = await payload.find({
      collection: 'forms',
    })
    if (formsCollection.docs.length !== 0) {
      return
    }
    await payload.create({
      collection: 'forms',
      data: formData
    })
  }

  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: mongoURL,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)

      await fillInForms()
    },
  })

  // Add your own express routes here

  app.listen(process.env.PORT);
}

start();

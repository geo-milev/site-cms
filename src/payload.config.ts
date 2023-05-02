import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import News from "./collections/News";

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    News
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});

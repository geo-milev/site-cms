import path from "path";
import {CollectionConfig} from "payload/types";

export const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        useAsTitle: 'alt'
    },
    upload: {
        staticDir: path.resolve(__dirname, '../../media'),
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        }
    ]
}

export default Media;
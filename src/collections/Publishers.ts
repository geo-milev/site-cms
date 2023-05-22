import {CollectionConfig} from 'payload/types';

const Publishers: CollectionConfig = {
    slug: 'publishers',
    labels: {
        singular: {
            en: 'Publisher', bg: 'Издател'
        },
        plural: {
            en: 'Publishers', bg: 'Издатели'
        }
    },
    admin: {
        useAsTitle: 'name'
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        }
    ],
}

export default Publishers;
import {CollectionConfig} from 'payload/types';

const AdministrativeServicesInfo: CollectionConfig = {
    slug: 'administrative-services-info',
    labels: {
        singular: {
            en: 'Administrative service file', bg: 'Файл за предлагана административна услуга'
        },
        plural: {
            en: 'Administrative services files', bg: 'Файлове за предлаганите административна услуги'
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
        },
        {
            name: 'file',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
    ],
}

export default AdministrativeServicesInfo;
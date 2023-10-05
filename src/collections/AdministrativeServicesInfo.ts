import {CollectionConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

const AdministrativeServicesInfo: CollectionConfig = {
    slug: 'administrative-services-info',
    labels: {
        singular: {
            en: 'Administrative service file', bg: 'Файл за административна услуга'
        },
        plural: {
            en: 'Administrative services files', bg: 'Административни услуги'
        }
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'file', 'updatedAt'],
        listSearchableFields: ['file']
    },
    access: {
        read: () => true
    },
    hooks: {
        afterChange: [updateLastMod("/organisation/administrative-services")]
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: { en: 'Name', bg: 'Име'},
            required: true,
        },
        {
            name: 'file',
            type: 'upload',
            label: { en: 'File', bg: 'Файл'},
            relationTo: 'media',
            required: true
        },
    ],
}

export default AdministrativeServicesInfo;

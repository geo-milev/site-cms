import {CollectionConfig} from 'payload/types';

const Projects: CollectionConfig = {
    slug: 'projects',
    labels: {
        singular: {
            en: 'Project', bg: 'Проект'
        },
        plural: {
            en: 'Projects', bg: 'Проекти'
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
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'article',
            type: 'relationship',
            relationTo: 'news'
        }
    ],
}

export default Projects;
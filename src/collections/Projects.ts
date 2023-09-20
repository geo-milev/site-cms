import {CollectionConfig} from 'payload/types';
import updateLastMod from "../lib/updateLastMod";

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
    hooks: {
        afterChange: [updateLastMod("/projects")]
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: {en: 'Name', bg: 'Име'},
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: {en: 'Description', bg: 'Описание'},
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: {en: 'Image', bg: 'Картина'}
        },
        {
            name: 'article',
            type: 'relationship',
            label: {en: 'News article', bg: 'Статия от новините'},
            relationTo: 'news'
        }
    ],
}

export default Projects;

import {Block} from "payload/types";

const AdmissionRequirements: Block = {
    slug: 'admission-requirements',
    labels: {
        singular: {en: 'Admission requirements', bg: 'Изисквания за прием'},
        plural: {en: 'Admission requirements', bg: 'Изисквания за прием'}
    },
    graphQL: {
        singularName: 'AdmissionRequirement'
    },
    fields: [
        {
            name: 'requirements',
            type: 'array',
            labels: {
                singular: {en: 'Requirement', bg: 'Изява'},
                plural: {en: 'Requirements', bg: 'Изяви'}
            },
            required: true,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    label: {
                        en: 'Source name (competition, exam, grades)',
                        bg: 'Име на изява (състезание, изпит, НВО, оценки)'
                    },
                    required: true
                },
                {
                    name: 'date',
                    type: 'date',
                    label: {
                        en: 'Date (not required)',
                        bg: 'Дата (не е задължителна)'
                    }
                },
                {
                    name: 'maxPoints',
                    type: 'number',
                    label: {
                        en: 'Max points',
                        bg: 'Максимални точки по регламент'
                    },
                    min: 0,
                    required: true
                },
                {
                    name: 'coefficient',
                    type: 'number',
                    label: {
                        en: 'Coefficient',
                        bg: 'Коефициент'
                    },
                    required: true
                }
            ]
        },
    ]
};

export default AdmissionRequirements;

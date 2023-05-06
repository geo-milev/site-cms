import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: {
    singular: {
      en: "User", bg: "Потребител"
    },
    plural: {
      en: "Users", bg: "Потребители"
    }
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};

export default Users;
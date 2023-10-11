import { CollectionConfig } from 'payload/types';
import {isAdmin} from "../lib/access/isAdmin";
import {isAdminOrSelf} from "../lib/access/isAdminOrSelf";
import {administration} from "../lib/groups";

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: {
    singular: {
      en: 'User', bg: 'Потребител'
    },
    plural: {
      en: 'Users', bg: 'Потребители'
    }
  },
  admin: {
    useAsTitle: 'email',
    group: administration,
    hidden: (user) => !isAdmin({ req: user })
  },
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    create: isAdmin,
    delete: isAdmin
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: { en: 'Admin', bg: 'Администратор' }, value: 'admin' },
        { label: { en: 'Editor', bg: 'Редактор' }, value: 'editor' },
        { label: { en: 'Student editor', bg: 'Редактор: Ученик' }, value: 'studentEditor' },
      ],
      required: true,
      saveToJWT: true,
      defaultValue: 'admin',
      label: { en: 'Role', bg: 'Роля' },
      access: {
        update: isAdmin
      }
    }
  ],
};

export default Users;

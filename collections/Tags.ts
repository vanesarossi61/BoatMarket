import { CollectionConfig } from 'payload/types';

const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Etiqueta',
    plural: 'Etiquetas',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    group: 'Contenido',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Nombre',
      admin: {
        description: 'Nombre de la etiqueta (ej: "Motor fuera de borda")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Se genera automaticamente del nombre',
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (!value && siblingData?.name) {
              return (siblingData.name as string)
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
            }
            return value;
          },
        ],
      },
    },
  ],
  timestamps: true,
};

export default Tags;

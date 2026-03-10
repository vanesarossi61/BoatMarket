import { CollectionConfig } from 'payload/types';

const Banners: CollectionConfig = {
  slug: 'banners',
  labels: {
    singular: 'Banner',
    plural: 'Banners',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'position', 'isActive', 'priority'],
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
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titulo',
      admin: {
        description: 'Titulo interno del banner (no visible al publico)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Enlace',
      admin: {
        description: 'URL de destino al hacer click en el banner',
      },
    },
    {
      name: 'position',
      type: 'select',
      required: true,
      label: 'Posicion',
      defaultValue: 'hero',
      options: [
        { label: 'Hero (principal)', value: 'hero' },
        { label: 'Sidebar (lateral)', value: 'sidebar' },
        { label: 'Footer (pie)', value: 'footer' },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Activo',
      admin: {
        description: 'Desactiva para ocultar sin eliminar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          label: 'Fecha inicio',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'dd/MM/yyyy',
            },
          },
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'Fecha fin',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'dd/MM/yyyy',
            },
          },
        },
      ],
    },
    {
      name: 'priority',
      type: 'number',
      label: 'Prioridad',
      defaultValue: 0,
      admin: {
        description: 'Mayor numero = se muestra primero',
      },
      min: 0,
      max: 100,
    },
  ],
  timestamps: true,
};

export default Banners;

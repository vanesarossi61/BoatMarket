import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Archivo',
    plural: 'Archivos',
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Contenido',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 },
        },
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 80 },
        },
      },
      {
        name: 'full',
        width: 1920,
        height: 1080,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 85 },
        },
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texto alternativo',
      admin: {
        description: 'Descripcion de la imagen para accesibilidad y SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Pie de imagen',
      admin: {
        description: 'Texto opcional que aparece debajo de la imagen',
      },
    },
  ],
  timestamps: true,
};

export default Media;

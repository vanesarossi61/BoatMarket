import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'createdAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 200,
        position: 'centre',
      },
      {
        name: 'card',
        width: 640,
        height: 480,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Boat Photo', value: 'boat-photo' },
        { label: 'Product Photo', value: 'product-photo' },
        { label: 'Brand Logo', value: 'brand-logo' },
        { label: 'Blog Image', value: 'blog-image' },
        { label: 'Banner', value: 'banner' },
        { label: 'Avatar', value: 'avatar' },
        { label: 'Document', value: 'document' },
        { label: 'Other', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}

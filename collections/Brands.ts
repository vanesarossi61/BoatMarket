import type { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'country', 'isFeatured'],
    group: 'Taxonomy',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'foundedYear',
      type: 'number',
    },
    {
      name: 'brandType',
      type: 'select',
      required: true,
      defaultValue: 'boat',
      options: [
        { label: 'Boat Manufacturer', value: 'boat' },
        { label: 'Engine Manufacturer', value: 'engine' },
        { label: 'Electronics', value: 'electronics' },
        { label: 'Accessories', value: 'accessories' },
        { label: 'Multi-category', value: 'multi' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
  timestamps: true,
}

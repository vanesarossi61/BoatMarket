import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'group'],
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
      name: 'group',
      type: 'select',
      options: [
        { label: 'Feature', value: 'feature' },
        { label: 'Activity', value: 'activity' },
        { label: 'Material', value: 'material' },
        { label: 'Style', value: 'style' },
        { label: 'Other', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}

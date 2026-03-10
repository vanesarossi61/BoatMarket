// =============================================
// BOATMARKET - Banners Collection (Payload CMS)
// Promotional banners and hero sections
// =============================================

import type { CollectionConfig } from 'payload'

export const Banners: CollectionConfig = {
  slug: 'banners',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'placement', 'isActive', 'startDate', 'endDate'],
    group: 'Marketing',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'subtitle',
      type: 'text',
      maxLength: 200,
    },
    {
      name: 'placement',
      type: 'select',
      required: true,
      options: [
        { label: 'Homepage Hero', value: 'hero' },
        { label: 'Homepage Secondary', value: 'secondary' },
        { label: 'Category Page', value: 'category' },
        { label: 'Search Results', value: 'search' },
        { label: 'Sidebar', value: 'sidebar' },
        { label: 'Footer', value: 'footer' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mobileImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'link',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Internal Page', value: 'internal' },
            { label: 'External URL', value: 'external' },
            { label: 'Boat Listing', value: 'boat' },
            { label: 'Category', value: 'category' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'external',
          },
        },
        {
          name: 'page',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'internal',
          },
        },
        {
          name: 'boat',
          type: 'relationship',
          relationTo: 'boats',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'boat',
          },
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'category',
          },
        },
        {
          name: 'label',
          type: 'text',
          maxLength: 50,
          admin: { description: 'CTA button text' },
        },
      ],
    },
    {
      name: 'overlay',
      type: 'group',
      admin: { description: 'Text overlay styling' },
      fields: [
        {
          name: 'textColor',
          type: 'select',
          defaultValue: 'white',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Dark', value: 'dark' },
          ],
        },
        {
          name: 'position',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Center', value: 'center' },
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
            { label: 'Bottom Left', value: 'bottom-left' },
          ],
        },
        {
          name: 'darkOverlay',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          admin: { width: '50%' },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'priority',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Higher = shown first' },
    },
  ],
}

// =============================================
// BOATMARKET - Reviews Collection (Payload CMS)
// User reviews for boats and products
// =============================================

import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'rating', 'reviewType', 'status', 'createdAt'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { status: { equals: 'approved' } }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { author: { equals: user?.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      minLength: 5,
      maxLength: 150,
    },
    {
      name: 'reviewType',
      type: 'select',
      required: true,
      options: [
        { label: 'Boat Review', value: 'boat' },
        { label: 'Product Review', value: 'product' },
        { label: 'Dealer Review', value: 'dealer' },
      ],
    },
    {
      name: 'boat',
      type: 'relationship',
      relationTo: 'boats',
      admin: {
        condition: (_, siblingData) => siblingData?.reviewType === 'boat',
      },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      admin: {
        condition: (_, siblingData) => siblingData?.reviewType === 'product',
      },
    },
    {
      name: 'dealer',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        condition: (_, siblingData) => siblingData?.reviewType === 'dealer',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rating',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
          admin: { width: '25%', description: '1 to 5 stars' },
        },
        {
          name: 'conditionRating',
          type: 'number',
          min: 1,
          max: 5,
          admin: { width: '25%', description: 'Condition accuracy' },
        },
        {
          name: 'valueRating',
          type: 'number',
          min: 1,
          max: 5,
          admin: { width: '25%', description: 'Value for money' },
        },
        {
          name: 'serviceRating',
          type: 'number',
          min: 1,
          max: 5,
          admin: { width: '25%', description: 'Service quality' },
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'pros',
      type: 'array',
      maxRows: 10,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'cons',
      type: 'array',
      maxRows: 10,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'images',
      type: 'array',
      maxRows: 8,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'verifiedPurchase',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'helpfulCount',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'moderationNote',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData?.status === 'rejected',
      },
    },
  ],
}

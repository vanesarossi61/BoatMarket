// =============================================
// BOATMARKET - Products Collection (Payload CMS)
// Marine accessories, parts & equipment
// =============================================

import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sku', 'price', 'category', 'inStock', 'updatedAt'],
    group: 'Shop',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'dealer',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.name && !data.slug) {
          data.slug = slugify(data.name, { lower: true, strict: true })
        }
        return data
      },
    ],
  },
  fields: [
    // ---- General ----
    {
      name: 'name',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 200,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 500,
    },

    // ---- Pricing ----
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          admin: { width: '33%' },
        },
        {
          name: 'compareAtPrice',
          type: 'number',
          min: 0,
          admin: { width: '33%', description: 'Original price before discount' },
        },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'USD',
          options: [
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
            { label: 'ARS', value: 'ARS' },
          ],
          admin: { width: '33%' },
        },
      ],
    },

    // ---- Inventory ----
    {
      type: 'row',
      fields: [
        {
          name: 'inStock',
          type: 'checkbox',
          defaultValue: true,
          admin: { width: '25%' },
        },
        {
          name: 'stockQuantity',
          type: 'number',
          min: 0,
          admin: { width: '25%' },
        },
        {
          name: 'lowStockThreshold',
          type: 'number',
          defaultValue: 5,
          min: 0,
          admin: { width: '25%' },
        },
        {
          name: 'weight',
          type: 'number',
          min: 0,
          admin: { width: '25%', description: 'Weight in kg' },
        },
      ],
    },

    // ---- Relations ----
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'compatibleBoatTypes',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Sailboat', value: 'sailboat' },
        { label: 'Motorboat', value: 'motorboat' },
        { label: 'Yacht', value: 'yacht' },
        { label: 'Catamaran', value: 'catamaran' },
        { label: 'Fishing Boat', value: 'fishing' },
        { label: 'Pontoon', value: 'pontoon' },
        { label: 'Jet Ski / PWC', value: 'pwc' },
        { label: 'Universal', value: 'universal' },
      ],
    },

    // ---- Media ----
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },

    // ---- Specifications ----
    {
      name: 'specifications',
      type: 'array',
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },

    // ---- Status ----
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Discontinued', value: 'discontinued' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}

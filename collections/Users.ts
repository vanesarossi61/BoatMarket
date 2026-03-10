// =============================================
// BOATMARKET - Users Collection (Payload CMS)
// =============================================

import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'isVerified', 'createdAt'],
    group: 'Admin',
  },
  access: {
    // Admins can do everything
    create: ({ req: { user } }) => user?.role === 'admin',
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      // Users can read their own profile
      return { id: { equals: user.id } }
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'buyer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Dealer', value: 'dealer' },
        { label: 'Seller', value: 'seller' },
        { label: 'Buyer', value: 'buyer' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    // Dealer/Seller fields
    {
      name: 'dealerInfo',
      type: 'group',
      admin: {
        condition: (data) => data?.role === 'dealer' || data?.role === 'seller',
      },
      fields: [
        {
          name: 'companyName',
          type: 'text',
        },
        {
          name: 'companyLogo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'website',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          type: 'row',
          fields: [
            { name: 'address', type: 'text', admin: { width: '50%' } },
            { name: 'city', type: 'text', admin: { width: '25%' } },
            { name: 'state', type: 'text', admin: { width: '25%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'country', type: 'text', admin: { width: '33%' } },
            { name: 'zipCode', type: 'text', admin: { width: '33%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'latitude', type: 'number' },
            { name: 'longitude', type: 'number' },
          ],
        },
        {
          name: 'dealerBadge',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Verified', value: 'verified' },
            { label: 'Premium', value: 'premium' },
            { label: 'Top Seller', value: 'top-seller' },
          ],
        },
        {
          name: 'dealerSince',
          type: 'date',
        },
      ],
    },
    // SEO for dealer pages
    {
      name: 'seo',
      type: 'group',
      admin: {
        condition: (data) => data?.role === 'dealer',
      },
      fields: [
        { name: 'slug', type: 'text', unique: true },
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
  timestamps: true,
}

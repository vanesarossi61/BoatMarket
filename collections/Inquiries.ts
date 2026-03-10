// =============================================
// BOATMARKET - Inquiries Collection (Payload CMS)
// Contact requests between buyers and sellers
// =============================================

import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'from', 'boat', 'status', 'createdAt'],
    group: 'Commerce',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      if (!user) return false
      return {
        or: [
          { from: { equals: user.id } },
          { to: { equals: user.id } },
        ],
      }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { to: { equals: user?.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'subject',
      type: 'text',
      required: true,
      maxLength: 200,
    },
    {
      name: 'inquiryType',
      type: 'select',
      required: true,
      options: [
        { label: 'Boat Inquiry', value: 'boat' },
        { label: 'Product Inquiry', value: 'product' },
        { label: 'General Question', value: 'general' },
        { label: 'Price Negotiation', value: 'negotiation' },
        { label: 'Schedule Visit', value: 'visit' },
        { label: 'Sea Trial Request', value: 'sea_trial' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'from',
          type: 'relationship',
          relationTo: 'users',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'to',
          type: 'relationship',
          relationTo: 'users',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'boat',
      type: 'relationship',
      relationTo: 'boats',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.inquiryType === 'boat' ||
          siblingData?.inquiryType === 'negotiation' ||
          siblingData?.inquiryType === 'visit' ||
          siblingData?.inquiryType === 'sea_trial',
      },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      admin: {
        condition: (_, siblingData) => siblingData?.inquiryType === 'product',
      },
    },
    {
      name: 'message',
      type: 'richText',
      required: true,
    },
    {
      name: 'replies',
      type: 'array',
      fields: [
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'message',
          type: 'richText',
          required: true,
        },
        {
          name: 'sentAt',
          type: 'date',
          admin: { readOnly: true },
        },
      ],
    },
    {
      name: 'preferredContact',
      type: 'select',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'In-App Message', value: 'inapp' },
      ],
      defaultValue: 'email',
      admin: { position: 'sidebar' },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) =>
          siblingData?.preferredContact === 'phone' ||
          siblingData?.preferredContact === 'whatsapp',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
        { label: 'Closed', value: 'closed' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Normal', value: 'normal' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

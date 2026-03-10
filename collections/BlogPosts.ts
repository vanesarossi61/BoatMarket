// =============================================
// BOATMARKET - Blog Posts Collection (Payload CMS)
// Marine lifestyle, guides, news
// =============================================

import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'status', 'publishedAt'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.title && !data.slug) {
          data.slug = slugify(data.title, { lower: true, strict: true })
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      minLength: 10,
      maxLength: 200,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Buying Guides', value: 'buying_guides' },
        { label: 'Maintenance & DIY', value: 'maintenance' },
        { label: 'Destinations', value: 'destinations' },
        { label: 'Lifestyle', value: 'lifestyle' },
        { label: 'News & Events', value: 'news' },
        { label: 'Fishing', value: 'fishing' },
        { label: 'Safety & Regulations', value: 'safety' },
        { label: 'Technology', value: 'technology' },
      ],
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'relatedBoats',
      type: 'relationship',
      relationTo: 'boats',
      hasMany: true,
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', maxLength: 70 },
        { name: 'metaDescription', type: 'textarea', maxLength: 160 },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'readingTime',
      type: 'number',
      min: 1,
      admin: { position: 'sidebar', description: 'Minutes to read' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
}

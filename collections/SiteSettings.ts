// =============================================
// BOATMARKET - Site Settings (Payload CMS Global)
// Global configuration for the marketplace
// =============================================

import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // ---- General ----
    {
      name: 'general',
      type: 'group',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          defaultValue: 'BoatMarket',
          required: true,
        },
        {
          name: 'tagline',
          type: 'text',
          defaultValue: 'Premium Boat Marketplace',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'contactEmail',
          type: 'email',
        },
        {
          name: 'contactPhone',
          type: 'text',
        },
      ],
    },

    // ---- Social Media ----
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'linkedin', type: 'text' },
      ],
    },

    // ---- SEO Defaults ----
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'defaultMetaTitle',
          type: 'text',
          maxLength: 70,
          defaultValue: 'BoatMarket - Buy & Sell Boats Online',
        },
        {
          name: 'defaultMetaDescription',
          type: 'textarea',
          maxLength: 160,
          defaultValue: 'Find your dream boat on BoatMarket. Browse thousands of new and used boats, yachts, and sailboats from trusted dealers worldwide.',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'googleAnalyticsId',
          type: 'text',
        },
      ],
    },

    // ---- Listing Configuration ----
    {
      name: 'listings',
      type: 'group',
      fields: [
        {
          name: 'defaultCurrency',
          type: 'select',
          defaultValue: 'USD',
          options: [
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
            { label: 'ARS', value: 'ARS' },
          ],
        },
        {
          name: 'maxImagesPerListing',
          type: 'number',
          defaultValue: 30,
          min: 5,
          max: 50,
        },
        {
          name: 'requireApproval',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Require admin approval for new listings' },
        },
        {
          name: 'listingDuration',
          type: 'number',
          defaultValue: 90,
          admin: { description: 'Default listing duration in days' },
        },
        {
          name: 'featuredListingPrice',
          type: 'number',
          defaultValue: 49.99,
          admin: { description: 'Price in USD to feature a listing' },
        },
      ],
    },

    // ---- Footer ----
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'columns',
          type: 'array',
          maxRows: 4,
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          name: 'copyright',
          type: 'text',
          defaultValue: '(c) {year} BoatMarket. All rights reserved.',
        },
      ],
    },

    // ---- Maintenance ----
    {
      name: 'maintenance',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'message',
          type: 'textarea',
          defaultValue: 'We are currently performing maintenance. Please check back soon.',
        },
      ],
    },
  ],
}

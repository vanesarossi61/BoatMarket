// =============================================
// BOATMARKET - Boats Collection (Payload CMS)
// 50+ fields organized in tabs
// =============================================

import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Boats: CollectionConfig = {
  slug: 'boats',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'price', 'year', 'category', 'seller', 'createdAt'],
    group: 'Listings',
    listSearchableFields: ['title', 'slug', 'hullId'],
    pagination: {
      defaultLimit: 25,
    },
  },
  access: {
    read: () => true, // Public read
    create: ({ req: { user } }) => !!user && user.role !== 'buyer',
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { seller: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data?.title && !data?.slug) {
          data.slug = slugify(`${data.year || ''}-${data.title}`, { lower: true, strict: true })
        }
        // Auto-calculate totalHp
        if (data?.engineHp && data?.engineCount) {
          data.totalHp = data.engineHp * data.engineCount
        }
        return data
      },
    ],
  },
  fields: [
    // ===== TABS LAYOUT =====
    {
      type: 'tabs',
      tabs: [
        // ----- TAB 1: GENERAL -----
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "2024 Boston Whaler 280 Outrage"' },
            },
            {
              name: 'subtitle',
              type: 'text',
              admin: { description: 'Short tagline' },
            },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              admin: { position: 'sidebar', description: 'Auto-generated from title' },
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'condition',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'New', value: 'new' },
                    { label: 'Used', value: 'used' },
                    { label: 'Certified Pre-Owned', value: 'certified_pre_owned' },
                    { label: 'Restored', value: 'restored' },
                  ],
                },
                {
                  name: 'year',
                  type: 'number',
                  required: true,
                  min: 1900,
                  max: 2030,
                },
                {
                  name: 'hullId',
                  type: 'text',
                  admin: { description: 'Hull Identification Number (HIN)' },
                },
              ],
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              filterOptions: {
                isProductCategory: { equals: false },
              },
            },
            {
              name: 'brand',
              type: 'relationship',
              relationTo: 'brands',
              filterOptions: {
                isBoatBrand: { equals: true },
              },
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'tags',
              hasMany: true,
            },
            {
              name: 'seller',
              type: 'relationship',
              relationTo: 'users',
              required: true,
              admin: { position: 'sidebar' },
            },
          ],
        },

        // ----- TAB 2: PRICE -----
        {
          label: 'Price',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: { width: '33%', description: 'Listing price' },
                },
                {
                  name: 'currency',
                  type: 'select',
                  defaultValue: 'USD',
                  options: [
                    { label: 'USD ($)', value: 'USD' },
                    { label: 'EUR (E)', value: 'EUR' },
                    { label: 'GBP (L)', value: 'GBP' },
                  ],
                  admin: { width: '33%' },
                },
                {
                  name: 'priceNegotiable',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: { width: '33%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'priceDrop',
                  type: 'number',
                  admin: { width: '33%', description: 'Previous price (shows as price drop)' },
                },
                {
                  name: 'priceDropDate',
                  type: 'date',
                  admin: { width: '33%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'taxIncluded',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'financingAvail',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'monthlyEstimate',
                  type: 'number',
                  admin: {
                    condition: (data) => data?.financingAvail,
                    description: 'Estimated monthly payment',
                  },
                },
              ],
            },
          ],
        },

        // ----- TAB 3: SPECIFICATIONS -----
        {
          label: 'Specifications',
          fields: [
            // Dimensions
            {
              name: 'dimensionsHeading',
              type: 'ui',
              admin: { components: { Field: () => null } },
            },
            {
              type: 'row',
              fields: [
                { name: 'lengthFt', type: 'number', required: true, admin: { width: '25%', description: 'Length (ft)' } },
                { name: 'lengthM', type: 'number', admin: { width: '25%', description: 'Length (m)' } },
                { name: 'beamFt', type: 'number', admin: { width: '25%', description: 'Beam (ft)' } },
                { name: 'beamM', type: 'number', admin: { width: '25%', description: 'Beam (m)' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'draftFt', type: 'number', admin: { width: '25%', description: 'Draft (ft)' } },
                { name: 'draftM', type: 'number', admin: { width: '25%', description: 'Draft (m)' } },
                { name: 'weightLbs', type: 'number', admin: { width: '25%', description: 'Weight (lbs)' } },
                { name: 'weightKg', type: 'number', admin: { width: '25%', description: 'Weight (kg)' } },
              ],
            },
            // Capacity
            {
              type: 'row',
              fields: [
                { name: 'cabins', type: 'number', min: 0, admin: { width: '20%' } },
                { name: 'berths', type: 'number', min: 0, admin: { width: '20%' } },
                { name: 'heads', type: 'number', min: 0, admin: { width: '20%', description: 'Bathrooms' } },
                { name: 'maxPassengers', type: 'number', min: 0, admin: { width: '20%' } },
              ],
            },
            // Tanks
            {
              type: 'row',
              fields: [
                { name: 'fuelCapGal', type: 'number', admin: { width: '25%', description: 'Fuel (gal)' } },
                { name: 'fuelCapLt', type: 'number', admin: { width: '25%', description: 'Fuel (L)' } },
                { name: 'waterCapGal', type: 'number', admin: { width: '25%', description: 'Fresh water (gal)' } },
                { name: 'holdingCapGal', type: 'number', admin: { width: '25%', description: 'Holding tank (gal)' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'bridgeClearance', type: 'number', admin: { width: '50%', description: 'Bridge clearance (ft)' } },
                { name: 'deadrise', type: 'number', admin: { width: '50%', description: 'Deadrise angle (degrees)' } },
              ],
            },
            // Hull
            {
              type: 'row',
              fields: [
                {
                  name: 'hullMaterial',
                  type: 'select',
                  options: [
                    { label: 'Fiberglass', value: 'fiberglass' },
                    { label: 'Aluminum', value: 'aluminum' },
                    { label: 'Wood', value: 'wood' },
                    { label: 'PVC/Hypalon', value: 'pvc_hypalon' },
                    { label: 'Carbon Fiber', value: 'carbon_fiber' },
                    { label: 'Steel', value: 'steel' },
                    { label: 'Composite', value: 'composite' },
                  ],
                  admin: { width: '25%' },
                },
                {
                  name: 'hullType',
                  type: 'select',
                  options: [
                    { label: 'Deep V', value: 'deep_v' },
                    { label: 'Modified V', value: 'modified_v' },
                    { label: 'Flat', value: 'flat' },
                    { label: 'Catamaran', value: 'catamaran' },
                    { label: 'Pontoon', value: 'pontoon' },
                    { label: 'Semi-Displacement', value: 'semi_displacement' },
                    { label: 'Full Displacement', value: 'full_displacement' },
                  ],
                  admin: { width: '25%' },
                },
                { name: 'hullColor', type: 'text', admin: { width: '25%' } },
                { name: 'deckMaterial', type: 'text', admin: { width: '25%' } },
              ],
            },
          ],
        },

        // ----- TAB 4: ENGINE -----
        {
          label: 'Engine',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'engineType',
                  type: 'select',
                  options: [
                    { label: 'Outboard', value: 'outboard' },
                    { label: 'Inboard', value: 'inboard' },
                    { label: 'Sterndrive', value: 'sterndrive' },
                    { label: 'Jet', value: 'jet' },
                    { label: 'Electric', value: 'electric' },
                    { label: 'Sail', value: 'sail' },
                    { label: 'None', value: 'none' },
                  ],
                  admin: { width: '25%' },
                },
                { name: 'engineMake', type: 'text', admin: { width: '25%', description: 'e.g. Mercury, Yamaha' } },
                { name: 'engineModel', type: 'text', admin: { width: '25%', description: 'e.g. Verado 300' } },
                { name: 'engineYear', type: 'number', admin: { width: '25%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'engineHp', type: 'number', admin: { width: '20%', description: 'HP per engine' } },
                { name: 'engineCount', type: 'number', defaultValue: 1, min: 1, max: 6, admin: { width: '20%', description: 'Number of engines' } },
                { name: 'totalHp', type: 'number', admin: { width: '20%', description: 'Auto-calculated', readOnly: true } },
                { name: 'engineHours', type: 'number', min: 0, admin: { width: '20%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'engineStroke',
                  type: 'select',
                  options: [
                    { label: '2-Stroke', value: 'two_stroke' },
                    { label: '4-Stroke', value: 'four_stroke' },
                  ],
                  admin: { width: '25%' },
                },
                {
                  name: 'fuelType',
                  type: 'select',
                  options: [
                    { label: 'Gasoline', value: 'gasoline' },
                    { label: 'Diesel', value: 'diesel' },
                    { label: 'Electric', value: 'electric' },
                    { label: 'Hybrid', value: 'hybrid' },
                    { label: 'None', value: 'none' },
                  ],
                  admin: { width: '25%' },
                },
                { name: 'propellerType', type: 'text', admin: { width: '25%' } },
                { name: 'driveType', type: 'text', admin: { width: '25%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'maxSpeedKnots', type: 'number', admin: { width: '50%', description: 'Max speed (knots)' } },
                { name: 'cruiseSpeedKnots', type: 'number', admin: { width: '50%', description: 'Cruise speed (knots)' } },
              ],
            },
          ],
        },

        // ----- TAB 5: ELECTRONICS & EQUIPMENT -----
        {
          label: 'Equipment',
          fields: [
            // Electronics checkboxes
            {
              type: 'row',
              fields: [
                { name: 'hasGps', type: 'checkbox', label: 'GPS', defaultValue: false },
                { name: 'hasFishfinder', type: 'checkbox', label: 'Fishfinder', defaultValue: false },
                { name: 'hasRadar', type: 'checkbox', label: 'Radar', defaultValue: false },
                { name: 'hasVhf', type: 'checkbox', label: 'VHF Radio', defaultValue: false },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'hasAutopilot', type: 'checkbox', label: 'Autopilot', defaultValue: false },
                { name: 'hasChartplotter', type: 'checkbox', label: 'Chartplotter', defaultValue: false },
                { name: 'hasAis', type: 'checkbox', label: 'AIS', defaultValue: false },
              ],
            },
            {
              name: 'electronicsDesc',
              type: 'textarea',
              admin: { description: 'Detailed electronics description' },
            },
            // Equipment checkboxes
            {
              type: 'row',
              fields: [
                { name: 'hasAirCond', type: 'checkbox', label: 'Air Conditioning', defaultValue: false },
                { name: 'hasGenerator', type: 'checkbox', label: 'Generator', defaultValue: false },
                { name: 'hasBimini', type: 'checkbox', label: 'Bimini Top', defaultValue: false },
                { name: 'hasWindlass', type: 'checkbox', label: 'Windlass', defaultValue: false },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'hasBowThruster', type: 'checkbox', label: 'Bow Thruster', defaultValue: false },
                { name: 'hasSwimPlatform', type: 'checkbox', label: 'Swim Platform', defaultValue: false },
                { name: 'hasLivewell', type: 'checkbox', label: 'Livewell', defaultValue: false },
                { name: 'hasStabilizers', type: 'checkbox', label: 'Stabilizers', defaultValue: false },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'hasShorepower', type: 'checkbox', label: 'Shore Power', defaultValue: false },
              ],
            },
            {
              name: 'generatorHrs',
              type: 'number',
              admin: {
                condition: (data) => data?.hasGenerator,
                description: 'Generator hours',
              },
            },
            {
              name: 'equipmentDesc',
              type: 'textarea',
              admin: { description: 'Additional equipment details' },
            },
          ],
        },

        // ----- TAB 6: LOCATION -----
        {
          label: 'Location',
          fields: [
            {
              name: 'waterType',
              type: 'select',
              options: [
                { label: 'Freshwater', value: 'freshwater' },
                { label: 'Saltwater', value: 'saltwater' },
                { label: 'Both', value: 'both' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'city', type: 'text', admin: { width: '25%' } },
                { name: 'state', type: 'text', admin: { width: '25%' } },
                { name: 'country', type: 'text', defaultValue: 'US', admin: { width: '25%' } },
                { name: 'zipCode', type: 'text', admin: { width: '25%' } },
              ],
            },
            {
              name: 'marina',
              type: 'text',
              admin: { description: 'Marina or dock name' },
            },
            {
              type: 'row',
              fields: [
                { name: 'latitude', type: 'number', admin: { width: '50%' } },
                { name: 'longitude', type: 'number', admin: { width: '50%' } },
              ],
            },
          ],
        },

        // ----- TAB 7: MEDIA -----
        {
          label: 'Media',
          fields: [
            {
              name: 'images',
              type: 'array',
              minRows: 1,
              maxRows: 50,
              admin: {
                description: 'Upload up to 50 images. First image is the primary/cover.',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                { name: 'alt', type: 'text', admin: { description: 'Alt text for SEO' } },
                { name: 'caption', type: 'text' },
                { name: 'isPrimary', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },

        // ----- TAB 8: SEO -----
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', admin: { description: 'Override auto-generated title (max 60 chars)' } },
            { name: 'metaDescription', type: 'textarea', admin: { description: 'Override auto-generated description (max 160 chars)' } },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Custom Open Graph image' },
            },
            { name: 'canonicalUrl', type: 'text', admin: { description: 'Canonical URL override' } },
          ],
        },
      ],
    },

    // ===== SIDEBAR FIELDS =====
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Review', value: 'pending_review' },
        { label: 'Active', value: 'active' },
        { label: 'Sold', value: 'sold' },
        { label: 'Expired', value: 'expired' },
        { label: 'Archived', value: 'archived' },
        { label: 'Rejected', value: 'rejected' },
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
      name: 'featuredUntil',
      type: 'date',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.isFeatured,
      },
    },
    {
      name: 'viewCount',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'inquiryCount',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'expiresAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}

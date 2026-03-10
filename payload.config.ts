// =============================================
// BOATMARKET - Payload CMS 3.0 Configuration
// Embedded within Next.js App Router
// =============================================

import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudinaryStorage } from '@payloadcms/storage-cloudinary'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Boats } from './collections/Boats'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Brands } from './collections/Brands'
import { Reviews } from './collections/Reviews'
import { Inquiries } from './collections/Inquiries'
import { Media } from './collections/Media'
import { BlogPosts } from './collections/BlogPosts'
import { Banners } from './collections/Banners'
import { SiteSettings } from './collections/SiteSettings'

export default buildConfig({
  // Admin panel config
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | BoatMarket Admin',
      favicon: '/favicon.ico',
      ogImage: '/images/og-admin.jpg',
    },
    components: {
      // Custom admin dashboard (optional, can add later)
      // beforeDashboard: ['./components/admin/BeforeDashboard'],
    },
  },

  // Collections (content types)
  collections: [
    Users,
    Boats,
    Products,
    Categories,
    Tags,
    Brands,
    Reviews,
    Inquiries,
    Media,
    BlogPosts,
    Banners,
    SiteSettings,
  ],

  // Rich text editor
  editor: lexicalEditor({}),

  // Database
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  // File storage (Cloudinary)
  plugins: [
    cloudinaryStorage({
      collections: {
        media: {
          disableLocalStorage: true,
          prefix: 'boatmarket',
        },
      },
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || '',
      },
    }),
  ],

  // Image processing
  sharp,

  // Secret for encrypting data
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-in-production',

  // TypeScript output
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  // GraphQL (optional, enable if needed)
  // graphQL: {
  //   schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  // },

  // CORS config
  cors: [
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ],

  // Rate limiting
  rateLimit: {
    max: 500,
    window: 60000, // 1 minute
  },

  // Upload config
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
})

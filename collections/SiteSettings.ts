import { GlobalConfig } from 'payload/types';

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuracion del Sitio',
  admin: {
    group: 'Configuracion',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    // ── Informacion General ──
    {
      name: 'siteName',
      type: 'text',
      label: 'Nombre del sitio',
      defaultValue: 'BoatMarket',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Eslogan',
      defaultValue: 'El marketplace nautico de Argentina',
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Email de contacto',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Telefono de contacto',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Direccion',
    },

    // ── Redes Sociales ──
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Redes Sociales',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook',
          admin: { placeholder: 'https://facebook.com/boatmarket' },
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram',
          admin: { placeholder: 'https://instagram.com/boatmarket' },
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube',
          admin: { placeholder: 'https://youtube.com/@boatmarket' },
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter / X',
          admin: { placeholder: 'https://twitter.com/boatmarket' },
        },
      ],
    },

    // ── SEO ──
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'defaultTitle',
          type: 'text',
          label: 'Titulo por defecto',
          defaultValue: 'BoatMarket - Embarcaciones y Productos Nauticos',
          admin: {
            description: 'Se usa cuando una pagina no define su propio titulo',
          },
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
          label: 'Descripcion por defecto',
          defaultValue:
            'Compra y vende embarcaciones, lanchas, veleros y productos nauticos en Argentina. El marketplace nautico mas completo.',
          admin: {
            description: 'Meta description por defecto (max 160 caracteres)',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen Open Graph',
          admin: {
            description: 'Imagen compartida en redes sociales (1200x630 recomendado)',
          },
        },
      ],
    },

    // ── Footer ──
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        {
          name: 'aboutText',
          type: 'textarea',
          label: 'Texto "Sobre nosotros"',
          defaultValue:
            'BoatMarket es la plataforma lider en compraventa de embarcaciones y productos nauticos en Argentina.',
        },
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Texto de copyright',
          defaultValue: '© 2026 BoatMarket. Todos los derechos reservados.',
        },
      ],
    },
  ],
};

export default SiteSettings;

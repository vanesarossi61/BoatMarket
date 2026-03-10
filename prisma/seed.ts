// =============================================
// BOATMARKET - Database Seeder
// Run: pnpm db:seed
// =============================================

import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding BoatMarket database...')

  // =============================================
  // 1. USERS
  // =============================================
  const adminPassword = await hash('admin123456', 12)
  const userPassword = await hash('user123456', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@boatmarket.com' },
    update: {},
    create: {
      email: 'admin@boatmarket.com',
      name: 'Admin BoatMarket',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isVerified: true,
      isActive: true,
      emailVerifiedAt: new Date(),
    },
  })

  const dealer1 = await prisma.user.upsert({
    where: { email: 'dealer@marinasunshine.com' },
    update: {},
    create: {
      email: 'dealer@marinasunshine.com',
      name: 'Carlos Marina',
      passwordHash: userPassword,
      role: 'DEALER',
      isVerified: true,
      isActive: true,
      emailVerifiedAt: new Date(),
      companyName: 'Sunshine Marina',
      companyLogo: '/images/dealers/sunshine-marina.jpg',
      website: 'https://sunshinemarina.com',
      description: 'Premier boat dealership in South Florida with 20+ years of experience.',
      city: 'Miami',
      state: 'FL',
      country: 'US',
      zipCode: '33139',
      latitude: 25.7617,
      longitude: -80.1918,
      dealerBadge: 'Premium',
      dealerSince: new Date('2004-06-15'),
      slug: 'sunshine-marina',
    },
  })

  const dealer2 = await prisma.user.upsert({
    where: { email: 'sales@baysidemarine.com' },
    update: {},
    create: {
      email: 'sales@baysidemarine.com',
      name: 'Jessica Thompson',
      passwordHash: userPassword,
      role: 'DEALER',
      isVerified: true,
      isActive: true,
      emailVerifiedAt: new Date(),
      companyName: 'Bayside Marine Group',
      description: 'Authorized dealer for Boston Whaler, Sea Ray, and Yamaha boats.',
      city: 'Tampa',
      state: 'FL',
      country: 'US',
      zipCode: '33602',
      latitude: 27.9506,
      longitude: -82.4572,
      dealerBadge: 'Verified',
      dealerSince: new Date('2010-03-01'),
      slug: 'bayside-marine',
    },
  })

  const seller1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Smith',
      passwordHash: userPassword,
      role: 'SELLER',
      isVerified: true,
      isActive: true,
      city: 'Fort Lauderdale',
      state: 'FL',
      country: 'US',
    },
  })

  const buyer1 = await prisma.user.upsert({
    where: { email: 'buyer@example.com' },
    update: {},
    create: {
      email: 'buyer@example.com',
      name: 'Sarah Johnson',
      passwordHash: userPassword,
      role: 'BUYER',
      isVerified: true,
      isActive: true,
    },
  })

  console.log('Users seeded')

  // =============================================
  // 2. CATEGORIES (Boats - Hierarchical)
  // =============================================
  const catPowerboats = await prisma.category.create({
    data: {
      name: 'Lanchas',
      slug: 'lanchas',
      description: 'Embarcaciones a motor para recreacion, pesca y deportes acuaticos.',
      longDescription: 'Las lanchas son las embarcaciones mas populares del mercado. Desde bowriders para paseos familiares hasta center consoles para pesca deportiva, encuentra la lancha perfecta para tu estilo de vida nautico.',
      icon: 'ship',
      sortOrder: 1,
      depth: 0,
      metaTitle: 'Lanchas en Venta | BoatMarket',
      metaDescription: 'Encuentra las mejores lanchas en venta. Bowriders, center consoles, walkarounds y mas. Precios competitivos y financiamiento disponible.',
    },
  })

  const catBowrider = await prisma.category.create({
    data: {
      name: 'Bowrider',
      slug: 'bowrider',
      description: 'Lanchas con asiento abierto en proa, ideales para paseos familiares.',
      icon: 'ship',
      sortOrder: 1,
      depth: 1,
      parentId: catPowerboats.id,
    },
  })

  const catCenterConsole = await prisma.category.create({
    data: {
      name: 'Center Console',
      slug: 'center-console',
      description: 'Consola central con acceso 360 grados, perfectas para pesca.',
      icon: 'fish',
      sortOrder: 2,
      depth: 1,
      parentId: catPowerboats.id,
    },
  })

  const catWalkaround = await prisma.category.create({
    data: {
      name: 'Walkaround',
      slug: 'walkaround',
      description: 'Combinacion de pesca y crucero con cabina y cubierta transitable.',
      icon: 'ship',
      sortOrder: 3,
      depth: 1,
      parentId: catPowerboats.id,
    },
  })

  const catSailboats = await prisma.category.create({
    data: {
      name: 'Veleros',
      slug: 'veleros',
      description: 'Embarcaciones de vela para crucero, regata y aventura.',
      longDescription: 'Los veleros ofrecen una experiencia nautica unica impulsados por el viento. Desde daysailers para tardes de recreacion hasta cruceros oceanicos para travesias de largo alcance.',
      icon: 'sailboat',
      sortOrder: 2,
      depth: 0,
      metaTitle: 'Veleros en Venta | BoatMarket',
      metaDescription: 'Veleros nuevos y usados en venta. Daysailers, cruceros, catamaranes y mas.',
    },
  })

  const catYachts = await prisma.category.create({
    data: {
      name: 'Yates',
      slug: 'yates',
      description: 'Embarcaciones de lujo con cabinas completas y amenidades premium.',
      icon: 'crown',
      sortOrder: 3,
      depth: 0,
      metaTitle: 'Yates en Venta | BoatMarket',
      metaDescription: 'Yates de lujo en venta. Motor yachts, mega yachts y superyachts con las mejores especificaciones.',
    },
  })

  const catPontoons = await prisma.category.create({
    data: {
      name: 'Pontones',
      slug: 'pontones',
      description: 'Embarcaciones estables con plataforma plana, ideales para grupos.',
      icon: 'users',
      sortOrder: 4,
      depth: 0,
    },
  })

  const catPWC = await prisma.category.create({
    data: {
      name: 'Motos de Agua',
      slug: 'motos-de-agua',
      description: 'Personal watercraft para adrenalina y diversión.',
      icon: 'zap',
      sortOrder: 5,
      depth: 0,
    },
  })

  const catInflatable = await prisma.category.create({
    data: {
      name: 'Inflables',
      slug: 'inflables',
      description: 'Botes inflables y RIBs, versatiles y faciles de transportar.',
      icon: 'life-buoy',
      sortOrder: 6,
      depth: 0,
    },
  })

  // Product categories
  const catMotors = await prisma.category.create({
    data: {
      name: 'Motores',
      slug: 'motores',
      description: 'Motores fueraborda, intraborda y electricos.',
      isProductCategory: true,
      productType: 'MOTOR',
      sortOrder: 1,
      depth: 0,
    },
  })

  const catTrailers = await prisma.category.create({
    data: {
      name: 'Trailers',
      slug: 'trailers',
      description: 'Trailers para transporte de embarcaciones.',
      isProductCategory: true,
      productType: 'TRAILER',
      sortOrder: 2,
      depth: 0,
    },
  })

  const catElectronics = await prisma.category.create({
    data: {
      name: 'Electronica Marina',
      slug: 'electronica-marina',
      description: 'GPS, fishfinders, radar, VHF y mas.',
      isProductCategory: true,
      productType: 'ELECTRONICS',
      sortOrder: 3,
      depth: 0,
    },
  })

  const catSafety = await prisma.category.create({
    data: {
      name: 'Seguridad',
      slug: 'seguridad',
      description: 'Chalecos salvavidas, bengalas, extintores y equipos de seguridad.',
      isProductCategory: true,
      productType: 'SAFETY',
      sortOrder: 4,
      depth: 0,
    },
  })

  console.log('Categories seeded')

  // =============================================
  // 3. TAGS
  // =============================================
  const tags = await Promise.all([
    // Condition tags
    prisma.tag.create({ data: { name: 'Nuevo', slug: 'nuevo', group: 'CONDITION', color: '#22c55e' } }),
    prisma.tag.create({ data: { name: 'Usado', slug: 'usado', group: 'CONDITION', color: '#3b82f6' } }),
    prisma.tag.create({ data: { name: 'Certificado', slug: 'certificado', group: 'CONDITION', color: '#a855f7' } }),
    // Usage tags
    prisma.tag.create({ data: { name: 'Pesca', slug: 'pesca', group: 'USAGE', color: '#f59e0b', icon: 'fish' } }),
    prisma.tag.create({ data: { name: 'Crucero', slug: 'crucero', group: 'USAGE', color: '#06b6d4' } }),
    prisma.tag.create({ data: { name: 'Deportes Acuaticos', slug: 'deportes-acuaticos', group: 'USAGE', color: '#ef4444' } }),
    prisma.tag.create({ data: { name: 'Familiar', slug: 'familiar', group: 'USAGE', color: '#ec4899' } }),
    // Water tags
    prisma.tag.create({ data: { name: 'Agua Dulce', slug: 'agua-dulce', group: 'WATER', color: '#14b8a6' } }),
    prisma.tag.create({ data: { name: 'Agua Salada', slug: 'agua-salada', group: 'WATER', color: '#1d4ed8' } }),
    // Featured tags
    prisma.tag.create({ data: { name: 'Oferta', slug: 'oferta', group: 'FEATURED', color: '#dc2626', icon: 'tag' } }),
    prisma.tag.create({ data: { name: 'Recien Ingresado', slug: 'recien-ingresado', group: 'FEATURED', color: '#16a34a', icon: 'sparkles' } }),
    prisma.tag.create({ data: { name: 'Precio Reducido', slug: 'precio-reducido', group: 'FEATURED', color: '#ea580c', icon: 'trending-down' } }),
  ])

  console.log('Tags seeded')

  // =============================================
  // 4. BRANDS
  // =============================================
  const brandBostonWhaler = await prisma.brand.create({
    data: {
      name: 'Boston Whaler',
      slug: 'boston-whaler',
      website: 'https://www.bostonwhaler.com',
      description: 'The Unsinkable Legend. Premium center consoles and dual consoles.',
      country: 'US',
      foundedYear: 1958,
      isBoatBrand: true,
      isFeatured: true,
      metaTitle: 'Boston Whaler Boats for Sale | BoatMarket',
      metaDescription: 'Find Boston Whaler boats for sale. Browse new and used Boston Whaler center consoles, walkarounds and more.',
    },
  })

  const brandSeaRay = await prisma.brand.create({
    data: {
      name: 'Sea Ray',
      slug: 'sea-ray',
      website: 'https://www.searay.com',
      description: 'The worlds premier powerboat manufacturer. Sport boats, bowriders and cruisers.',
      country: 'US',
      foundedYear: 1959,
      isBoatBrand: true,
      isFeatured: true,
    },
  })

  const brandYamaha = await prisma.brand.create({
    data: {
      name: 'Yamaha',
      slug: 'yamaha',
      website: 'https://www.yamahaboats.com',
      description: 'Industry-leading outboard engines and sport boats.',
      country: 'JP',
      foundedYear: 1887,
      isBoatBrand: true,
      isEngineBrand: true,
      isFeatured: true,
    },
  })

  const brandMercury = await prisma.brand.create({
    data: {
      name: 'Mercury Marine',
      slug: 'mercury-marine',
      website: 'https://www.mercurymarine.com',
      description: 'World-leading manufacturer of outboard and sterndrive engines.',
      country: 'US',
      foundedYear: 1939,
      isBoatBrand: false,
      isEngineBrand: true,
      isProductBrand: true,
      isFeatured: true,
    },
  })

  const brandGarmin = await prisma.brand.create({
    data: {
      name: 'Garmin Marine',
      slug: 'garmin-marine',
      website: 'https://www.garmin.com/marine',
      description: 'Premium marine electronics: chartplotters, fishfinders, radar and more.',
      country: 'US',
      foundedYear: 1989,
      isBoatBrand: false,
      isProductBrand: true,
      isFeatured: true,
    },
  })

  // Brand models
  const model280Outrage = await prisma.brandModel.create({
    data: {
      name: '280 Outrage',
      slug: 'boston-whaler-280-outrage',
      brandId: brandBostonWhaler.id,
      yearStart: 2019,
    },
  })

  const model230Vortex = await prisma.brandModel.create({
    data: {
      name: '230 Vortex',
      slug: 'boston-whaler-230-vortex',
      brandId: brandBostonWhaler.id,
      yearStart: 2020,
    },
  })

  const modelSLX280 = await prisma.brandModel.create({
    data: {
      name: 'SLX 280',
      slug: 'sea-ray-slx-280',
      brandId: brandSeaRay.id,
      yearStart: 2021,
    },
  })

  console.log('Brands seeded')

  // =============================================
  // 5. BOATS (Sample listings)
  // =============================================
  const boat1 = await prisma.boat.create({
    data: {
      slug: '2024-boston-whaler-280-outrage-miami',
      status: 'ACTIVE',
      isFeatured: true,
      title: '2024 Boston Whaler 280 Outrage',
      subtitle: 'The ultimate offshore fishing machine',
      description: 'Pristine 2024 Boston Whaler 280 Outrage with twin Mercury Verado 300 engines. Only 45 hours. Full electronics package including Garmin 8616xsv, Simrad radar, and Fusion stereo system. Loaded with every factory option including the Premium Package, Fishing Package, and Technology Package. Hull colors: Glacier Blue and White. Stored in covered slip at Miami Beach Marina.',
      condition: 'NEW',
      year: 2024,
      hullId: 'BWC28001K324',
      price: 285000,
      currency: 'USD',
      financingAvail: true,
      monthlyEstimate: 2450,
      lengthFt: 28.5,
      lengthM: 8.69,
      beamFt: 9.5,
      beamM: 2.9,
      draftFt: 1.67,
      weightLbs: 7200,
      maxPassengers: 12,
      fuelCapGal: 270,
      waterCapGal: 25,
      hullMaterial: 'FIBERGLASS',
      hullType: 'Deep V',
      hullColor: 'Glacier Blue / White',
      engineType: 'OUTBOARD',
      engineMake: 'Mercury',
      engineModel: 'Verado 300',
      engineYear: 2024,
      engineHp: 300,
      engineCount: 2,
      totalHp: 600,
      engineHours: 45,
      engineStroke: 'FOUR_STROKE',
      fuelType: 'GASOLINE',
      maxSpeedKnots: 52,
      cruiseSpeedKnots: 32,
      propellerType: 'Stainless Steel',
      hasGps: true,
      hasFishfinder: true,
      hasRadar: true,
      hasVhf: true,
      hasAutopilot: true,
      hasChartplotter: true,
      electronicsDesc: 'Garmin GPSMAP 8616xsv, Garmin GCV 20 sonar, Simrad Halo20+ radar, Standard Horizon VHF, Garmin Reactor 40 autopilot',
      hasBimini: true,
      hasLivewell: true,
      hasSwimPlatform: true,
      equipmentDesc: 'T-top with spreader lights, rod holders x8, live baitwell 32gal, raw water washdown, freshwater shower, bow cushion, leaning post with cooler',
      waterType: 'SALTWATER',
      city: 'Miami Beach',
      state: 'FL',
      country: 'US',
      zipCode: '33139',
      marina: 'Miami Beach Marina',
      latitude: 25.7743,
      longitude: -80.1393,
      metaTitle: '2024 Boston Whaler 280 Outrage for Sale in Miami | $285,000',
      metaDescription: 'Brand new 2024 Boston Whaler 280 Outrage with twin Mercury Verado 300. Only 45 hours. Full Garmin electronics package. Located at Miami Beach Marina.',
      sellerId: dealer1.id,
      categoryId: catCenterConsole.id,
      brandId: brandBostonWhaler.id,
      modelId: model280Outrage.id,
      publishedAt: new Date(),
    },
  })

  const boat2 = await prisma.boat.create({
    data: {
      slug: '2023-sea-ray-slx-280-tampa',
      status: 'ACTIVE',
      isFeatured: true,
      title: '2023 Sea Ray SLX 280',
      subtitle: 'Luxury sport boat for the whole family',
      description: 'Gorgeous 2023 Sea Ray SLX 280 with the Mercury 6.2L 350hp sterndrive. This boat is loaded with the Premium and Sport packages. Features include the hydraulic swim platform, JL Audio marine stereo, cockpit carpet, bow and cockpit covers, and much more. Boat has been well maintained and always stored on a lift. Only 120 hours.',
      condition: 'USED',
      year: 2023,
      price: 178500,
      priceNegotiable: true,
      currency: 'USD',
      financingAvail: true,
      monthlyEstimate: 1520,
      lengthFt: 28.0,
      beamFt: 8.5,
      draftFt: 3.25,
      weightLbs: 6800,
      maxPassengers: 14,
      fuelCapGal: 100,
      hullMaterial: 'FIBERGLASS',
      hullType: 'Modified V',
      engineType: 'STERNDRIVE',
      engineMake: 'Mercury',
      engineModel: 'MerCruiser 6.2L',
      engineYear: 2023,
      engineHp: 350,
      engineCount: 1,
      totalHp: 350,
      engineHours: 120,
      engineStroke: 'FOUR_STROKE',
      fuelType: 'GASOLINE',
      maxSpeedKnots: 45,
      cruiseSpeedKnots: 28,
      hasGps: true,
      hasChartplotter: true,
      hasVhf: true,
      hasBimini: true,
      hasSwimPlatform: true,
      hasAirCond: false,
      waterType: 'BOTH',
      city: 'Tampa',
      state: 'FL',
      country: 'US',
      zipCode: '33602',
      latitude: 27.9506,
      longitude: -82.4572,
      sellerId: dealer2.id,
      categoryId: catBowrider.id,
      brandId: brandSeaRay.id,
      modelId: modelSLX280.id,
      publishedAt: new Date(),
    },
  })

  const boat3 = await prisma.boat.create({
    data: {
      slug: '2022-yamaha-252sd-fort-lauderdale',
      status: 'ACTIVE',
      title: '2022 Yamaha 252SD',
      subtitle: 'Twin-jet sport deck for maximum fun',
      description: 'Well-maintained 2022 Yamaha 252SD with twin 1.8L High Output Yamaha Marine engines. This sport deck boat offers incredible performance and versatility. Features the Yamaha Connext touchscreen, swim platform with re-boarding ladder, Bimini top, snap-in SeaDek flooring, and JL Audio stereo system. Perfect for water sports and family outings.',
      condition: 'USED',
      year: 2022,
      price: 82900,
      priceNegotiable: true,
      priceDrop: 89900,
      priceDropDate: new Date('2026-02-15'),
      currency: 'USD',
      financingAvail: true,
      monthlyEstimate: 720,
      lengthFt: 25.0,
      beamFt: 8.5,
      weightLbs: 4650,
      maxPassengers: 13,
      fuelCapGal: 70,
      hullMaterial: 'FIBERGLASS',
      hullType: 'Modified V',
      engineType: 'JET',
      engineMake: 'Yamaha',
      engineModel: '1.8L High Output',
      engineYear: 2022,
      engineHp: 250,
      engineCount: 2,
      totalHp: 500,
      engineHours: 210,
      fuelType: 'GASOLINE',
      maxSpeedKnots: 48,
      cruiseSpeedKnots: 30,
      hasGps: true,
      hasBimini: true,
      hasSwimPlatform: true,
      waterType: 'FRESHWATER',
      city: 'Fort Lauderdale',
      state: 'FL',
      country: 'US',
      zipCode: '33301',
      latitude: 26.1224,
      longitude: -80.1373,
      sellerId: seller1.id,
      categoryId: catBowrider.id,
      brandId: brandYamaha.id,
      publishedAt: new Date(),
    },
  })

  // Add tags to boats
  await prisma.boatTag.createMany({
    data: [
      { boatId: boat1.id, tagId: tags[0].id }, // Nuevo
      { boatId: boat1.id, tagId: tags[3].id }, // Pesca
      { boatId: boat1.id, tagId: tags[8].id }, // Agua Salada
      { boatId: boat2.id, tagId: tags[1].id }, // Usado
      { boatId: boat2.id, tagId: tags[4].id }, // Crucero
      { boatId: boat2.id, tagId: tags[6].id }, // Familiar
      { boatId: boat3.id, tagId: tags[1].id }, // Usado
      { boatId: boat3.id, tagId: tags[5].id }, // Deportes Acuaticos
      { boatId: boat3.id, tagId: tags[6].id }, // Familiar
      { boatId: boat3.id, tagId: tags[11].id }, // Precio Reducido
    ],
  })

  // Price history
  await prisma.priceHistory.createMany({
    data: [
      { boatId: boat3.id, price: 89900, date: new Date('2025-12-01') },
      { boatId: boat3.id, price: 85900, date: new Date('2026-01-15') },
      { boatId: boat3.id, price: 82900, date: new Date('2026-02-15') },
    ],
  })

  console.log('Boats seeded')

  // =============================================
  // 6. PRODUCTS (Alternative Products)
  // =============================================
  const product1 = await prisma.product.create({
    data: {
      slug: 'mercury-verado-300-outboard',
      name: 'Mercury Verado 300 Outboard',
      subtitle: '4.6L V8 FourStroke',
      description: 'The Mercury Verado 300hp outboard engine delivers advanced technology and refined power. Featuring the 4.6L V8 powerhead with Advanced Range Optimization, this engine provides exceptional performance and fuel efficiency. Includes digital throttle and shift, Advanced Sound Control, and top cowl designed for reduced noise.',
      productType: 'MOTOR',
      sku: 'MERC-V300-2024',
      price: 28500,
      comparePrice: 31000,
      stockQty: 8,
      lowStockAlert: 2,
      weight: 527,
      motorHp: 300,
      motorStroke: 'FOUR_STROKE',
      motorFuelType: 'GASOLINE',
      motorShaftLength: '25 in / XL',
      categoryId: catMotors.id,
      brandId: brandMercury.id,
      isFeatured: true,
    },
  })

  const product2 = await prisma.product.create({
    data: {
      slug: 'garmin-gpsmap-8616xsv',
      name: 'Garmin GPSMAP 8616xsv',
      subtitle: '16-inch Touchscreen Chartplotter/Sonar Combo',
      description: 'The Garmin GPSMAP 8616xsv is a premium 16-inch touchscreen chartplotter with built-in CHIRP sonar, ClearVu and SideVu scanning sonar. Features include preloaded BlueChart g3 coastal charts, support for Garmin marine radar, Panoptix LiveScope compatible, and full network connectivity via Garmin Marine Network and NMEA 2000.',
      productType: 'ELECTRONICS',
      sku: 'GAR-8616XSV',
      price: 4299,
      stockQty: 15,
      lowStockAlert: 3,
      weight: 11.5,
      screenSize: 16.0,
      waterproof: 'IPX7',
      categoryId: catElectronics.id,
      brandId: brandGarmin.id,
      isFeatured: true,
    },
  })

  const product3 = await prisma.product.create({
    data: {
      slug: 'stearns-adult-classic-life-vest',
      name: 'Stearns Adult Classic Series Life Vest',
      subtitle: 'USCG Approved Type III PFD',
      description: 'USCG-approved Type III life vest for adults. Features lightweight PE foam for buoyancy, adjustable belts and chest strap for secure fit, and a large armholes for comfortable range of motion. Available in multiple sizes and colors. Essential safety equipment for every boater.',
      productType: 'SAFETY',
      sku: 'STN-CLASSIC-ADULT',
      price: 29.99,
      comparePrice: 39.99,
      stockQty: 200,
      lowStockAlert: 20,
      weight: 1.2,
      categoryId: catSafety.id,
      isFeatured: false,
    },
  })

  // Product compatibility
  await prisma.productCompatibility.createMany({
    data: [
      {
        productId: product1.id,
        minLengthFt: 22,
        maxLengthFt: 35,
        compatEngineType: 'OUTBOARD',
        notes: 'Recommended for boats 22-35 ft with outboard rigging',
      },
      {
        productId: product2.id,
        notes: 'Universal mount. Compatible with all boat types.',
      },
    ],
  })

  console.log('Products seeded')

  // =============================================
  // 7. REVIEWS
  // =============================================
  await prisma.review.create({
    data: {
      rating: 5,
      title: 'Best boat I have ever owned',
      content: 'The Boston Whaler 280 Outrage is an incredible fishing machine. Handles rough seas like a dream and the twin Verados give it plenty of power. Build quality is outstanding - truly the unsinkable legend.',
      status: 'APPROVED',
      isVerified: true,
      boatId: boat1.id,
      userId: buyer1.id,
    },
  })

  await prisma.review.create({
    data: {
      rating: 5,
      title: 'Crystal clear display',
      content: 'The GPSMAP 8616xsv is hands down the best marine electronics I have used. The 16-inch screen is visible in direct sunlight and the touchscreen is responsive even with wet hands. Integration with LiveScope is game-changing for fishing.',
      status: 'APPROVED',
      isVerified: true,
      productId: product2.id,
      userId: buyer1.id,
    },
  })

  console.log('Reviews seeded')

  // =============================================
  // 8. SAMPLE INQUIRY
  // =============================================
  await prisma.inquiry.create({
    data: {
      status: 'NEW',
      subject: 'Interested in the 280 Outrage',
      message: 'Hi, I am very interested in the 2024 Boston Whaler 280 Outrage. Is it still available? Could I schedule a sea trial this weekend? I am pre-approved for financing up to $300K. Thanks!',
      phone: '+1-305-555-0123',
      boatId: boat1.id,
      buyerId: buyer1.id,
      sellerId: dealer1.id,
    },
  })

  console.log('Inquiries seeded')

  // =============================================
  // 9. BANNERS
  // =============================================
  await prisma.banner.createMany({
    data: [
      {
        title: 'Find Your Dream Boat',
        subtitle: 'Search thousands of boats from trusted dealers nationwide',
        image: '/images/banners/hero-boat.jpg',
        linkUrl: '/embarcaciones',
        linkText: 'Start Searching',
        position: 'HOMEPAGE_HERO',
        sortOrder: 1,
        isActive: true,
      },
      {
        title: 'Spring Sale: Up to 20% Off Marine Electronics',
        subtitle: 'Garmin, Lowrance, Simrad and more',
        image: '/images/banners/electronics-sale.jpg',
        linkUrl: '/productos/electronica-marina',
        linkText: 'Shop Now',
        position: 'HOMEPAGE_MID',
        sortOrder: 1,
        isActive: true,
      },
    ],
  })

  console.log('Banners seeded')

  // =============================================
  // 10. BLOG POSTS
  // =============================================
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'How to Choose Your First Boat: Complete Buyers Guide 2026',
        slug: 'how-to-choose-your-first-boat-buyers-guide',
        excerpt: 'Everything you need to know before buying your first boat. From choosing the right type to understanding costs of ownership.',
        content: 'Buying your first boat is an exciting milestone. This comprehensive guide walks you through every step of the process, from determining the right boat type for your needs to understanding the true costs of boat ownership including insurance, maintenance, marina fees, and fuel.',
        author: 'BoatMarket Editorial',
        blogCategory: 'Buying Guide',
        readTimeMinutes: 15,
        isPublished: true,
        isFeatured: true,
        metaTitle: 'How to Choose Your First Boat: Complete Buyers Guide 2026 | BoatMarket',
        metaDescription: 'Expert guide to buying your first boat. Learn about boat types, costs, financing, insurance, and everything you need for a smart purchase.',
        keywords: 'buy first boat, boat buying guide, how to choose a boat, boat costs, boat financing',
        publishedAt: new Date('2026-01-15'),
      },
      {
        title: 'Center Console vs Bowrider: Which Boat Type is Right for You?',
        slug: 'center-console-vs-bowrider-comparison',
        excerpt: 'A detailed comparison of center consoles and bowriders to help you decide which boat type fits your lifestyle.',
        content: 'Center consoles and bowriders are two of the most popular boat types on the market. While center consoles excel at fishing with their 360-degree fishability, bowriders shine as versatile family boats. This comparison covers performance, comfort, features, and resale value.',
        author: 'BoatMarket Editorial',
        blogCategory: 'Comparisons',
        readTimeMinutes: 10,
        isPublished: true,
        metaTitle: 'Center Console vs Bowrider: Complete Comparison Guide | BoatMarket',
        metaDescription: 'Center console or bowrider? Compare features, performance, costs and more to find your perfect boat type.',
        keywords: 'center console vs bowrider, boat type comparison, fishing boat vs family boat',
        publishedAt: new Date('2026-02-01'),
      },
      {
        title: 'Essential Boat Maintenance: Seasonal Checklist',
        slug: 'essential-boat-maintenance-seasonal-checklist',
        excerpt: 'Keep your boat in top condition year-round with this comprehensive maintenance checklist for every season.',
        content: 'Regular maintenance is key to keeping your boat running safely and retaining its value. This seasonal checklist covers everything from engine maintenance and hull care to electrical systems and trailer inspection.',
        author: 'BoatMarket Editorial',
        blogCategory: 'Maintenance',
        readTimeMinutes: 12,
        isPublished: true,
        metaTitle: 'Essential Boat Maintenance: Seasonal Checklist 2026 | BoatMarket',
        metaDescription: 'Complete seasonal boat maintenance checklist. Spring commissioning, summer care, fall winterization, and winter storage tips.',
        keywords: 'boat maintenance, boat care checklist, winterize boat, boat engine maintenance',
        publishedAt: new Date('2026-02-20'),
      },
    ],
  })

  console.log('Blog posts seeded')

  // =============================================
  // 11. SITE SETTINGS
  // =============================================
  await prisma.siteSetting.createMany({
    data: [
      { key: 'site_name', value: 'BoatMarket', group: 'general', description: 'Site name displayed in header and title' },
      { key: 'site_tagline', value: 'Find Your Dream Boat', group: 'general', description: 'Site tagline/slogan' },
      { key: 'contact_email', value: 'info@boatmarket.com', group: 'contact', description: 'Main contact email' },
      { key: 'contact_phone', value: '+1 (800) 555-BOAT', group: 'contact', description: 'Main contact phone' },
      { key: 'listing_duration_days', value: '90', group: 'listings', description: 'Default listing duration in days' },
      { key: 'featured_price_monthly', value: '49.99', group: 'pricing', description: 'Monthly price for featured listing' },
      { key: 'commission_rate', value: '0.03', group: 'pricing', description: 'Commission rate for product sales (3%)' },
      { key: 'max_images_per_listing', value: '50', group: 'listings', description: 'Maximum images per boat listing' },
      { key: 'enable_reviews', value: 'true', group: 'features', description: 'Enable user reviews' },
      { key: 'enable_messaging', value: 'true', group: 'features', description: 'Enable internal messaging' },
      { key: 'enable_alerts', value: 'true', group: 'features', description: 'Enable search alerts' },
    ],
  })

  console.log('Site settings seeded')
  console.log('\nDatabase seeding complete!')
  console.log('\nTest accounts:')
  console.log('  Admin:  admin@boatmarket.com / admin123456')
  console.log('  Dealer: dealer@marinasunshine.com / user123456')
  console.log('  Dealer: sales@baysidemarine.com / user123456')
  console.log('  Seller: john@example.com / user123456')
  console.log('  Buyer:  buyer@example.com / user123456')
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

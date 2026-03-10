import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import { resend } from '@/lib/email/client'
import { inquiryNotification } from '@/lib/email/templates'

const inquirySchema = z.object({
  boatId: z.string().min(1, 'El ID de la embarcacion es requerido'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email valido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  type: z.enum(['info', 'visit', 'offer']).default('info'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = inquirySchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Datos invalidos',
          details: validation.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      )
    }

    const { boatId, name, email, phone, message, type } = validation.data

    // Find the boat and its seller
    const boat = await prisma.boat.findUnique({
      where: { id: boatId },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!boat) {
      return NextResponse.json(
        { error: 'Embarcacion no encontrada' },
        { status: 404 }
      )
    }

    // Create the inquiry
    const inquiry = await prisma.inquiry.create({
      data: {
        boatId,
        name,
        email,
        phone: phone || null,
        message,
        type,
        status: 'new',
      },
    })

    // Send email notification to the seller
    if (boat.seller?.email) {
      try {
        const emailHtml = inquiryNotification({
          sellerName: boat.seller.name || 'Vendedor',
          buyerName: name,
          buyerEmail: email,
          buyerPhone: phone,
          boatTitle: boat.title,
          boatSlug: boat.slug,
          message,
          inquiryType: type,
        })

        await resend.emails.send({
          from: 'BoatMarket <notificaciones@boatmarket.com.ar>',
          to: boat.seller.email,
          subject: `Nueva consulta por ${boat.title}`,
          html: emailHtml,
        })
      } catch (emailError) {
        // Log but don't fail the request if email fails
        console.error('Error sending inquiry notification email:', emailError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        inquiry: {
          id: inquiry.id,
          boatId: inquiry.boatId,
          name: inquiry.name,
          email: inquiry.email,
          type: inquiry.type,
          status: inquiry.status,
          createdAt: inquiry.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Inquiry API error:', error)
    return NextResponse.json(
      { error: 'Error al enviar la consulta' },
      { status: 500 }
    )
  }
}

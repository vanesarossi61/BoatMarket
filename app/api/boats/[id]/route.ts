import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { auth } from '@/lib/auth/auth'

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET — Fetch a single boat with relations
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params

    const boat = await prisma.boat.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            accountType: true,
          },
        },
        category: true,
        brand: true,
        images: {
          orderBy: { order: 'asc' },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!boat) {
      return NextResponse.json(
        { error: 'Embarcacion no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(boat)
  } catch (error) {
    console.error('GET boat error:', error)
    return NextResponse.json(
      { error: 'Error al obtener la embarcacion' },
      { status: 500 }
    )
  }
}

// PATCH — Update a boat (owner or admin only)
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = await context.params

    // Check boat exists and user is owner or admin
    const existingBoat = await prisma.boat.findUnique({
      where: { id },
      select: { sellerId: true },
    })

    if (!existingBoat) {
      return NextResponse.json(
        { error: 'Embarcacion no encontrada' },
        { status: 404 }
      )
    }

    const isOwner = existingBoat.sellerId === session.user.id
    const isAdmin = session.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'No tenes permiso para editar esta embarcacion' },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Remove fields that shouldn't be directly updated
    const { id: _id, sellerId: _sellerId, createdAt: _createdAt, ...updateData } = body

    const updatedBoat = await prisma.boat.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        category: true,
        brand: true,
      },
    })

    return NextResponse.json(updatedBoat)
  } catch (error) {
    console.error('PATCH boat error:', error)
    return NextResponse.json(
      { error: 'Error al actualizar la embarcacion' },
      { status: 500 }
    )
  }
}

// DELETE — Soft delete a boat (owner or admin only)
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = await context.params

    // Check boat exists and user is owner or admin
    const existingBoat = await prisma.boat.findUnique({
      where: { id },
      select: { sellerId: true },
    })

    if (!existingBoat) {
      return NextResponse.json(
        { error: 'Embarcacion no encontrada' },
        { status: 404 }
      )
    }

    const isOwner = existingBoat.sellerId === session.user.id
    const isAdmin = session.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'No tenes permiso para eliminar esta embarcacion' },
        { status: 403 }
      )
    }

    // Soft delete — mark as deleted instead of removing
    await prisma.boat.update({
      where: { id },
      data: {
        status: 'deleted',
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE boat error:', error)
    return NextResponse.json(
      { error: 'Error al eliminar la embarcacion' },
      { status: 500 }
    )
  }
}

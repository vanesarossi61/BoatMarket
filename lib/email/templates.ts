// =============================================
// BOATMARKET - Email Templates
// Marine-themed blue/white design
// =============================================

const baseStyles = `
  body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f0f7ff; }
  .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,40,100,0.08); }
  .header { background: linear-gradient(135deg, #0c2340 0%, #1e3a5f 100%); padding: 32px; text-align: center; }
  .header img { height: 40px; }
  .header h1 { color: #ffffff; font-size: 22px; margin: 12px 0 0; font-weight: 700; }
  .body { padding: 32px; color: #1a2332; line-height: 1.6; }
  .body h2 { color: #0c2340; font-size: 20px; margin-top: 0; }
  .body p { margin: 0 0 16px; font-size: 15px; }
  .btn { display: inline-block; padding: 14px 28px; background: #2563eb; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; }
  .btn:hover { background: #1d4ed8; }
  .footer { background: #f0f7ff; padding: 24px 32px; text-align: center; color: #64748b; font-size: 13px; }
  .footer a { color: #2563eb; text-decoration: none; }
  .divider { height: 1px; background: #e2e8f0; margin: 24px 0; }
  .highlight-box { background: #f0f7ff; border-left: 4px solid #2563eb; padding: 16px; border-radius: 0 8px 8px 0; margin: 16px 0; }
  .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
  .detail-label { color: #64748b; font-size: 14px; }
  .detail-value { color: #0c2340; font-weight: 600; font-size: 14px; }
`

function wrapTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${baseStyles}</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>BoatMarket</h1>
    </div>
    ${content}
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} BoatMarket. Todos los derechos reservados.</p>
      <p><a href="https://boatmarket.com.ar">boatmarket.com.ar</a> | <a href="mailto:soporte@boatmarket.com.ar">soporte@boatmarket.com.ar</a></p>
    </div>
  </div>
</body>
</html>`
}

export function inquiryNotification(data: {
  sellerName: string
  buyerName: string
  buyerEmail: string
  buyerPhone?: string
  boatTitle: string
  boatUrl: string
  message: string
  inquiryType: string
}): { subject: string; html: string } {
  const typeLabels: Record<string, string> = {
    boat: 'Consulta sobre embarcacion',
    negotiation: 'Negociacion de precio',
    visit: 'Solicitud de visita',
    sea_trial: 'Solicitud de prueba de mar',
    product: 'Consulta sobre producto',
    general: 'Consulta general',
  }

  return {
    subject: `Nueva consulta: ${data.boatTitle}`,
    html: wrapTemplate(`
      <div class="body">
        <h2>Hola ${data.sellerName},</h2>
        <p>Recibiste una nueva consulta sobre tu publicacion.</p>
        <div class="highlight-box">
          <p style="margin:0;font-weight:600;">${typeLabels[data.inquiryType] || data.inquiryType}</p>
          <p style="margin:4px 0 0;"><a href="${data.boatUrl}" style="color:#2563eb;">${data.boatTitle}</a></p>
        </div>
        <div class="divider"></div>
        <p><strong>De:</strong> ${data.buyerName} (${data.buyerEmail})</p>
        ${data.buyerPhone ? `<p><strong>Telefono:</strong> ${data.buyerPhone}</p>` : ''}
        <div class="highlight-box">
          <p style="margin:0;">${data.message}</p>
        </div>
        <div class="divider"></div>
        <p style="text-align:center;">
          <a href="${data.boatUrl}" class="btn">Ver publicacion</a>
        </p>
      </div>
    `),
  }
}

export function welcomeEmail(data: {
  name: string
  loginUrl: string
}): { subject: string; html: string } {
  return {
    subject: 'Bienvenido a BoatMarket',
    html: wrapTemplate(`
      <div class="body">
        <h2>Bienvenido a bordo, ${data.name}!</h2>
        <p>Tu cuenta en BoatMarket fue creada exitosamente. Ahora podes:</p>
        <ul style="padding-left:20px;">
          <li>Explorar cientos de embarcaciones en venta</li>
          <li>Publicar tus propias embarcaciones</li>
          <li>Contactar vendedores directamente</li>
          <li>Comparar embarcaciones lado a lado</li>
          <li>Guardar tus favoritos</li>
        </ul>
        <div class="divider"></div>
        <p style="text-align:center;">
          <a href="${data.loginUrl}" class="btn">Ingresar a mi cuenta</a>
        </p>
      </div>
    `),
  }
}

export function listingApproved(data: {
  sellerName: string
  boatTitle: string
  boatUrl: string
}): { subject: string; html: string } {
  return {
    subject: `Tu publicacion fue aprobada: ${data.boatTitle}`,
    html: wrapTemplate(`
      <div class="body">
        <h2>Buenas noticias, ${data.sellerName}!</h2>
        <p>Tu publicacion <strong>${data.boatTitle}</strong> fue revisada y aprobada. Ya esta visible para todos los usuarios de BoatMarket.</p>
        <div class="highlight-box">
          <p style="margin:0;">Consejos para mejorar tu publicacion:</p>
          <ul style="padding-left:20px;margin:8px 0 0;">
            <li>Agrega fotos de alta calidad</li>
            <li>Completa todas las especificaciones</li>
            <li>Mantene el precio actualizado</li>
            <li>Responde rapido a las consultas</li>
          </ul>
        </div>
        <div class="divider"></div>
        <p style="text-align:center;">
          <a href="${data.boatUrl}" class="btn">Ver mi publicacion</a>
        </p>
      </div>
    `),
  }
}

export function listingRejected(data: {
  sellerName: string
  boatTitle: string
  reason: string
  editUrl: string
}): { subject: string; html: string } {
  return {
    subject: `Publicacion no aprobada: ${data.boatTitle}`,
    html: wrapTemplate(`
      <div class="body">
        <h2>Hola ${data.sellerName},</h2>
        <p>Lamentablemente, tu publicacion <strong>${data.boatTitle}</strong> no fue aprobada por el siguiente motivo:</p>
        <div class="highlight-box">
          <p style="margin:0;">${data.reason}</p>
        </div>
        <p>Podes editar la publicacion y volver a enviarla para revision.</p>
        <div class="divider"></div>
        <p style="text-align:center;">
          <a href="${data.editUrl}" class="btn">Editar publicacion</a>
        </p>
      </div>
    `),
  }
}

export function passwordReset(data: {
  name: string
  resetUrl: string
  expiresIn: string
}): { subject: string; html: string } {
  return {
    subject: 'Restablecer tu contrasena - BoatMarket',
    html: wrapTemplate(`
      <div class="body">
        <h2>Hola ${data.name},</h2>
        <p>Recibimos una solicitud para restablecer la contrasena de tu cuenta en BoatMarket.</p>
        <p>Hace clic en el siguiente boton para crear una nueva contrasena:</p>
        <p style="text-align:center;margin:24px 0;">
          <a href="${data.resetUrl}" class="btn">Restablecer contrasena</a>
        </p>
        <div class="highlight-box">
          <p style="margin:0;font-size:13px;">Este enlace expira en ${data.expiresIn}. Si no solicitaste este cambio, ignora este email.</p>
        </div>
      </div>
    `),
  }
}

export function orderConfirmation(data: {
  buyerName: string
  orderId: string
  items: Array<{ name: string; quantity: number; price: string }>
  subtotal: string
  shipping: string
  total: string
  orderUrl: string
}): { subject: string; html: string } {
  const itemRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${item.name}</td>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;text-align:right;">${item.price}</td>
      </tr>`
    )
    .join('')

  return {
    subject: `Confirmacion de pedido #${data.orderId}`,
    html: wrapTemplate(`
      <div class="body">
        <h2>Gracias por tu compra, ${data.buyerName}!</h2>
        <p>Tu pedido <strong>#${data.orderId}</strong> fue confirmado exitosamente.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <thead>
            <tr style="border-bottom:2px solid #e2e8f0;">
              <th style="text-align:left;padding:8px 0;color:#64748b;font-size:13px;">Producto</th>
              <th style="text-align:center;padding:8px 0;color:#64748b;font-size:13px;">Cant.</th>
              <th style="text-align:right;padding:8px 0;color:#64748b;font-size:13px;">Precio</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
        <div style="text-align:right;margin-top:16px;">
          <p style="margin:4px 0;font-size:14px;"><span style="color:#64748b;">Subtotal:</span> ${data.subtotal}</p>
          <p style="margin:4px 0;font-size:14px;"><span style="color:#64748b;">Envio:</span> ${data.shipping}</p>
          <p style="margin:8px 0 0;font-size:18px;font-weight:700;color:#0c2340;">Total: ${data.total}</p>
        </div>
        <div class="divider"></div>
        <p style="text-align:center;">
          <a href="${data.orderUrl}" class="btn">Ver mi pedido</a>
        </p>
      </div>
    `),
  }
}

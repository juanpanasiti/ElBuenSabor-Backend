const { logInfo } = require("../../config/logger.config");


exports.getSimpleFacturaHTML = (pedido) => {
  const numFactura = pedido.numero;
  const domicilio = `${pedido.domicilio.calle} ${pedido.domicilio.numero} - ${pedido.domicilio.localidad}, Mendoza`;
  const d = new Date(pedido.fecha);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const fecha = `${da}-${mo}-${ye}`;

  const nombreCliente = `${pedido.usuario.nombre} ${pedido.usuario.apellido} `;
  const encabezadoFactura = `
<p class="titulo-factura">Factura C - ORIGINAL</p>
<hr>
<p class="titulo-delivery">El Buen Sabor - Delivery</p>
<p><b>Domicilio:</b> Calle Falsa 123 - Godoy Cruz, Mendoza</p>
<p><b>Punto de vta.:</b> 0001</p>
<p><b>N° Factura:</b> ${numFactura}</p>
<p><b>Fecha:</b> ${fecha}</p>
<p><b>Cliente:</b> ${nombreCliente}</p>
<p><b>Domicilio:</b> ${domicilio}</p>
<hr>
`;
  const items = [];
  for (const plato of pedido.detalle.platos) {
    items.push(`
    <tr>
    <td> ${plato.item_id.denominacion} </td>
    <td> ${plato.cantidad} </td>
    <td> ${plato.item_id.precioVenta * plato.cantidad} </td>
    </tr>
    `);
  }
  for (const reventa of pedido.detalle.reventas) {
    items.push(`
    <tr>
        <td> ${reventa.item_id.denominacion} </td>
        <td> ${reventa.cantidad} </td>
        <td> ${reventa.item_id.precioVenta * reventa.cantidad} </td>
    </tr>
    `);
  }

  let detalleFactura = `
  <table>
  <thead>
  
  <th>Artículo</th>
  <th>Cant.</th>
  <th>Monto</th>
  </thead>

  <tbody>
  ${items}

  <tr>
    <th colspan="2">SUBTOTAL:</th>
    <td>${pedido.detalle.subtotal}</td>
  </tr>
  <tr>
    <th colspan="2">Descuento:</th>
    <td>${pedido.detalle.subtotal - pedido.total}</td>
  </tr>
  <tr>
    <th colspan="2">TOTAL:</th>
    <td>${pedido.total}</td>
  </tr>
  </tbody>

  </table>
`;

  const estilo = `
<style>
.factura {
    font-family: Arial, Helvetica, sans-serif;
}
.titulo-factura {
    text-align: center;
    font-weight: bolder;
    font-size: 20px
}
.titulo-delivery {
    font-weight: bolder;
    font-size: 20px
}
</style>
`;
  //<></>
  return `
  <div class="factura">
  ${encabezadoFactura}
  
  ${detalleFactura}
  </div>
  ${estilo}
  `;
};

const { logInfo } = require("../../config/logger.config");

const html = `<p>FACTURA C - Original</p>
<p>El Buen Sabor Delivery</p>
<p>
  <strong>Domicilio:</strong> Calle Falsa 123 - Godoy Cruz, Mendoza
</p>
<p><strong>Punto de Venta: </strong> 0001</p>
<p><strong>N° Factura: </strong> 000001</p>
<p><strong>Fecha: </strong> 00/00/00</p>
<div class="table-responsive" style="width: 50em;">

  <p><strong>Cliente: </strong> Pepe Honguito </p>
  <p><strong>Dirección: </strong> Otra calle 321 - Ciudad, Mendoza </p>

  <table class="table">
    <thead>
      <th>Artículo</th>
      <th>Cantidad</th>
      <th>Subtotal</th>
    </thead>
    <tbody>
      <tr>
        <td>Hamburgues</td>
        <td>1</td>
        <td>150</td>
      </tr>
      <tr>
        <td>Hamburgues</td>
        <td>1</td>
        <td>150</td>
      </tr>
      <tr>
        <td>Hamburgues</td>
        <td>1</td>
        <td>150</td>
      </tr>
      <tr>
        <th colspan="2">SUBTOTAL:</th>
        <td>450</td>
      </tr>
      <tr>
        <th colspan="2">Descuento:</th>
        <td>0</td>
      </tr>
      <tr>
        <th colspan="2">TOTAL:</th>
        <td>450</td>
      </tr>
    </tbody>
  </table>`;

exports.getFacturaHTML = () => {
  return `
    <!DOCTYPE html>
<html>

<head>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
		integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
	<title>Factura modelo</title>
</head>

<body>
	<div class="table-responsive" style="width: 70em;">
		<table class="table table-bordered" >
			<tr>
				<td colspan="2" style="align-content: center;">
					<h3  style="text-align: center; font-weight: bolder;">FACTURA C - Original</h3>
				</td>
			</tr>

			<tr>
				<td>
					<h2 style="font-weight: bolder;">El Buen Sabor - Delivery</h2>
					<p>
						<strong>Domicilio:</strong> Calle Falsa 123 - Godoy Cruz, Mendoza
					</p>
				</td>
				<td>
          <p><strong>Punto de Venta: </strong> 0001</p>
          <p><strong>N° Factura: </strong> 000001</p>
          <p><strong>Fecha: </strong> 00/00/00</p>
				</td>
			</tr>

			<tr>
				<td colspan="2">
          <p><strong>Cliente: </strong> Pepe Honguito </p>
          <p><strong>Dirección: </strong> Otra calle 321 - Ciudad, Mendoza </p>
				</td>
      </tr>
      
      <tr>
        <td colspan="2">
          <table class="table">
            <thead>
              <th>Artículo</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </thead>
            <tbody>
              <tr>
                <td>Hamburgues</td>
                <td>1</td>
                <td>150</td>
              </tr>
              <tr>
                <td>Hamburgues</td>
                <td>1</td>
                <td>150</td>
              </tr>
              <tr>
                <td>Hamburgues</td>
                <td>1</td>
                <td>150</td>
              </tr>
              <tr>
                <th colspan="2">SUBTOTAL:</th>
                <td>450</td>
              </tr>
              <tr>
                <th colspan="2">Descuento:</th>
                <td>0</td>
              </tr>
              <tr>
                <th colspan="2">TOTAL:</th>
                <td>450</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
		</table>

	</div>
</body>

</html>
    `;
};

exports.getSimpleFacturaHTML = (pedido) => {
  const numFactura = pedido.numero;
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

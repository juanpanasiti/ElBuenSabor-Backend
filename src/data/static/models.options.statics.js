module.exports = {
    unidadesMedida: () => {
        options = ["gr", "cc", "unidades"]
        return options
    },
    estadoPedido: () => {
        options = ["Pendiente", "Cancelado","En Proceso","Preparado", "En Delivery", "Entregado"]
        return options
    },
    formasPago: () => {
        options = ["Efectivo", "Tarjeta Crédito","Tarjeta Débito"]
        return options
    },
    nombresRoles: () => {
        options = ["Administrador", "Cajero","Cocinero","Delivery"]
        return options
    }
}//exports
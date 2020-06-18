//urls base
const URL_BASE = '/api'
const URL_ROLES = URL_BASE + '/roles'

//implementaciones de los endpoints
const rolesRoutes = require('./roles.routes')


exports.assignRoutes = (app) => {
    //ENDPOINTS
    //Articulos Insumo
    //Articulos Reventa
    //Detalle Ingredientes
    //Domicilios
    //Platos
    //Roles
    app.get(URL_ROLES, rolesRoutes.getRoles) //Roles no borrados
    //Rubros
    //Usuarios
    
}
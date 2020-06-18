//urls base
const URL_BASE = '/api'
const URL_ROLES = URL_BASE + '/roles'
const URL_RUBROS = URL_BASE + '/rubros'

//implementaciones de los endpoints
const rolesRoutes = require('./roles.routes')
const rubrosRoutes = require('./rubro.routes')


exports.assignRoutes = (app) => {
    //ENDPOINTS
    //Articulos Insumo
    //Articulos Reventa
    //Detalle Ingredientes
    //Domicilios
    //Platos
    
    //Roles
    app.get(URL_ROLES + '/', rolesRoutes.getRoles) //Roles no borrados
    
    //Rubros
    app.post(URL_RUBROS + '/', rubrosRoutes.createRubro)//Crear un rubro
    app.get(URL_RUBROS + '/', rubrosRoutes.getRubros)//Obtener rubros no borrados
    app.get(URL_RUBROS + '/borrados', rubrosRoutes.getRubrosBorrados)//Obtener rubros borrados
    app.get(URL_RUBROS + '/deInsumo', rubrosRoutes.getRubrosInsumo)//obtener rubros de insumos
    app.get(URL_RUBROS + '/deCatalogo', rubrosRoutes.getRubrosCatalogo)//obtener rubros de catalogo
    app.get(URL_RUBROS + '/:id', rubrosRoutes.getRubro) //obtener un rubro
    app.put(URL_RUBROS + '/:id', rubrosRoutes.updateRubro) //actualizar un rubro
    app.put(URL_RUBROS + '/softdelete/:id', rubrosRoutes.softDeleteRubro) //borrado lógico de un rubro
    app.put(URL_RUBROS + '/softundelete/:id',rubrosRoutes.softUndeleteRubro) //restaurado lógico de un rubro
    app.delete(URL_RUBROS + '/harddelete/:id', rubrosRoutes.hardDeleteRubro) //borrado fisico de un rubro

    //Usuarios
    
}
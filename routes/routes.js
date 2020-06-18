//urls base
const URL_BASE = '/api'
const URL_ROLES = URL_BASE + '/roles'
//rutas
const roles = require('./rol')

exports.assignRoutes = (app) => {
    app.get(URL_ROLES, roles.getRoles)
}
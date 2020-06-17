# El Buen Sabor - Delivery
Trabajo final de la materia Laboratorio IV de la Tecnicatura Superior en Programación.
Este repo viene a ser el backend del proyecto, desarrollado en NodeJS+Express y haciendo uso de la librería Mongoose para conectar con una base de datos MongoDB.

## Endpoints
### Rubro
**Base:** `/api/rubros`
**Campos:**
`borrado`: boolean
`_id`: string
`denominacion`: string
`esRubroConsumo`: boolean
`rubroPadreId`: string
#### `GET ALL`
Solo trae los que no estén marcados como 'borrado'
**HTTP method:** `GET`  
**URL:** `BASE + '/'`

#### `GET ERASEDS`
Solo trae los que no estén marcados como 'borrado'
**HTTP method:** `GET`  
**URL:** `BASE + '/'`

#### `GET MANY` - Rubros para artículos insumo
**HTTP method:** `GET`  
**URL:** `BASE + '/insumo'`

#### `GET MANY` - Rubros para artículos del catálogo
Platos + reventa  
**HTTP method:** `GET`  
**URL:** `BASE + '/catalogo'`  

#### `GET ONE`
**HTTP method:** `GET`  
**URL:** `BASE + '/' + _id`  

#### `CREATE`
**HTTP method:** `POST`  
**URL:** `BASE + '/'`  
Espera un JSON con los campos `denominacion`, `esRubroInsumo` y `rubroPadreId`

#### `UPDATE`
**HTTP method:** `PUT`  
**URL:** `BASE + '/' + _id`  
Espera un JSON con los campos `denominacion`, `esRubroInsumo` y `rubroPadreId`

#### `SOFT DELETE`
**HTTP method:** `PUT`  
**URL:** `BASE + '/delete' + _id`  
Settea a `true` el campo `borrado`

#### `SOFT UNDELETE`
**HTTP method:** `PUT`  
**URL:** `BASE + '/undelete' + _id`  
Settea a `false` el campo `borrado`

# El Buen Sabor - Delivery
Trabajo final de la materia Laboratorio IV de la Tecnicatura Superior en Programación.
Este repo viene a ser el backend del proyecto, desarrollado en NodeJS+Express y haciendo uso de la librería Mongoose para conectar con una base de datos MongoDB.

Se utiliza la siguiente estructura de carpetas:  
`./`: la raíz contiene los archivos:
  - `config.json`: contiene los datos de conexión de la base de datos y el puesto y nombre del servidor.
  - `index.js`: punto de entrada de la API
  - demás archivos propios de NodeJS

`./tools`:
  - `db_tools.js`: archivo encargado de gestionar la conexión con la base de datos, totalmente separado de los datos de conexión.

  `./routes`: aca van los archivos encargados de definir los endpoints, pero no de su implementación, o sea, solo definen las rutas, llaman a las funciones del dominio encargadas y retornan al cliente los datos correspondientes.
    - `routes.js` define las distintas rutas de los endpoints, pero las llamadas a funciones y retornos de datos están definidas en los diferentes `*.routes.js`

    `./domain`: contiene los `*.domain.js` que manejan la lógica de negocio de la API, en caso de ser necesario también se comunican con la capa de repositorio (en este caso, llamada `db`)

    `./db`: acá se encuentran los `*.db.js`, que son los archivos encargados de comunicarse directamente con la base de datos utilizando los modelos definidos en la carpeta `models`

    `./models`: contiene los modelos o schemas de los documentos para comunicarse con la base de datos, MongoDB para este caso.

## Endpoints
### Rubro
**Base:** `/api/rubros`  
**Campos:**  
`borrado`: boolean  
`_id`: string  
`denominacion`: string  
`esRubroConsumo`: boolean  
`rubroPadre`: string (ObjectId)  
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

### Articulos Insumo
**Base:** `/api/insumos`  
**Campos:**  
`borrado`: boolean  
`_id`: string  
`denominacion`: string    
`precioCompra`: number (decimal)  
`stockActual`: number  
`stockMinimo`: number  
`stockMaximo`: number  
`unidadMedida`: string  
`rubro`: string (ObjectId)  
#### `GET ALL`
Solo trae los que no estén marcados como 'borrado'
**HTTP method:** `GET`  
**URL:** `BASE + '/'`

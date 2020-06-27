# El Buen Sabor - Delivery
Trabajo final de la materia Laboratorio IV de la Tecnicatura Superior en Programación.
Este repo viene a ser el backend del proyecto, desarrollado en NodeJS+Express y haciendo uso de la librería Mongoose para conectar con una base de datos MongoDB.

Se utiliza la siguiente estructura de carpetas:  
`./`: la raíz contiene los archivos:
  - `config.json`: contiene los datos de conexión de la base de datos y el puesto y nombre del servidor.
  - `app.js`: punto de entrada de la API
  - demás archivos propios de NodeJS

  `./routes`: aca van los archivos encargados de definir los endpoints, pero no de su implementación, o sea, solo definen las rutas, llaman a las funciones del dominio encargadas y retornan al cliente los datos correspondientes.
    - `routes.js` define las distintas rutas de los endpoints, pero las llamadas a funciones y retornos de datos están definidas en los diferentes `*.routes.js`

    `./domain`: contiene los `*.domain.js` que manejan la lógica de negocio de la API, en caso de ser necesario también se comunican con la capa de repositorio (en este caso, llamada `db`)

    `./db`: acá se encuentran los `*.db.js`, que son los archivos encargados de comunicarse directamente con la base de datos utilizando los modelos definidos en la carpeta `models`

    `./models`: contiene los modelos o schemas de los documentos para comunicarse con la base de datos, MongoDB para este caso.
## Schemas
#### Rubro
  - `denominacion`:
    - Tipo: string
    - Required: true
  - `esRubroInsumo`
    - Tipo: boolean
    - default: false
  - `rubroPadre`
    - Tipo: string
    - ref: 'Rubro'
    - default: ""
  - `borrado`
    - Tipo: boolean
    - default: false
#### Usuario
  - `email`:
    - Tipo: string
    - Required: true
  - `nombre`:
    - Tipo: string
    - default: ""
  - `apellido`:
    - Tipo: string
    - default: ""
  - `fechaNacimiento`:
    - Tipo: Date
    - default: ""
  - `telefono`:
    - Tipo: Number
    - default: ""
  - `borrado`:
    - Tipo: boolean
    - default: false

#### Rol
  - `usuario`:
    - Tipo: ObjectId
    - Required: true
  - `nombreRol`:
    - Tipo: string
    - required: true  
  - `borrado`:
    - Tipo: boolean
    - default: false

#### Artículos de Reventa
  - `denominacion`:
    - Tipo: string
    - require: true
  - `unidadMedida`:
    - Tipo: string
    - require: true
  - `rubro`:
    - Tipo: ObjectId
    - require: true
  - `precioCompra`:
    - Tipo: number
    - default: 0
  - `precioVenta`:
    - Tipo: number
    - default: 0
  - `stockActual`:
    - Tipo: number
    - default: 0
  - `stockMinimo`:
    - Tipo: number
    - default: 0
  - `stockMaximo`:
    - Tipo: number
    - default: 0
  - `stock`:
    - Tipo: number
    - default: 0
  - `borrado`:
    - Tipo: boolean
    - default: false  

#### Artículos Insumo
  - `denominacion`:
    - Tipo: string
    - require: true
  - `unidadMedida`:
    - Tipo: string
    - require: true
  - `rubro`:
    - Tipo: ObjectId
    - require: true
  - `precioCompra`:
    - Tipo: number
    - default: 0
  - `stockActual`:
    - Tipo: number
    - default: 0
  - `stockMinimo`:
    - Tipo: number
    - default: 0
  - `stockMaximo`:
    - Tipo: number
    - default: 0
  - `stock`:
    - Tipo: number
    - default: 0
  - `borrado`:
    - Tipo: boolean
    - default: false

#### Rol
  - `denominacion`:
    - Tipo: String
    - Required: true
  - `tiempoCocina`:
    - Tipo: Number
    - required: true  
  - `precioVenta`:
    - Tipo: Number
    - required: true  
  - `imagenPath`:
    - Tipo: String
    - Required: true
  - `rubro`:
    - Tipo: ObjectId
    - Required: true
  - `borrado`:
    - Tipo: boolean
    - default: false

## Endpoints
**URL_BASE:** `"/api"`
### Rubro
**URL_RUBROS:** `URL_BASE + "/rubros"`  

*POST*: **URL_RUBROS** + `"/"` -> Crear un rubro  
*GET*: **URL_RUBROS** + `"/"` -> Obtener rubros no borrados  
*GET*: **URL_RUBROS** + `"/raices"` -> Obtener rubros raíz (no borrados)   
*GET*: **URL_RUBROS** + `"/:id/subrubros` -> Obtener subrubros (no borrados)  
*GET*: **URL_RUBROS** + `"/borrados"` -> Obtener rubros borrados  
*GET*: **URL_RUBROS** + `"/deInsumo"` -> obtener rubros de insumos  
*GET*: **URL_RUBROS** + `"/deCatalogo"` -> obtener rubros de catalogo  
*GET*: **URL_RUBROS** + `"/:id"` -> obtener un rubro  
*PUT*: **URL_RUBROS** + `"/:id"` -> actualizar un rubro  
*PUT*: **URL_RUBROS** + `"/softdelete/:id"` -> borrado lógico de un rubro  
*PUT*: **URL_RUBROS** + `"/softundelete/:id"` -> restaurado lógico de un rubro  
*DELETE*: **URL_RUBROS** + `"/harddelete/:id"` -> borrado fisico de un rubro  

### Usuarios
**URL_USUARIOS:** `URL_BASE + "/usuarios"`  
~*POST*:~ El usuario se crea al hacer el `check/:email`  
*GET*: **URL_USUARIOS** + `"/"` -> Obtener todos los usuarios (borrados o no). Esto solo lo debería acceder el admin  
*GET*: **URL_USUARIOS** + `"/check/:email"` -> Obtener usuario por email  
*GET*: **URL_USUARIOS** + `"/:id"` -> Obtener usuario por ID  
*PUT*: **URL_USUARIOS** + `"/:id"` -> Actualizar un usuario  
*PUT*: **URL_USUARIOS** + `"/softdelete/:id"` -> Borrado lógico de un usuario  
*PUT*: **URL_USUARIOS** + `"/softundelete/:id"` -> Restaurado lógico de un usuario  
*DELETE*: **URL_USUARIOS** + `"/harddelete/:id"` -> Borrado físico de un usuario  
*GET*: **URL_USUARIOS** + `"/roles/:email"` -> Obtener todos los roles de un email
### Roles
**URL_ROLES:** `URL_BASE + "/roles"`

*POST*: **URL_ROLES** + `"/"` -> Crear rol  
*GET*: **URL_ROLES** + `"/"` -> Obtener roles no borrados  
*GET*: **URL_ROLES** + `"/:id"` -> Obtener rol por ID  
*PUT*: **URL_ROLES** + `"/:id"` -> Actualizar rol  
*PUT*: **URL_ROLES** + `"/softdelete/:id"` -> Borrado lógico de un rol  
*PUT*: **URL_ROLES** + `"/softundelete/:id"` -> Restaurado lógico de un rol  
*DELETE*: **URL_ROLES** + `"/harddelete/:id"` -> Borrado físico de un rol  

### Artículos de Reventa
**URL_REVENTA:** `URL_BASE + "/reventas"`
*POST*: **URL_REVENTA** + `"/"` -> Crear reventa  
*GET*: **URL_REVENTA** + `"/"` -> Obtener reventas no borrados  
*GET*: **URL_REVENTA** + `"/:id"` -> Obtener reventa por ID   
*PUT*: **URL_REVENTA** + `"/:id"` -> Actualizara reventa  
*PUT*: **URL_REVENTA** + `"/softdelete/:id"` -> Borrado lógico de una reventa  
*PUT*: **URL_REVENTA** + `"/softundelete/:id"` -> Restaurado lógico de una reventa  
*DELETE*: **URL_REVENTA** + `"/harddelete/:id"` -> Borrado físico de una reventa  

### Artículos Insumo
**URL_INSUMO:** `URL_BASE + "/insumos"`
*POST*: **URL_INSUMO** + `"/"` -> Crear insumo  
*GET*: **URL_INSUMO** + `"/"` -> Obtener insumos no borrados  
*GET*: **URL_INSUMO** + `"/:id"` -> Obtener insumo por ID  
*PUT*: **URL_INSUMO** + `"/:id"` -> Actualizara insumo  
*PUT*: **URL_INSUMO** + `"/softdelete/:id"` -> Borrado lógico de un insumo  
*PUT*: **URL_INSUMO** + `"/softundelete/:id"` -> Restaurado lógico de un insumo  
*DELETE*: **URL_INSUMO** + `"/harddelete/:id"` -> Borrado físico de un insumo  

### Artículos Manufacturados (Platos)
**URL_PLATOS:** `URL_BASE + "/platos"`
*POST*: **URL_PLATOS** + `"/"` -> Crear plato  
*GET*: **URL_PLATOS** + `"/"` -> Obtener platos no borrados  
*GET*: **URL_PLATOS** + `"/:id"` -> Obtener plato por ID  
*PUT*: **URL_PLATOS** + `"/:id"` -> Actualizara plato  
*PUT*: **URL_PLATOS** + `"/softdelete/:id"` -> Borrado lógico de un plato  
*PUT*: **URL_PLATOS** + `"/softundelete/:id"` -> Restaurado lógico de un plato  
*DELETE*: **URL_PLATOS** + `"/harddelete/:id"` -> Borrado físico de un plato  

### Artículo Manufacturado Detalle (Ingredientes/Receta)
**URL_INGREDIENTES:** `URL_BASE + "/ingredientes"`
*POST*: **URL_INGREDIENTES** + `"/"` -> Crear ingrediente  
*GET*: **URL_INGREDIENTES** + `"/"` -> Obtener ingredientes no borrados  
*GET*: **URL_INGREDIENTES** + `"/:id"` -> Obtener ingrediente por ID  
*PUT*: **URL_INGREDIENTES** + `"/:id"` -> Actualizara ingrediente  
*PUT*: **URL_INGREDIENTES** + `"/softdelete/:id"` -> Borrado lógico de un ingrediente  
*PUT*: **URL_INGREDIENTES** + `"/softundelete/:id"` -> Restaurado lógico de un ingrediente  
*DELETE*: **URL_INGREDIENTES** + `"/harddelete/:id"` -> Borrado físico de un ingrediente  

### Domicilios
**URL_DOMICILIOS:** `URL_BASE + "/domicilios"`
*POST*: **URL_DOMICILIOS** + `"/"` -> Crear domicilio  
*GET*: **URL_DOMICILIOS** + `"/"` -> Obtener domicilios no borrados  
*GET*: **URL_DOMICILIOS** + `"/:id"` -> Obtener domicilio por ID  
*PUT*: **URL_DOMICILIOS** + `"/:id"` -> Actualizara domicilio  
*PUT*: **URL_DOMICILIOS** + `"/softdelete/:id"` -> Borrado lógico de un domicilio  
*PUT*: **URL_DOMICILIOS** + `"/softundelete/:id"` -> Restaurado lógico de un domicilio  
*DELETE*: **URL_DOMICILIOS** + `"/harddelete/:id"` -> Borrado físico de un domicilio  

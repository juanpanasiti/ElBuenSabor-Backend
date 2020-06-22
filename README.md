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
**URL_USUARIOS:** `URL_BASE + "/rubros"`  

*GET*: **URL_USUARIOS** + `"/"` -> Obtener todos los usuarios (borrados o no). Esto solo lo debería acceder el admin  
*GET*: **URL_USUARIOS** + `"/check/:email"` -> Obtener usuario por email  
*GET*: **URL_USUARIOS** + `"/:id"` -> Obtener usuario por ID  
*PUT*: **URL_USUARIOS** + `"/:id"` -> Actualizar un usuario  
*PUT*: **URL_USUARIOS** + `"/softdelete/:id"` -> Borrado lógico de un usuario  
*PUT*: **URL_USUARIOS** + `"/softundelete/:id"` -> Restaurado lógico de un usuario  
*PUT*: **URL_USUARIOS** + `"/harddelete/:id"` -> Borrado físico de un usuario 

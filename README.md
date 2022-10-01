## MCGA PARCIAL BACKEND

### Las Tecnologias usadas son :
- Javascript ES6
- Node.js,
- NPM 
- Express.js 
- Mongoose
- Git
- Mongo Atlas
- Arquitectura API REST.

### SCHEMA 
Creamos un esquema de mongoose para los productos el cual tiene las siguientes propiedades:
- id
- name
- price
- stock
- description
### ROUTER
Utilizamos Rutas para la administracion de nuestra app. Estas nos indican que quiere acceder a un recurso específico de una colección.
### CONTROLLER 
Posee Controladores donde se encuentra la logica de Negocio.
### Tiene 6 endpoints respetando los métodos HTTP para manejar el CRUD:

- GET: para hacer ping al servidor y que devuelva 'OK' en caso que el server y la BD estén levantadas.
- GET: para conseguir la lista entera de productos.
- GET: para conseguir un producto por name O id.
- POST: para agregar un producto a la BD.
- DELETE: para eliminar un producto.
- PUT: para editar algún campo de un producto.

### ENVIRONMENT
El proyecto maneja variables de entorno utilizando la librería dotEnv, en donde estan los valores sensibles que no deben ser subidos al repositorio, como por ejemplo el string de conexión a la base de
datos. Estos se encuentran en el archivo .env_example.
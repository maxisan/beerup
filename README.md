
# BeerUp

Solución Full Stack del desafío de desarrollo propuesto por Santander.

### ¿Qué incluye el challenge?
El desafío propone la realización de una App que permita crear Meetups y recabar datos para evitar el mayor de los problemas: **que falte birra**.

La aplicación se vincula con una API del clima para poder calcular la cantidad de cerveza ideal que debemos comprar teniendo en cuenta la temperatura del día de la meetUp y además la cantidad de asistentes.





## Prerrequisitos

El proyecto utiliza PostgreSQL como motor de base de datos, por lo que deberás tenerlo instalado de forma local.

Además es necesario crear una base de datos para utilizarla en el proyecto, por defecto se la nombró beerup pero puedes asignarle otro nombre a través de las variables de entorno (ver la sección específica).


  
## Variables de entorno del servidor

`./api/.env`

Para correr el proyecto deberás configurar las siguiente variables de entorno en un archivo .env:

`DB_FORCE_SYNC=true`

`DB_FORCE_SYNC=false` 

*true* reiniciará la base de datos e inicializará los modelos a partir de datos precargados. *false* mantiene los datos de la base intactos.

`CLIENT_URL`

Es la ruta al cliente, por ejemplo: `CLIENT_URL=http://localhost:3000`

`PORT`

Puerto en el que se ejecutará el servidor, por ejemplo `PORT=3000`

`SESSION_SECRET`

Secreto para la utilización de sesiones y cookies. Puede ser cualquier string, por ejemplo `SESSION_SECRET=el gato en la caja`

**Variables de base de datos:**

`DB_NAME`

Nombre de la base de datos creada anteriormente, ejemplo: `DB_NAME=beerup`

`DB_USER`

Nombre de usuario del motor de base de datos, ej: `DB_USER=postgres`

`DB_PASSWORD`

Password del motor de base de datos, ej: `DB_PASSWORD:root`

`DB_HOST`

Dominio donde correrá la base de datos, en caso de ser local `DB_HOST=localhost`

`DB_PORT`

Puerto en el que correrá la base de datos ej: `DB_PORT=5432`

**Email y password de usuario administrador**

Cuando se inicializa se creará un usuario adinistrador con las credeciales especificadas en estas variables. El email debe ser un email válido.

`ADMIN_EMAIL=admin@beerup.com`

`ADMIN_PASSWORD=root`

## Variables de entorno del cliente

`./client/.env`


`REACT_APP_BACKEND_URL`

URL del servidor, el siguiente ejemplo corresponde a un entorno local `REACT_APP_BACKEND_URL=http://localhost:3001`

`OPEN_WEATHER_API_KEY`

Se trata de una API key de [OpenWeatherMap](https://rapidapi.com/community/api/open-weather-map?endpoint=apiendpoint_f719676c-072b-4a2d-ad2e-78f8375ea9c8) que permite la utilización del servicio de datos meteorológicos. Se puede obtener gratuitamente y tiene un formato como el siguiente (no es una API válida): `OPEN_WEATHER_API_KEY=d5a3b7ba19msh12...e475e1b94`





  
## Para correrlo localmente

Una vez creada la base de datos y 

Ir al directorio donde se encuentre el proyecto

Instalar las dependencias del back-end y del front-end

```bash
/* Instalando dependencias del backend (Directorio /api) *

  cd api
  npm install
```

```bash
/* Instalando dependencias del frontend (Directorio /client)*

  cd client
  npm install
```

Iniciar el servidor
Desde la carpeta /api ejecutar el comando

```bash
  npm start
```

Iniciar el cliente
Desde la carpeta /client ejecutar el comando

```bash
  npm start
```

Una vez corriendo cliente y servidor puedes usar la aplicación libremente.


  
## Tech Stack

**Client:** 

- React
- TailwindCSS

**Server:** 

- Node
- Express
- Sequelize
- Passport

**Database:** 

- PostgreSQL 


  
## Desarrollado por

[Maximiliano Sánchez](https://www.linkedin.com/in/maxisan)

  
# Documentacion - Comercio Inmobiliario

Este documento contiene información sobre la API REST

### Requisitos

- Node JS
- TypeScript
- Express
- Prisma (Opcional)

## Variables de entorno necesarias para correr la aplicación
- NODE_ENV=development
- PORT=5000
- JWT_SECRET=y1pHXt4bjIgLpGB5mAvdm4XGm
- JWT_EXPIRES=90d
- DATABASE_URL = "mysql://USUARIO:PASSWORD@localhost:3306/DATABASE"

## Iniciar Proyecto - Localmente

- 1. npm install
- 2. npx prisma migrate dev (crear base de datos, prisma se encargara de crear las tablas)
- 3. npx prisma generate (iniciar la base de datos con las tablas)
- 4. npm run start:dev 
- 5. Se adjunta Json para importar a postman o herramienta para realizar pruebas tipo REST

## Endpoints

- base_url = http://localhost:5000/api (este variable ya existe en json de postman)

### Generar Token
- `GET`
- `{{base_url}}/auth`
- `Endpoint para generar token (JWT)`

Ejemplo de solicitud:

curl -X GET {{base_url}}/auth

Solicitud Exitosa:
```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InZveGRhdGFjb21tIiwiaWF0IjoxNzA5MzYwMDU2LCJleHAiOjE3MTcxMzYwNTZ9.DvxYIarVoqk0JyLLu6HfT4tEWRAn_tOmOLECc28TDPM"
}
```

###  Carga Masiva
- `POST`
- `{{base_url}}/massive/load`
- `Endpoint para cargar los datos cvs a la base de datos Mysql.`

### Parámetros de la Solicitud (Request Payload)

- `database` (file): seleccione el documento de tipo csv.

Ejemplo de solicitud:

curl -X POST {{base_url}}/massive/load -H "Authorization: Bearer token" "Content-Type: application/json" -d '{
  "database": resource_accommodation.csv,
}'

Ejemplo de registro exitoso:

```json
{
    "status": 200,
    "message": "Data saved successfully",
    "data": [  {
            "ID": "84099521",
            "Latitud": 40.365843,
            "Longitud": -3.5884521,
            "Titulo": "Alquiler de Piso en calle Juan Antonio Rebolledo y Palma, 20",
            "Anunciante": "Profesional   Lazora Alquiler",
            "Descripcion": "¡Alquila ahora y llévate el primer mes gratis!Vivienda de 2 dormitorios en emblemático edificio de diseño situado en el PAU de Vallecas, galardonado con un conocido premio de arquitectura.Sorprenden sus espectaculares y luminosos portales, de cuidado diseño. Un amplio espacio cubierto, con asientos, en el que disfrutar de la vida vecinal.El edificio cuenta con sistema de video-vigilancia y conserjería particular. En las primeras plantas del edificio las viviendas son tipo dúplex. Además, todas las viviendas disponen de una plaza de garaje.Se encuentra en una zona completamente consolidada con todo tipo de servicios, al lado del Centro Comercial La Gavia, la estación de Metro Valdecarros y a tan sólo 100 metros de Mercadona. Salida directa a la A-3.VIVIENDAS ACABADO ESTÁNDAR.VIVIENDA NO AMUEBLADA, LAS IMÁGENES PERTENECEN A VIVIENDA PILOTO SIN CARÁCTER CONTRACTUAL.Precio desde: 779€/mesREQUISITOSSeguro de impago.En la firma de contrato se solicitará un seguro de vivienda (sobre contenido).Aportación de 3 últimas nóminas o similar para acreditar ratio de solvencia.Antigüedad laboral exigible mínimo 1 año.",
            "Reformado": false,
            "Telefonos": "917 222 011",
            "Tipo": "piso",
            "Precio": 779,
            "PrecioPorMetro": 12.98,
            "Direccion": "Calle Juan Antonio Rebolledo y Palma, 20, Urb. Edificio Vallecas II, Barrio Ensanche de Vallecas - La Gavia, Distrito Villa de Vallecas, Madrid, Madrid capital, Madrid",
            "Provincia": "Madrid capital, Madrid",
            "Ciudad": "Madrid",
            "MetrosCuadrados": 0,
            "Habitaciones": 2,
            "Banos": 1,
            "Parking": true,
            "SegundaMano": true,
            "ArmariosEmpotrados": true,
            "ConstruidoEn": "2009",
            "Amueblado": false,
            "CalefaccionIndividual": false,
            "CertificacionEnergetica": "",
            "Planta": 17,
            "Exterior": true,
            "Interior": false,
            "Ascensor": true,
            "Fecha": "2019-10-01T06:00:00.000Z",
            "Calle": "",
            "Barrio": "",
            "Distrito": "",
            "Terraza": false,
            "Trastero": false,
            "CocinaEquipada": false,
            "CocinaEquipada2": false,
            "AireAcondicionado": false,
            "Piscina": false,
            "Jardin": false,
            "MetrosCuadradosUtiles": 0,
            "AptoParaPersonasConMovilidadReducida": false,
            "Plantas": 0,
            "SeAdmitenMascotas": false,
            "Balcon": false
        },
        // mas registros..
        ]
}

```

### Filtrar por propiedades
- `GET`
- `{{base_url}}/estate/filter`
- `Endpoint para obtener las propiedades por filtros`

### Parámetros de la Solicitud (Params)
- `priceMin` (number): precio Minimo.
- `priceMax` (number): precio Maximo.
- `numRooms` (number): numero de habitaciones (este campo es opcional).

Ejemplo de solicitud:

curl -X GET {{base_url}}/estate/filter?priceMin=950&priceMax=1000&numRooms=3 -H "Authorization: Bearer token"

Solicitud exitosa:

```json
{
    "status": 200,
    "message": "Data successfully obtained",
    "data": [
        {
            "ID": "87104447",
            "Latitud": 40.3622039,
            "Longitud": -3.5936001,
            "Titulo": "Alquiler de Piso en LAS SUERTES",
            "Anunciante": "Profesional   MIRIAM .",
            "Descripcion": "\"-LAS SUERTES/ VALDECARROS- Piso de 76m², exterior, sin amueblar y para entrar a vivir. La vivienda consta de salón, terraza cerrada, tres dormitorios, armarios empotrados, dos cuartos baño y",
            "Reformado": false,
            "Telefonos": "608 982 823",
            "Tipo": "piso",
            "Precio": 1000,
            "PrecioPorMetro": 13.16,
            "Direccion": "LAS SUERTES, Barrio Ensanche de Vallecas - La Gavia, Distrito Villa de Vallecas, Madrid, Madrid capital, Madrid",
            "Provincia": "Madrid capital, Madrid",
            "Ciudad": "Madrid",
            "MetrosCuadrados": 0,
            "Habitaciones": 3,
            "Banos": 2,
            "Parking": true,
            "SegundaMano": true,
            "ArmariosEmpotrados": true,
            "ConstruidoEn": "",
            "Amueblado": false,
            "CalefaccionIndividual": false,
            "CertificacionEnergetica": "en trámite",
            "Planta": 1,
            "Exterior": true,
            "Interior": false,
            "Ascensor": true,
            "Fecha": "2019-09-26T06:00:00.000Z",
            "Calle": "LAS SUERTES",
            "Barrio": " Barrio Ensanche de Vallecas - La Gavia ",
            "Distrito": " Distrito Villa de Vallecas ",
            "Terraza": true,
            "Trastero": true,
            "CocinaEquipada": true,
            "CocinaEquipada2": true,
            "AireAcondicionado": true,
            "Piscina": false,
            "Jardin": false,
            "MetrosCuadradosUtiles": 0,
            "AptoParaPersonasConMovilidadReducida": false,
            "Plantas": 0,
            "SeAdmitenMascotas": false,
            "Balcon": false
        },
        {
            "ID": "87136863",
            "Latitud": 40.3702972,
            "Longitud": -3.6120673,
            "Titulo": "Alquiler de Piso en avenida del Ensanche de Vallecas, 11",
            "Anunciante": "Gema",
            "Descripcion": "Piso amueblado de 89m2 con tres habitaciones, salón/comedor muy amplio, cocina con tendedero y 2 baños. También incluye plaza de garaje muy amplía. Calefacción y agua caliente de gas natural.",
            "Reformado": false,
            "Telefonos": "606 731 916",
            "Tipo": "piso",
            "Precio": 950,
            "PrecioPorMetro": 9.13,
            "Direccion": "Avenida del Ensanche de Vallecas, 11, Barrio Ensanche de Vallecas - La Gavia, Distrito Villa de Vallecas, Madrid, Madrid capital, Madrid",
            "Provincia": "Madrid capital, Madrid",
            "Ciudad": "Madrid",
            "MetrosCuadrados": 89,
            "Habitaciones": 3,
            "Banos": 2,
            "Parking": true,
            "SegundaMano": true,
            "ArmariosEmpotrados": true,
            "ConstruidoEn": "",
            "Amueblado": true,
            "CalefaccionIndividual": false,
            "CertificacionEnergetica": "no indicado",
            "Planta": 4,
            "Exterior": true,
            "Interior": false,
            "Ascensor": true,
            "Fecha": "2019-09-30T06:00:00.000Z",
            "Calle": "Avenida del Ensanche de Vallecas, 11",
            "Barrio": " Barrio Ensanche de Vallecas - La Gavia ",
            "Distrito": " Distrito Villa de Vallecas ",
            "Terraza": false,
            "Trastero": false,
            "CocinaEquipada": true,
            "CocinaEquipada2": true,
            "AireAcondicionado": false,
            "Piscina": false,
            "Jardin": false,
            "MetrosCuadradosUtiles": 0,
            "AptoParaPersonasConMovilidadReducida": true,
            "Plantas": 0,
            "SeAdmitenMascotas": false,
            "Balcon": false
        }
    ]
}

```


### Filtrar propiedades por Mapa
- `GET`
- `{{base_url}}/estate/filter/map`
- `Endpoint para obtener las propiedades por un rango de km, considerando la posición actual`

### Parámetros de la Solicitud (Params)
- `Latitud` (number): Latitud de la ubicación.
- `Longitud` (number): Longitud de la ubicación.
- `km` (number): distancia en km.

Ejemplo de solicitud:

curl -X GET{{base_url}}/estate/filter/map?Latitud=40.3622039&Longitud=-3.5936001&km=0.1 -H "Authorization: Bearer token"

Solicitud exitosa:

```json
{
    "status": 200,
    "message": "Data successfully obtained",
    "data": [
        {
            "ID": "87104447",
            "Latitud": 40.3622039,
            "Longitud": -3.5936001,
            "Titulo": "Alquiler de Piso en LAS SUERTES",
            "Anunciante": "Profesional   MIRIAM .",
            "Descripcion": "\"-LAS SUERTES/ VALDECARROS- Piso de 76m², exterior, sin amueblar y para entrar a vivir. La vivienda consta de salón, terraza cerrada, tres dormitorios, armarios empotrados, dos cuartos baño y",
            "Reformado": 0,
            "Telefonos": "608 982 823",
            "Tipo": "piso",
            "Precio": 1000,
            "PrecioPorMetro": 13.16,
            "Direccion": "LAS SUERTES, Barrio Ensanche de Vallecas - La Gavia, Distrito Villa de Vallecas, Madrid, Madrid capital, Madrid",
            "Provincia": "Madrid capital, Madrid",
            "Ciudad": "Madrid",
            "MetrosCuadrados": 0,
            "Habitaciones": 3,
            "Banos": 2,
            "Parking": 1,
            "SegundaMano": 1,
            "ArmariosEmpotrados": 1,
            "ConstruidoEn": "",
            "Amueblado": 0,
            "CalefaccionIndividual": 0,
            "CertificacionEnergetica": "en trámite",
            "Planta": 1,
            "Exterior": 1,
            "Interior": 0,
            "Ascensor": 1,
            "Fecha": "2019-09-26T06:00:00.000Z",
            "Calle": "LAS SUERTES",
            "Barrio": " Barrio Ensanche de Vallecas - La Gavia ",
            "Distrito": " Distrito Villa de Vallecas ",
            "Terraza": 1,
            "Trastero": 1,
            "CocinaEquipada": 1,
            "CocinaEquipada2": 1,
            "AireAcondicionado": 1,
            "Piscina": 0,
            "Jardin": 0,
            "MetrosCuadradosUtiles": 0,
            "AptoParaPersonasConMovilidadReducida": 0,
            "Plantas": 0,
            "SeAdmitenMascotas": 0,
            "Balcon": 0,
            "distance": 0
        }
    ]
}
```

###  Generar Reporte por filtros

- `POST`
- `{{base_url}}/estate/filter/report`
- `Endpoint para filtrar propiedades a raiz de los parametros que se desea filtrar y generar el reporte segun el filtro, se guardan el uploads`

### Parámetros de la Solicitud (Request Payload And Query)
- `tipo` (string): Tipo de documento para generar el reporte.
- `[Todos los parametros]`: se puede filtrar por todos los parametros, puedes diseñar tus propios filtros.

Ejemplo de solicitud:

curl -X POST {{base_url}}/estate/filter/report?tipo=CSV -H "Authorization: Bearer token" "Content-Type: application/json" -d '{
  "Banos": 3,
  "Ciudad": "Madrid"
}'

Ejemplo de registro exitoso:

```json
{
    "status": 200,
    "message": "Data successfully obtained",
    "data": [
        {
            "Titulo": "Alquiler de Chalet pareado en puente del Arzobispo, 14",
            "Ciudad": "Madrid",
            "Habitaciones": 5,
            "MetrosCuadrados": 0,
            "Balcon": false,
            "SeAdmitenMascotas": false,
            "Piscina": false,
            "Jardin": false
        }
    ]
}
```

###  Registrar Usuario

- `POST`
- `{{base_url}}/auth/register`
- `Endpoint para registrar un usuario`

### Parámetros de la Solicitud (Request Payload And Query)
Tods los parametros son opcionales
- `name` (string): nombre de usuario.
- `password`: contraseña.

Ejemplo de solicitud:

curl -X POST {{base_url}}/auth/register "Content-Type: application/json" -d '{
  "name": "Andy",
    "password": "DLGApQLS"
}'

Ejemplo de registro exitoso:

```json
{
    "status": 201,
    "message": "User created successfully",
    "data": {
        "id": "73ce5377-22ca-4800-8f8d-f76b2708ff23",
        "name": "Andy",
        "password": "$argon2id$v=19$m=65536,t=3,p=4$Bn/6I7HVrgqozvxS0+HF1g$8LMA/aM2WgB9GbgR/1HqVjbwEWh0eDemZWdeaIDHrcI",
        "createdAt": "2024-03-02T06:47:30.424Z",
        "updatedAt": "2024-03-02T06:47:30.424Z"
    }
}
```

## Iniciar Sesión

- `POST`
- `{{base_url}}/auth/login`
- `Endpoint para autenticar un usuario`

Ejemplo de solicitud:

curl -X POST {{base_url}}/auth/login "Content-Type: application/json" -d '{
  "name": "Andy",
    "password": "DLGApQLS"
}'

Ejemplo de registro exitoso:

```json
{
    "status": 200,
    "message": "success",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InZveGRhdGFjb21tIiwiaWF0IjoxNzA5MzYyMTI1LCJleHAiOjE3MTcxMzgxMjV9.K37ErBVoN9uo3LKXHPFE5gwWKmOzGGrqXqvYhItCpvU",
        "user": {
            "name": "Andy",
            "id": "73ce5377-22ca-4800-8f8d-f76b2708ff23"
        }
    }
}

```
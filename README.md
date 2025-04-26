
# README - Backend Express.js con Docker y opción sin Docker

## Requisitos previos

### Para ambas opciones (con/sin Docker):

-   Node.js (versión 16.x o superior)
    
-   npm (versión 8.x o superior)
    
-   MongoDB (versión 5.x o superior)
    

### Solo para Docker:

-   Docker Engine (versión 20.x o superior)
    
-   Docker Compose (versión 2.x o superior)
    

## Configuración inicial

1.  **Clonar el repositorio**:
    ````
    git clone https://github.com/GutberBG/izi-backend.git
    
    cd izi-backend````
    
2.  **Instalar dependencias**:
    
	   ``npm install``
    
3.  **Configurar variables de entorno**:
    
    Crea un archivo  `.env`  basado en  `.env.sample`: 
 ``   cp .env.sample .env``
 
    Edita el archivo  `.env`  con tus configuraciones. Ejemplo mínimo:

## Opción 1: Ejecución con Docker (recomendada)

1.  **Construir y ejecutar los contenedores**:
    ``
    docker-compose up --build``
    
    Para ejecutar en segundo plano:
	``        docker-compose up -d --build``
    

2.  **Detener los contenedores**:
    
    ``docker-compose down``
    

## Opción 2: Ejecución sin Docker

1.  **Asegúrate que MongoDB esté corriendo**:
    
    -   Si usas MongoDB local:
        
      ``  mongod``
        
    -   O usa MongoDB Atlas y actualiza  `MONGO_URI`  en tu  `.env`
        
2.  **Iniciar la aplicación**:
       
    ``npm start``
    
    Para desarrollo con reinicio automático:
    
	``    npm run dev``
    
3.  **Ejecutar seed de datos inicial**  (en otro terminal):  

	   `` npm run seed``
    


    
  

## Autor
Desarrollado por Gutber Blanco.
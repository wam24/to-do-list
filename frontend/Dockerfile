# Usa la imagen oficial de Node.js como base
FROM node:22-alpine

WORKDIR /app
COPY . .
RUN npm install


# Expone el puerto que utiliza Vite
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]

# ---- Base image ----
FROM node:20-alpine

# ---- Working directory inside the container ----
WORKDIR /usr/src/app

# ---- Install dependencies first (better layer caching) ----
COPY package*.json ./
RUN npm install --production

# ---- Copy the rest of the app ----
COPY . .

# ---- App listens on this port ----
EXPOSE 3000

# ---- Start the app ----
CMD ["node", "server.js"]

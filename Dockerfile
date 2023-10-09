FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
# Expose port
EXPOSE 3000
EXPOSE 5173

CMD ["npm", "run", "dev"]
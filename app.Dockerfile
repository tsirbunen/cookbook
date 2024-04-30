FROM node:20-alpine

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./

COPY . ./
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
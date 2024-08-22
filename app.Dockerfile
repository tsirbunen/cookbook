FROM node:20

ENV DATABASE_CONNECTION_STRING=justsomeconnectionstring

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY . ./
RUN npm run build
EXPOSE 3000

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]
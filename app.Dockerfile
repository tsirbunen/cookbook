FROM node:20

# ENV DATABASE_CONNECTION_STRING=https://xxx.ccc.co/storage/v1/object/public/photobucket

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY . ./

# RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]
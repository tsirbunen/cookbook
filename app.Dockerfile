FROM node:20

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./

COPY . ./
RUN npm install

RUN npm run build

EXPOSE 3000

# CMD ["npm", "run", "dev"]
CMD ["npm", "run", "start"]
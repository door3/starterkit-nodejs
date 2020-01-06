FROM node:12.13-alpine

# Set working directory
WORKDIR /usr/app

# Install dependencies
RUN npm i -g typescript@3.7.2
COPY ./app/package*.json ./
RUN npm install

# Copy source code and build
COPY ./app/tsconfig*.json ./
COPY ./app/src ./src
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]

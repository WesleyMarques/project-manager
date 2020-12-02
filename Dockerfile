FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm i

# Bundle app source
COPY ./ /usr/src/app

RUN npm install -g pm2
RUN pm2 update
#RUN yarn install --production=true

CMD [ "npm", "run", "prod" ]
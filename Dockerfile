FROM node:latest
RUN apt-get update && apt-get install --no-install-recommends -y python3 build-essential && apt-get clean
RUN npm install -g node-gyp
WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]


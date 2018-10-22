FROM node:alpine

RUN mkdir /src

COPY ./ /src

RUN npm install -g nodemon

CMD nodemon /src/src/app.js
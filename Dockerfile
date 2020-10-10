FROM node:10

RUN echo "Europe/Berlin" > /etc/timezone
WORKDIR /usr/src/app

COPY package.json .
RUN npm install
COPY . /usr/src/app
RUN npm run tsc
CMD ["npm", "start"]

EXPOSE 42088

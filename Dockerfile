FROM node:10

RUN echo "Europe/Berlin" > /etc/timezone
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN yarn
RUN npm run tsc
CMD ["npm", "start"]

EXPOSE 2999

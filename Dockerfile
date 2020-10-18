FROM node:10

RUN echo "Europe/Berlin" > /etc/timezone
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN yarn
RUN yarn build
CMD ["yarn", "start"]
HEALTHCHECK CMD curl -f http://localhost:2999/docker/health || exit 1;

EXPOSE 2999

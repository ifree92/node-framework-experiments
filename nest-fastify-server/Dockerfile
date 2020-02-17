FROM node:lts-alpine

WORKDIR /app

COPY ./ /app

RUN cd /app \
  && npm i \
  && npm run build \
  && npm prune --production \
  && rm -rf src

CMD npm start
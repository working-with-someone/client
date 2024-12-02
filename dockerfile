FROM node:23-alpine

WORKDIR /app

COPY . /app

RUN yarn install

CMD ["yarn", "run", "dev", "--host"]
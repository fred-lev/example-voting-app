FROM node:16.13.2-alpine3.15

WORKDIR /app

COPY . .

RUN npm install && \
    npm audit fix --force

EXPOSE 4000

CMD npm start

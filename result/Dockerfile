FROM node:16.13.2-alpine3.15

# add curl for healthcheck
RUN apk --no-cache add curl

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4000

CMD npm start

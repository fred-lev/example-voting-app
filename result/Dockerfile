FROM node:10-slim

# add curl for healthcheck
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4000

CMD npm start

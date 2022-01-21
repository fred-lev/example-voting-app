FROM maven:3.8.4-openjdk-8-slim

WORKDIR /app

COPY . .

RUN mvn clean package

CMD java -jar target/worker.jar

# Example Voting App

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fred-lev_example-voting-app&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fred-lev_example-voting-app)

The code in this repo is based on:

- [docker-example-voting-app](https://github.com/dockersamples/example-voting-app)
- [lfs261-example-voting-app](https://github.com/lfs261/example-voting-app)

## Getting started

You can test the end to end deployement of the Apps container with docker compose by running the `e2e.sh` script: 

```console
git checkout This_Repo
bash -x ./e2e.sh
```

The voting app will be running at [http://localhost:4000](http://localhost:4000), and the results will be available at [http://localhost](http://localhost).

The end to end testing script will bring down the environement if the test cases are successfull by calling `docker-compose down` as defined in the script:

https://github.com/fred-lev/example-voting-app/blob/799c6e6c4793e80e4c31972da299a2bb5ddceac0/e2e.sh#L1-L16

## Run the app in k8s

The folder k8s-specifications contains the yaml specifications of the Voting App's services.

Run the following command to create the deployments and services objects:

```console
$ kubectl create -f k8s-specifications/
deployment "db" created
service "db" created
deployment "redis" created
service "redis" created
deployment "result" created
service "result" created
deployment "vote" created
service "vote" created
deployment "worker" created
```

The vote interface is then available on port 31000 on each host of the cluster, the result one is available on port 31001.

## Architecture

![Architecture diagram](architecture.png)

* A Python webapp which lets you vote between two options
* A Redis queue which collects new votes
* A .NET worker which consumes votes and stores them in…
* A Postgres database backed by a Docker volume
* A Node.js webapp which shows the results of the voting in real time

## Note

The voting application only accepts one vote per client. It does not register votes if a vote has already been submitted from a client.

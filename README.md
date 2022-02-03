# Example Voting App

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=fred-lev_example-voting-app)](https://sonarcloud.io/summary/new_code?id=fred-lev_example-voting-app)

The code in this repo is based on:

- [docker-example-voting-app](https://github.com/dockersamples/example-voting-app)
- [lfs261-example-voting-app](https://github.com/lfs261/example-voting-app)

## Getting started

Download [Docker](https://www.docker.com/products/overview). If you are on Mac or Windows, [Docker Compose](https://docs.docker.com/compose) will be automatically installed. On Linux, make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/). If you're using [Docker for Windows](https://docs.docker.com/docker-for-windows/) on Windows 10 pro or later, you must also [switch to Linux containers](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers).

Run in this directory:

```console
docker-compose up
```

The app will be running at [http://localhost:5000](http://localhost:5000), and the results will be at [http://localhost:5001](http://localhost:5001).

Alternately, if you want to run it on a [Docker Swarm](https://docs.docker.com/engine/swarm/), first make sure you have a swarm. If you don't, run:

```console
docker swarm init
```

Once you have your swarm, in this directory run:

```console
docker stack deploy --compose-file docker-stack.yml vote
```

## Run the app in Kubernetes

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

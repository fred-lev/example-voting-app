# Example Voting App

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fred-lev_example-voting-app&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fred-lev_example-voting-app)

The code in this repo is based on:

- [docker-example-voting-app](https://github.com/dockersamples/example-voting-app)
- [lfs261-example-voting-app](https://github.com/lfs261/example-voting-app)

## Getting started

You can test the end to end deployment of the Apps container with docker compose by running the `e2e.sh` script:

```console
git clone git@github.com:fred-lev/example-voting-app.git
cd ./example-voting-app && git checkout main
bash -x ./e2e.sh
```

The voting app will be running at [http://localhost:4000](http://localhost:4000), and the results will be available at [http://localhost](http://localhost).

The end to end testing script will bring down the environment if the test cases are successfully by calling `docker-compose down` as defined in the script:

https://github.com/fred-lev/example-voting-app/blob/799c6e6c4793e80e4c31972da299a2bb5ddceac0/e2e.sh#L1-L16

Jenkins pipeline with E2E testing based on [Jenkinsfile](./Jenkinsfile)

![image](https://user-images.githubusercontent.com/42792052/152315740-8116bff6-f266-4d70-a06c-ddb0b084e2f6.png)

## Run the app in k8s

The [k8s-manifests directory](./k8s-manifests/) contains the yaml specifications of the Voting App's services.

Run the following command to create the deployments and services k8s objects:

```console
$ kubectl create -f k8s-manifests/
service/db created
deployment.apps/postgres created
service/redis created
deployment.apps/redis created
service/result created
deployment.apps/result created
service/vote created
deployment.apps/vote created
deployment.apps/worker created
```

The vote interface is available on port 30500 on each worker host of the cluster, the result one is available on port 30501.

## Architecture

![Architecture diagram](architecture.png)

- A Python webapp which lets you vote between two options
- A Redis queue which collects new votes
- A .NET worker which consumes votes and stores them in???
- A Postgres database backed by a Docker volume
- A Node.js webapp which shows the results of the voting in real time

## Note

The voting application only accepts one vote per client. It does not register votes if a vote has already been submitted from a client.

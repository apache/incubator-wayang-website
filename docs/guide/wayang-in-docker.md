---
title: Using Wayang's docker image
sidebar_position: 9
id: wayang-docker
---
<!--
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

-->
# Using Wayang's docker image

This guide provides a brief example for developers that want to utilize
docker in order to develop with Wayang.

## Step 1: Creating a docker-compose file
This guide assumes knowledge about
[docker](https://docs.docker.com/engine/install/) and
[docker compose](https://docs.docker.com/compose/install/).
We provide a [pre-built docker image](https://hub.docker.com/r/apache/incubator-wayang)
that contains the necessary tooling in order to run or develop Apache Wayang.
The tools necessary for this are:
    - Java 11
    - Apache Spark
    - Hadoop
    - Maven

A `docker-compose.yml` containing the following services will suffice to
run [TPC-H](https://www.tpc.org/tpch/) benchmarks:

```yml
name: apache-wayang

services:
  app:
    container_name: apache-wayang-app
    image: apache/incubator-wayang:latest
    ports:
      - 8888:8888
    volumes:
      - ./:/var/www/html
      - ./.m2/repository/:/root/.m2/repository
    tty: true
    restart: always

  tpch:
    container_name: apache-wayang-tpch
    image: ghcr.io/scalytics/tpch-docker:main
    tty: true
    volumes:
      - ./data/:/data
    restart: always
```

Placing this file in the root directory of Wayang's source will mount
volumes containing the application and its dependencies after
installation into the app container.

## Step 2: Connecting to the app container

In order to get a interactive bash session that allows running commands
inside of the app container, run the following:

```shell
docker exec -it apache-wayang-app bash
```

## Step 3: Compiling Wayang and running benchmarks
Within the root directory of Wayang (/var/www/html in our container),
run the following command to install all packages in Wayang:
```shell
mvn clean install -DskipTests
```

Packaging the project to build the executable:
```shell
mvn clean package -pl :wayang-assembly -Pdistribution
```

Execute your code:
```shell
cd wayang-assembly/target/
tar -xvf apache-wayang-assembly-0.7.1-incubating-dist.tar.gz
cd wayang-0.7.1
./bin/wayang-submit org.apache.wayang.<main_class> <parameters>
```

## Optional: Add clusters for additional platforms to your docker setup
```yml
name: apache-wayang

services:
  app:
    container_name: apache-wayang-app
    image: apache/incubator-wayang:latest
    ports:
      - 8888:8888
    volumes:
      - ./:/var/www/html
      - ./.m2/repository/:/root/.m2/repository
    tty: true
    restart: always

  tpch:
    container_name: apache-wayang-tpch
    image: ghcr.io/scalytics/tpch-docker:main
    tty: true
    volumes:
      - ./data/:/data
    restart: always

  spark-master:
    image: cluster-apache-spark:3.0.2

  spark-worker-a:
    image: cluster-apache-spark:3.0.2
    depends_on:
      - spark-master
    environment:
      - SPARK_MASTER=spark://spark-master:7077
      - SPARK_WORKER_CORES=1
      - SPARK_WORKER_MEMORY=1G
      - SPARK_DRIVER_MEMORY=1G
      - SPARK_EXECUTOR_MEMORY=1G
      - SPARK_WORKLOAD=worker
      - SPARK_LOCAL_IP=spark-worker-a
```


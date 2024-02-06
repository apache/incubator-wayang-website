---
title: Developing in Wayang
sidebar_position: 6
id: developing-in-wayang
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
This tutorial shows users how to compile their code within Wayang using **maven**.

## Compile the module you modified
Within the root directory of Wayang, compile only the module you modified for faster compilation:
```shell
mvn clean install -DskipTests -pl <modified_module>
```
or change the directory to your module and compile there:
```shell
cd <modified_module> && mvn clean install
```

Important: before making a Pull Request make sure all modules compile and all tests are passing:

```shell
mvn clean install
```
## Package the project
```shell
mvn clean package -pl :wayang-assembly -Pdistribution
```

## Execute your code
Before executing your code, make sure the required environment variables are set correctly.
```shell
cd wayang-assembly/target/
tar -xvf apache-wayang-assembly-0.7.1-SNAPSHOT-incubating-dist.tar.gz
cd wayang-0.7.1-SNAPSHOT
./bin/wayang-submit org.apache.wayang.<main_class> <parameters>
```

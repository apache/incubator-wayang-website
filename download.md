---
license: |
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
layout: community
title: "Download"
---
Be sure to verify your downloads by [these procedures](https://www.apache.org/info/verification) using these [KEYS](https://downloads.apache.org/incubator/wayang/KEYS) for any Apache release.

# Current Releases (Incubating)

## 0.3.1 (incubating)  [[Source Release]](https://dist.apache.org/repos/dist/release/incubator/wayang/0.6.0/apache-wayang-0.6.0-incubating-source-release.zip) [[SHA512]](https://dist.apache.org/repos/dist/release/incubator/wayang/0.6.0/apache-wayang-0.6.0-incubating-source-release.zip.sha512) [[ASC]](https://dist.apache.org/repos/dist/release/incubator/wayang/0.6.0/apache-wayang-0.6.0-incubating-source-release.zip.asc)
This is the first release of Apache Wayang (incubating).

### Frameworks supported
This release supports the following frameworks:

- Apache Flink v1.7.1
- Apache Giraph v1.2.0-hadoop2
- GraphChi v0.2.2 (only available with scala 11.x)
- Java Streams (version depends on the java version)
- JDBC-Template
- Postgres v9.4.1208 (Implementation JDBC-Template)
- Apache Spark v3.1.2 (scala 12.x) and v2.4.8 (scala 11.x)
- SQLite3 v3.8.11.2 (implementation JDBC-Template)

> NOTE: depending on the scala version the list of the supported platforms available could be different.

### New Features

- support M1 ARM architecture

### Incompatible changes

- NONE

### Miscellaneous changes

- [WAYANG-3](https://issues.apache.org/jira/projects/WAYANG/issues/WAYANG-3) Unification of logs
- WAYANG-[[32](https://issues.apache.org/jira/projects/WAYANG/issues/WAYANG-32), [33](https://issues.apache.org/jira/projects/WAYANG/issues/WAYANG-33), [35](https://issues.apache.org/jira/projects/WAYANG/issues/WAYANG-35), [38](https://issues.apache.org/jira/projects/WAYANG/issues/WAYANG-38)] License issues removed

### Known Issues

- [WAYANG-23](https://issues.apache.org/jira/projects/WAYANG/issues/WAYANG-23) Iteration Memory Issue

### Bug Fixes

- [WAYANG-12](https://issues.apache.org/jira/projects/WAYANG/issues/WAYANG-12) Issues on the compilation
- [WAYANG-40](https://issues.apache.org/jira/projects/WAYANG/issues/WAYANG-40) Different version of platform depending on the scala version

# Previous Releases

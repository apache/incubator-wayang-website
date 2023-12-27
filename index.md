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
layout: home
title: "Enabling Federated Data Processing"
section-1:
  title: |
    Federated Data Analytics
  subtitle: |
    Enabling Engine Agnosticism and Data Regulation Compliance
  text:   |
    Apache Wayang is a system designed to fully support unified and federated data processing: Wayang enables users to run data analytics over multiple data processing engines, without changing their native code. </br>
    Wayang provides an abstraction on top of existing platforms in order to run data processing and analytic tasks on top of any set of platforms. As a result, Apache Wayang (incubating) frees data engineers and software developers from the burden of learning all different data processing systems, their APIs, strengths and weaknesses; the intricacies of coordinating and integrating different processing platforms; and the inflexibility when trying a fixed set of processing platforms.
section-2:
  title: Adding a virtualization layer on top of multiple execution engines 
  text: | 
    In contrast to traditional data processing systems that provide one dedicated execution engine, Apache Wayang (incubating) can transparently and seamlessly integrate multiple execution engines and use them to perform a single task. In Wayang, users can specify any data processing application using one of Wayang's APIs and then Wayang will choose the data processing platform(s), e.g., Postgres or Apache Spark, that best fits the application. Finally, Wayang will perform the execution, thereby hiding the different platform-specific APIs and coordinating inter-platform communication.
section-3:
  title: Features
  text: What Apache Wayang can do for you
section-4:
  title: Why is Apache Wayang faster than other modern frameworks?
  text: |
   Apache Wayang uses query optimization and AI to detect the best possible combination of execution engines. By combining multiple execution engines, one can gain significant performance. Apache Wayang understands the UDFs and optimizes the function for the underlying processing platform. It also uses small JVM instances to reduce the operational overhead when processing a reduced number of data points.
---

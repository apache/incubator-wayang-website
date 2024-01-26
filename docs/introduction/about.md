---
id: about
title: What is Wayang?
sidebar_position: 1
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
#### A unified data processing framework that seamlessly orchestrates multiple processing engines to deliver unparalleled performance and flexibility.

Apache Wayang's three-layer architecture provides a strategic abstraction between user applications and underlying data processing platforms, ensuring seamless integration and optimization. The application layer encapsulates application-specific logic, while the core layer acts as an intermediary, translating application logic into a standardized intermediate representation (WayangPlan). This standardized representation is then passed to the platform layer, where it is optimized for execution across a diverse range of processing engines, including Hadoop, Spark, and Flink. This optimization process ensures that the execution plan (ExecutionPlan) is tailored to the specific strengths and capabilities of each processing engine, maximizing performance and efficiency.

### Architecture
Apache Wayang's unique architecture, unlike traditional DBMSs, decouples the physical planning and execution layers, empowering developers to express their data processing logic in a platform-agnostic fashion. This separation of concerns allows developers to focus on the algorithmic aspects of their applications without being constrained by the intricacies of specific processing platforms.<br /><br />
<img width="75%" alt="wayang architecture" src="/img/architecture/wayang-schema.png" />   
<br /><br />
Apache Wayang's core strength lies in its cross-platform task execution, enabling developers to seamlessly leverage the strengths of various processing engines, such as Hadoop, Spark, and Flink, without sacrificing performance or flexibility. The platform's ease of use further enhances its appeal, making it a compelling choice for data engineers and developers seeking a unified and versatile data processing solution.
<br />
<img width="75%" alt="wayang architecture" src="/img/architecture/wayang-plan.png" />  
<br />
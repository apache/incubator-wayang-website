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
layout: publication
title: Publication
subtitle: >
   RHEEMix in the Data Jungle: A Cost-based Optimizer for Cross-Platform Systems
link-name: VLDB Journal 29(6), 2020
img-thumb: assets/img/screenshot/rheem.png
authors: Sebastian Kruse, Zoi Kaoudi, Sanjay Chawla, Felix Naumann, Bertty Contreras-Rojas and Jorge-Arnulfo Quiané-Ruiz
year: 2020
month: 11
day: 01
link-paper: assets/pdf/paper/journal_vldb.pdf
link-external: false
---

Data analytics are moving beyond the limits of a single platform. In this paper, we present the cost-based optimizer of Rheem, an open-source cross-platform system that copes with these new requirements. The optimizer allocates the subtasks of data analytic tasks to the most suitable platforms. Our main contributions are: (i) a mechanism based on graph transformations to explore alternative execution strategies; (ii) a novel graph-based approach to determine efficient data movement plans among subtasks and platforms; and (iii) an efficient plan enumeration algorithm, based on a novel enumeration algebra. We extensively evaluate our optimizer under diverse real tasks. We show that our optimizer can perform tasks more than one order of magnitude faster when using multiple platforms than when using a single platform

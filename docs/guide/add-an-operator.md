---
title: Adding an operator in Wayang
sidebar_position: 7
id: adding-operators
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
# Adding new operators in Wayang

This guide shows the *3 steps* that developers need to follow if they want to add new operators in Wayang. 
We use the Map operator as an example.

## Step 1: Add a Wayang operator
Wayang operators are located under the ```wayang-basic``` in the ```org.apache.wayang.basic.operators``` package. <br/>
An operator needs to extend from one of the following abstract classes: ```UnaryToUnaryOperator```, ```BinaryToUnaryOperator```, ```UnarySource```, ```UnarySink```.<br/>
For a unary to unary operator, see for example [here](https://github.com/apache/incubator-wayang/blob/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/operators/MapOperator.java). 

For enhanced performance in Wayang, consider adding a cardinality estimator by overriding the ```createCardinalityEstimator()``` function as [here](https://github.com/apache/incubator-wayang/blob/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/operators/MapOperator.java#L112C43-L112C70).

## Step 2: Add the (platform-specific) execution operators
Execution operators are located under the corresponding module of ```wayang-platforms```. For instance, Java execution operators are located in the ```org.apache.wayang.java.operators``` package of the ```wayang-java``` module.<br/>
An execution operator needs to extend from its corresponding Wayang operator and implement the corresponding platform operator interface.<br/>
For the above ```MapOperator```, the following is the corresponding [```JavaMapOperator```](https://github.com/apache/incubator-wayang/blob/main/wayang-platforms/wayang-java/src/main/java/org/apache/wayang/java/operators/JavaMapOperator.java).

For enhanced performance in Wayang, consider adding a load function as well:<br/>
For this you need to overwrite the ```getLoadProfileEstimatorConfigurationKey()``` function and provide the right key that will then be read from a properties file.
For the JavaMapOperator it's: wayang.java.map.load. Then add in the corresponding properties file (e.g., [this](https://github.com/apache/incubator-wayang/blob/main/wayang-platforms/wayang-java/src/main/resources/wayang-java-defaults.properties) is for the java executor) the template which is the mathematical formula that represents the cost of this operator and an instantiation of it. See [here](https://github.com/apache/incubator-wayang/blob/main/wayang-platforms/wayang-java/src/main/resources/wayang-java-defaults.properties#L25) for the example of the map operator.

## Step 3: Add mappings
Create mappings from the Wayang operator to the platform-specific execution operators. <br/>
The mappings are located in the corresponding execution module in the ```org.apache.wayang.java.operators``` package.<br/>
For the above ```MapOperator``` and ```JavaMapOperator```, see [here](https://github.com/apache/incubator-wayang/blob/main/wayang-platforms/wayang-java/src/main/java/org/apache/wayang/java/mapping/MapMapping.java).

After that you need to declare this mapping in Wayang in the corresponding [```Mappings```](https://github.com/apache/incubator-wayang/blob/main/wayang-platforms/wayang-java/src/main/java/org/apache/wayang/java/mapping/Mappings.java#L37) class.

## Step 4: Expand the Java scala-like API
Once you created a new operator you need to expose it to the API so that users can use it as a function in the dataflow job they create. For this, you need to go to the module ```wayang-api/wayang-api-scala-java``` and expand the ```JavaPlanBuilder.scala``` file to include the new source operator.

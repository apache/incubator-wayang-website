---
slug: wayang-tensorflow
title: Integrating ML platforms in Wayang
authors: [zkaoudi]
tags: [wayang, ML, tensorflow]
---

# Integrating ML platforms in Wayang


We are happy to announce that we have extended Wayang to be able to utilize any ML platform and any ML operators. 
Thanks to the extensible nature of Wayang, the only core changes we had to do were introducing the concept of a ``Model`` and implement a new driver for the newly added platform.

## Step 1: Introducing a Model

With respect to the model, we followed Wayang’s abstraction philosophy: We created a ``Model`` interface to be used as input or output by Wayang operators and then extended it for the platform-specific operators. Different model interfaces can be found here:

https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/model

A platform-specific model needs to be instantiated to be used as the output of a training operator and as input for an inference operator. You can see an example of the ``SparkMLModel`` here:

https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-spark/src/main/java/org/apache/wayang/spark/model/SparkMLModel.java 


## Step 2: Introducing Training Operators

We added the desired Wayang (platform-agnostic) training operators which are binary to unary operators, taking as input the X and y values and outputting a Model. You can find an example of a LinearRegressionOperator here:

https://github.com/apache/incubator-wayang/blob/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/operators/LinearRegressionOperator.java

Platform-specific execution operators, such as SparkLinearRegressionOperator, can be easily added as any other execution operator: extending the corresponding Wayang operator and providing the mappings from the Wayang to the execution operator. See, for example, the ``SparkLinearRegressionOperator``:

https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-spark/src/main/java/org/apache/wayang/spark/operators/ml/SparkLinearRegressionOperator.java

## Step 3: Introducing Prediction Operators
 Additionally, we created a ``PredictOperator``, a BinaryToUnary Wayang (platform-agnostic) operator which takes as input the data quanta and a model and outputs the data quanta with the predictions output by the model. 

 https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/operators/PredictOperator.java

 Then, a concrete platform-specific operator extends from the abstract one. See the ``SparkPredictOperator`` for an example:
 
 https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-spark/src/main/java/org/apache/wayang/spark/operators/ml/SparkPredictOperator.java

## Deep Learning Models

Unlike traditional machine learning models, the definition of deep learning models is more flexible. Users can combine different blocks (e.g., fully connected blocks, convolutional blocks) to build their desired models. The whole model can be represented as a graph on which the vertices represent blocks and the edges represent connections between blocks. In this case, we built a ``DLModel`` class that implements the ``Model`` interface, which contains a user-defined, platform-agnostic graph of the model:

https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/model/DLModel.java

For training, we implemented the platform-agnostic ``DLModelTrainingOperator`` Wayang operator:

https://github.com/apache/incubator-wayang/tree/main/wayang-commons/wayang-basic/src/main/java/org/apache/wayang/basic/operators/DLTrainingOperator.java

## New ML platform -- Tensorflow Integration
We have added Tensorflow as a new platform by creating a new module (``wayang-tensorflow``) inside the ``wayang-platforms`` parent module and implementing a Tensorflow driver. The TensorflowExecutor driver is responsible for creating and destroying Tensorflow resources, such as a model graph and a model parameter context. When a training task scheduled on Tensorflow, it will be mapped to TensorflowDLModelTrainingOperator. In this process, the ``DLModel`` will be converted to ``TensorflowModel``, which means that the user-defined model graph will be converted to a Tensorflow model graph. Likewise, for inference, the ``PredictOperator`` will be mapped to ``TensorflowPredictOperator``. All the code for the tensorflow platform can be found here:

https://github.com/apache/incubator-wayang/tree/main/wayang-platforms/wayang-tensorflow/src/main/java/org/apache/wayang/tensorflow

### Acknowledgement
The source code for the support of ML operators and the Tensorflow integration has been contributed by Mingxi Liu.

### Follow Wayang

Apache Wayang is in incubation phase and has a potential roadmap of implementations
coming soon (including the federated learning aspect as well as an SQL interface and a novel
data debugging functionality). If you want to hear or join the community, consult the link
https://wayang.apache.org/community/ , join the mailing lists, contribute with new ideas,
write documentation, or fix bugs.


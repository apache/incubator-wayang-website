---
slug: wayang-python-api
title: Pywayang - Apache Wayang's Python API
authors: [juripetersen]
tags: [wayang, python]
---

# Pywayang - Apache Wayang's Python API

In the vast landscape of data processing, efficiency and flexibility are
important. However, navigating through a multitude of tools and
languages often is a major inconvenience.
Apache Wayang's upcoming Python API will allow you to seamlessly
orchestrate data processing tasks without ever leaving the comfort
of Python, irrespective of the underlying framework written in Java.

## Expanding Apache Wayang's APIs
Apache Wayang's architecture decouples the process of planning from the
resulting execution, allowing users to specify platform agnostic plans
through the provided APIs.

<br/>
<img width="75%" alt="wayang stack" src="/img/architecture/wayang-stack.png" />
<br/><br/>

Python's popularity and convenience for data
processing workloads makes it an obvious candidate for a desired API.
Previous APIs, such as the Scala API `wayang-api-scala-java` benefited
from the interoperability of Java and Scala that allows to reuse objects
from other languages to provide new interfaces. Accessing JVM objects in
Python is possible through several libraries, but in doing so,
future APIs in other programming languages would need similar libraries and
implementations in order to exist. As a contrast to that, providing an
API within Apache Wayang that receives input plans from any source and
executes them within allows to create plans and submit them in any
programming language. The following figure shows the architecture of `pywayang`:

<br/>
<img width="75%" alt="pywayang stack" src="/img/architecture/pywayang.png" />
<br/><br/>

The Python API allows users to specify WayangPlans with UDFs in Python.
`pywayang` then serializes the UDFs and constructs the WayangPlan in
JSON format, preparing it to be sent to Apache Wayang's JSON API.
When receiving a valid JSON plan, the JSON API uses the optimizer to
construct an execution plan. However, since UDFs are defined in Python
and thus need to be executed in Python as well, an operators function needs to be
wrapped into a `WrappedPythonFunction`:

```scala
val mapOperator = new MapPartitionsOperator[Input, Output](
  new MapPartitionsDescriptor[Input, Output](
    new WrappedPythonFunction[Input, Output](
      ByteString.copyFromUtf8(udf)
    ),
    classOf[Input],
    classOf[Output],
  )
)
```

This wrapped functional descriptor allows to handle execution of
UDFs in Python through a socket connection with the `pywayang` worker.
Input data is sourced from the platform chosen by the optimizer and Apache
Wayang handles routing the output data to the next operator.

<br/>

A new API in any programming languages would have
to specify two things:
- A way to create plans that conform to a JSON format specified in the
  Wayang JSON API.
- A `worker` that handles encoding and decoding of user defined
  functions (UDFs), as they need to
  be executed on iterables in their respective language.
After that, the API can be added as a module in Wayang, so that
operators will be wrapped and UDFs can be executed in the desired
programming language.

<!--truncate-->
## Defining WayangPlans in Python

As the "Hello World!" of data processing systems, wordcount will pose as
our primary example to display how users can interact with Apache Wayang
through the python package `pywayang`.

```python
from pywy.dataquanta import WayangContext
from pywy.platforms.java import JavaPlugin
from pywy.platforms.spark import SparkPlugin

def wordcount():
    ctx = WayangContext() \
        .register({JavaPlugin, SparkPlugin}) \
        .textfile("file://README.md") \
        .flatmap(lambda w: w.split()) \
        .filter(lambda w: w.strip() != "") \
        .map(lambda w: (w.lower(), 1)) \
        .reduce_by_key(lambda t: t[0], lambda t1, t2: (t1[0], int(t1[1]) + int(t2[1]))) \
        .store_textfile("file:///wordcount-out-python.txt")

if __name__ == "__main__":
    wordcount()
```

The example displays a mode of operation that resembles the Scala
`PlanBuilder` and the `JavaPlanBuilder`. Plans are specified in a
functional way, chaining operations until a terminal operation results
in execution of the plan.

## Wayang-API-JSON
The `wayang-api-json` module provides an executable that starts a REST
server. This server accepts a `WayangPlan` in JSON format.
Starting the REST API as a background process can be done by executing
the following:

```shell
mvn clean package -pl :wayang-assembly -Pdistribution
cd wayang-assembly/target/
tar -xvf apache-wayang-assembly-0.7.1-SNAPSHOT-incubating-dist.tar.gz
cd wayang-0.7.1-SNAPSHOT
./bin/wayang-submit org.apache.wayang.api.json.Main &
```

## Wrapping pipelines in MapPartition operators
With this architecture, the execution of an operator comes with an
additional overhead, because the UDFs will have to be executed in
python. Python operators receive iterators through a socket and also
return their result to Wayang through that connection. To minimize the
overhead, unary operators that return unary results will be grouped in
pipelines. One pipeline of operators will be submitted to the Wayang
JSON API as a single `MapPartition` operator. This means that the UDFs
specified in this pipeline can be chained and only on call from Wayang
to the Python worker will have to be made for a given pipeline.

## Coming soon
As the Python API is currently in development and we are applying
finishing touches, this article serves as an outlook for what users can
expect to see soon.

Author: [juripetersen](https://github.com/juripetersen)

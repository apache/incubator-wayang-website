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

<!--truncate-->
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

## Wayang-API-JSON

## Wrapping pipelines in MapPartition operators

Author: [juripetersen](https://github.com/juripetersen)

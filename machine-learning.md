---
layout: default
title: "Machine Learning: Start"
permalink: "/machine-learning/"
---
Welcome to my blog post explaining machine learning!  
Algorithms are the core of computing. They allow computers to accept a certain input, follow a procedure manipulating the input and running calculations, and eventually producing an output. Each step is well-defined and has a clear purpose in computing the output.  
Take a simple example: find the maximum value of an (unsorted) array. The algorithm should scan through the array while tracking a running maximum value. If the search detects a value larger than the current running maximum, it should update that variable to the new maximum. Once the entire array is searched, the variable will contain the maximum value of the array. The steps were clear and well-defined.  
But things become a little trickier when we don't really know the steps. So, how can we define an algorithm that can accurately classify every image that could exist, or appropriately respond to every query a user might ask? We could try to detect certain pixel patterns or keywords, but that quickly becomes impractical for larger applications. So, the answer is we don't define the algorithm: the machine learns it.  
In this blog, I will first explain neural networks, the data structure that really defied algorithms really sparked machine learning. Then, I will explain backpropagation - the algorithm that allows AI to "learn" from training data. Finally, I will explain transformers - the core that powers large language models such as ChatGPT.
At this point, my blog splits into two paths.  
If you are comfortable with multivariable calculus and linear algebra, take this path:  
[Machine Learning: With Math](/machine-learning-math/)  
If you aren't familiar with those math concepts yet and would just like a conceptual understanding of machine learning, take this path:  

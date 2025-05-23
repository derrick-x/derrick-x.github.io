---
layout: default
title: "Machine Learning: Start"
permalink: "/machine-learning/"
---
Welcome to my blog post explaining machine learning!  
# History of Computing
Algorithms are the core of computing. They allow computers to accept a certain input, follow a procedure manipulating the input and running calculations, and eventually producing an output. Each step is well-defined and has a clear purpose in computing the output.  
Take a simple example: find the maximum value of an (unsorted) array. The algorithm should scan through the array while tracking a running maximum value. If the search detects a value larger than the current running maximum, it should update that variable to the new maximum. Once the entire array is searched, the variable will contain the maximum value of the array. The steps were clear and well-defined.  
# Where Algorithms Fail
But things become a little trickier when we don't really know the steps. Let's take the common example of image recognition: how can a computer detect the number 4? One might try to define an algorithm to find the long vertical bar, with a short horizontal bar on the left side intersecting the middle, then a diagonal connecting the top endpoint of the vertical bar... it becomes tedious. Even if such an algorithm could be defined, there are many more things to account for: the digit could be anywhere on the image, it could be horizontally or vertically stretched, rotated, and different writing styles exist. And that's not even getting into conversation bots. Algorithms quickly become impossibly complicated for such tasks. So how can we define an algorithm to recognize images or respond to natural language? The answer is we don't: the computer learns the algorithm.
# Introduction to Machine Learning
In this blog, I will first explain neural networks, the data structure that really defied algorithms really sparked machine learning. Then, I will explain backpropagation - the algorithm that allows AI to "learn" from training data. Finally, I will explain transformers - the core that powers large language models such as ChatGPT.
At this point, my blog splits into two paths.  
If you are comfortable with multivariable calculus and linear algebra, take this path: [Machine Learning: With Math](/machine-learning-math/)  
If you aren't familiar with those math concepts yet and would just like a conceptual understanding of machine learning, take this path:  

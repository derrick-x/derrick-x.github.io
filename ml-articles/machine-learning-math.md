---
layout: default
title: "Machine Learning: With Math"
permalink: /machine-learning-math/
---
# Neural Networks
Neural networks are the foundation of all machine learning. What makes this network "neural" is its flexibility. A neural net is initialized with random, arbitrary parameters which can be adjusted through a learning process called backpropagation. The edges (represented as lines) connecting every pair of neurons (represented as circles) in adjacent layers allow information to be passed to and interact with each other. In the diagram below, while there are four neurons in the first layer and two neurons in the last layer, the size and number of layers can vary depending on the application.

![Neural Network Diagram](/assets/images/neural_network.png)

*Image credit: [Victor Zhou – Neural Networks from Scratch](https://victorzhou.com/series/neural-networks-from-scratch/)*

## Thinking
*"Machine thinking is just linear algebra on steroids." - Someone*  
Before getting into how a neural net learns, let's first discuss how it thinks. In the diagram above, imagine each edge connecting pairs of neurons as having a value associated with it, which we call its weight. Before the neural net looks at anything, the neurons themselves are empty, but they have an offset value, called its bias. These terms should become more clear as I explain the thinking process, which is called feed-forward.  
Now we are ready to give the neural net something to think about. In this section, I will use the classic example of recognizing handwritten digits. To pass an image into a neural net, it must somehow be converted into a list of numbers, or a vector. If the image is grayscale, you might convert each pixel into its darkness level. With an input represented as a vector, it can be passed into the first layer of the neural net, called the input layer. The diagram above uses 4 input neurons, but for our case, if the image is, for example, 28x28 pixels, we would use 784 input neurons. Next, for every neuron in the next layer, we calculate its actviation by summing the products of every value in the input layer and the associated weight of the edge that connects it to the next neuron.  
That was a lot of words! But if you think carefully about the math process actually happening here, this is essentially a matrix mutliplication, or a linear transformation. Once we get the activations of every neuron in the next layer, we offset each value by the corresponding bias. Finally, each value is sent through a nonlinear normalization function, such as sigmoid or ReLU. The purpose of this nonlinear function is to keep activations meaningful and improve stability. The choice of function depends on the application and each function has its benefits and drawbacks. (Data scientists have a lot more to say about this, but I will move on)  
We can now repeat this process for the next layers, until we reach the last layer, the output layer. The final values in the output layer determine what the neural net "thinks" about its input. In our case of handrwitten digits, we would use 10 neurons, each with an activation that represents how close the input is to that number. This process is essentially a repeated sequence of a linear transformation, a translation, then a nonlinear normalization function. Here's the full formula for what happens for each neuron:  
$${a_l}^i=N((\sum_{j=1}^n{a_{l-1}^j*w_{l-1}^{ij}})+b_l^i)$$  
Where $${a_l}^i$$ is the activation of neuron $$i$$ in layer $$l$$, $$N$$ is the nonlinear normalization function, $$n$$ is the size of the current layer, $${w_l}^ij$$ is the weight of the edge connecting layer $$l$$ neuron $$i$$ to layer $$l+1$$ neuron $$j$$.  
You might be wondering why we use multiple layers. The idea behind the neural network is that each layer should recognize some pattern, maybe a straight line or a curve, then recognize compounded patterns in later layers, maybe a loop or intersection. Using nonlinear normalization functions on each layer allows the neural net to focus on these patterns more. I say in theory because the patterns a neural net actually learns is very hard to deduce. There are actually many ways a machine can learn to recognize the number 4, most of which are not recognizable to us.
## Learning
*"Machine learning is just multivariable calculus on steroids." - Someone*  
As I mentioned before, all parameters, meaning the weights and biases, are initialized to random values. As you would expect, a newborn neural net would not make very accrurate predictions - it is literally blind guessing. We want a way to shift those weights and biases to make the predictions more accurate.  
The first step is designing a mathematical function to tell the neural net how "badly" it predicted. We call this the cost function. For our example, if we input a vector representation of the handwritten digit 7, we should see the neuron corresponding to 7 be set to 1 and all the others set to 0. We therefore can define the cost function as the mean squared error between the predicted value and expected value. Formally, it is denoted as:  
$$C=\sum_{i=1}^n{(a_{ip}-a_{ie})^2}$$  
Where $$n$$ is the size of the output layer, $$a_{ip}$$ is the predicted activation of neuron $$i$$, and $$a_{ie}$$ is the expected activation of neuron $$i$$. With a well-defined function, we can compute the gradient derivative to find which direction will decrease the cost function the fastest.  
## Learning Too Much
# Transformers
## Words to Numbers
## Pay Attention
$$
\text{Attention}(q,k,v)=S(\frac{k^Tq}{\sqrt{d_k}})
$$
## Knowing Facts
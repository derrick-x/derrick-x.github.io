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
We can now repeat this process for the next layers, until we reach the last layer, the output layer. The final values in the output layer determine what the neural net "thinks" about its input. In our case of handrwitten digits, we would use 10 neurons, each with an activation that represents how close the input is to that number. This process is essentially a repeated sequence of a linear transformation, a translation, then a nonlinear normalization function. Here's the full formula for the activation of each neuron:  
$${a_l}^i=N(b_l^i+\sum_{j=1}^n{a_{l-1}^j}w_{l-1}^{ij})$$  
Where $${a_l}^i$$ is the activation of neuron $$i$$ in layer $$l$$, $$N$$ is the nonlinear normalization function, $$n$$ is the size of the current layer, $${w_l}^{ij}$$ is the weight of the edge connecting layer $$l$$ neuron $$i$$ to layer $$l+1$$ neuron $$j$$, and $$b_l^i$$ is the bias for layer $$l$$ neuron $$i$$. (superscripts here are just indices, not exponents)  
You might be wondering why we use multiple layers. The idea behind the neural network is that each layer should recognize some pattern, maybe a straight line or a curve, then recognize compounded patterns in later layers, maybe a loop or intersection. Using nonlinear normalization functions on each layer allows the neural net to focus on these patterns more. I say in theory because the patterns a neural net actually learns is very hard to deduce. There are actually many ways a machine can learn to recognize the number 4, most of which are not recognizable to us.
## Learning
*"Machine learning is just multivariable calculus on steroids." - Someone*  
As I mentioned before, all parameters, meaning the weights and biases, are initialized to random values. As you would expect, a newborn neural net would not make very accrurate predictions - it is literally blind guessing. We want a way to shift those weights and biases to make the predictions more accurate.  
The first step is designing a mathematical function to tell the neural net how "badly" it predicted. We call this the cost function. For our example, if we input a vector representation of the handwritten digit 7, we should see the neuron corresponding to 7 be set to 1 and all the others set to 0. We therefore can define the cost function as the mean squared error between the predicted value and expected value. Formally, it is denoted as:  
$$C=\sum_{i=1}^n{(a_l^i-y^i)^2}$$  
Where $$n$$ is the size of the output layer, $$a_l^i$$ is the predicted activation of neuron $$i$$, and $$y^i$$ is the expected activation of neuron $$i$$. With a well-defined function, we can compute the gradient derivative to find which direction will decrease the cost function the fastest. Well, not so fast. Notice how the activation of each output neuron is a sum of functions of previous activations, which in turn are also sums of functions of previous activations. Trying to expand out these sums will become exponentially massive. Not remotely practical for deep neural nets. Instead, we use an algorithm called backpropagation, which allows us to iteratively apply the chain rule and optimize the computation.  
![Simplified Neural Network](/assets/images/nn_simple.png)  
To illustrate backpropagation, let's simplify our neural network to just three layers (1 input, 1 hidden, 1 output), with just one neuron in each layer. Since we are temporarily ignoring the presence of multiple neurons in a layer, we do not need the superscript yet.  Focusing on just the last two layers, let's first compute the derivative of the cost function with respect to the activation of the output neuron:  
$$\frac{\delta C}{\delta a_l}=2(a_l-y)$$
However, we cannot directly change an activation. We have three ways to induce a change in the activation, thus changing the cost: change the weight of the edge connecting the previous neuron to the output, change the bias applied to the output neuron, or indirectly change the activation of the previous neuron. We can apply the chain rule to compute the derivative of the cost function with respect to each of these variables:  
$$\frac{\delta C}{\delta w_{l-1}}=2(a_l-y)\frac{\delta a_l}{\delta w_{l-1}}$$  
$$\frac{\delta C}{\delta b_l}=2(a_l-y)\frac{\delta a_l}{\delta b_l}$$  
$$\frac{\delta C}{\delta a_{l-1}}=2(a_l-y)\frac{\delta a_l}{\delta a_{l-1}}$$  
As you can see, all the derivatives are scaled by how far away the output neuron activation is from the expected value. That implies that changing outputs that were more badly predicted has a greater impact on the cost. This should make sense. Let's compute the derivative of the output neuron activation with respect to the edge weight:  
$$\frac{\delta a_l}{\delta w_{l-1}}=N'(b_l+a_{l-1}w_{l-1})\frac{\delta}{\delta w_{l-1}}(b_l+a_{l-1}w_{l-1})$$  
$$=N'(b_l+a_{l-1}w_{l-1})a_{l-1}$$  
Next, derivative of the output neuron activation with respect to the bias:  
$$\frac{\delta a_l}{\delta b_l}=N'(b_l+a_{l-1}w_{l-1})\frac{\delta}{\delta b_l}(b_l+a_{l-1}w_{l-1})$$  
$$=N'(b_l+a_{l-1}w_{l-1})$$  
Finally, derivative of the output neuron activation with respect to the activation of the previous neuron:  
$$\frac{\delta a_l}{\delta a_{l-1}}=N'(b_l+a_{l-1}w_{l-1})\frac{\delta}{\delta a_{l-1}}(b_l+a_{l-1}w_{l-1})$$  
$$=N'(b_l+a_{l-1}w_{l-1})w_{l-1}$$   
Remember, we cannot use this derivative to directly change the activation of the previous neuron. Instead, we iterate to the previous layer recomputing the partial derivatives for the that layer, using the value of $$\frac{\delta C}{\delta a_{l-1}}=2(a_l-y)\frac{\delta a_l}{\delta a_{l-1}}$$ which we have now computed. Keep iterating backwards until we reach the input layer. At this point, we should have a derivative for every weight and bias calculated. This is our (massive) gradient derivative.  
The partial derivatives for a full neural net with multiple training data points are actually not much more complicated. We simply need to throw the summations and superscripts back in. You can verify these expressions on your own:  
$$\frac{\delta C}{\delta a_l^i}=2(a_l^i-y^i)$$  
$$\frac{\delta C}{\delta w_{l-1}^{ij}}=2(a_l^i-y^i)N'(b_l+\sum_{j=1}^{n}a_{l-1}^iw_{l-1}^{ij})a_{l-1}^j$$  
$$\frac{\delta C}{\delta b_l^i}=2(a_l^i-y^i)N'(b_l^i+\sum_{j=1}^{n}a_{l-1}^iw_{l-1}^{ij})$$  
$$\frac{\delta C}{\delta a_{l-1}^j}=\sum_{i=1}^{n}2(a_l^i-y^i)N'(b_l^i+\sum_{j=1}^{n}a_{l-1}^iw_{l-1}^{ij})w_{l-1}^{ij}$$  
The main thing to note here is that for every neuron activation in a layer, its activation will be influenced by every neuron activation in the previous layer, so we need to sum up those derivatives to compute $$\frac{\delta C}{\delta a_{l-1}}$$. For multiple training data points, simply sum all* the gradients together to get the average change to optimally fit all outputs. With the full gradient derivative computed, we now shift every weight and bias by a tiny fraction of its corresponding derivative value. This should inch us slightly closer to a better predictor. After repeating this process over and over on the training data, we should have a pretty solid handwritten digit recognizer.
## Learning Too Much
# Transformers
## Words to Numbers
## Pay Attention
$$\text{Attention}(q,k,v)=S(\frac{k^Tq}{\sqrt{d_k}})$$
## Knowing Facts
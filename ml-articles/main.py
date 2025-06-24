class Token:
    def __init__(self, index, string, left, right):
        self.index = index
        self.string = string
        self.left = left
        self.right = right
    def __str__(self):
        return self.string
    def getStr(self):
        if self.string == None:
            self.string = self.left.getStr() + self.right.getStr()
        return self.string

class Trie:
    def __init__(self, id):
        self.id = id
        self.isWord = False
        self.children = {} # For best time complexity, a sorted map is best, but the benefit is marginal as tokens do not get very long

def getTokens(input: str, maxVocab: int) -> list[str]:
    tokenized = []
    tokens = []
    charDict = {}
    #  Map all single characters to a tokens ensuring no duplicates
    for char in input:
        if not char in charDict:
            charDict[char] = Token(len(tokens), char, None, None)
            tokens.append(charDict[char])
        tokenized.append(charDict[char].index)
    # Repeat until vocabulary is full
    for i in range(len(tokens), maxVocab):
        pairCounts = {}
        maxPairs = None
        # Find frequency of all adjacent token pairs
        for j in range(1, len(tokenized)):
            pairIndex = tokenized[j - 1] * len(tokens) + tokenized[j]
            if pairIndex in pairCounts:
                pairCounts[pairIndex] += 1
            else:
                pairCounts[pairIndex] = 1
            if maxPairs == None or pairCounts[pairIndex] > pairCounts[maxPairs]:
                maxPairs = pairIndex
        left = maxPairs // len(tokens)
        right = maxPairs % len(tokens)
        # Create a new token combining the most frequent adjacent token pair
        newToken = Token(len(tokens), None, tokens[left], tokens[right])
        tokens.append(newToken)
        newTokenized = []
        j = 1
        # Replace all occurences of that token pair with the new token
        while j < len(tokenized):
            if tokenized[j - 1] == left and tokenized[j] == right:
                newTokenized.append(newToken.index)
                j += 2
            else:
                newTokenized.append(tokenized[j - 1])
                j += 1
        if tokenized[-2] != left or tokenized[-1] != right:
            newTokenized.append(tokenized[-1])
        tokenized = newTokenized
    # Convert tokens to strings
    tokenStrings = list([])
    for token in tokens:
        tokenStrings.append(token.getStr())
    return tokenStrings

def getTrie(tokens: list[str]) -> Trie:
    root = Trie(-1)
    for i in range(len(tokens)):
        curr = root
        for char in tokens[i]:
            if not char in curr.children:
                next = Trie(i)
                curr.children[char] = next
            curr = curr.children[char]
        curr.id = i
        curr.isWord = True
    return root

def tokenize(input: str, root: Trie) -> list[str]:
    tokens = []
    index = 0
    # Iterate through the input string
    while index < len(input):
        visitStack = [root]
        # Keep searching the trie until it has no matching path with the current substring
        while index < len(input) and input[index] in visitStack[-1].children:
            visitStack.append(visitStack[-1].children[input[index]])
            index += 1
        # Backtrack until a token in the path is found
        while not visitStack[-1].isWord:
            visitStack.pop()
            index -= 1
            # Return None if the input cannot be tokenized
            if len(visitStack) == 0:
                return None
        tokens.append(visitStack[-1].id)
    return tokens

#Sample code
tokens = getTokens("She sold seashells by the seashore.", 20)
print(tokens)
trieRoot = getTrie(tokens)
print(tokenize("She sold seashores by the seashell.", trieRoot))
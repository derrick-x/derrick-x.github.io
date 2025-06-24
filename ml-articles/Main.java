import java.util.*;

public class Main {
    
    static class Token {
        int index;
        String string;
        public Token(int i, String s) {
            index = i;
            string = s;
        }
    }

    static class Trie {
        int id;
        boolean isWord;
        HashMap<Character, Trie> children;
        public Trie(int i) {
            id = i;
            isWord = false;
            children = new HashMap<>(); //For best time complexity, a TreeMap is best, but the benefit is marginal as tokens do not get very long
        }
    }

    public static String[] getTokens(String input, int maxVocab) {
        List<Integer> tokenized = new ArrayList<>();
        List<Token> tokens = new ArrayList<>();
        HashMap<Character, Token> charDict = new HashMap<>();
        //Map all single characters to a tokens ensuring no duplicates
        for (int i = 0; i < input.length(); i++) {
            if (!charDict.containsKey(input.charAt(i))) {
                Token newChar = new Token(tokens.size(), input.charAt(i) + "");
                tokens.add(newChar);
                charDict.put(input.charAt(i), newChar);
            }
            tokenized.add(charDict.get(input.charAt(i)).index);
        }
        //Repeat until vocabulary is full
        for (int i = tokens.size(); i < maxVocab; i++) {
            HashMap<Long, Integer> pairCounts = new HashMap<>();
            long maxPair = -1;
            //Find frequency of all adjacent token pairs
            for (int j = 1; j < tokenized.size(); j++) {
                long pairIndex = (long) tokenized.get(j - 1) * i + tokenized.get(j);
                if (pairCounts.containsKey(pairIndex)) {
                    pairCounts.put(pairIndex, pairCounts.get(pairIndex) + 1);
                }
                else {
                    pairCounts.put(pairIndex, 1);
                }
                if (maxPair < 0 || pairCounts.get(pairIndex) > pairCounts.get(maxPair)) {
                    maxPair = pairIndex;
                }
            }
            int left = (int) (maxPair / i);
            int right = (int) (maxPair % i);
            //Create a new token combining the most frequent adjacent token pair
            tokens.add(new Token(i, tokens.get(left).string + tokens.get(right).string));
            List<Integer> newTokenized = new ArrayList<>();
            //Replace all occurences of that token pair with the new token
            for (int j = 1; j < tokenized.size(); j++) {
                if (tokenized.get(j - 1) == left && tokenized.get(j) == right) {
                    newTokenized.add(i);
                    j++;
                }
                else {
                    newTokenized.add(tokenized.get(j - 1));
                }
            }
            if (!(tokenized.get(tokenized.size() - 2) == left && tokenized.get(tokenized.size() - 1) == right)) {
                newTokenized.add(tokenized.get(tokenized.size() - 1));
            }
            tokenized = newTokenized;
        }
        //Convert tokens to strings
        String[] tokenStrings = new String[tokens.size()];
        for (int i = 0; i < tokens.size(); i++) {
            tokenStrings[i] = tokens.get(i).string;
        }
        return tokenStrings;
    }

    public static Trie getTrie(String[] tokens) {
        Trie root = new Trie(-1);
        for (int i = 0; i < tokens.length; i++) {
            Trie curr = root;
            for (int j = 0; j < tokens[i].length(); j++) {
                if (!curr.children.containsKey(tokens[i].charAt(j))) {
                    Trie next = new Trie(i);
                    curr.children.put(tokens[i].charAt(j), next);
                }
                curr = curr.children.get(tokens[i].charAt(j));
            }
            curr.id = i;
            curr.isWord = true;
        }
        return root;
    }

    public static List<Integer> tokenize(String input, Trie root) {
        List<Integer> tokens = new ArrayList<>();
        int index = 0;
        //Iterate through the input string
        while (index < input.length()) {
            Stack<Trie> visitStack = new Stack<>();
            visitStack.add(root);
            //Keep searching the trie until it has no matching path with the current substring
            while (index < input.length() && visitStack.peek().children.containsKey(input.charAt(index))) {
                visitStack.add(visitStack.peek().children.get(input.charAt(index)));
                index++;
            }
            //Return null if the input cannot be tokenized
            while (!visitStack.peek().isWord) {
                visitStack.pop();
                index--;
                if (visitStack.isEmpty()) {
                    return null;
                }
            }
            tokens.add(visitStack.peek().id);
        }
        return tokens;
    }

    //Sample code
    public static void main(String[] args) {
        String[] tokens = getTokens("She sold seashells by the seashore.", 20);
        System.out.println(Arrays.toString(tokens));
        Trie root = getTrie(tokens);
        List<Integer> tokenized = tokenize("She sold seashores by the seashell.", root);
        System.out.println(tokenized);
    }
}
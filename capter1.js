/*1.2 Most programming languages have a built-in integer data type. Normally
this representation has a fixed size, thus placing a limit on how large a value
can be stored in an integer variable. Describe a representation for integers
that has no size restriction (other than the limits of the computer’s available
main memory), and thus no practical limit on how large an integer can be
stored. Briefly show how your representation can be used to implement the
operations of addition, multiplication, and exponentiation.*/

function add(arr1, arr2) {
    let carry = 0;
    let result = [];
    for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
        let digit1 = arr1.length - 1 - i >= 0 ? arr1[arr1.length - 1 - i] : 0;
        let digit2 = arr2.length - 1 - i >= 0 ? arr2[arr2.length - 1 - i] : 0;
        let sum = digit1 + digit2 + carry;
        result.unshift(sum % 10); // Add the digit to the front of the result array
        carry = Math.floor(sum / 10); // Calculate the carry
    }

    if (carry > 0) {
        result.unshift(carry); // Add any remaining carry to the front
    }
    return result;
}

const num1 = [1, 2, 3]; 
const num2 = [9, 9, 9];  
console.log(add(num1, num2)); 


function multiplyBigInts(int1, int2) {
    let result = new Array(int1.length + int2.length).fill(0);

    // Iterate from the end of first array towards the start (least to most significant digit)
    for (let i = int1.length - 1; i >= 0; i--) {
        // Iterate similarly for the second array
        for (let j = int2.length - 1; j >= 0; j--) {
            // Multiply digits
            let product = int1[i] * int2[j];
            // Add product to the current sum at this position
            let sum = product + result[i + j + 1];

            // Update the current position in the result array
            result[i + j + 1] = sum % 10;

            // Carry over the rest to the next position
            result[i + j] += Math.floor(sum / 10);
        }
    }

    // Remove any leading zeros from the result and reverse it for correct order
    return trimLeadingZeros(result);
}

function trimLeadingZeros(array) {
    let firstNonZeroIndex = 0;
    while (firstNonZeroIndex < array.length && array[firstNonZeroIndex] === 0) {
        firstNonZeroIndex++;
    }
    return array.slice(firstNonZeroIndex);
}

// Example usage:
let numm1 = [1, 2, 3]; // Represents 123
let numm2 = [4, 5, 6]; // Represents 456
let product = multiplyBigInts(numm1, numm2); // Represents 56088
console.log(product); // Outputs [5, 6, 0, 8, 8]

function exponentiation(base, exponent) {
    // Convert exponent from array to number
    let expNumber = parseInt(exponent.join(''), 10);
    // Initialize result as base (1 would be neutral element for multiplication)
    let result = base;
    // Special case: exponentiation to the power of 0
    if (expNumber === 0) return [1]; // Assuming representation as [1] for the number 1
    // Perform exponentiation
    for (let i = 1; i < expNumber; i++) {
        result = multiplyBigInts(result, base);
    }
    return result;
}
// Example usage:
let nummm1 = [1, 2]; // Represents 123
let nummm2 = [4]; // Represents 456
console.log(exponentiation(nummm1, nummm2));
/*

1.3 Define an ADT for character strings. Your ADT should consist of typical
functions that can be performed on strings, with each function defined in
terms of its input and output. Then define two different physical representa-
tions for strings.
1.4 Define an ADT for a list of integers. First, decide what functionality your
ADT should provide. Example 1.4 should give you some ideas. Then, spec-
ify your ADT in Java in the for    m of an abstract class declaration, showing
the functions, their parameters, and their return types.
1.5 Briefly describe how integer variables are typically represented on a com-
puter. (Look up one’s complement and two’s complement arithmetic in an
introductory computer science textbook if you are not familiar with these.)
Why does this representation for integers qualify as a data structure as de-
fined in Section 1.2?
1.6 Define an ADT for a two-dimensional array of integers. Specify precisely
the basic operations that can be performed on such arrays. Next, imagine an
application that stores an array with 1000 rows and 1000 columns, where less
Sec. 1.6 Exercises 21
than 10,000 of the array values are non-zero. Describe two different imple-
mentations for such arrays that would be more space efficient than a standard
two-dimensional array implementation requiring one million positions.
1.7 Imagine that you have been assigned to implement a sorting program. The
goal is to make this program general purpose, in that you don’t want to define
in advance what record or key types are used. Describe ways to generalize
a simple sorting algorithm (such as insertion sort, or any other sort you are
familiar with) to support this generalization.
1.8 Imagine that you have been assigned to implement a simple sequential search
on an array. The problem is that you want the search to be as general as pos-
sible. This means that you need to support arbitrary record and key types.
Describe ways to generalize the search function to support this goal. Con-
sider the possibility that the function will be used multiple times in the same
program, on differing record types. Consider the possibility that the func-
tion will need to be used on different keys (possibly with the same or differ-
ent types) of the same record. For example, a student data record might be
searched by zip code, by name, by salary, or by GPA.
1.9 Does every problem have an algorithm?
1.10 Does every algorithm have a Java program?
1.11 Consider the design for a spelling checker program meant to run on a home
computer. The spelling checker should be able to handle quickly a document
of less than twenty pages. Assume that the spelling checker comes with a
dictionary of about 20,000 words. What primitive operations must be imple-
mented on the dictionary, and what is a reasonable time constraint for each
operation?
1.12 Imagine that you have been hired to design a database service containing
information about cities and towns in the United States, as described in Ex-
ample 1.2. Suggest two possible implementations for the database.
1.13 Imagine that you are given an array of records that is sorted with respect to
some key field contained in each record. Give two different algorithms for
searching the array to find the record with a specified key value. Which one
do you consider “better” and why?
1.14 How would you go about comparing two proposed algorithms for sorting an
array of integers? In particular,
(a) What would be appropriate measures of cost to use as a basis for com-
paring the two sorting algorithms?
(b) What tests or analysis would you conduct to determine how the two
algorithms perform under these cost measures?
1.15 A common problem for compilers and text editors is to determine if the
parentheses (or other brackets) in a string are balanced and properly nested.
22 Chap. 1 Data Structures and Algorithms
For example, the string “((())())()” contains properly nested pairs of paren-
theses, but the string “)()(” does not; and the string “())” does not contain
properly matching parentheses.
(a) Give an algorithm that returns true if a string contains properly nested
and balanced parentheses, and false if otherwise. Hint: At no time
while scanning a legal string from left to right will you have encoun-
tered more right parentheses than left parentheses.
(b) Give an algorithm that returns the position in the string of the first of-
fending parenthesis if the string is not properly nested and balanced.
That is, if an excess right parenthesis is found, return its position; if
there are too many left parentheses, return the position of the first ex-
cess left parenthesis. Return −1 if the string is properly balanced and
nested.
1.16 A graph consists of a set of objects (called vertices) and a set of edges, where
each edge connects two vertices. Any given pair of vertices can be connected
by only one edge. Describe at least two different ways to represent the con-
nections defined by the vertices and edges of a graph.
1.17 Imagine that you are a shipping clerk for a large company. You have just
been handed about 1000 invoices, each of which is a single sheet of paper
with a large number in the upper right corner. The invoices must be sorted by
this number, in order from lowest to highest. Write down as many different
approaches to sorting the invoices as you can think of.
1.18 How would you sort an array of about 1000 integers from lowest value to
highest value? Write down at least five approaches to sorting the array. Do
not write algorithms in Java or pseudocode. Just write a sentence or two for
each approach to describe how it would work.
1.19 Think of an algorithm to find the maximum value in an (unsorted) array.
Now, think of an algorithm to find the second largest value in the array.
Which is harder to implement? Which takes more time to run (as measured
by the number of comparisons performed)? Now, think of an algorithm to
find the third largest value. Finally, think of an algorithm to find the middle
value. Which is the most difficult of these problems to solve?
1.20 An unsorted list allows for constant-time insert by adding a new element at
the end of the list. Unfortunately, searching for the element with key value X
requires a sequential search through the unsorted list until X is found, which
on average requires looking at half the list element. On the other hand, a
sorted array-based list of n elements can be searched in log n time with a
binary search. Unfortunately, inserting a new element requires a lot of time
because many elements might be shifted in the array if we want to keep it
sorted. How might data be organized to support both insertion and search in
log n time? */
/* // Reverse a String
function reverseStr(str){
    let result = "";
    for(let i=str.length-1;i>=0;i--){

        result += str[i];
    }
    return result;
}
let strings = "ABC";
console.log(reverseStr(strings));
console.log(reverseStr("hello"));
console.log(reverseStr("javascript"));
console.log(reverseStr("a")); */

/* // palindrome
function isPalindrome(str){
    let reversed = "";
    for(let i=str.length-1;i>=0;i--){
        reversed += str[i];
    }
    return str === reversed;

}
console.log(isPalindrome("madam")) // true
console.log(isPalindrome("hello")) // false */

// Find the Largest Number in an Array Input: [10, 5, 20, 8]
// Output: 20

/* function findLargest(arr){
    let largest = arr[0];
    for(let i=1;i<arr.length;i++){
        if(arr[i]>largest){
            largest = arr[i];
        }
    }
    return largest;
}
console.log(findLargest([10,5,20,50])); */

// Count Vowels in a String
function countVowels(str){
    let count = 0;
    for(let i=0;i<str.length;i++){
        if(str[i] === "a" || str[i] === "e" || str[i] === "i" || str[i] === "o" || str[i] === "u"){
    count++;
}

    }
    return count;
}
console.log(countVowels("javascript")); 
// 3
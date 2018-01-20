//Largest palindrome made from the product of two 3-digit numbers.
pals = [];
for (var i = 0; i < 1000; i++) {

    for (var j = 0; j < 1000; j++) {

        var result = i * j;
        var str = result.toString().split('');

        if (str[0] != str[str.length-1]) { continue; }

        if (isPalindrome(str) && result !== 0) {
            pals.push(result);
        }
    }
}

function isPalindrome(arr) {

    var size = arr.length
    for (var i = 0; i < size; i++) {
        if (arr[i] !== arr[size-(i+1)]) {
            return false;
        } 
    }
    return true;
}

console.log(pals.sort(function(a,b) { return b - a;}));

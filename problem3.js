//Prime factors of 13195 are 5,7,13,29. What is the largest prime factor of the number 600851475143

var number = 600851475143;
var factors = [];

for (var i = 1; i <= number; i++) {

    if (number % i == 0 || number == i) {        
        if (isPrime(i)) {
            factors.push(i);
            number = number / i;
        }
    }
}

function isPrime(num) {
    for (var i = 2; i < num; i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}
console.log(factors);


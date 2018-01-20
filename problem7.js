var index = 0;
var nthPrime = 10001;

for (var i = 2; i < Number.MAX_SAFE_INTEGER; i++) {
    if (isPrime(i)) {
        index++;
        if (index === nthPrime) {
            console.log(i);
            return;
        }
    }
}

function isPrime(num) {
    for (var i = 2; i < num; i++) {

        var res = num / i;
        if (Number.isInteger(res)) {
            return false;
        }
    }
    return true;
}
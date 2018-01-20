//Smallest positive number that is evenly divisible by all the numbers from 1 to 20.
var num = 20;
for (var i = 1; i < Number.MAX_SAFE_INTEGER; i++) {
    if (isDivisible(num, i)) { 
        console.log(i);
        return;
    }
}


function isDivisible(number, target) {
    for (var i = number; i > 0; i--) {

        var div = target / i;
        if (!Number.isInteger(div)) {
            return false;
        } 
    }
    return true;
}
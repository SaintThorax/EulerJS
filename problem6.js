var sumSquares= 0;
var squaresSum = 0;

for (var i = 1; i <= 100; i++) {
    sumSquares += Math.pow(i,2);
    squaresSum += i;

}
squaresSum = Math.pow(squaresSum, 2);
console.log(squaresSum - sumSquares);

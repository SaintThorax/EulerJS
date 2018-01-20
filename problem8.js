var series = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450"

//Setup the grid in which we divide the string by 20 rows, and with 50 columns
var grid = [];
for (var i = 0; i < 20; i++) {
    var arr = series.substr((i*50), (50 * (i+1))).split('');
    var row = [];
    for (var j = 0; j < 50; j++) {
        var int = parseInt(arr[j]);        
        row.push([int]);
    }    
    grid.push(row);
}

var products = {};
var currentProduct = [];
var adjacentProduct = 13; //set to 12
var highestProduct = 0;
var hprod;
var nestValues = [];


for (var i = 0; i < 20; i++) {
    var start = new Date();
    
    for (var j = 0; j < 50; j++) {

        if (grid[i][j] == 0) { continue; }

        var sc = new Date();
        var pos = grid[i][j];
        products[i + '-' + j] = {};
        products[i + '-' + j].value = pos[0];
         
        products[i + '-' + j].nest = 1; 
        products[i + '-' + j].sequence = [[i,j]];  
        products[i + '-' + j].row = i; 
        products[i + '-' + j].col = j; 
        products[i + '-' + j].highestVal = 0; 
        
        currentProduct = products[i + '-' + j];   
        adjacentDigits(i, j, 1, products[i + '-' + j]);        
        nestValues = nestValues.sort(function(a,b) { return b - a; });
        if (nestValues[0] > highestProduct) {
            highestProduct = nestValues[0];
            hprod = currentProduct;
        } else {
            delete products[i + '-' + j];
        }
        var ec = new Date();
        console.log('\tcol:', j, 'in: ', ec-sc );
        
    }

    for (prod in products) {
        if (products[prod].highestVal < highestProduct) {
            delete products[prod];
        }
    }

    var end = new Date();
    console.log('row:', i, ' in ', end-start);
    
}
// console.log(products);
console.log(highestProduct);



function adjacentDigits(row, col, nest, parent) {
    var noMoreNest = false;

    var adjacents = [];
    var nextNesting = [];
    if ((nest + 1) > 13) {
        return;
    }
    
    rowLabel : for (var i = row-1; i <= (row+1); i++) {
        
        if (i < 0 || i > 19) { continue rowLabel;}
        
        colLabel : for (var j = col-1; j <= (col+1); j++) {
            
            if (i == parent.row && j == parent.col) { continue colLabel; }
            if (j < 0 || j > 49) { continue colLabel;}
            
            if ((i < row || i > row) && (j < col || j > col)) {
                continue colLabel;
            }

            if (grid[i][j] == 0) { continue; }
            
            var newSequence = parent.sequence;
            for (seq in newSequence) {
                if (newSequence[seq][0] == i && newSequence[seq][1] == j) {
                    continue colLabel;
                }
                
            }
            
            parent[i + '-' + j] = {};
            
            parent[i + '-' + j].gridValue = grid[i][j][0]; 
            parent[i + '-' + j].nest = (nest+1); 
            parent[i + '-' + j].row = i;                                                                                    
            parent[i + '-' + j].col = j;                                                                                    
            parent[i + '-' + j].sequence = newSequence.concat([[i,j]]);                                                                                                     
            parent[i + '-' + j].value = grid[i][j][0] * parent.value;
                
            nestValues.push(grid[i][j][0] * parent.value);
            if (!noMoreNest) {
                adjacentDigits(i, j, (nest + 1), parent[i + '-' + j]);        
            }
            if (grid[i][j][0] * parent.value > currentProduct.highestVal) {
                currentProduct.highestVal = grid[i][j][0] * parent.value;
            }
        }
    }
}

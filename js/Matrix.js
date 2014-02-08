function Matrix(ary) {
    this.mtx = ary
    this.height = ary.length;
    this.width = ary[0].length;
}

Matrix.prototype.toString = function() {
    var s = []
    for (var i = 0; i < this.mtx.length; i++)
        s.push(this.mtx[i].join(","));
    return s.join("\n");
}

// returns a new matrix
Matrix.prototype.transpose = function() {
    var transposed = [];
    for (var i = 0; i < this.width; i++) {
        transposed[i] = [];
        for (var j = 0; j < this.height; j++) {
            transposed[i][j] = this.mtx[j][i];
        }
    }
    return new Matrix(transposed);
}
// IdentityMatrix is a "subclass" of Matrix

function IdentityMatrix(n) {
    this.height = n;
    this.width = n;
    this.mtx = [];
    for (var i = 0; i < n; i++) {
        this.mtx[i] = [];
        for (var j = 0; j < n; j++) {
            this.mtx[i][j] = (i == j ? 1 : 0);
        }
    }
}
IdentityMatrix.prototype = Matrix.prototype;
// returns a new matrix
Matrix.prototype.mult = function(other) {
    if (this.width != other.height) {
        throw "error: incompatible sizes";
    }

    var result = [];
    for (var i = 0; i < this.height; i++) {
        result[i] = [];
        for (var j = 0; j < other.width; j++) {
            var sum = 0;
            for (var k = 0; k < this.width; k++) {
                sum += this.mtx[i][k] * other.mtx[k][j];
            }
            result[i][j] = sum;
        }
    }
    return new Matrix(result);
}

// the Matrix exponentiation function
// returns a new matrix
Matrix.prototype.exp = function(n) {
    var result = new IdentityMatrix(this.height);
    for (var i = 1; i <= n; i++) {
        result = result.mult(this);
    }
    return result;
}

function benchmark(theFunc, theInt, viewport) {
    var start = new Date().getMilliseconds();
    // calculate the number
    var tmp = theFunc(theInt);
    var end = new Date().getMilliseconds();
    var time = end - start;
    // print the number either to the console
    // or the html viewport
    if (!viewport) {
        console.log('Execution time: ' + time);
    } else {
        //viewport.innerHTML += 'fib(' + theInt + ')' + ' Execution time: ' + time + ' ms<br>';
    }
}

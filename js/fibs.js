//Recursive

function fibRec(n) {
    return function(n, a, b) {
        return n > 0 ? arguments.callee(n - 1, b, a + b) : a;
    }(n, 0, 1);
}

//Iterative

function fibIter(n) {
    var
    a = 0,
        b = 1,
        t;
    while (n-- > 0) {
        t = a;
        a = b;
        b += t;
    }
    return a;
}

//Matrix

function fibMat(n) {
    //this is our constant matrix of multiplication
    var M = new Matrix([
        [1, 1],
        [1, 0]
    ]);
    var m = M.exp(n);
    return m.mtx[0][1];
}

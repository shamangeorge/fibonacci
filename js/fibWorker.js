importScripts('./Matrix.js');
importScripts('./fibs.js');

self.addEventListener('message', function(e) {
    var data = e.data;
    switch (data.cmd) {
        case 'recursive':
            var val = benchLoop(fibRec, data.value);
            self.postMessage('Recursive Method:<br> ' + val + '<br>');
            break;
        case 'iterative':
            var val = benchLoop(fibIter, data.value);
            self.postMessage('Iterative Method:<br> ' + val + '<br>');
            break;
        case 'matrix':
            var val = benchLoop(fibMat, data.value);
            self.postMessage('Matrix Method:<br> ' + val + '<br>');
            break;
        case 'all':
            var val1 = benchLoop(fibRec, data.value);
            var val2 = benchLoop(fibIter, data.value);
            var val3 = benchLoop(fibMat, data.value);
            self.postMessage('<br>Recursive Method:<br> ' + val1 + '<br>' + 'Iterative Method:<br> ' + val2 + '<br>' + 'Matrix Method:<br> ' + val3 + '<br>');
            break;
        case 'stop':
            self.postMessage('WORKER STOPPED: ' + data.msg +
                '.<br> (buttons will no longer work and you will have to reload this page to restart the worker, sorry)' + '<br>');
            self.close(); // Terminates the worker.
            break;
        default:
            self.postMessage('Unknown command: ' + data.msg + '<br>');
    };
}, false);

function benchLoop(Func, n) {
    var start = new Date().getMilliseconds();
    var val = Func(n);
    var end = new Date().getMilliseconds();
    var tm = end - start;
    return 'Execution time for fib(' + n + ') = ' + val + ':<br> ' + Math.abs(tm) + 'ms<br>';
}

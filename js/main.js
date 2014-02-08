var but1 = document.getElementById('butN');
but1.addEventListener('click', recurseMe, false);
var but2 = document.getElementById('butNIter');
but2.addEventListener('click', iterateMe, false);
var but3 = document.getElementById('butNMat');
but3.addEventListener('click', matrixMe, false);
var but4 = document.getElementById('butNAll');
but4.addEventListener('click', onClickAll, false);

function recurseMe(e) {
    worker.postMessage({
        'cmd': 'recursive',
        'value': document.getElementById('fibN').value || 50
    });
}
function iterateMe(e) {
    worker.postMessage({
        'cmd': 'iterative',
        'value': document.getElementById('fibN').value || 50
    });
}
function matrixMe(e) {
    worker.postMessage({
        'cmd': 'matrix',
        'value': document.getElementById('fibN').value || 50
    });
}
function onClickAll(e) {
    worker.postMessage({
        'cmd': 'all',
        'value': document.getElementById('fibN').value || 50
    });
}
function stop() {
    // worker.terminate() from this script would also stop the worker.
    worker.postMessage({
        'cmd': 'stop',
        'msg': 'Bye'
    });
}
function unknownCmd() {
    worker.postMessage({
        'cmd': 'foobard',
        'msg': '???'
    });
}
var worker = new Worker('./js/fibWorker.js');
worker.addEventListener('message', function(e) {
    document.getElementById('result').innerHTML = e.data;
}, false);
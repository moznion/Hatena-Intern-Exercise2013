// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
function parseLTSVLog(logStr) {
    var logs = logStr.split("\n");
    logs.pop(); // Remove null element.

    var logObjects = [];
    logs.forEach(function(log) {
        log.match(/path:([^\t]+)/);
        var path = RegExp.$1;
        log.match(/reqtime_microsec:([^\n]+)/);
        var reqtime = parseInt(RegExp.$1, 10);

        logObjects.push({
            path:             path,
            reqtime_microsec: reqtime
        });
    });
    return logObjects;
}

// 課題 JS-2: 関数 `createLogTable` を記述してください

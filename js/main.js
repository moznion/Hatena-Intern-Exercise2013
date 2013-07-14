// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
function parseLTSVLog(logStr) {
    var logs = logStr.split("\n");
    logs.pop(); // Remove null element.

    var logObjectList = [];
    var length = logs.length;
    for (var i = 0; i < length; i++) {
        var log = logs[i];
        log.match(/path:([^\t]+)/);
        var path = RegExp.$1;
        log.match(/reqtime_microsec:([^\n]+)/);
        var reqtime = parseInt(RegExp.$1, 10);

        logObjectList.push({
            path:             path,
            reqtime_microsec: reqtime
        });
    }
    return logObjectList;
}

// 課題 JS-2: 関数 `createLogTable` を記述してください
function createLogTable(dom, logObjectList) {
    var table = dom.appendChild(document.createElement("table"));
    var thead = table.appendChild(document.createElement("thead"));
    thead.appendChild(document.createElement("tr")).innerHTML = "<th>path</th><th>reqtime_microsec</th>";
    var tbody = table.appendChild(document.createElement("tbody"));

    var length = logObjectList.length;
    for (var i = 0; i < length; i++) {
        var logObject = logObjectList[i];
        var innerHTML = "<td>" + logObject.path + "</td><td>" + logObject.reqtime_microsec + "</td>";
        tbody.appendChild(document.createElement("tr")).innerHTML = innerHTML;
    }
}

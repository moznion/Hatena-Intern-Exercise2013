function parseLTSVLog(logStr) {
    var logs = logStr.split("\n");
    logs.pop(); // Remove null element.

    var logObjectList = [];
    var length = logs.length;
    for (var i = 0; i < length; i++) {
        var log = logs[i];

        // For `path`
        try {
            var path = log.match(/path:([^\t]+)/)[1] || "-";
        } catch (e) {
            var path = "N/A";
        }

        // For `reqtime_microsec`
        try {
            var timeStr = log.match(/reqtime_microsec:([^\n]+)/)[1];
            var reqtime;
            if (!isNaN(reqtime = timeStr - 0)) {
                reqtime = parseInt(timeStr, 10);
            }
        } catch (e) {
            var reqtime = "N/A";
        }

        logObjectList.push({
            path:             path,
            reqtime_microsec: reqtime
        });
    }
    return logObjectList;
}

function createLogTable(dom, logObjectList) {
    var childNodes       = dom.childNodes;
    var childNodesLength = childNodes.length;

    var logTable = document.getElementById("log-table");
    if (logTable) {
        logTable.parentNode.removeChild(logTable);
    }

    var table = dom.appendChild(document.createElement("table"));
    table.id  = "log-table";
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

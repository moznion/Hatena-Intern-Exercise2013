var showLogTableOn = function(dom, logObjectList) {
    return function() {
        var logObjectList = parseLTSVLog(document.getElementById("log-input").value);
        createLogTable(dom, logObjectList);
    }
};

var submitButton      = document.getElementById("submit-button");
var logTableContainer = document.getElementById("table-container");

submitButton.addEventListener("click", showLogTableOn(logTableContainer), false);

var showLogTableOn = function(dom, logObjectList) {
    return function() {
        createLogTable(dom, logObjectList);
    }
};

var submitButton      = document.getElementById("submit-button");
var logTableContainer = document.getElementById("table-container");
var logObjectList     = parseLTSVLog(document.getElementById("log-input").value);

submitButton.addEventListener("click", showLogTableOn(logTableContainer, logObjectList), false);

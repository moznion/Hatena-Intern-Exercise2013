"use strict";

QUnit.module("課題 JS-1");

QUnit.test("関数定義の確認", function () {
    QUnit.ok(typeof parseLTSVLog === "function", "`parseLTSVLog` という名前の関数がある");
});

QUnit.test("`parseLTSVLog` 関数の動作確認", function () {
    var logStr;
    var logRecords;

    logStr = "path:/\treqtime_microsec:500000\n";
    logRecords = parseLTSVLog(logStr);
    QUnit.deepEqual(logRecords, [
        { path: "/", reqtime_microsec: 500000 }
    ], "1 行のみのログデータが期待通りパースされる");

    logStr =
        "path:/\treqtime_microsec:400000\n" +
        "path:/uname\treqtime_microsec:123456\n" +
        "path:/\treqtime_microsec:500000\n";
    logRecords = parseLTSVLog(logStr);
    QUnit.deepEqual(logRecords, [
        { path: "/",      reqtime_microsec: 400000 },
        { path: "/uname", reqtime_microsec: 123456 },
        { path: "/",      reqtime_microsec: 500000 }
    ], "3 行からなるログデータが期待通りパースされる");

    logStr = "";
    logRecords = parseLTSVLog(logStr);
    QUnit.deepEqual(logRecords, [], "空文字列を渡したときは空の配列を返す");
});

QUnit.test("`parseLTSVLog` 関数の「例外的」動作確認", function () {
    var logStr;
    var logRecords;

    logStr = "p:/\tr:500000\n";
    logRecords = parseLTSVLog(logStr);
    QUnit.deepEqual(logRecords, [
        { path: "N/A", reqtime_microsec: "N/A" }
    ], "path と reqtime_microsec フィールドが存在しない為 N/A になる");

    logStr = "path:/\treqtime_microsec:Hello!\n";
    logRecords = parseLTSVLog(logStr);
    QUnit.deepEqual(logRecords, [
        { path: "/", reqtime_microsec: NaN }
    ], "reqtime_microsec フィールドが非数値である為 NaN になる");
});

QUnit.module("課題 JS-2");

QUnit.test("関数定義の確認", function () {
    QUnit.ok(typeof createLogTable === "function", "`createLogTable` という名前の関数がある");
});

var setup4createLogTable = function() {
    // #qunit-fixture という要素は、QUnit が自動的に後片付けしてくれる要素
    var fixtureElem = document.getElementById("qunit-fixture");
    return fixtureElem.appendChild(document.createElement("div"));
};

QUnit.test("`createLogTable` 関数の動作確認", function () {
    var elem = setup4createLogTable();

    createLogTable(elem, [
        { path: "/", reqtime_microsec: 400000 },
        { path: "/uname", reqtime_microsec: 123456 },
        { path: "/", reqtime_microsec: 500000 },
    ]);

    QUnit.strictEqual(elem.childNodes.length, 1, "渡した要素に子ノードが 1 つ追加されている");
    var tableElem = elem.firstChild;
    QUnit.strictEqual(tableElem.tagName, "TABLE", "渡した要素に追加された子ノードは table 要素");

    QUnit.strictEqual(tableElem.childNodes.length, 2, "table 要素の子ノードは 2 個");
    var theadElem = tableElem.firstChild;
    QUnit.strictEqual(theadElem.tagName, "THEAD", "table 要素の 1 つ目の子ノードは thead 要素");
    QUnit.strictEqual(theadElem.childNodes.length, 1, "thead 要素の子ノードは 1 個");
    var tbodyElem = theadElem.nextSibling;
    QUnit.strictEqual(tbodyElem.tagName, "TBODY", "table 要素の 2 つ目の子ノードは tbody 要素");
    QUnit.strictEqual(tbodyElem.childNodes.length, 3, "tbody 要素の子ノードは 3 個");

    var expectedTrElem = document.createElement("tr");

    var actualTheadTrElem = theadElem.firstChild;
    expectedTrElem.innerHTML = "<th>path</th><th>reqtime_microsec</th>";
    QUnit.ok(expectedTrElem.isEqualNode(actualTheadTrElem),
            "thead 要素の子要素の tr 要素の中身: " + expectedTrElem.innerHTML);

    var actualTbodyTrElem = tbodyElem.firstChild;
    expectedTrElem.innerHTML = "<td>/</td><td>400000</td>";
    QUnit.ok(expectedTrElem.isEqualNode(actualTbodyTrElem),
            "tbody 要素の子要素の 1 番目の tr 要素の中身: " + expectedTrElem.innerHTML);

    actualTbodyTrElem = actualTbodyTrElem.nextSibling;
    expectedTrElem.innerHTML = "<td>/uname</td><td>123456</td>";
    QUnit.ok(expectedTrElem.isEqualNode(actualTbodyTrElem),
            "tbody 要素の子要素の 2 番目の tr 要素の中身: " + expectedTrElem.innerHTML);

    actualTbodyTrElem = actualTbodyTrElem.nextSibling;
    expectedTrElem.innerHTML = "<td>/</td><td>500000</td>";
    QUnit.ok(expectedTrElem.isEqualNode(actualTbodyTrElem),
            "tbody 要素の子要素の 3 番目の tr 要素の中身: " + expectedTrElem.innerHTML);
});

QUnit.test("`createLogTable` 関数を2回以上呼んだ時の動作確認", function () {
    var elem = setup4createLogTable();

    createLogTable(elem, [
        { path: "/dave_grohl", reqtime_microsec: 44 },
    ]);
    QUnit.strictEqual(elem.childNodes.length, 1, "渡した要素に子ノードが 1 つ追加されている");

    var tableElem = elem.firstChild;
    var theadElem = tableElem.firstChild;
    var tbodyElem = theadElem.nextSibling;

    var actualTbodyTrElem = tbodyElem.firstChild;
    var expectedTrElem = document.createElement("tr");
    expectedTrElem.innerHTML = "<td>/dave_grohl</td><td>44</td>";
    QUnit.ok(expectedTrElem.isEqualNode(actualTbodyTrElem),
            "tbody 要素の子要素の 1 番目の tr 要素の中身: " + expectedTrElem.innerHTML);

    createLogTable(elem, [
        { path: "/kurt_cobain", reqtime_microsec: 27 },
    ]);
    QUnit.strictEqual(elem.childNodes.length, 1, "渡した要素に子ノードが新たに追加されない (上書きされる)");

    tableElem         = elem.firstChild;
    theadElem         = tableElem.firstChild;
    tbodyElem         = theadElem.nextSibling;
    actualTbodyTrElem = tbodyElem.firstChild;
    expectedTrElem.innerHTML = "<td>/kurt_cobain</td><td>27</td>";
    QUnit.ok(expectedTrElem.isEqualNode(actualTbodyTrElem),
            "tbody 要素の子要素の 1 番目の tr 要素の上書きされた中身: " + expectedTrElem.innerHTML);
});

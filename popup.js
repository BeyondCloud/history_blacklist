
document.getElementById('btnSaveKeyWords').onclick = function () {
    chrome.storage.sync.set({ "data": document.getElementById('keyWords').value }), function () {

        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    };
    // alert(document.getElementById('keyWords').value)
    window.close();
};

document.body.onload = function () {
    chrome.storage.sync.get("data", function (items) {
        if (!chrome.runtime.error) {
            if (items.data == null) { items.data = blacklist; }
            document.getElementById('keyWords').value = items.data;
        }
    });
}
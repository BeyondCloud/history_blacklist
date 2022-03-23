//第一次的初始化：extension初次載入時

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ "data": blacklist });
    main();
});
chrome.runtime.onStartup.addListener(function () {
    main();
});
function main() {
    var filter;
    chrome.storage.sync.get("data", function (items) {
        filter = preprocess_items(items)
    });
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let [data, { oldValue, newValue }] of Object.entries(changes)) {
            filter = newValue.split(",");
            for (var i = 0; i < filter.length; i++) {
                filter[i] = filter[i].trim();
            }
        }
    });
    chrome.history.onVisited.addListener(
        function (v_item) {
            if (v_item.title) {
                if (blacklistet(v_item.title, filter) ||
                    blacklistet(v_item.url, filter)) {
                    chrome.history.deleteUrl({ url: v_item.url });
                }
            }
        }
    );
}

function blacklistet(s, filter) {
    s = s.toLowerCase();
    for (var i = 0; i < filter.length; i++) {
        if (s.search(filter[i]) >= 0) {
            return true;
        }
    }
    return false;
}

function preprocess_items(items) {
    if (!chrome.runtime.error) {
        var filter = items.data.split(",");
        for (var i = 0; i < filter.length; i++) {
            filter[i] = filter[i].trim();
        }
    }
    return filter
}
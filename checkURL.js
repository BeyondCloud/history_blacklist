//第一次的初始化：extension初次載入時
chrome.runtime.onInstalled.addListener(function (items) {
    // initialize blacklist
    chrome.storage.sync.set({ "data": blacklist });
    // add listener
    chrome.storage.sync.get("data", function (items) {
        if (!chrome.runtime.error) {
            if (items.data == null) { alert("checkURL error: items is null!") }
            var filter = items.data.split(",");
            for (var i = 0; i < filter.length; i++) {
                filter[i] = filter[i].trim();
            }
        }
        chrome.history.onVisited.addListener(
            function (v_item) {
                var pure_title = v_item.title.match('(.*)(?= - Google 搜尋)');
                chrome.history.deleteUrl({ url: v_item.url });
                if (pure_title) {
                    if (blacklistet(pure_title[0], filter)) { chrome.history.deleteUrl({ url: v_item.url }); }
                    else if (blacklistet(v_item.url, filter)) {
                        chrome.history.deleteUrl({ url: v_item.url });
                    }
                }
            }
        );
    });
});


function blacklistet(s, filter) {
    s = s.toLowerCase();
    for (var i = 0; i < filter.length; i++) {
        if (s.search(filter[i]) >= 0) {
            return true;
        }
    }
    return false;
}

// function preprocess_items(items) {
//     if (!chrome.runtime.error) {
//         var filter = items.data.split(",");
//         for (var i = 0; i < filter.length; i++) {
//             filter[i] = filter[i].trim();
//         }
//     }
//     return filter
// }
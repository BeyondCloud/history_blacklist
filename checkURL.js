// Execute only one time when installed
chrome.runtime.onInstalled.addListener(function (items) {
    // initialize blacklist
    chrome.storage.sync.set({ "data": blacklist }, function () {
    });
    // setup listener , triggerd when writing history
    chrome.history.onVisited.addListener(
        chrome.storage.sync.get("data", function (items) {
            //item.url
            //item.id
            //item.title
            var filter = preprocess_items(items);
            alert(filter)

            var pure_title = item.title.match('(.*)(?= - Google 搜尋)');
            if (pure_title) {
                if (blacklistet(pure_title[0], filter)) { chrome.history.deleteUrl({ url: item.url }); }
                else if (blacklistet(item.url, filter)) {
                    chrome.history.deleteUrl({ url: item.url });
                }
            }
        })
    );


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

function preprocess_items(items) {
    if (!chrome.runtime.error) {
        var filter = items.data.split(",");
        for (var i = 0; i < filter.length; i++) {
            filter[i] = filter[i].trim();
        }
    }
    return filter
}
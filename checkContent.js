
chrome.storage.sync.get("data", function (items) {
    // alert(items.data)
    if (!chrome.runtime.error) {
        var filter = items.data.split(",");
        for (var i = 0; i < filter.length; i++) {
            filter[i] = filter[i].trim();
        }
    }
    // match the search keyword user just typed
    var searchbar_txt = document.documentElement.outerHTML.toLowerCase().match('(?<=title>)(.*)(?= - google)')[0];

    // if the searched keyword presented in the blacklist remove it
    for (var i = 0; i < filter.length; i++) {
        if (searchbar_txt.search(filter[i].toLowerCase()) >= 0) {
            console.log("Block", filter[i].toLowerCase());
            chrome.history.deleteUrl({ url: document.location.href });
            break;
        }
    }

});

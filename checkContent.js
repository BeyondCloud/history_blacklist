
chrome.storage.sync.get("data", function (items) {

    var filter = preprocess_items(itmes);
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

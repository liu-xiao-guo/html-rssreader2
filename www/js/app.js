/**
 * Wait before the DOM has been loaded before initializing the Ubuntu UI layer
 */
window.onload = function () {

    var UI = new UbuntuUI();
    UI.init();

    UI.pagestack.push("main");

    if (typeof localStorage["feeds"] == "undefined") {
        restoreDefault();
    }

    //load local storage feeds
    var feeds = eval(localStorage["feeds"]);
    if (feeds !== null) {
        var feeds_list = UI.list('#yourfeeds');
        feeds_list.removeAllItems();
        feeds_list.setHeader('My feeds');

        for (var i = 0; i < feeds.length; i++) {
            feeds_list.append(feeds[i],
                              null,
                              null,
                              function (target, thisfeed) { loadFeed(thisfeed); },
                              feeds[i]);
        }
    }
}

function restoreDefault() {
    localStorage.clear();
    var feeds = [];
    feeds.push("http://daker.me/feed.xml");
    feeds.push("http://www.omgubuntu.co.uk/feed");
    feeds.push("http://hespress.com/feed/index.rss");
    feeds.push("http://rss.slashdot.org/Slashdot/slashdot");
    feeds.push("http://www.reddit.com/.rss");
    feeds.push("http://www.guokr.com/rss/");

    try {
        localStorage.setItem("feeds", JSON.stringify(feeds));
        window.location.reload();
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            console.log("Error: Local Storage limit exceeds.");
        } else {
            console.log("Error: Saving to local storage.");
        }
    }
}

window.onload = (function () {
    if (window == top) {
        var foundImages = scrape();
        chrome.extension.sendRequest(foundImages);
    }

    function scrape() {
        var foundImages = [],
        images = document.body.getElementsByTagName('img');
        
        if (images.length === 0) {
            return;
        }
        
        for (i = 0, len = images.length; i < len; i++) {
            foundImages.push(images[i].src);
        }
        
        return foundImages;
    }
})();
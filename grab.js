/*
 * Jonathan Vingiano and Brad Troemel, 2011
 *
 */

(function () {

    var foundImages = scrape();
    chrome.extension.sendRequest(foundImages);


    function scrape() {
        var foundImages = [],
        images = document.body.getElementsByTagName('img'),
        re = /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpe?g|gif|png))(?:\?([^#]*))?(?:#(.*))?/i;
        
        if (images.length === 0) {
            return;
        }
        
        for (i = 0, len = images.length; i < len; i++) {            
            if (re.test(images[i].src)) {
                foundImages.push(images[i].src);
            }
        }
        console.log(foundImages);
        
        return foundImages;
    }
})();
/*
 * Jonathan Vingiano and Brad Troemel, 2011
 *
 */

(function () {
    if (window.location.href !== 'http://severe-frost-512.heroku.com/list') {

        var foundImages = scrape();
        chrome.extension.sendRequest(foundImages);

        function scrape() {
            var foundImages = [],
            found = {},
            images = document.body.getElementsByTagName('img'),
            re = /(http(s?):)|([\/|.|\w|\s])*\.(?:jpg|gif|png)/i;
            
            if (images.length === 0) {
                return;
            }            
            
            for (i = 0, len = images.length; i < len; i++) {            
                if (re.test(images[i].src)) {
                    foundImages.push(images[i].src);
                }
            }
            
            found = {
                source: window.location.host,
                title: document.title,
                images: foundImages
            }

//            console.log(foundImages);            
            return found;
        }
    }
})();

/*
 * Jonathan Vingiano and Brad Troemel, 2011
 *
 */

(function () {
    if (window.location.host != 'localhost:3000' &&
        window.location.host != 'surfcave.herokuapp.com' &&
        window.location.host != 'surfcave.com') {
        
        function doScrape() {
            var foundImages = scrape();        
            chrome.extension.sendRequest(foundImages);
        }
        
        function scrape() {
            var foundImages = [],
            found = {},
            images = document.body.getElementsByTagName('img'),
            re = /(http(s?):)|([\/|.|\w|\s])*\.(?:jpg|gif|png)/i;
            
            console.log(images);
            if (images.length === 0) return;
            
            for (i = 0, len = images.length; i < len; i++) {
                if (re.test(images[i].src)) {
                    foundImages.push(images[i].src);
                }
            }
            
            found = {
                source: window.location.href,
                title: document.title,
                images: foundImages
            }

            return found;
        }
        doScrape();
        setInterval('doScrape()', 60000);
    }
})();

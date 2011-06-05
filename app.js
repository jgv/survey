/*
 * Jonathan Vingiano and Brad Troemel, 2011
 *
 */

chrome.extension.onRequest.addListener(
    function(foundImages, sender, sendResponse){
        console.log(foundImages);
        sendResponse();
    }
);

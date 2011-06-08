/*
 * Jonathan Vingiano and Brad Troemel, 2011
 *
 */

chrome.extension.onRequest.addListener(
    function(foundImages, sender, sendResponse){      
        if (foundImages) {
            for (i = 0, len = foundImages.length; i < len; i++) {
                var url = "http://severe-frost-512.heroku.com/create",
                    params = "url=" + foundImages[i],
                    xhr = new XMLHttpRequest();
                
                xhr.open('POST', url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function() {//Call a function when the state changes.
	                  if(xhr.readyState == 4 && xhr.status == 200) {
		                    console.log(xhr.responseText);
	                  }
                }            
                xhr.send(params);
            }
        }
        sendResponse();
    }
);

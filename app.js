/*
 * Jonathan Vingiano and Brad Troemel, 2011
 *
 */

chrome.extension.onRequest.addListener(
    function(found, sender, sendResponse){      
        if (found) {
            var url = "http://surfcave.com/found";
//            var url = "http:/localhost:3000/found"

            var foundImages = found.images;

            for (i = 0, len = foundImages.length; i < len; i++) {            

            var xhr = new XMLHttpRequest();
                img = foundImages[i],
                params = 'url=' + img + '&source=' + found.source + '&title=' + found.title + '&username=' + localStorage['surfclub_username'];
                
                xhr.open('POST', url, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

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

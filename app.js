/*
 * Jonathan Vingiano and Brad Troemel, 2011
 *
 */

chrome.extension.onRequest.addListener(
    function(foundImages, sender, sendResponse){      
        if (foundImages) {
            var url = "http://severe-frost-512.heroku.com/create";
                
            var source = foundImages.pop();
            
            for (i = 0, len = foundImages.length; i < len; i++) {            
                console.log(i);
                var xhr = new XMLHttpRequest(),
                    img = foundImages[i],
                    params = 'url=' + img + '&source=' + source;
                
                console.log(img);

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

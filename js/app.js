/*
 * Jonathan Vingiano and Brad Troemel, 2011
 *
 */

var user = null;

function uid(){
    chrome.cookies.getAll({name:"___SC", domain:"surfcave.com"}, function(sc){
        user = unescape(sc[0].value);
    });    
} uid();

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse){      
        if (request && request.method === 'grab') {
            if (user != null) {
                console.log(user);
                var url = "http://surfcave.com/found", foundImages = request.images;
                
                for (i = 0, len = foundImages.length; i < len; i++) {            
                    
                    var xhr = new XMLHttpRequest();
                    var img = foundImages[i],
                    params = 'url=' + img;
                    params += '&source=' + request.source;
                    params += '&title=' + request.title;
                    params += '&uid=' + escape(user);
                    
                    xhr.open('POST', url, true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    
                    xhr.onreadystatechange = function() {
	                      if(xhr.readyState == 4 && xhr.status == 200) {
		                        console.log(xhr.responseText);
	                      }
                    }
                    xhr.send(params);
                }
                sendResponse();
            } else if (request.method === 'login' && sender.tab) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://localhost:3000/found/user', true);
                xhr.onreadystatechange = function() {
                    if(xhr.readyState == 4 && xhr.status == 200){
                        sendResponse({data:xhr});
                    }
                }
                
                var params = 'hash=' + uid();
                xhr.send(params);
                
            } else {
                console.log('what are you?');
                console.log(request);
            }
        }
    }
);

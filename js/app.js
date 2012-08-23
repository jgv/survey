/*
 * Jonathan Vingiano and Brad Troemel, 2011
 *
 */

var productionCookie, localCookie, dev = false;

var send = function(request, sender, sendResponse) {

  
  var cookie = productionCookie || localCookie;

  if (cookie) {

    var url, foundImages = request.images, data = cookie.split('___');

    if (productionCookie) {
      url = "http://surfcave.com/images.json";
    } else {
      url = "http://localhost:3000/images.json";
    }

    for (i = 0, len = foundImages.length; i < len; i++) {

      var xhr = new XMLHttpRequest();
      var img = foundImages[i],
      params = 'url=' + img;
      params += '&source=' + request.source;
      params += '&title=' + request.title;
      params += '&hash=' + unescape(data[0]);
      params += '&uid=' + data[1];

      xhr.open('POST', url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
        }
      }
      xhr.send(params);
    }
    sendResponse({ status: 'ok' });
  } else {
    console.log('not logged in');
    sendResponse({ status: 'logged out' });
    // handle it if we want to
  }
};

//chrome.cookies.remove({ "name": "sc", "url": "http://localhost"});

chrome.cookies.get({ "name": "sc", "url": "http://surfcave.com"}, function(c) { 
  console.log(c)
  if (c && !dev) productionCookie = c.value;
});

chrome.cookies.get({ "name": "sc", "url": "http://localhost"}, function(c) { 
  if (c) localCookie = c.value; });

chrome.extension.onMessage.addListener(send);

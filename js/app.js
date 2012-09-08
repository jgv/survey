/*
 * Jonathan Vingiano and Brad Troemel, 2011
 *
 */

var productionCookie, localCookie, dev = false;

var send = function(request, sender, sendResponse) {

  // get the cookie
  var cookie = productionCookie || localCookie;

  if (cookie) {

    // assign images and parse cookie
    var url, foundImages = request.images, data = cookie.split('___');

    // where will we send the data
    if (productionCookie) {
      url = "http://surfcave.com/images.json";
    } else {
      url = "http://localhost:3000/images.json";
    }

    // send each image off with xhr
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
          if (dev) console.log(xhr.responseText);
        }
      }
      xhr.send(params);
    }
    // ping the content script and say its all good
    sendResponse({ status: 'ok' });
  } else {
    if (dev) console.log('not logged in');
    // no cookie ;_;
    sendResponse({ status: 'logged out' });
    // handle it if we want to
  }
};

// get the production cookie
chrome.cookies.get({ "name": "sc", "url": "http://surfcave.com"}, function(c) { 
  if (c && !dev) productionCookie = c.value;
});

// get the dev cookie
chrome.cookies.get({ "name": "sc", "url": "http://localhost"}, function(c) { 
  if (dev) console.log(c)
  if (c) localCookie = c.value;
});

// talk to content script
chrome.extension.onMessage.addListener(send);

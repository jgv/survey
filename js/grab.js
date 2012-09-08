/*
 * Jonathan Vingiano and Brad Troemel, 2011
 *
 */

(function () {    

  // where are we
  if (window.location.host == 'localhost:3000' ||
      window.location.host == 'surfcave.herokuapp.com' ||
      window.location.host == 'surfcave.com' ||
      window.location.host == 'lvh.me:3000') {

    // insert the check and dont execute the grabber
    var extCheck = document.createElement('div');
    extCheck.id = "surfcave_ext_check";
    document.body.insertBefore(extCheck, document.body.firstChild);

  } else {
    
    var foundImages = [];

    // do stuff
    function init() {
      var foundImages = scrape();
      if (foundImages) {
        console.log('sending message')
        chrome.extension.sendMessage(foundImages, function(response){
          console.log(response);
        });
      }
    }
    
    function scrape() {
      var found = {},
      numImages = foundImages.length,
      images = document.body.getElementsByTagName('img'),
      re = /(http(s?):)|([\/|.|\w|\s])*\.(?:jpg|gif|png)/i;
      
      // peace out if there are no images
      if (images.length === 0) return;
      
      if (!foundImages.length) {
        for (var i = 0, len = images.length; i < len; i++) {
          if (re.test(images[i].src)) foundImages.push(images[i].src);
        }
      } else {
        for (var i = 0, len = images.length; i < len; i++) {
          if (re.test(images[i].src && foundImages.indexOf(images[i].src) === -1)) {
            console.log('adding after node instertion');
            foundImages.push(images[i].src);
          }
        }
      }

      found = {
        method: 'grab',
        source: window.location.href,
        title: document.title,
        images: foundImages.slice(numImages)
      }
      
      if (numImages == foundImages.length) return false;
      else return found;
    }

    init(); // do things
    document.addEventListener("DOMSubtreeModified", init, true); // listen for things
    
  }
})();

window.onload = function() {

    chrome.cookies.getAll({name:"___SC", domain:"surfcave.com"}, function(sc){
        _user = unescape(sc[0].value);
        var message = document.getElementById('sc');
        if (_user == null) {
            message.innerHTML = "<a href='http://surfcave.com/login' target='_blank'>Click here</a> to create an account or login";
        } else {
            var username = getLogin();
            console.log('you are logged in');
            message.innerHTML = 'you are logged in';
            // message.innerHTML = "You are logged in as" + user;
        }
    });


    /* TODO: show username
    function getLogin(){
        chrome.tabs.getSelected(null, function(tab) {
            var id = userSesh();
            if (!id) freakout();
            else chrome.tabs.sendRequest(tab.id, 
                                         { method: "fromPopup", 
                                           tab_id: tab.id,
                                           uid: id
                                         }, function(response) {
                                             return response;
                                         });  
        });
    } */  
    
}

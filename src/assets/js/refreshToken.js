function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  setInterval(function() {
    $.ajax({
      type: 'POST',
      url: '/token',
      data: {
        refreshToken: getCookie('refreshJwt')
      },
      success: function(data) {},
      error: function(xhr) {
        window.alert(JSON.stringify(xhr));
        window.location.replace('/index.html');
      }
    });
  }, 10000);
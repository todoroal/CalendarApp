


$.ajax({

    'url' : 'http://localhost:3000/register',
    'type' : 'POST',
    'data' : {
        'name' : document.getElementsByName('username'),
        'email' : document.getElementsByName('emailaddress'),
        'password' : document.getElementsByName('password')
    },
    'success' : function(data) {              
        alert('Data: '+data);
    },
    dataType: 'json',
    'error' : function(request,error)
    {
        alert("Request: "+JSON.stringify(request));
    }
});
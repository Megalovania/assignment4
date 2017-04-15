// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
  $(".flexsearch-input").keyup(function(event){
    
    var input = $(".flexsearch-input").val();
    $(".flexsearch-predictions ul").empty();
    $(".flexsearch-predictions").hide();
    
    predictSearch(input);
  
  
  });
  
  function predictSearch(input){
    var url = "http://www.mattbowytz.com/simple_api.json?data=all";
    var googleurl = "http://www.google.com/search?q=";
    input = input.toLowerCase();
    
    
    if(input.length != 0){
      $.ajax({
        url: url,
        method: 'GET',  
        datatype: 'json',
      }).done(function(data){
        var count=0;
        //console.log(result);
        
        $.each(data['data'], function(key, value){
          
          $.each(data['data'][key], function(index, value){
          
            console.log(value);
            if(value.toLowerCase().match("^"+input) && count<4){
              var searchurl = googleurl+value;
              searchurl.replace(" ", "+");
              $('.flexsearch-predictions ul').append('<li><a href="'+searchurl+'">'+value+'</a></li>');
              
              count++;
              $(".flexsearch-predictions").show();
            }
            
          });
          
        });

      });
      
    }
    
  }
  
})();
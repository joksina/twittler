$(document).ready(function(){

var ready = false, index, list, myVar, count = 0, wait = 200;

//Create the time to show minutes ago
//ref stackoverflow, moment.js
function time(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

//console.log(streams.users);
//console.log(streams.home);
//getting the tweets to avoid repeating
function loadTweet(val){
  if(ready){
    return streams.users[val];
  } else {
    return streams.home;
  }
}

//setting the interval for tweet to keep showings
function interval(num){
  $(".tweets").text('');
  clearInterval(myVar);
  myVar = setInterval(function(){
    return showTweet(num);
  }, wait);
  count = 0;
}
interval();

//get all the twitts and keep adding
function showTweet(show){
  list = loadTweet(show);
  index = list.length - 1;
  while(index >= count){
    //getting twitts and users
    var tweet = list[count];
    var $tweet = $('<div></div>').addClass('tweet');
    $tweet.append('<a href="#" class="user">@' + tweet.user + '</a> ' + '<br>' + tweet.message + '<time class="time"> - ' + time(tweet.created_at) + '<br>' + '</time><br>');
    $tweet.prependTo($(".tweets"));

   count+=1;
  }
}
showTweet();



//clicking users
document.getElementById("nav01").innerHTML =
"<ul id='menu'>" +
"<li><a href=''>mracus</a></li>" +
"<li><a href=''>douglascalhoun</a></li>" +
"<li><a href=''>shawndrost</a></li>" +
"<li><a href=''>sharksforcheap</a></li>" +
"</ul>";

$(".tweets").on("click", "a", function(event) {
//prevent the default not to trigger
  event.preventDefault();
  var person = $(event.target).text().substring(1);
  $(".back").show();
  ready = true;
  //set the interval for person
  //to keep showing the twittler's twitts when clicked
  interval(person);
});

//create event handler to go back to main tweet
//hide the button when one clicks go back!!
$(".back").on("click", "a", function(event) {
  event.preventDefault();
  $(".back").hide();
  ready = false;
  //go back to keep feeding tweet
  interval();
});

function each(arr, callback){
  if(Array.isArray(arr)){
    for(var i = 0; i < arr.length; i++){
      callback(arr[i], i, arr);
    }
  }else{
    for(var key in arr){
      callback(arr[key], key, arr);
    }
  }
}

function addTweet(){}

});
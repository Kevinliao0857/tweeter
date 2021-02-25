/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {


loadtweets();


// Ajax POSTING
$(".new-tweet form").on("submit", function(event) {
  event.preventDefault();


  $.ajax({
    url: "/tweets",
    data: $(this).serialize(),
    method: "POST",
    success:
    function() {
      loadtweets();
      $textarea.val("");
      $(".counter").text("140")
    }
  });


});




});



/*render Tweets function*/
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    $("#tweets-container").append(createTweetElement(tweet))
    }
  }
  
  
  //Creating Tweet Element
  const createTweetElement = (tweet) => {
  const $tweet = $("<article class='tweetPost'>")
  
  
    const htmlTweetCode = `
  
      <header class="tweetHeader">
        <img class="profileImage" src=${tweet.user.avatars}></img>
        <div class="name">${tweet.user.name}</div>
        <div class="username">${tweet.user.handle}</div>
      </header>    
        <article>
          <p>${tweet.content.text}</p>
        </article>
      <footer class="footer">${tweet.created_at}
      </footer>
  `;
  
  return $tweet.html(htmlTweetCode)
  };
  
  
  
  //loadtweets function
  const loadtweets = () => {
    $.ajax("/tweets", {
      method: "GET",
      dataType: "JSON",
      success: function(tweets) {
        renderTweets(tweets)
      } 
  
    })
  };
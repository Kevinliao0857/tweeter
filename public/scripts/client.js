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

  const textArea = $(this).children("textarea");
  const inputText = textArea.val();
  // const errorMessage = $(this).children("h4");
  
  

  if (!inputText) {
    $(".tweet-error").text("Error empty tweet");
  } else if (inputText.length > 140) {
    $(".tweet-error").text("Over character limit")
  } else {
    $.ajax({
    url: "/tweets",
    data: $(this).serialize(),
    method: "POST",
    success:
      function () {
        loadtweets()
        textArea.val(''); 
        $('.counter').text('140');
      }
  });
  }

 

});
});


//escape
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


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
        <img class="profileImage" src=${escape(tweet.user.avatars)}></img>
        <div class="name">${escape(tweet.user.name)}</div>
        <div class="username">${escape(tweet.user.handle)}</div>
      </header>    
        <article>
          <p>${escape(tweet.content.text)}</p>
        </article>
      <footer class="footer">${escape(tweet.created_at)}
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
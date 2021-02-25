/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {


loadtweets();
const errorMessage = $(".tweet-error")
errorMessage.hide()

// Ajax POSTING
$(".new-tweet form").on("submit", function(event) {
  event.preventDefault();

//Test
  const textArea = $(this).children("textarea");
  const inputText = textArea.val();
  


  if (!inputText) {
    const emptyError = $(".tweet-error").text( `⚠️ Empty Tweet ⚠️`);
    emptyError.hide()
    emptyError.css('border', 'solid').fadeIn(1500).fadeOut(1000).fadeIn(1000).fadeOut(1000);
  } else if (inputText.length > 140) {
    const limitError = $(".tweet-error").text(`⚠️ Character Over Limit ⚠️`);
    limitError.hide()
    limitError.css('border', 'solid').fadeIn(1500).fadeOut(1000).fadeIn(1000).fadeOut(1000);
  } else {
    $.ajax({
    url: "/tweets",
    data: $(this).serialize(),
    method: "POST",
    success:
      function () {
        loadtweets()
        textArea.val(""); 
        $('.counter').text(140);
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
  $("#tweets-container").empty()
  for (let tweet of tweets) {
    $("#tweets-container").append(createTweetElement(tweet))
    }
  }
  
  
  //Creating Tweet Element
  const createTweetElement = (tweet) => {
  const $tweet = $("<article class='tweetPost'>")
  const postDate = (Date.now() - tweet.created_at) / 86400000;
  
    const htmlTweetCode = `
  
      <header class="tweetHeader">
        <img class="profileImage" src=${escape(tweet.user.avatars)}></img>
        <div class="name">${escape(tweet.user.name)}</div>
        <div class="username">${escape(tweet.user.handle)}</div>
      </header>    
        <article>
          <p>${escape(tweet.content.text)}</p>
        </article>
      <footer class="footer">${Math.round(postDate)} days posted
        <div class="footerIcons">  
        <i class="fa fa-flag"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart"></i>
        </div>
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

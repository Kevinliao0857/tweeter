/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// list of major problems
// Error messages problems, css Header/Username placement problems, lower right icons in tweets problem,
// broke something new, text goes out of box???

// list of minor problems
// header border is slightly short



$(document).ready(function() {


loadtweets();


// Ajax POSTING
$(".new-tweet form").on("submit", function(event) {
  event.preventDefault();

// //Version 1 Correct Errors, can't fade
//   const textArea = $(this).children("textarea");
//   const inputText = textArea.val();
//   const errorMessage = $(this).children("h4");
//   errorMessage.hide()
  
//   if (!inputText) {
//     $(".tweet-error").text("Error empty tweet");
//   } else if (inputText.length > 140) {
//     $(".tweet-error").text("Over character limit")
//   } else {
//     $.ajax({
//     url: "/tweets",
//     data: $(this).serialize(),
//     method: "POST",
//     success:
//       function () {
//         loadtweets()
//         textArea.val(""); 
//         $('.counter').text("140");
//       }
//   });
//   }


// //Version 2 fades, but wrong Error
//   const textArea = $(this).children("textarea");
//   const inputText = textArea.val();
//   const errorMessage1 = $(".tweet-error").text("Empty");
//   const errorMessage2 = $(".tweet-error").text("Over");
//   errorMessage1.hide()
//   errorMessage2.hide()

//   if (!inputText) {
//     errorMessage1.css('border', 'solid').fadeIn(1000);
//   } else if (inputText.length > 140) {
//     errorMessage2.css('border', 'solid').fadeIn(1000);
//   } else {
//     $.ajax({
//     url: "/tweets",
//     data: $(this).serialize(),
//     method: "POST",
//     success:
//       function () {
//         loadtweets()
//         textArea.val(""); 
//         $('.counter').text(140);
//       }
//   });
//   }


//Test
  const textArea = $(this).children("textarea");
  const inputText = textArea.val();
  const emptyError = $(".tweet-error").text("Empty Tweet");
  const limitError = $(".tweet-error").text("Over The Limit");

  emptyError.hide()
  limitError.hide()

  if (!inputText) {
    emptyError.css('border', 'solid').fadeIn(1000).fadeOut(1000);
  } else if (inputText.length > 140) {
    limitError.css('border', 'solid').fadeIn(1000).fadeOut(1000);
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
        <div>  
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

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const renderTweets = (tweets) => {
for (let tweet of tweets) {
  $("#tweets-container").append(createTweetElement(tweet))
  }
}

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
// const htmlTweetCode = (
//          `<header class="tweetHeader">
//           <img class="profileImage" src= "/images/profile-hex.png">
//           <div class="name">person</div>
//           <div class="username">@username</div>
//         </header>       
//           <article>
//             <h3>Words</h3>
//           </article>
//           <footer class="footer">date
//           </footer> `)

return $tweet.html(htmlTweetCode)
};

renderTweets(data);
});



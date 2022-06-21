/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1655573607040
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1655660007040
  }
]


const timestampToTime = function (timestamp) {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D = date.getDate() + " ";
  const hh = date.getHours() + ":";
  const mm = date.getMinutes() + ":";
  const ss = date.getSeconds();
  return Y + M + D + hh + mm + ss;
}


const renderTweets = function (tweetData) {
  // //remove html if existing
  const tweetsList = $('.tweets-list')
  // loops through tweets array
  // console.log(tweetData)
  for (const item of tweetData) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(item)
    // takes return value and appends it to the tweets container
    tweetsList.prepend($tweet)
  }
}


// create TweetList html element
const createTweetElement = function (tweetData) {
  let $tweet = ''
  $tweet = $(`
       <article class="tweet-wrapper">
      <header class="tweets-list-header p-5">
        <div class="tweets-list-avatar">
          <img src="${tweetData.user.avatars}"  alt="avatar">
          <span class="ms-3">${tweetData.user.name}</span>
        </div>
        <div class="tweets-list-user">
          <h6 class="right-username">${tweetData.user.handle}</h6>
        </div>
      </header>
      <div class="tweet-content-wrapper my-2 px-1">
        <p class="tweet-content px-5">${tweetData.content.text}</p>
      </div>
      <div class="divider"></div>
      <footer class="tweets-list-footer px-5">
        <h6>${timestampToTime(tweetData.created_at)}</h6>
        <div class="icons">
            <span class="icons"><span class="fas fa-flag"></span>
            <span class="fas fa-retweet mx-2"></span>
            <span class="fas fa-heart"></span></span>
        </div>
      </footer>
    </article>
    `)
  return $tweet
}


$(document).ready(function () {
  renderTweets(tweetData);
})

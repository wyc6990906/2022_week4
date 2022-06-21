/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
import timestampToTime from './timestampToTime.js'


//get data from server
const loadTweets = function () {
  $.get('/tweets', function (data) {
    renderTweets(data)
  })
}


//submit form[id= new-tweet-form] and add to server
const postTweet = () => {
  const newTweetForm = $('#new-tweet-form')
  newTweetForm.submit(function (e) {
    e.preventDefault()
    // function turns a set of form data into a query string
    const tweetFormQuery = $(this).serialize()
    // console.log(tweetFormQuery)
    // ajax
    $.ajax({
      method: 'POST',
      url: "/tweets/",
      data: tweetFormQuery
    })
      .done(function (msg) {
        console.log(msg)
      })
  })
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
        <h6>${timeago.format(tweetData.created_at)}</h6>
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
// append to dom
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


$(document).ready(function () {
  loadTweets()
  postTweet()
})

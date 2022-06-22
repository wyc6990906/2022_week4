/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
import escape from './escape.js'

//when user scroll show and can scroll back top
$('.back-to-Top').on('click',function () {
  $('html,body').animate({scrollTop: 0}, 100);
})
$(document).scroll(function () {
  if ($(this).scrollTop() > 0) {
    $('.back-to-Top').show()
  }
  //don't know why here cannot use else statement
  if ($(this).scrollTop() <= 0) {
    $('.back-to-Top').hide()
  }
})


// click write a new tweet scrollDown
const navLink = $('#scroll-to-form')
const newTweet = $('.new-tweet')
const textArea = $('#tweet-text')
navLink.on('click', function (e) {
  e.preventDefault()
  const scrollTop = newTweet.offset().top - 120
  $('html,body').animate({scrollTop: scrollTop}, 300);
  textArea.focus()
})


//get data from server
const loadTweets = function () {
  $.get('/tweets', function (data) {
    renderTweets(data)
  })
}
//submit form[id= new-tweet-form] and add to server
const postTweet = () => {
  const newTweetForm = $('#new-tweet-form')
  const textArea = $('#tweet-text')
  const errorMsgContainer = $('.error-msg')
  const counter = $('.counter')
  newTweetForm.submit(function (e) {
    e.preventDefault()
    //validate form
    // console.log(textArea.val())
    if (!textArea.val()) {
      errorMsgContainer.css('display', 'block')
      errorMsgContainer.text('Tweet content cannot be empty.')
    } else if (textArea.val().length > 140) {
      errorMsgContainer.css('display', 'block')
      errorMsgContainer.text("Tweet content must less than 140 characters.")
    } else {
      errorMsgContainer.css('display', 'none')
      // function turns a set of form data into a query string
      const tweetFormQuery = $(this).serialize()
      // console.log(tweetFormQuery)
      // ajax
      $.ajax({method: 'POST', url: "/tweets/", data: tweetFormQuery})
        .done(function () {
          //reset textarea
          textArea.val('')
          //reset the char conter
          counter.val(140)
          //resend the get tweets request
          loadTweets()
        })
        .fail(error => {
          console.log(error.message)
        })
    }
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
        <p class="tweet-content px-5">${escape(tweetData.content.text)}</p>
      </div>
      <div class="divider container-fluid"></div>
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

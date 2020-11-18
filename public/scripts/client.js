/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const jquery223Min = require("../vendor/jquery-2.2.3.min");
// const $ = jquery223Min;


$(document).ready(function() {


// // Fake data taken from initial-tweets.json
//   const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png"
//         ,
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     }
//   ]

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      const $tweet = createTweetElement(tweet)
      $('.old-tweets-container').append($tweet);
    }
  }

  // define a function createTweetElement that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet

  const createTweetElement = function(tweet) {
    let $tweet = $(`<article class="tweet">
    <header>
      <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar">
      <p> ${tweet.user.name}</p>
      <p class="handle hide">${tweet.user.handle}</p>
      
    </header>
    <main>
      <p class="old-tweet-text">${tweet.content.text}</p>
    </main>
    <footer>
        <p class="timestamp">${tweet.created_at}</p>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-fire-alt"></i>
        
    </footer>
  </article>
  `)

    return $tweet;
  }

  const loadTweets = (action) => {
    $
      .ajax({
        url: '/tweets',
        dataType: 'json'
      })
      .then(data => {
        console.log(`tweets fetched`, data);
        action(data);
        return data;
      })
      .catch(err => console.log(err))
  }

  loadTweets(renderTweets);

  //add an AJAX POST request that sends the form data to the server
  $('form').on('submit', (event) => {
    
    event.preventDefault();
    
    //extravt values from form

    $
    .ajax({
      url: '/tweets',
      method: 'POST',
      data: $('form').serialize()
    })
    .then(res => console.log(`whoo!! we got a post`, res))
    .catch(err => console.log(err))
  })


})
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const jquery223Min = require("../vendor/jquery-2.2.3.min");
// const $ = jquery223Min;


$(document).ready(function() {
  
  const isFormValid = () => {
    const text = $("#tweet-text").val();
    console.log(text);
    if (text.length === 0) {
      alert('Hmm.. you can\'t submit an empty tweet')
      return false;
    } else if (text.length > 140) {
      alert('Hmm.. you can\'t submit a tweet that big! 140 characters max.')
      return false;
    } else if (text === null) {
      alert('Hmmm.. somethings wrong here. Try again with some different input')
      return false;
    }
    return true;
  }

  //takes in tweets object and renders each tweet to page
  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      const $tweet = createTweetElement(tweet)
      $('.old-tweets-container').prepend($tweet);
    }
  }

  const renderNewTweet = function(tweet) {
    const $tweet = createTweetElement(tweet);
    $('.old-tweets-container').prepend($tweet);
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

  //makes an ajax request and returns json data
  //intention is to to get tweets then render using renderTweets as callback 
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
    
    
    if (isFormValid()) {
       //extract values from form inputs
      $
      .ajax({
        url: '/tweets',
        method: 'POST',
        data: $('form').serialize()
      })
      .then(res => {
        //reset form textarea
        $('#tweet-text').val("");
        //reset counter
        $(".counter").val(140).css('color', 'var(--black)');

        console.log(`whoo!! we got a post`, res)
        loadTweets(renderTweets);
      })
      
      .catch(err => console.log(err))
      // alert(`Form input is invalid. Please enter text with a maximum of 140 characters.`)
    } 
  })
})
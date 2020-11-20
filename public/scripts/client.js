/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const jquery223Min = require("../vendor/jquery-2.2.3.min");
// const $ = jquery223Min;


$(document).ready(function() {
  
  
  //       HELPER FUNCTIONS    //

  //checks if new-tweet form submission is valid and handles displaying alert messages
  const isFormValid = () => {
    const text = $("#tweet-text").val();
    console.log(text);
    if (text.length === 0) {
      $('#alert > p').text('Hmm.. you can\'t submit an empty tweet');
      $('#alert').addClass('showAlert');
      return false;
    } else if (text.length > 140) {
      $('#alert > p').text('Hmm.. you can\'t submit a tweet that big!\n 140 characters max.');
      $('#alert').addClass('showAlert');
      return false;
    } else if (text === null) {
      $('#alert > p').text('Hmmm.. something is wrong here.\n Try again with some different input');
      $('#alert').addClass('showAlert');
      return false;
    }
    return true;
  };

 

  //form input sterilizer
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //calculate time passed
  const timePassed  = (timeStamp) => {
    const elapsed = Date.now() - timeStamp;
    
    //format timeDiff and return a string
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    if (elapsed <= msPerMinute) {
      const seconds = Math.round(elapsed / 1000);
      return `${seconds} second${seconds === 1 ? " " : "s "}ago`;
    }

    else if (elapsed <= msPerHour) {
      const minutes = Math.round(elapsed / msPerMinute);
      return `${minutes} minute${minutes === 1 ? " " : "s "}ago`;
    }

    else if (elapsed <= msPerDay ) {
      const hours = Math.round(elapsed / msPerHour);
      return `${hours} hour${hours === 1 ? " " : "s "}ago`;
    }

    else if (elapsed <= msPerMonth) {
      const days = Math.round(elapsed/msPerDay);
      return `approximately ${days} day${days === 1 ? " " : "s "}ago`;
    }

    else if (elapsed <= msPerYear) {
      const months = Math.round(elapsed/msPerMonth);
      return `approximately ${months} month${months === 1 ? " " : "s "}ago`;
    }

    else {
      const years = Math.round(elapsed / msPerYear);
      return `approximately ${years} year${years === 1 ? " " : "s "}ago`; 
    }
  };
  
  
  //      TWEET FUNCTIONS            //
  
  //takes in tweets object and renders each tweet to page
  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.old-tweets-container').prepend($tweet);
    }
  };

  //called after new-tweet form submission to display the newest tweet
  const renderNewTweet = function() {
    $
      .ajax({
        url: '/tweets',
        dataType: 'json'
      })
      .then(data => {
        const $tweet = createTweetElement(Object.values(data).pop());
        $('.old-tweets-container').prepend($tweet);
      })
      .catch(err => console.log(err));
  };


  //takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
  const createTweetElement = function(tweet) {
    //generate date object to parse the timestamp
    let $tweet = $(`<article class="tweet">
    <header>
      <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar">
      <p> ${tweet.user.name}</p>
      <p class="handle hide">${tweet.user.handle}</p>
      
    </header>
    <main>
     <p class="old-tweet-text">${escape(tweet.content.text)}</p>
    </main>
    <footer>
        <p class="timestamp">${timePassed(tweet.created_at)}</p>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-fire-alt"></i>
        
    </footer>
  </article>
  `);
    return $tweet;
  };

 

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
      })
      .catch(err => console.log(err));
  };

  

  //         populate old-tweet container          //
  loadTweets(renderTweets);


  //                EVENT LISTENERS                 //

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
          //render the new tweet
          renderNewTweet(res);
        })
      
        .catch(err => console.log(err));
      // alert(`Form input is invalid. Please enter text with a maximum of 140 characters.`)
    }
  });


  //second toggle listener and logic
  $('.dot').on('click', () => {
    //scroll to top of page
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    //open form
    $('section.new-tweet').addClass('new-tweet-show');
    $('#tweet-text').focus();
  });


  //prompt in nav to display new-tweet form
  $('.nav-prompt').on('click', () => {
    $('section.new-tweet').toggleClass('new-tweet-show');
    if ($('section.new-tweet').hasClass('new-tweet-show')) {
      $('#tweet-text').focus();
    } else {
      $('#tweet-text').val("");
    }
  });


   //OK button in alert. resets alert pop up
   $('#alertButton').on('click', () => {
    $('#alert').toggleClass('showAlert');
    $('#alert > p').text('');
  });

  //second toggle hide and show logic
  $(window).scroll(function() {
    const height = $(window).scrollTop();
    if (height > 400) {
      $('.dot').addClass('active');
    } else {
      $('.dot').removeClass('active');
    }
  });


});
$(document).ready(function() {
  
  // --- our code goes here ---
  $('#tweet-text').on('input', ((event) => {
    //check the length of the text
    const counter = event.target.value.length;
    console.log(counter);

  }))
});

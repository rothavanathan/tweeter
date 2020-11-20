$(document).ready(function() {

  const text = $('#tweet-text');
  const counter = $('.counter');

  const charCount = () => {
    counter.val(140 - text.val().length);
    counter.val() < 0 ? counter.css('color', 'red'): counter.css('color', 'var(--black)');
  }

  //run charCount on text-area input
  text.on('input', (() => {
    //check the length of the text
    charCount();
  }));

  //call charCount on page load in case there's a value in textarea already
  charCount();
});

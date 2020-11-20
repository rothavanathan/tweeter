$(document).ready(function() {

  const text = $('#tweet-text');
  const counter = $('.counter');

  text.on('input', (() => {
    //check the length of the text
    counter.val(140 - text.val().length);
    counter.val() < 0 ? counter.css('color', 'red'): counter.css('color', 'var(--black)');
  }));


});

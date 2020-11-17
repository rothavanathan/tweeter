$(document).ready(function() {

  const characterLimit = 140;

  const displayCounterLimit = (number, charLimit) => {
    //store element to variable
    const element = $('.counter');
    //take in a number and style elements based on conditions
    if (number <= charLimit) {
      if (element.hasClass('over-limit')) {
        element.removeClass('over-limit')  
      };
      element.prop('color', 'var(--black)');
      element.text(number);
    } else {
      if (!element.hasClass('over-limit')) {
        element.addClass('over-limit')  
      };
      element.prop('color', 'red');
      element.text(charLimit - number);
    }
  };

  // --- our code goes here ---
  $('#tweet-text').on('input', ((event) => {
    //check the length of the text
    const counter = event.target.value.length;
    displayCounterLimit(counter, characterLimit);
  }));


});

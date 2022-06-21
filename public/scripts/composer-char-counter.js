$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on('input', function (e) {
    // console.log('keypress',this.value)
    let totalCount = 140
    const typeLength = this.value.length
    // console.log(typeLength)
    const leftNum = 140 - typeLength
    // console.log(leftNum)
    const output = $(this).parent().find('output');
    output.val(leftNum)
    if (output.val() <= 0) {
      output.addClass('red-num')
    } else {
      output.removeClass('red-num')
    }
  });

});

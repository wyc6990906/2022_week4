$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on('input', function (e) {
    let totalCount = 140
    const typeLength = this.value.length
    const leftNum = 140 - typeLength
    const output = $(this).parent().find('output');
    output.val(leftNum)
    if (output.val() <= 0) {
      output.addClass('red-num')
    } else {
      output.removeClass('red-num')
    }
  });
});

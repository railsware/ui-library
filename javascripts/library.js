$(document).ready(function(){

  $.when(parseCodeSamples()).done(function(){
    loadHighlight();
  });
  
  function parseCodeSamples() {
    $(".library-section").each(function(i, element){
      content = $(element).html();
      label = $(element).data('label');
      $(this).html("<div class='library-preview'></div><div class='library-code'></div>");
      $(this).find('.library-preview').html(content);
      $(this).find('.library-code').html('<pre><code></code></pre>');
      $(this).find('.library-code pre code').text(content);
      $(this).prepend("<span class='library-section-label'>"+label+"</span>");
    });
  }
  
  function loadHighlight() {
    $.getScript("http://yandex.st/highlightjs/7.3/highlight.min.js", function(){
      hljs.tabReplace = '    ';
      hljs.initHighlightingOnLoad();
    });
  }

  // Navigation Toggle
  $('.navigation .expander').click(function(){
    $('.navigation').toggleClass('expanded');
  });
  
});
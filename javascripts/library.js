$(document).ready(function(){
  
  var Library = {
    buildSections: function(){
      $(".library-section").each(function(i, element){
        Library.setupSection(this, $(element).html(), $(element).data('label'));
      });
    },
    
    setupSection: function(element, content, label){
      $(element).html("<div class='library-preview'></div><div class='library-code'></div>");
      $(element).find('.library-preview').html(content);
      $(element).find('.library-code').html('<pre><code></code></pre>');
      $(element).find('.library-code pre code').text(content);
      $(element).prepend("<span class='library-section-label'>"+label+"</span>");
    },

    loadHighlight: function(){
      $.getScript("http://yandex.st/highlightjs/7.3/highlight.min.js", function(){
        hljs.tabReplace = '    ';
        hljs.initHighlightingOnLoad();
      });
    }
  }
  
  $.when(Library.buildSections()).done(function(){
    Library.loadHighlight();
  });
  
  // Navigation Toggle
  $('.library-navigation .expander').click(function(){
    $('.library-navigation').toggleClass('expanded');
  });
  
});
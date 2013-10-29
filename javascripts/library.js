$(document).ready(function(){
  
  var Library = {
    htmlClean: function(dirtyHtml) {
      dirtyHtml = dirtyHtml.replace(/(\r\n|\n|\r)/,'');
      leadingSpaces = dirtyHtml.substr(0, dirtyHtml.indexOf("<"));
      dirtyHtmlArray = dirtyHtml.split(/(\r\n|\n|\r)/g);
      linesArray = [];
      for (i=0; i<dirtyHtmlArray.length; i++) {
        linesArray.push(dirtyHtmlArray[i].replace(leadingSpaces,''));
      }
      return linesArray.join('').trim();
    },

    buildSections: function(){
      $(".library-section").each(function(i, element){
        content = Library.htmlClean($(this).html());
        Library.setupSection(this, content, $(this).data('label'));
        Library.codeSample(this, content);
        $(this).css("min-height",$(this).height());
      });
    },
    
    setupSection: function(element, content, label){
      $(element).html("<div class='library-preview'>");
      $(element).find('.library-preview').html(content);
      $(element).prepend("<span class='library-section-label'>"+label+"</span>");
    },

	codeSample: function(element, content){
    $(element).append("</div><div class='library-code'></div>");
    $(element).find('.library-code').html('<pre><code></code></pre>');
    $(element).find('.library-code pre code').text(content);
    if($(element).data('code') == false){
      $(element).find('.library-code pre').css('visibility', 'hidden');
    }
	},

    loadHighlight: function(){
      $.getScript("http://yandex.st/highlightjs/7.3/highlight.min.js", function(){
        hljs.tabReplace = '  ';
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
class window.Library

  constructor: ->
    @current_section = $('.library-navigation ul > li:first a').attr('href')
    @bindArrows()
    $.when(@buildSections()).done =>
      @loadHighlight()
    $('.library-navigation .expander').click ->
      $('.library-navigation').toggleClass('expanded')
      
    $('.library-code-switch').click ->
      $('.library-content').toggleClass('no-code')
      
    $(".library-navigation ul li a").click (e) =>
      e.preventDefault()
      @scrollToElement($(e.currentTarget).attr('href'))
      
  bindArrows: ->
    $("body").keydown (e) =>
      e.preventDefault()
      if e.keyCode == 37
        $('.library-navigation').toggleClass('expanded')
      if e.keyCode == 39
        $('.library-content').toggleClass('no-code')
      if e.keyCode == 38
        @scrollToPrevious()
      if e.keyCode == 40
        @scrollToNext()
    
  buildSections: ->
    $(".library-section").each (i, element) =>
      content = @htmlClean($(element).html())
      @setupSection(element, content, $(element).data('label'))
      @codeSample(element, content) unless $(element).data('code') is false

  setupSection: (element, content, label) ->
    $(element).html("<div class='library-preview'>")
    $(element).find('.library-preview').html(content)
    $(element).prepend("<span class='library-section-label'>"+label+"</span>")

  codeSample: (element, content) ->
    $(element).append("</div><div class='library-code'></div>")
    $(element).find('.library-code').html('<pre><code></code></pre>')
    $(element).find('.library-code pre code').text(content)
    $(element).find('.library-code pre').css('visibility', 'hidden') if($(element).data('code') == false)

  loadHighlight: ->
    $.getScript "http://yandex.st/highlightjs/7.3/highlight.min.js", ->
      hljs.tabReplace = '  '
      hljs.initHighlightingOnLoad()

  scrollToPrevious: ->
    prev = $("a[href='#{@current_section}']", '.library-navigation').parent('li').prev()
    @scrollToElement($(prev).find('a').attr('href')) unless prev.length is 0
  
  scrollToNext: ->
    next = $("a[href='#{@current_section}']", '.library-navigation').parent('li').next()
    @scrollToElement($(next).find('a').attr('href')) unless next.length is 0
    
  scrollToElement: (element) ->
    @current_section = element
    $('html, body').animate({scrollTop: $(element).offset().top}, 800)
    $('.library-navigation ul li a').removeClass('active')
    $("a[href='#{@current_section}']", '.library-navigation').addClass('active')
    
  htmlClean: (html) ->
    html = html.replace(/(\r\n|\n|\r)/,'')
    leadingSpaces = html.substr(0, html.indexOf("<"))
    dirtyHtmlArray = html.split(/(\r\n|\n|\r)/g)
    linesArray = []
    for line in dirtyHtmlArray
      linesArray.push(line.replace(leadingSpaces,''))
    linesArray.join('').trim()

$ ->
  window.library = new Library()
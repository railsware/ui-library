class window.Library

  constructor: ->
    $.when(@buildSections()).done =>
      @loadHighlight()
    $('.library-navigation .expander').click ->
      $('.library-navigation').toggleClass('expanded')
    $('.library-code-switch').click ->
      $('.library-content').toggleClass('no-code')

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

  htmlClean: (html) ->
    html = html.replace(/(\r\n|\n|\r)/,'')
    leadingSpaces = html.substr(0, html.indexOf("<"))
    dirtyHtmlArray = html.split(/(\r\n|\n|\r)/g)
    linesArray = []
    for line in dirtyHtmlArray
      linesArray.push(line.replace(leadingSpaces,''))
    linesArray.join('').trim()

$ ->
  library = new Library()
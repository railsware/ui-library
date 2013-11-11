class window.Library

  constructor: ->
    # Key Codes That are used
    @keyCodes = [37, 39, 38, 40]

    # Selectors
    @navigation = '.library-navigation'
    @content    = '.library-content'
    @section    = '.library-section'
    @codeSwitcher = '.library-code-switch'

    # Current navigation section
    @currentSection = $('a.active', @navigation).attr('href')

    # Buind Library Events and arrows
    @bindArrows()
    @bindEvents()

    # Code Highlight after building sections
    $.when(@buildSections()).done =>
      @loadHighlight()

  # Initial Setup Methods
  bindEvents: ->
    $('.expander', @navigation).click =>
      $(@navigation).toggleClass('expanded')
      
    $(@codeSwitcher).click =>
      @showCode()
      
    $("ul li a", @navigation).click (e) =>
      e.preventDefault()
      @scrollToElement($(e.currentTarget).attr('href'))

  bindArrows: ->
    $(document).keydown (e) =>
      e.preventDefault() unless @keyCodes.indexOf(e.keyCode) is -1
      switch e.keyCode
        when 37 then $(@navigation).toggleClass('expanded')
        when 39 then @showCode()
        when 38 then @scrollToPrevious()
        when 40 then @scrollToNext()

  buildSections: ->
    $(@section).each (i, element) =>
      content = @htmlClean($(element).html())
      @setupSection(element, content, $(element).data('label'))
      @setupCodeSample(element, content) unless $(element).data('code') is false

  setupSection: (element, content, label) ->
    $(element).html("<div class='library-preview'>")
    $(element).find('.library-preview').html(content)
    $(element).prepend("<span class='library-section-label'>"+label+"</span>")

  setupCodeSample: (element, content) ->
    $(element).append("</div><div class='library-code'></div>")
    $(element).find('.library-code').html('<pre><code></code></pre>')
    $(element).find('.library-code pre code').text(content)

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

  # User Interaction Methods
  showCode: ->
    $(@content).toggleClass('no-code')
    $(@codeSwitcher).toggleClass('active')

  scrollToPrevious: ->
    prev = $("a[href='#{@currentSection}']", @navigation).parent('li').prev()
    @scrollToElement($(prev).find('a').attr('href')) unless prev.length is 0

  scrollToNext: ->
    next = $("a[href='#{@currentSection}']", @navigation).parent('li').next()
    @scrollToElement($(next).find('a').attr('href')) unless next.length is 0

  scrollToElement: (element) ->
    @currentSection = element
    $('html, body').animate({scrollTop: $(element).offset().top}, 800)
    $('ul li a', @navigation).removeClass('active')
    $("a[href='#{@currentSection}']", @navigation).addClass('active')

$ ->
  window.library = new Library()
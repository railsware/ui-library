// Generated by CoffeeScript 1.6.3
(function() {
  window.Library = (function() {
    function Library() {
      var _this = this;
      this.keyCodes = [37, 39, 38, 40];
      this.navigation = '.library-navigation';
      this.content = '.library-content';
      this.section = '.library-section';
      this.codeSwitcher = '.library-code-switch';
      this.currentSection = $('a.active', this.navigation).attr('href');
      this.module = '.library-section-divider';
      this.createNavigation();
      this.bindArrows();
      this.bindEvents();
      $.when(this.buildSections()).done(function() {
        return _this.loadHighlight();
      });
    }

    Library.prototype.createNavigation = function() {
      var _this = this;
      $(_this.navigation + " .library-navigation-inner").append("<ul></ul>");
      return $(this.module).each(function(i, element) {
        $(_this.navigation).find("ul").append("<li><a href='#" + $(element).attr("id") + "'>" + $(element).text() + "</a></li>");
      });
    };

    Library.prototype.bindEvents = function() {
      var _this = this;
      $('.expander', this.navigation).click(function() {
        return $(_this.navigation).toggleClass('expanded');
      });
      $(this.codeSwitcher).click(function() {
        return _this.showCode();
      });
      return $("ul li a", this.navigation).click(function(e) {
        e.preventDefault();
        return _this.scrollToElement($(e.currentTarget).attr('href'));
      });
    };

    Library.prototype.bindArrows = function() {
      var _this = this;
      return $(document).keydown(function(e) {
        if (_this.keyCodes.indexOf(e.keyCode) !== -1) {
          e.preventDefault();
        }
        switch (e.keyCode) {
          case 37:
            return $(_this.navigation).toggleClass('expanded');
          case 39:
            return _this.showCode();
          case 38:
            return _this.scrollToPrevious();
          case 40:
            return _this.scrollToNext();
        }
      });
    };

    Library.prototype.buildSections = function() {
      var _this = this;
      return $(this.section).each(function(i, element) {
        var content;
        content = _this.htmlClean($(element).html());
        _this.setupSection(element, content, $(element).data('label'));
        if ($(element).data('code') !== false) {
          return _this.setupCodeSample(element, content);
        }
      });
    };

    Library.prototype.setupSection = function(element, content, label) {
      $(element).html("<div class='library-preview'>");
      $(element).find('.library-preview').html(content);
      return $(element).prepend("<span class='library-section-label'>" + label + "</span>");
    };

    Library.prototype.setupCodeSample = function(element, content) {
      $(element).append("</div><div class='library-code'></div>");
      $(element).find('.library-code').html('<pre><code></code></pre>');
      return $(element).find('.library-code pre code').text(content);
    };

    Library.prototype.loadHighlight = function() {
      return $.getScript("http://yandex.st/highlightjs/7.3/highlight.min.js", function() {
        hljs.tabReplace = '  ';
        return hljs.initHighlightingOnLoad();
      });
    };

    Library.prototype.htmlClean = function(html) {
      var dirtyHtmlArray, leadingSpaces, line, linesArray, _i, _len;
      html = html.replace(/(\r\n|\n|\r)/, '');
      leadingSpaces = html.substr(0, html.indexOf("<"));
      dirtyHtmlArray = html.split(/(\r\n|\n|\r)/g);
      linesArray = [];
      for (_i = 0, _len = dirtyHtmlArray.length; _i < _len; _i++) {
        line = dirtyHtmlArray[_i];
        linesArray.push(line.replace(leadingSpaces, ''));
      }
      return linesArray.join('').trim();
    };

    Library.prototype.showCode = function() {
      $(this.content).toggleClass('no-code');
      return $(this.codeSwitcher).toggleClass('active');
    };

    Library.prototype.scrollToPrevious = function() {
      var prev;
      prev = $("a[href='" + this.currentSection + "']", this.navigation).parent('li').prev();
      if (prev.length !== 0) {
        return this.scrollToElement($(prev).find('a').attr('href'));
      }
    };

    Library.prototype.scrollToNext = function() {
      var next;
      next = $("a[href='" + this.currentSection + "']", this.navigation).parent('li').next();
      if (next.length !== 0) {
        return this.scrollToElement($(next).find('a').attr('href'));
      }
    };

    Library.prototype.scrollToElement = function(element) {
      this.currentSection = element;
      $('html, body').animate({
        scrollTop: $(element).offset().top
      }, 800);
      $('ul li a', this.navigation).removeClass('active');
      return $("a[href='" + this.currentSection + "']", this.navigation).addClass('active');
    };

    return Library;

  })();

  $(function() {
    return window.library = new Library();
  });

}).call(this);

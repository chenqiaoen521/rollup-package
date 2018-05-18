(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global.IScroll = factory(global.$));
}(this, (function ($) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  var doms = {
    tabBar: '#tabBar',
    fixbar: '#fixbar',
    posArea: '.hook-area',
    firstPos: '#room_id_01',
    offsetH: 70,
    highlight: '.highlight-title'
  };

  function initMixin(IScroll) {
    IScroll.prototype._init = function (options) {
      this.opts = $.extend(true, {}, doms, options || {});
      this._initDom();
      this._initEvent();
      this.scroll = true;
    };
    IScroll.prototype._initDom = function () {
      this.tabBar = $(this.opts.tabBar);
      this.highlight = $(this.opts.highlight);
      this.fixbar = $(this.opts.fixbar);
      this.fixbarTab = $(this.opts.fixbar).find('ul>li');
      this.posArea = $(this.opts.posArea);
      this.win = $(window);
      this.highlightW = this.highlight.width();
      this.posAreaArr = this.posH2Arrary();
    };
    IScroll.prototype.posH2Arrary = function () {
      var arr = [];
      var first = this.tabBar.offset().top;
      arr.push(0);
      this.posArea.each(function (index, ele) {
        arr.push($(this).offset().top);
      });
      arr.push(document.body.scrollHeight || document.documentElement.scrollHeight);
      return arr;
    };
    IScroll.prototype.tirgger = function () {
      var _this = this;

      this.fixbarTab.removeClass('active');
      this.tabBar.children().removeClass('on');
      this.highlight.delay(300).animate({ left: this.highlightW * this.index }, {
        duration: 300,
        complete: function complete() {
          _this.fixbarTab.eq(_this.index).addClass('active');
          _this.tabBar.children().eq(_this.index).addClass('on');
        }
      });
    };
  }

  function eventMixin(IScroll) {
    IScroll.prototype._initEvent = function () {
      var me = this;
      $(window).scroll(function () {
        me.display();
        me.posMonitor();
      });
      this.fixbarTab.click(function () {
        me.pos($(this).index());
      });
      this.tabBar.children().click(function () {
        me.pos($(this).index());
      });
    };
    IScroll.prototype.display = function () {
      var sTop = this.win.scrollTop();
      var tabTop = this.tabBar.offset().top;
      if (sTop >= tabTop) {
        this.fixbar.show();
      } else {
        this.fixbar.hide();
      }
    };
    IScroll.prototype.pos = function (index) {
      var me = this;
      var arr = this.posAreaArr;
      var delta = arr[index];
      if (index === 0) {
        delta = $(this.opts.firstPos).offset().top;
      }
      $('html,body').animate({
        scrollTop: delta - me.opts.offsetH + 'px'
      }, {
        duration: 500,
        easing: 'easeInSine'
      });
    };
    IScroll.prototype.posMonitor = function () {
      var sTop = this.win.scrollTop();
      var arr = this.posAreaArr;
      var diff = this.opts.offsetH + 1;
      for (var i = 0; i < arr.length; i++) {
        if (sTop >= arr[i] - diff && sTop <= arr[i + 1] - diff) {
          this.animate(i);
        }
      }
    };
    IScroll.prototype.animate = function (i) {
      if (this.index === undefined) {
        this.index = i;
        this.tirgger();
        return;
      }
      if (this.index === i) {
        return;
      } else {
        this.index = i;
        this.tirgger();
      }
    };
  }

  // 如果是正式环境的话，不输出日志信息
  {
  		console.log = null;
  }
  function IScroll(options) {
  		this._init(options);
  }

  initMixin(IScroll);
  eventMixin(IScroll);

  return IScroll;

})));

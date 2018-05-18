import $ from 'jquery'
var is = (function($){
      var doms = {
        tabBar: '#tabBar',
        fixbar: '#fixbar',
        posArea: '.hook-area',
        firstPos: '#room_id_01',
        offsetH: 70,
        highlight: '.highlight-title'
      };
      var iScroll = function (options) {
        this.opts = $.extend(true, {}, doms, options || {});
        this.initDom();
        this.events();
        this.scroll = true;
      }
      var fn = iScroll.prototype;
      fn.initDom = function () {
        this.tabBar = $(this.opts.tabBar);
        this.highlight = $(this.opts.highlight);
        this.fixbar = $(this.opts.fixbar);
        this.fixbarTab = $(this.opts.fixbar).find('ul>li');
        this.posArea = $(this.opts.posArea);
        this.win = $(window);
        this.highlightW = this.highlight.width();
        this.posAreaArr = this.posH2Arrary();
      };
      fn.events = function () {
        //滚动监听
        var me = this;
        $(window).scroll(function() {
          me.display();
          me.posMonitor();
        });
        this.fixbarTab.click(function(){
          me.pos($(this).index());
        });
        this.tabBar.children().click(function(){
          me.pos($(this).index());
        });
      };
      fn.display = function () {
        var sTop = this.win.scrollTop();
        var tabTop = this.tabBar.offset().top;
        if (sTop >= tabTop) {
          this.fixbar.show();
        } else {
          this.fixbar.hide();
        }
      };
      fn.posMonitor = function () {
        var sTop = this.win.scrollTop();
        var arr = this.posAreaArr;
        var diff = this.opts.offsetH + 1;
        for (var i = 0; i < arr.length; i ++) {
          if (sTop >= (arr[i] - diff) && sTop <= (arr[i + 1] - diff)) {
            this.animate(i);
          }
        }
      };
      fn.animate = function (i) {
        if (this.index === undefined) {
          this.index = i;
          this.tirgger();
          return
        }
        if (this.index === i) {
          return
        } else {
          this.index = i;
          this.tirgger();
        }
      }
      fn.tirgger = function () {
        var me = this;
        this.fixbarTab.removeClass('active');
        this.tabBar.children().removeClass('on');
        this.highlight.delay(300).animate({left: this.highlightW * me.index}, {
          duration: 300,
          complete: function () {
            me.fixbarTab.eq(me.index).addClass('active');
            me.tabBar.children().eq(me.index).addClass('on');
          }
        });
      }
      fn.posH2Arrary = function () {
        var arr = [];
        var first = this.tabBar.offset().top;
        arr.push(0);
        this.posArea.each(function(index, ele){
          arr.push($(this).offset().top);
        })
        arr.push(document.body.scrollHeight || document.documentElement.scrollHeight);
        return arr;
      }
      fn.pos = function (index) {
        var me = this;
        var arr = this.posAreaArr;
        var delta = arr[index];
        if (index === 0) {
          delta = $(this.opts.firstPos).offset().top;
        }
        $('html,body').animate({
          scrollTop: (delta - me.opts.offsetH) + 'px'
        },{
          duration: 500,
          easing: 'easeInSine'
        });
      }
      return iScroll;
    })(jQuery);
window.iScroll === undefined && (window.iScroll = is);
new iScroll();

import {doms} from '../variable/variable'
import $ from 'jquery'

export function initMixin (IScroll) {
	IScroll.prototype._init = function (options) {
		this.opts = $.extend(true, {}, doms, options || {})
		this._initDom()
		this._initEvent()
		this.scroll = true
	}
	IScroll.prototype._initDom = function () {
    this.tabBar = $(this.opts.tabBar);
    this.highlight = $(this.opts.highlight);
    this.fixbar = $(this.opts.fixbar);
    this.fixbarTab = $(this.opts.fixbar).find('ul>li');
    this.posArea = $(this.opts.posArea);
    this.win = $(window);
    this.highlightW = this.highlight.width();
    this.posAreaArr = this.posH2Arrary();
  }
  IScroll.prototype.posH2Arrary = function () {
    const arr = [];
    const first = this.tabBar.offset().top;
    arr.push(0);
    this.posArea.each(function(index, ele){
      arr.push($(this).offset().top);
    })
    arr.push(document.body.scrollHeight || document.documentElement.scrollHeight);
    return arr;
  }
  IScroll.prototype.tirgger = function () {
    this.fixbarTab.removeClass('active')
    this.tabBar.children().removeClass('on')
    this.highlight.delay(300).animate({left: this.highlightW * this.index}, {
      duration: 300,
      complete: ()=> {
        this.fixbarTab.eq(this.index).addClass('active')
        this.tabBar.children().eq(this.index).addClass('on')
      }
    })
  }
}
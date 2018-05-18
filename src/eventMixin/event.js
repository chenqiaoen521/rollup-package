import $ from 'jquery'
export function eventMixin(IScroll) {
	IScroll.prototype._initEvent = function () {
		const me = this
    $(window).scroll(() => {
      me.display()
      me.posMonitor()
    })
    this.fixbarTab.click(function(){
      me.pos($(this).index())
    })
    this.tabBar.children().click(function(){
      me.pos($(this).index())
    })
	}
	IScroll.prototype.display = function () {
    var sTop = this.win.scrollTop()
    var tabTop = this.tabBar.offset().top
    if (sTop >= tabTop) {
      this.fixbar.show()
    } else {
      this.fixbar.hide()
    }
  }
  IScroll.prototype.pos = function (index) {
    var me = this
    const arr = this.posAreaArr
    let delta = arr[index]
    if (index === 0) {
      delta = $(this.opts.firstPos).offset().top
    }
    $('html,body').animate({
      scrollTop: (delta - me.opts.offsetH) + 'px'
    },{
      duration: 500,
      easing: 'easeInSine'
    })
  }
  IScroll.prototype.posMonitor = function () {
    const sTop = this.win.scrollTop();
    const arr = this.posAreaArr;
    let diff = this.opts.offsetH + 1;
    for (let i = 0; i < arr.length; i ++) {
      if (sTop >= (arr[i] - diff) && sTop <= (arr[i + 1] - diff)) {
        this.animate(i);
      }
    }
  }
  IScroll.prototype.animate = function (i) {
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
}
import $ from 'jquery'
import {initMixin} from './initMixin/init'
import {eventMixin} from './eventMixin/event'

// 如果是正式环境的话，不输出日志信息
if (ENV === 'development') {
  // Enable the logger.
  document.write(
	  '<script src="http://' + (location.host || 'localhost').split(':')[0] +
	  ':35729/livereload.js?snipver=1"></' + 'script>'
	);
} else {
  console.log = null
}
function IScroll(options) {
	this._init(options)
}

initMixin(IScroll)
eventMixin(IScroll)

export default IScroll

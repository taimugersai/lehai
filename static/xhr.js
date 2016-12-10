import $ from 'webpack-zepto'

let defaults = {};

function request(url, options) {
  $.ajax({
    type : options.method,
    url : url,
    dataType: 'json',
    data: options.data || '',
    success: options.success,
    timeout: options.timeout || 10000
  }); 
}

function extend(a, b) {
  for(let k in b){
    if (!a[k]) {
      a[k] = b[k];
    }
  }
  return a;
}

function parseParams(method, data, success, options) {
  if (typeof data === 'function') {
    options = success;
    success = data;
    data = null;
  }
  options = extend({method: method, data: data, success: success}, options || {});
  return extend(options, defaults);
}

export function http(method, url, data, success, options) {
  return request(url, parseParams(method, data, success, options));
}


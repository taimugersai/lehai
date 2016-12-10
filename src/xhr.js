let defaults = {};

function request(url, options) {
  $.ajax({
    type : options.method,
    url : url,
    dataType: 'json',
    data: options.data || '',
    success: options.success,
    timeout: options.timeout || 3000
  }); 
}

function extend(a, b) {
  Object.keys(b).forEach(k => {
    if (!a[k]) {
      a[k] = b[k];
    }
  });
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

function HttpRequest(method, url, data, success, options) {
  return request(url, parseParams(method, data, success, options));
}

exports.http = HttpRequest;
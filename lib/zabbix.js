var request = require('request');

var Client = function(url, user, password, options) {
  options = options || {};
  this.url = url;
  this.user = user;
  this.password = password;
  this.id = 0;
  this.auth = null;
  this.rejectUnauthorized = options.rejectUnauthorized;
};

Client.prototype.call = function(method, params, callback) {
  if (!callback && 'function' === typeof params) {
    callback = params;
    params = {};
  }

  this._request(method, params, function(error, resp, body) {
    if (error || resp.statusCode !== 200) {
      callback(error, resp, body);
    }
    else {
      body = JSON.parse(body);
      if (body.error) {
        callback(body.error, resp, body);
      }
      else {
        callback(null, resp, body.result);
      }
    }
  }.bind(this));
};

Client.prototype.login = function(callback) {
  var params = {
    user: this.user,
    password: this.password,
  };
  this.call('user.login', params, function(error, resp, body) {
    if (!error) {
      this.auth = body;
    }

    if (callback && 'function' === typeof callback) {
      callback(error, resp, body);
    }
  }.bind(this));
};

Client.prototype._request = function(method, params, callback) {
  var body = {
    jsonrpc: '2.0',
    method: method,
    params: params,
    id: ++this.id,
  };

  if (method !== 'apiinfo.version' && method !== 'user.login') {
    body.auth = this.auth;
  }

  request.post({
    uri: this.url,
    headers: { 'content-type': 'application/json-rpc' },
    rejectUnauthorized: this.rejectUnauthorized,
    body: JSON.stringify(body)},
  function(error, resp, body) {
    callback(error, resp, body);
  }.bind(this));
};

Client.prototype.getApiVersion = function(callback) {
  this.call('apiinfo.version', function(error, resp, body) {
    callback(error, resp, body);
  }.bind(this));
};

module.exports = Client;

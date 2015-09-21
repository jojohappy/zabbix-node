var zabbix = require('../lib/zabbix');
var should = require('should');

describe('Zabbix-node', function() {
  var client = new zabbix('http://localhost/api_jsonrpc.php', 'admin', 'zabbix');
  var client1 = new zabbix('http://localhost/api_jsonrpc.php', 'admin', 'password');

  describe('#login', function() {
    it('should get authenticate token', function(done) {
      client.login(function(error, resp, body) {
        should.not.exist(error);
        should(body).be.a.String();
        done();
      });
    });

    it('should show error message when authenticate failed', function(done) {
      client1.login(function(error, resp, body) {
        should(error).be.an.instanceOf(Object)
          .and.have.property('message');
        done();
      });
    });
  });

  describe('#get api version', function() {
    it('should get the version of api', function(done) {
      client.getApiVersion(function(error, resp, body) {
        should(body).be.a.String();
        done();
      });
    });
  });

  describe('#get specify host info', function() {
    var hostid = '569264';
    it('should get host info', function(done) {
      client.login(function(error, resp, body) {
        client.call('host.get', {'hostids': hostid}, function(error, resp, body) {
          should.not.exists(error);
          should(body).be.an.instanceOf(Array).and.lengthOf(1);
          should(body[0]).have.property('hostid');
          done();
        });
      });
    });

    it('should show error message when authenticate failed', function(done) {
      client1.login(function(error, resp, body) {
        client1.call('host.get', {'hostids': hostid}, function(error, resp, body) {
          should(error).be.an.instanceOf(Object)
            .and.have.property('message');
          done();
        });
      });
    });
  });
});
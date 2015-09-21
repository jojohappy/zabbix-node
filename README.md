# Zabbix-node

## Description

This is a simple client to fetching data from Zabbix Api, based [request.js](https://github.com/request/request) library.

## Example

### Login

```
var client = new zabbix('http://localhost/api_jsonrpc.php', 'admin', 'zabbix');
client.login(function(error, resp, body) {
    console.log(body)
});
```


### API Version

```
var client = new zabbix('http://localhost/api_jsonrpc.php', 'admin', 'zabbix');
// This method can be called without login
client.getApiVersion(function(error, resp, body) {
    console.log(body);
});
```

### Get specify host info
```
var client = new zabbix('http://localhost/api_jsonrpc.php', 'admin', 'zabbix');
var hostid = '10061';

// Should be call login at the first time
client.login(function(error, resp, body) {
    client.call('host.get', {'hostids': hostid}, function(error, resp, body) {
      console.log(body);
    });
});

// Then the client has had the token
client.call('host.get', {'hostids': hostid}, function(error, resp, body) {
    console.log(body);
});
```

## Contributing

Please submit issues or pull requests audaciously. Let me know how can I improve this module.

This is my first module of nodejs. So maybe there are mistakes and bugs. I will be things to learn.

## MIT License
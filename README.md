ver-mgr
=======

静态资源项目版本管理

## API
http://v.guluabc.com

### 获取单个项目静态资源信息

URL: `/repos/:name`  
METHOD: `GET`  
PARAMS:  
```javascript
{
  owner: 'f2e'
}
```
RESPONSE:  
```javascript
{
  data: {
    owner: 'f2e',
    name: 'utcsp-web',
    url: 'git@guluabc.com/f2e/utcsp-web.git',
    version: '0.0.1',
    create_time: '2015-05-28T10:10:10',
    update_time: '2015-05-28T10:10:10',
    _id: 'asdf2sa93adsjio19dsfijdk'
  }
}
```  

### 查询项目静态资源信息列表

URL: `/repos`  
METHOD: `GET`  
PARAMS: **可选**  
```javascript
{
  owner: 'f2e',
  name: 'utcsp-web',
  version: '0.0.1'
}
```  
RESPONSE:
```javascript
{
  data: [
    {
      owner: 'f2e',
      name: 'utcsp-web',
      url: 'git@guluabc.com/f2e/utcsp-web.git',
      version: '0.0.1',
      create_time: '2015-05-28T10:10:10',
      update_time: '2015-05-28T10:10:10',
      _id: 'asdf2sa93adsjio19dsfijdk'
    }, {
      owner: 'f2e',
      name: 'utcsp-web',
      url: 'git@guluabc.com/f2e/utcsp-web.git',
      version: '0.0.1',
      create_time: '2015-05-28T10:10:10',
      update_time: '2015-05-28T10:10:10',
      _id: 'efdf2sa93adsjio19dsfijdk'
    }
  ]
}
```  

### 更新或添加项目静态资源信息

URL: '/repos/:name'  
METHOD: 'PUT'  
PARAMS:  
```javascript
{
  owner: 'f2e',
  name: 'utcsp-web',
  url: 'git@guluabc.com/f2e/utcsp-web.git',
  version: '0.0.1'
}
```
RESPONSE:  
```javascript
{
  data: {
    owner: 'f2e',
    name: 'utcsp-web',
    url: 'git@guluabc.com/f2e/utcsp-web.git',
    version: '0.0.1',
    create_time: '2015-05-28T10:10:10',
    update_time: '2015-05-28T10:10:10',
    _id: 'asdf2sa93adsjio19dsfijdk'
  }
}
```

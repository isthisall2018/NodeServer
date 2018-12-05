
let Service = require('node-windows').Service;
 
let svc = new Service({
  name: 'node_server',    //名称
  description: '测试项目服务器', //服务器nodeServer
  script: 'C:/Users/Administrator/Desktop/demo/myapp/main' //项目位置
});
 
svc.on('install', () => {
  svc.start();
});
 
svc.install();
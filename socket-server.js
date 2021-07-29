const app = require('express')();
const cors = require('cors')
app.use(cors({ origin: '*' }))
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const db = require('./database.js').dbobject
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const Datastore = require('nedb');
var db = {};

db.tableorders = new Datastore({ filename: './database/tableorders.db', autoload: true });
io.on('connection', (client) => {
  console.log(client.id)
  client.on("order", (data) => {
    client.emit("response", "datarecieved")
  })

  client.on("join", (data) => {
    console.log(data)
    if (data.usertype == "waiter") client.join("waiter")
    else if (data.usertype == "exe") client.join("exe")
    client.broadcast.to(data.usertype).emit("joinmessage", "success");
    console.log(client.rooms)
  })

  client.on("place_order", (data) => {
    if (data.OrderTypeId == 1) {
      db.tableorders.update({ diningtablekey: data.diningtablekey }, data, { upsert: true }, function (err1, newDoc) {
        client.broadcast.to("exe").emit("new_order", data.OrderTypeId);
      })
    } else if ([3, 4].includes(data.OrderTypeId)) {
      // db.
    }
  })

  client.on("disconnect", () => {
    console.log(client.id + " disconnected")
  })
});

function startSever(host, port) {
  // server.listen(port, host, () => {
  //   console.log(`socket server is running in address http://${server.address().address}:${server.address().port}`)
  // });
  server = app.listen(port, host, () => {
    console.log(`socket server is running in address http://${server.address().address}:${server.address().port}`)
  });
}

function getAvailableAddresses() {
  let ipAddress = [];
  var ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        //skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
        ipAddress.push(iface.address + ' ' + ifname);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
        ipAddress.push(iface.address + ' ' + ifname);
      }
      ++alias;
    });
  });
  console.log(ipAddress)
  return ipAddress;
}

module.exports = {
  startServer(host, port) {
    return startSever(host, port)
  },

  getAvailableAddresses() {
    return getAvailableAddresses()
  }
}

startSever('192.168.1.6', 5000)
const Datastore = require('nedb');
var express = require('express');
var app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
// const { logging } = require('protractor');
var db = {};
const { dialog } = require('electron')

db.product = new Datastore({ filename: './database/product.db', autoload: true });
db.category = new Datastore({ filename: './database/category.db', autoload: true });
db.orderkey = new Datastore({ filename: './database/orderkey.db', autoload: true });
db.printersettings = new Datastore({ filename: './database/printersettings.db', autoload: true });
db.user = new Datastore({ filename: './database/user.db', autoload: true });
db.loginfo = new Datastore({ filename: './database/loginfo.db', autoload: true });
db.storeusers = new Datastore({ filename: './database/storeusers.db', autoload: true });
db.preferences = new Datastore({ filename: './database/preferences.db', autoload: true });
db.taxgroups = new Datastore({ filename: './database/taxgroups.db', autoload: true });
db.diningarea = new Datastore({ filename: './database/diningarea.db', autoload: true });
db.diningtable = new Datastore({ filename: './database/diningtable.db', autoload: true });
db.discountrule = new Datastore({ filename: './database/discountrule.db', autoload: true });
db.additionalcharges = new Datastore({ filename: './database/additionalcharges.db', autoload: true });
db.ordertype = new Datastore({ filename: './database/ordertype.db', autoload: true });
db.customers = new Datastore({ filename: './database/customers.db', autoload: true });
db.paymenttypes = new Datastore({ filename: './database/paymenttypes.db', autoload: true });
db.kotgroups = new Datastore({ filename: './database/kotgroups.db', autoload: true });
db.orderstatus = new Datastore({ filename: './database/orderstatus.db', autoload: true });
db.preorders = new Datastore({ filename: './database/preorders.db', autoload: true });
db.pendingorders = new Datastore({ filename: './database/pendingorders.db', autoload: true });
db.tableorders = new Datastore({ filename: './database/tableorders.db', autoload: true });
db.orderlogs = new Datastore({ filename: './database/orderlogs.db', autoload: true });
db.transactions = new Datastore({ filename: './database/transactions.db', autoload: true });
db.stores = new Datastore({ filename: './database/stores.db', autoload: true });
db.orderstatusbtns = new Datastore({ filename: './database/orderstatusbtns.db', autoload: true });
db.errorlogs = new Datastore({ filename: './database/errorlogs.db', autoload: true });
db.transactionlogs = new Datastore({ filename: './database/transactionlogs.db', autoload: true });
db.ordersaveresponselogs = new Datastore({ filename: './database/ordersaveresponselogs.db', autoload: true });

Object.keys(db).forEach(key => {
    db[key].loadDatabase((data, error) => {
        // if (error) console.log("Error loading database!")
        // else console.log("Database loaded successfully!")
    });
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(cors());

app.get('/products', function (req, res) {
    db.product.find({}, function (err, docs) {
        res.send(docs)
    });
});

app.get('/categories', function (req, res) {
    db.category.find({}, function (err, docs) {
        res.send(docs)
    });
});
app.post('/addproducts', function (req, res) {
    db.product.insert(req.body, function (err, docs) {
        res.send(docs)
    });
});
app.post('/addcats', function (req, res) {
    db.category.insert(req.body, function (err, docs) {
        res.send(docs)
    });
});

app.post('/setorderkey', function (req, res) {
    db.orderkey.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, docs) {
        var obj = { status: 200, msg: "data added succesfully" }
        res.send(obj)
    });
});

app.post('/updateprintersettings', function (req, res) {
    db.printersettings.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, docs) {
        var obj = { status: 200, msg: "data added succesfully" }
        res.send(obj)
    });
});

app.post('/getorderkey', function (req, res) {
    db.category.insert(req.body, function (err, docs) {
        res.send(docs)
    });
});

app.get('/unlock', function (req, res) {
    var response = {
        data: null,
        status: 0
    }
    db.storeusers.findOne({ "Pin": +req.query.pin }, function (err, docs) {
        if (docs) {
            db.user.remove({}, { multi: true }, function (err, numRemoved) {
                db.user.insert(docs, function (err, docs1) {
                    response.data = "Pin Matched"
                    response.status = 200
                    response.userid = docs.UserId
                    response.roleid = docs.RoleId
                    res.send(response)
                });
            })
        } else {
            response.data = "Pin Doesn't Matched"
            response.status = 0
            res.send(response)
        }
    });
});

app.post('/getdbdata', function (req, res) {
    var data = {}
    var i = 0
    var j = req.body.length
    req.body.forEach(dbname => {
        db[dbname].find({}, function (err, docs) {
            data[dbname] = docs
            i++
            if (i == j) res.send(data)
        });
    })
});
// app.post('/updateprintersettings', function (req, res) {
//     db.tableorders.update({ _id: req.body._id }, req.body, { upsert: true }, function (err1, newDoc) {   // Callback is optional
//         res.send({ msg: "success" })
//     })
// });

app.post('/storeselect', function (req, res) {
    console.log(req.ip, req.hostname)
    var i = 0;
    var j = Object.keys(req.body).length
    var response = { msg: "data set" }
    Object.keys(req.body).forEach(key => {
        // if (["pendingorders", "preorders"].includes(key)) {
        //     var k = 0
        //     if (req.body[key].length == 0) i++
        //     req.body[key].forEach((dt, index) => {
        //         db[key].update({ InvoiceNo: dt.InvoiceNo }, dt, { upsert: true }, function (err1, newDoc) {   // Callback is optional
        //             if (err1) { console.log(key); console.log(err1) }
        //             k++
        //             console.log(k, req.body[key].length)
        //             if (k == req.body[key].length) {
        //                 i++
        //                 console.log(i, j)
        //                 if (i == j) res.send(response)
        //             }
        //         })
        //     })
        // } else {
        //     db[key].remove({}, { multi: true }, function (err, numRemoved) {
        //         db[key].insert(req.body[key], function (err1, newDoc) {   // Callback is optional
        //             if (err1) { console.log(key); console.log(err1) }
        //             i++
        //             if (i == j) res.send(response)
        //         })
        //     })
        // }
        db[key].remove({ $or: [{ status: { $exists: false } }, { status: 'S' }] }, { multi: true }, function (err, numRemoved) {
            db[key].insert(req.body[key], function (err1, newDoc) {   // Callback is optional
                if (err1) { console.log(key); console.log(err1) }
                i++
                if (i == j) res.send(response)
            })
        })
    })
});
////////////////////////////SETTINGS////////////////////////////
app.post('/updatecharges', function (req, res) {
    var i = 0;
    var j = req.body.length
    req.body.forEach(charge => {
        db.additionalcharges.update({ _id: charge._id }, charge, function (err1, newDoc) {   // Callback is optional
            i++
            if (i == j) res.send({ msg: "success" })
        })
    })
});
/////////////////////////PENDINGORDER///////////////////////////
app.post('/saveorder', function (req, res) {
    console.log(req.ip, req.hostname)
    req.body.status = "N"
    db.pendingorders.insert(req.body, function (err1, newDoc) {   // Callback is optional
        res.send({ msg: "success" })
    })
});

app.get('/getorders', function (req, res) {
    console.log(req.ip, req.hostname)
    db.pendingorders.find({ status: "N" }, function (err1, docs) {   // Callback is optional
        res.send(docs)
    })
});

app.get('/deleteorder', function (req, res) {
    console.log(req.query)
    db.pendingorders.remove({ _id: req.query._id }, function (err1, newDoc) {   // Callback is optional
        res.send({ msg: "success" })
    })
});

app.post('/updateorder', function (req, res) {
    db.pendingorders.update({ _id: req.body._id }, req.body, function (err1, newDoc) {   // Callback is optional
        db.transactions.remove({ InvoiceNo: req.body.InvoiceNo }, { multi: true }, function (err, num) {

        })
        res.send({ msg: "success" })
    })
});
/////////////////////////PREORDERS///////////////////////////
app.post('/savepreorder', function (req, res) {
    console.log(req.ip, req.hostname)
    req.body.status = "P"
    db.preorders.insert(req.body, function (err1, newDoc) {   // Callback is optional
        console.log('Line: 188', err1)
        res.send({ msg: "success" })
    })
});

app.get('/getpreorders', function (req, res) {
    db.preorders.find({ status: "P" }, function (err1, docs) {   // Callback is optional
        console.log('Line: 195', err1)
        res.send(docs)
    })
});

app.get('/getpreorderby_id', function (req, res) {
    console.log(req.ip, req.hostname)
    db.preorders.findOne({ _id: req.query._id }, function (err1, docs) {   // Callback is optional
        console.log('Line: 203', err1)
        res.send(docs)
    })
});

app.get('/deletepreorder', function (req, res) {
    console.log(req.query)
    db.preorders.remove({ _id: req.query._id }, function (err1, newDoc) {   // Callback is optional
        console.log('Line: 211', err1)
        res.send({ msg: "success" })
    })
});

app.post('/updatepreorder', function (req, res) {
    db.preorders.update({ _id: req.body._id }, req.body, function (err1, newDoc) {   // Callback is optional
        console.log("Line: 218", err1, newDoc, req.body._id, req.body.status)
        if (req.body.status == "S")
            db.transactions.remove({ InvoiceNo: req.body.InvoiceNo }, { multi: true }, function (err, num) { })

        // db.transactions.update({ InvoiceNo: req.body.InvoiceNo }, { $set: { "saved": true } }, { multi: true }, function (err, num) { })
        res.send({ msg: "success" })
    })
});

app.post('/updatepreorderbyinvoice', function (req, res) {
    db.preorders.update({ InvoiceNo: req.body.InvoiceNo }, req.body, { upsert: true }, function (err1, newDoc) {   // Callback is optional
        console.log('Line: 227', err1)
        res.send({ msg: "success" })
    })
});

app.post('/deletepreorderbyinvoice', function (req, res) {
    db.preorders.remove({ InvoiceNo: req.query.invoiceno }, function (err, num) {   // Callback is optional
        console.log('Line: 234', err)
        res.send({ msg: "success" })
    })
});

app.get('/checkanddeletepreorder', function (req, res) {
    db.preorders.findOne({ InvoiceNo: req.query.invoiceno }, function (err, doc) {
        if (err) {
            res.send({ msg: "error checking data" })
        }
        if (doc) {
            db.preorders.remove({ InvoiceNo: req.query.invoiceno }, function (err, num) {   // Callback is optional
                res.send({ msg: "success" })
            })
        } else {
            res.send({ msg: "no order with invoice " + req.query.invoiceno })
        }
    })
});

////////////////////////tableorders
app.post('/savetblorder', function (req, res) {
    console.log(req.body.diningtablekey)
    db.tableorders.update({ diningtablekey: req.body.diningtablekey }, req.body, { upsert: true }, function (err1, newDoc) {   // Callback is optional
        res.send({ msg: "success" })
    })
});

app.get('/deletetblorder', function (req, res) {
    console.log(req.query)
    db.tableorders.remove({ diningtablekey: req.query.diningtablekey }, function (err1, newDoc) {   // Callback is optional
        console.log(newDoc)
        res.send({ msg: "success" })
    })
});

app.get('/deletesplittable', function (req, res) {
    db.diningtable.remove({ TableKey: req.query.splittablekey }, function (err1, newDoc) {   // Callback is optional
        res.send({ msg: "success" })
    })
});

app.post('/splitTable', function (req, res) {
    let i = 0
    db.diningtable.update({ TableKey: req.body.parenttable.TableKey }, req.body.parenttable, function (err1, newDoc) {   // Callback is optional
        i++
        if (i == 2)
            res.send({ msg: "success" })
    })
    db.diningtable.insert(req.body.splittable, function (err1, newDoc) {   // Callback is optional
        i++
        if (i == 2)
            res.send({ msg: "success" })
    })
});

////////////////////////orderlogging
function error_log(data, error) {
    var log_data = {
        timestamp: new Date().getTime(),
        error_type: "database.js -> errorlogging",
        data: { data_cause: data, error: error }
    }
    db.errorlogs.insert(req.body, function (err1, newDoc) {   // Callback is optional
        res.send({ msg: "success" })
    })
}
app.post('/logorderevent', function (req, res) {
    db.orderlogs.insert(req.body, function (err1, newDoc) {   // Callback is optional
        if (err1) {
            alert(err1)
            error_log(req.body, err1)
        }
        res.send({ msg: "success" })
    })
});

app.get('/getorderlogs', function (req, res) {
    db.orderlogs.find({}, function (err1, logs) {   // Callback is optional
        res.send(logs)
    })
});

app.post('/logtransactions', function (req, res) {
    db.transactionlogs.insert(req.body, function (err1, newDoc) {   // Callback is optional
        res.send({ msg: "success" })
    })
});

app.post('/logordersaveresponse', function (req, res) {
    db.ordersaveresponselogs.insert(req.body, function (err1, newDoc) {   // Callback is optional
        res.send({ msg: "success" })
    })
});

//////////////////////errored orders
app.get('/geterroredorders', function (req, res) {
    var i = 0;
    var data = {}
    db.preorders.find({ status: "E" }, function (err1, orders) {   // Callback is optional
        data["preorders"] = orders
        i++
        if (i == 2)
            res.send(data)
    })
    db.pendingorders.find({ status: "E" }, function (err1, orders) {   // Callback is optional
        data["pendingorders"] = orders
        i++
        if (i == 2)
            res.send(data)
    })
});

//////////////////////TRANSACTIONS
app.get('/transactionsbyinvoice', function (req, res) {
    db.transactions.find({ InvoiceNo: req.query.InvoiceNo }, function (err, trnxns) {
        res.send(trnxns)
    })
});

app.post('/addtransaction', function (req, res) {
    db.transactions.insert(req.body, function (err, trnxns) {
        res.send({ message: "Transaxn save success" })
    })
});

//////////////////////ERROR LOG
app.post('/logerror', function (req, res) {
    db.errorlogs.insert(req.body, function (err, trnxns) {
        res.send(trnxns)
    })
});
// app.post('/alert', function (req, res) {
//     alert()
//     res.send('alerted')
// });

function startServer() {
    var server = app.listen(8081, function () {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
        app.emit('appstarted', server.address())
    });
}

function alert(message) {
    const options = {
        type: 'error',
        buttons: ['Ok'],
        defaultId: 2,
        title: 'POS Error',
        message: 'POS has faced an error.Contact Admin',
        detail: JSON.stringify(message),
    };

    dialog.showMessageBox(null, options, (response, checkboxChecked) => {
        console.log(response);
        console.log(checkboxChecked);
    });
}

startServer();

// module.exports = {
//     dbobject : db
// }

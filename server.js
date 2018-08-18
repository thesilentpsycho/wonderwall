var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var csv = require('csvtojson')
var mongoose = require('mongoose')
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types;

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.Promise = Promise

var dbUrl = 'mongodb://dbuser:dbpass123@ds113482.mlab.com:13482/tradedb'

let symbolsList= [];

async function loadSymbolList(){
    symbolsList = await csv().fromFile('./assets/equitylist.csv');
}

var Order = mongoose.model('Order', {
    dpid: {type: String, default : 'admin'},
    timestamp: { type : Date, default: Date.now },
    symbol: String,
    qty: Number,
    side: String,
    ordertype: String,
    exchange: String,
    limitprice: SchemaTypes.Double,
    triggerprice: SchemaTypes.Double,
    orderstatus: String
})

var Holdings = mongoose.model('Holdings', {
    dpid: {type: String, default : 'admin'},
    timestamp: { type : Date, default: Date.now },
    symbol: String,
    qty: Number,
    side: String,
    exchange: String,
    price: SchemaTypes.Double
})

var Funds = mongoose.model('Funds', {
    dpid: {type: String, default : 'admin'},
    marginavailable : SchemaTypes.Double,
    marginused : SchemaTypes.Double,
    accountvalue : SchemaTypes.Double,
    investment : SchemaTypes.Double
})

var Positions = mongoose.model('Positions', {
    dpid: {type: String, default : 'admin'},
    qty: Number,
    netqty: Number,
    side: String,
    exchange: String,
    price: SchemaTypes.Double
})

loadSymbolList();


app.get('/file', (req,res) =>{
    var myjson = getSymbolList();
})

//this api is to get suggestions on search bar text change
app.get('/search', (req,res) =>{
    var query = new RegExp(req.query.q, 'i');
    var temp = symbolsList.filter(str => str.SYMBOL.search(query) > -1);
    return res.send(temp.slice(0,10));
})

app.get('/orders', (req, res) => {
    Order.find({}, (err, orders) => {
        res.send(orders)
    })
})

app.get('/orders/:user', (req, res) => {
    var username = req.params.user
    console.log(username)
    Order.find({dpid: username}, (err, orders) => {
        res.send(orders)
    })
})

app.post('/order',async (req, res) =>{
    console.log('received order',req.body)
    try{
        var order = new Order(req.body)

        var savedOrder = await order.save()
        console.log('saved')
        res.sendStatus(200)
    } catch(error){
        res.sendStatus(500)
        return console.error(error)
    } finally{
        console.log('Post order called')
    }
})


io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl, {useNewUrlParser: true}, (err) => {
    console.log('mongo db connection status: ', err)
})

var server = http.listen(5000, () => {
    console.log('server is listening on port', server.address().port)
})
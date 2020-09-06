const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const randomStockValues = require("./random-stock-values");

const port = process.env.PORT || 9090 ;

io.on("connection", socket => {
    console.log('socket connesso');
   getStockValues(socket);
   setInterval(()=>{
       getStockValues(socket);
       console.log('eventi socket emessi');
   },5000);
});

function getStockValues(socket){
    socket.emit("appleStock",randomStockValues.getAppleStockValues());
    socket.emit("googleStock",randomStockValues.getGoogleStockValues());
    socket.emit("microsoftStock",randomStockValues.getMicrosoftStockValues());
}

http.listen(port,()=>{
    console.log(`Lo stock server è in ascolto sulla Porta: ${port}`); // tempete string ALT+96
});
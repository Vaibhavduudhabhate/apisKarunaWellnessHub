const express = require('express');
var bodyParser = require('body-parser');
const app = express();

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  
  app.use(
    express.urlencoded({
      extended: false, 
      // limit: "200mb",
    })
  );
  
  app.use(bodyParser.json());
  const cors = require("cors");
  app.use(cors(corsOptions));

PORT = 3001;

app.get('/',function (req,res){
    res.send('Hello world');
})

app.listen(PORT,()=>{
    console.log(`server is running on : http://localhost:${PORT}`);
});

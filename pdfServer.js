let fs = require('fs'),
    PDFParser = require("pdf2json");



var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.use(express.static('.'));
app.use( bodyParser.json({limit: '10mb'}) );
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/pdf', function(req, res){
    console.log("aaa", req.body.data);
    var pdf = req.body.data;
    var name = req.body.name;
    var pdf = pdf.replace('data:application/pdf;base64,', '');

   fs.writeFile(name, pdf, 'base64', function(err) {
        console.log(err);
       let pdfParser = new PDFParser();
       pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
       pdfParser.on("pdfParser_dataReady", pdfData => {
           var reducedJSON = pdfData.formImage.Pages[0].Texts.map(function(obj) {
               return obj.R[0].T;
           });
           var newObj = {};
           newObj.name = reducedJSON[6];
           newObj.subject = reducedJSON[24];
           newObj.quantity = reducedJSON[25];
           newObj.rate = decodeURIComponent(reducedJSON[26]);
           newObj.amount = decodeURIComponent(reducedJSON[27]);
           res.send(JSON.stringify(newObj));
       });
        pdfParser.loadPDF(name);
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
let fs = require('fs'),
    PDFParser = require("pdf2json");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("invoice.json", JSON.stringify(pdfData));
});
//pdfParser.loadPDF("invoice.pdf");

var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.use(express.static('.'));
app.use( bodyParser.json({limit: '1mb'}) );

app.post('/pdf', function(req, res){
    console.log( req.body.data);

    var pdf = req.body.data;

   var pdf = pdf.replace('data:application/pdf;base64,', '');

    res.send('received');
   /* fs.writeFile(name, pdf, 'base64', function(err) {
        console.log(err);
    });*/
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
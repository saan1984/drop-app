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
           res.send(JSON.stringify(pdfData));
       });
        pdfParser.loadPDF(name);
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
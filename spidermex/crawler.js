var nodeio = require('node.io');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
    database : 'spidermex',
});
connection.connect();



exports.job = new nodeio.Job({benchmark: true, max: 50}, {
    input: function(start, num, callback) {
        if(start !== 0) return false; // We only want the input method to run once
        var self = this;
	var url = this.options.args[0]
	//var url = "http://www.anumex.com/result.jsp"
        this.getHtml(url, function(err, $) {
            if (err) self.exit(err);
	    var urls = [];

            $('.res div.ad a').each(function(a) {
		callback([a.attribs.href]);
            });

            callback(null, false);
        });
    }, 
    run: function(url) {
        var self = this;
        this.getHtml(url, function(err, $) {
            if (err) {
                console.log("ERROR", err);
                self.retry();
            }
            else {
                var anuncio = {};
		anuncio.url = url;
		match = /\d*$/.exec(url);
		anuncio.anumex_id = match[0];


		try{anuncio.price = $('.adprice').rawtext;}catch(err){}
		try{
		    var date = $('.adheader b.r2').text;
		    var d = new Date();
		    var dia = d.getDate();
		    var mes = d.getMonth() + 1;
		    var ano = d.getFullYear();
		    var fullday = ano.toString() + '-' + mes.toString() + '-' + dia.toString();
		    d.setDate(d.getDate() - 1);
		    var dia2 = d.getDate();
		    var mes2 = d.getMonth() + 1;
		    var ano2 = d.getFullYear();
		    var fullday2 = ano.toString() + '-' + mes.toString() + '-' + dia.toString();
		    date = date.replace('Hoy', fullday);
		    date = date.replace('Ayer', fullday2);
		    anuncio.date = date;
		}catch(err){}
		try{
		    index = 1;
		    $('.contactPhone b').each(function(b) {
			anuncio['tels'] += "#>" + b.text;
			index += 1;
		    });

		}catch(err){}
		try{

  console.log('asdfasdfasdfasdfasdf');
		    index = 1;
		    $('.thumbs .thumb a img').each(function(img) {
			anuncio['images'] += ' http://anumex.com' + img.attribs.src.replace('thumbs', 'pictures');
			index += 1;
var fs = require('fs'),
    request = require('request');
var picStream = fs.createWriteStream('doodle.png');
picStream.on('close', function() {
  console.log('file done');
});
request('http://google.com/images/logos/ps_logo2.png').pipe(picStream); 


		    });
		}catch(err){}
		try{anuncio.adoptions = $('.adoptions').fulltext;}catch(err){}

		try{
		    index = 1;
		    $('.ad_nav a').each(function(a) {
			if(index == 2){anuncio.state = a.text};
			if(index == 3){anuncio.category = a.text};
			if(index == 4){anuncio.subcategory = a.text};
			if(index == 5){anuncio.type = a.text};
			index += 1;
		    });
		}catch(err){}
		try{
		    var loc = $('.adlocation').rawtext;
		    anuncio.city = loc.split(',')[0].replace(/\s/g, '');
		}catch(err){}

		try{anuncio.description = $('pre').rawtext;}catch(err){}

//		    this.emit(anuncio);


		var query = connection.query('INSERT INTO datos SET ?', anuncio, function(err, result) {

		    if (err) throw err;
		});
		    this.emit(anuncio);
            }

        });
    }
});


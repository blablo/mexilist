request = require('request-json');
var fs = require("fs");
var easyimg = require('easyimage');



var client = request.newClient('http://www.anumex.com/');
var mexi = request.newClient('http://mexilist.com/');
//var mexi = request.newClient('http://localhost:3000/');


var region = process.argv[2];
var cat = process.argv[3];
//1510
//190



client.get('app?choice=result&region='+ region +'&category=' + cat, function(err, res, body) {
    //    getNextAnuncio('7302805');
	     if(body.ad != undefined){
	     getNextAnuncio(body.ad);
	     }

//	     getNextAnuncio([{id: '7347437'},{id: '7348335'},{id: '7301886'}]);


});
function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}
function getNextAnuncio(anuncios){
    if(anuncios[0] != undefined){
        anuncio = anuncios.pop();

        client.get('http://www.anumex.com/app?choice=showAd&id='+anuncio.id, function(err2, res2, body2) {

            var data = {
                user: {
                    email: body2.ad[0].email,
                    name: body2.ad[0].name
                },
                anuncio: {
                    bot_id: body2.ad[0].id ,
                    category: body2.ad[0].catID ,
                    city: body2.ad[0].cityID ,
                    state: body2.ad[0].regID ,
                    price: body2.ad[0].price ,
                    texto: body2.ad[0].text ,
                    tipo: body2.ad[0].typeID ,
                    title: body2.ad[0].title ,
                    tel: body2.ad[0].mobile,
                    fecha: body2.ad[0].date,
                    images: {}

                }
            };

	      if(body2.ad[0].extraEdit[0] != undefined){
		if(contains(body2.ad[0].extra, 'Modelo')){
		  data['anuncio']['model_id'] = body2.ad[0].extraEdit[2];
		  data['anuncio']['year'] = body2.ad[0].extraEdit[4];
		  data['anuncio']['km'] = body2.ad[0].extraEdit[5];
		}
		if(contains(body2.ad[0].extra, 'CC')){
		  data['anuncio']['brand_id'] = body2.ad[0].extraEdit[2];
		  data['anuncio']['year'] = body2.ad[0].extraEdit[4];
		  data['anuncio']['cc'] = body2.ad[0].extraEdit[5];
		  data['anuncio']['km'] = body2.ad[0].extraEdit[6];
		}
		if(contains(body2.ad[0].extra, 'Recámaras')){
		  data['anuncio']['colonia'] = body2.ad[0].extraEdit[0];
		  data['anuncio']['rooms'] = body2.ad[0].extraEdit[1];
		  data['anuncio']['m2int'] = body2.ad[0].extraEdit[2];
		  data['anuncio']['m2ext'] = body2.ad[0].extraEdit[3];
		  data['anuncio']['longitude'] = body2.ad[0].lng;
		  data['anuncio']['latitude'] = body2.ad[0].lat;
		}


	      }




	      if(body2.ad[0].pictures[0] != undefined){

            saveImagen(body2.ad[0].pictures, data, function(alldata) {
                //console.log(alldata);

                mexi.post('anuncios/create_bot', alldata, function(err, res, body) {
	    	    console.log(body);
                });
		setTimeout(function() {
		    getNextAnuncio(anuncios);
		}, 5000);


            });
		}else{
		    setTimeout(function() {
			getNextAnuncio(anuncios);
		    }, 5000);
		}


        });
    }else{
        console.log('finish');
    }
}


function saveImagen(pictures, data, callback){
    if (pictures[0] != undefined) {
        pic = pictures.pop();
        client.saveFile('http://anumex.com' + pic, '.' + pic, function(err3, res3, body3) {
            if (err3) {
                return console.log(err3);
            }
            if (res3) {

                if(pic != undefined && pic != ""){
                    convertImage(pic, pictures, data, callback);
                }
            }

        });
    }else{
        callback(data);
    }
}

function convertImage(pic, pictures, data, callback){
    easyimg.exec('convert .'+ pic +' -shave 35x35 .' + pic, function(err, stdout, stderr) {
        if (err){
	  console.log(err);
	}else{
          getBase64Image(pic, pictures, data, callback);
	}




    });
}

function getBase64Image(img, pictures, data, callback) {
    var base64Image = "";
    fs.readFile('.' + img, function(err, original_data){

        data['anuncio']['images'][pic] = original_data.toString('base64');

        if (pictures[0] != undefined) {
            saveImagen(pictures, data, callback);
        }else{
            callback(data);
        }

    });

}


//data['anuncio']['images'][pic] = pic;

// mexi.post('anuncios/create_bot', data, function(err, res, body) {

// });

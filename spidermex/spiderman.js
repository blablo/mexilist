request = require('request-json');
var fs = require("fs");
var easyimg = require('easyimage');



var client = request.newClient('http://www.anumex.com/');
var mexi = request.newClient('http://mexilist.com/');





function getNextAnuncio(anuncios){
    if(anuncios[0] != undefined){
        anuncio = anuncios.pop();
        client.get('http://www.anumex.com/app?choice=showAd&id='+anuncio.id, function(err2, res2, body2) {
            var data = {};
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



            saveImagen(body2.ad[0].pictures, data, function(alldata) {
                console.log(alldata);
                mexi.post('anuncios/create_bot', alldata, function(err, res, body) {
		    console.log(err);
                });

                getNextAnuncio(anuncios);

            });



        });
    }else{
        console.log('finish');
    }
}

client.get('app?choice=result&region=1510&category=190', function(err, res, body) {

    //    getNextAnuncio('7302805');

      getNextAnuncio(body.ad);
    //getNextAnuncio([{id: '7308220'}]);

});

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
        if (err) throw err;
        console.log('convert');

        getBase64Image(pic, pictures, data, callback);




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
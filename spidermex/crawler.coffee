nodeio = require 'node.io'
titles = []
ids = []
prices = []
links = []
descs = []
scores = []
output = []
prueba = 'Hello World'
anuncios = []
bla = 'asdf'
root = exports ? this
root.foo = -> 'Hello World'
class Crawler extends nodeio.JobClass

    input: false
    run: -> 
        url = @options.args[0]
        anuncio = { }                  
        @getHtml url, (err, $, data) =>
            @exit err if err

            $('.res div.ad a').each (a) => 

                 anuncio['title'] = a.text
                 anuncio['url'] = a.attribs.href 
                 match = /\d*$/.exec a.attribs.href
                 anuncio['id'] = match[0] 
                 anuncios.push anuncio
        console.log foo



@class = Crawler
@job = new Crawler({timeout:20})

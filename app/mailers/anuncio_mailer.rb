class AnuncioMailer < ActionMailer::Base
  add_template_helper(AnunciosHelper)
  default from: "envio@mexilist.com"

  def contactar(email, nombre, mensaje, anuncio)
    @nombre = nombre
    @mensaje = mensaje
    @anuncio = anuncio
    mail(to: anuncio.user.email, subject: anuncio.title, reply_to: email)
  end
  

end

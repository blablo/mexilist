class AnuncioMailer < ActionMailer::Base
  default from: "envio@mexilist.com"

  def contactar(email, nombre, mensaje, anuncio)
    @nombre = nombre
    @mensaje = mensaje
    mail(to: 'pepelalo@gmail.com', subject: anuncio.title, reply_to: email)
  end
  

end

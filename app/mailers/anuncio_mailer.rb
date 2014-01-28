class AnuncioMailer < ActionMailer::Base
  add_template_helper(AnunciosHelper)
  default from: "Mexilist.com <envio@mexilistmail.com>"

  def contactar(email, nombre, mensaje, anuncio)
    @nombre = nombre
    @mensaje = mensaje
    @anuncio = anuncio
    @email = anuncio.user.email
    @email = 'success@simulator.amazonses.com' if Rails.env.development?


   mail(to: @email, subject: anuncio.title, reply_to: email)


  end
  

end

# -*- coding: utf-8 -*-
# last edit: feb 8, 2013
# tipos. 1 = normal, 2 = car, 3 = moto, 4 = house, 5 = jobs

Category.delete_all


Category.create_or_update([
                           { :id => 10, :name => 'Vehículos', :main => true, :tipo => 2, :keywords => "seminuevos, vehiculos, usados"},
                           { :id => 20, :name => 'Autos', :parent_id => 10, :keywords => "autos, usados"},
                           { :id => 30, :name => 'Pickups', :parent_id => 10, :keywords => "pickups"},
                           { :id => 40, :name => 'Jeeps, SUVs y Vans', :parent_id => 10, :keywords => "camionetas, usadas"},
                           { :id => 50, :name => 'Motocicletas', :parent_id => 10, :tipo => 3, :keywords => "motocicletas"},
                           { :id => 60, :name => 'Auto accesorios', :parent_id => 10, :keywords => "autopartes, stereo"},
                           { :id => 70, :name => 'Camiones e Industriales', :parent_id => 10, :keywords => "camiones"},
                           { :id => 80, :name => 'Náutica y Aeronáutica', :parent_id => 10, :tipo => 1, :keywords => "lanchas"},

                           { :id => 100, :name => 'Tecnología', :main => true, :keywords => "tecnologia"},
                           { :id => 110, :name => 'Celulares y Tabletas', :parent_id => 100, :keywords => "celular tablet"},
                           { :id => 120, :name => 'Consolas y Videojuegos', :parent_id => 100, :keywords => "xbox playstation psp wii"},
                           { :id => 130, :name => 'Audio', :parent_id => 100, :keywords => "audio ipod"},
                           { :id => 140, :name => 'Computadoras', :parent_id => 100, :keywords => "compu"},
                           { :id => 150, :name => 'Laptops', :parent_id => 100, :keywords => "lapotop"},
                           { :id => 160, :name => 'Accesorios Computadora', :parent_id => 100, :keywords => "accessorios computadoras"},
                           { :id => 170, :name => 'TV y Video', :parent_id => 100, :keywords => "tv led"},
                           { :id => 180, :name => 'Cámaras y Videocámaras', :parent_id => 100, :keywords => "camara"},
                           { :id => 185, :name => 'Software y Juegos PC', :parent_id => 100, :keywords => "software juegos "},
                           { :id => 190, :name => 'DVDs y CDs', :parent_id => 100, :keywords => "cd dvd"},
                           { :id => 195, :name => 'Más Tecnología', :parent_id => 100, :keywords => "tecnologia"},
                           
                           { :id => 200, :name => 'Recreación', :main => true, :keywords => "recreación"},
                           { :id => 210, :name => 'Animales y Mascotas', :parent_id => 200, :keywords => "animales mascotas"},
                           { :id => 220, :name => 'Instrumentos Musicales', :parent_id => 200, :keywords => "instrumentos musicales"},
                           { :id => 230, :name => 'Juegos y Juguetes', :parent_id => 200, :keywords => "juguetes"},
                           { :id => 240, :name => 'Bicicletas', :parent_id => 200, :keywords => "bicis"},
                           { :id => 250, :name => 'Deportes', :parent_id => 200, :keywords => "deportes"},
                           { :id => 260, :name => 'Libros y Revistas', :parent_id => 200, :keywords => "libros revistas"},
                           { :id => 265, :name => 'De Colección', :parent_id => 200, :keywords => "de coleccion"},
                           { :id => 270, :name => 'Caza, Pesca y Camping', :parent_id => 200, :keywords => "camping"},
                           { :id => 280, :name => 'Boletos', :parent_id => 200, :keywords => "boletos"},
                           { :id => 290, :name => 'Modelismo', :parent_id => 200, :keywords => "modelismo"},
                           
                           { :id => 300, :name => 'Inmuebles', :main => true, :tipo => 4, :keywords => "inmuebles"},
                           { :id => 310, :name => 'Casas', :parent_id => 300, :keywords => "casas"},
                           { :id => 315, :name => 'Casas de Campo', :parent_id => 300, :keywords => "casas de campo"},
                           { :id => 320, :name => 'Departamentos', :parent_id => 300, :keywords => "departamentos"},
                           { :id => 325, :name => 'Cuartos y Asistencia', :parent_id => 300, :keywords => "cuartos asistencia"},
                           { :id => 330, :name => 'Oficinas y Locales', :parent_id => 300, :keywords => "oficinas"},
                           { :id => 340, :name => 'Terrenos y Lotes', :parent_id => 300, :keywords => "terrenos"},
                           { :id => 350, :name => 'Traspasos', :parent_id => 300, :keywords => "traspasos"},
                           { :id => 360, :name => 'Rentas Vacacionales', :parent_id => 300, :keywords => "vacaciones"},
  
                           { :id => 400, :name => 'Personal', :main => true, :keywords => "personal"},
                           { :id => 410, :name => 'Ropa y Accesorios', :parent_id => 400, :keywords => "ropa"},
                           { :id => 420, :name => 'Artículos para Bebés', :parent_id => 400, :keywords => "bebes"},
                           { :id => 430, :name => 'Salud y Belleza', :parent_id => 400, :keywords => "salud belleza"},
                           { :id => 440, :name => 'Empleo', :parent_id => 400, :tipo => 5, :keywords => "empleo"},
                           { :id => 450, :name => 'Clases', :parent_id => 400, :keywords => "clases"},
                           { :id => 460, :name => 'Eventos', :parent_id => 400, :keywords => "eventos"},
                           { :id => 470, :name => 'Servicios', :parent_id => 400, :keywords => "servicios"},
                           
                           { :id => 500, :name => 'Hogar', :main => true, :keywords => "hogar"},
                           { :id => 510, :name => 'Muebles y Decoración', :parent_id => 500, :keywords => "muebles"},
                           { :id => 520, :name => 'Arte y Antigüedades', :parent_id => 500, :keywords => "arte antiguedades"},
                           { :id => 530, :name => 'Electrodomésticos', :parent_id => 500, :keywords => "electrodomesticos"},
                           { :id => 540, :name => 'Jardín y Exterior', :parent_id => 500, :keywords => "jardin"},
                           
                           { :id => 600, :name => 'Demás', :main => true, :keywords => "otros"},
                           { :id => 610, :name => 'Maquinaria y Construcción', :parent_id => 600, :keywords => "herramientas maquinaria construccion"},
                           { :id => 620, :name => 'Restaurantes y Comida', :parent_id => 600, :keywords => "restaurant"},
                           { :id => 630, :name => 'Artículos de Oficina', :parent_id => 600, :keywords => "oficina"},
                           { :id => 640, :name => 'Más de todo', :parent_id => 600, :keywords => "más de todo"}
                          ])



# -*- coding: utf-8 -*-
# last edit: feb 8, 2013
# tipos. 1 = normal, 2 = car, 3 = moto, 4 = house, 5 = jobs
Category.create_or_update([
                           { :id => 10, :name => 'Vehículos', :main => true, :tipo => 2},
                           { :id => 20, :name => 'Autos', :parent_id => 10 :tipo => 2},
                           { :id => 30, :name => 'Pickups', :parent_id => 10 :tipo => 2},
                           { :id => 40, :name => 'Jeeps, SUVs y Vans', :parent_id => 10},
                           { :id => 50, :name => 'Motocicletas', :parent_id => 10, :tipo => 3},
                           { :id => 60, :name => 'Auto accesorios', :parent_id => 10},
                           { :id => 70, :name => 'Camiones e Industriales', :parent_id => 10 :tipo => 2},
                           { :id => 80, :name => 'Náutica y Aeronáutica', :parent_id => 10},

                           { :id => 100, :name => 'Tecnología', :main => true},
                           { :id => 110, :name => 'Celulares y Tabletas', :parent_id => 100},
                           { :id => 120, :name => 'Consolas y Videojuegos', :parent_id => 100},
                           { :id => 130, :name => 'Audio', :parent_id => 100},
                           { :id => 140, :name => 'Computadoras', :parent_id => 100},
                           { :id => 150, :name => 'Laptops', :parent_id => 100},
                           { :id => 160, :name => 'Accesorios Computadora', :parent_id => 100},
                           { :id => 170, :name => 'TV y Video', :parent_id => 100},
                           { :id => 180, :name => 'Cámaras y Videocámaras', :parent_id => 100},
                           { :id => 185, :name => 'Software y Juegos PC', :parent_id => 100},
                           { :id => 190, :name => 'DVDs y CDs', :parent_id => 100},
                           { :id => 195, :name => 'Más Tecnología', :parent_id => 100},
                           
                           { :id => 200, :name => 'Recreación', :main => true},
                           { :id => 210, :name => 'Animales y Mascotas', :parent_id => 200},
                           { :id => 220, :name => 'Instrumentos Musicales', :parent_id => 200},
                           { :id => 230, :name => 'Juegos y Juguetes', :parent_id => 200},
                           { :id => 240, :name => 'Bicicletas', :parent_id => 200},
                           { :id => 250, :name => 'Deportes', :parent_id => 200},
                           { :id => 260, :name => 'Libros y Revistas', :parent_id => 200},
                           { :id => 265, :name => 'De Colección', :parent_id => 200},
                           { :id => 270, :name => 'Caza, Pesca y Camping', :parent_id => 200},
                           { :id => 280, :name => 'Boletos', :parent_id => 200},
                           { :id => 290, :name => 'Modelismo', :parent_id => 200},
                           
                           { :id => 300, :name => 'Inmuebles', :main => true, :tipo => 4},
                           { :id => 310, :name => 'Casas', :parent_id => 300 :tipo => 4},
                           { :id => 315, :name => 'Casas de Campo', :parent_id => 300 :tipo => 4},
                           { :id => 320, :name => 'Departamentos', :parent_id => 300 :tipo => 4},
                           { :id => 325, :name => 'Cuartos y Asistencia', :parent_id => 300 :tipo => 4},
                           { :id => 330, :name => 'Oficinas y Locales', :parent_id => 300 :tipo => 4},
                           { :id => 340, :name => 'Terrenos y Lotes', :parent_id => 300 :tipo => 4},
                           { :id => 350, :name => 'Traspasos', :parent_id => 300 :tipo => 4},
                           { :id => 360, :name => 'Rentas Vacacionales', :parent_id => 300 :tipo => 4},
  
                           { :id => 400, :name => 'Personal', :main => true},
                           { :id => 410, :name => 'Ropa y Accesorios', :parent_id => 400},
                           { :id => 420, :name => 'Artículos para Bebés', :parent_id => 400}
                           { :id => 430, :name => 'Salud y Belleza', :parent_id => 400}
                           { :id => 440, :name => 'Empleo', :parent_id => 400 :tipo => 5}
                           { :id => 450, :name => 'Clases', :parent_id => 400}
                           { :id => 460, :name => 'Eventos', :parent_id => 400}
                           { :id => 470, :name => 'Servicios', :parent_id => 400}
                           
                           { :id => 500, :name => 'Hogar', :main => true}
                           { :id => 510, :name => 'Muebles y Decoración', :parent_id => 500}
                           { :id => 520, :name => 'Arte y Antigüedades', :parent_id => 500}
                           { :id => 530, :name => 'Electrodomésticos', :parent_id => 500}
                           { :id => 540, :name => 'Jardín y Exterior', :parent_id => 500}
                           
                           { :id => 600, :name => 'Demás', :main => true}
                           { :id => 610, :name => 'Maquinaria y Construcción', :parent_id => 600}
                           { :id => 620, :name => 'Restaurantes y Comida', :parent_id => 600}
                           { :id => 630, :name => 'Artículos de Oficina', :parent_id => 600}
                           { :id => 640, :name => 'Más de todo', :parent_id => 600}
                          ])

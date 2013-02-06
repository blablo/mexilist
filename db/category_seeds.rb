# -*- coding: utf-8 -*-
# tipos. 1 = normal, 2 = car, 3 = moto, 4 = house
Category.create_or_update([
                           { :id => 10, :name => 'Vehículos', :main => true, :tipo => 2 },
                           { :id => 20, :name => 'Autos', :parent_id => 10},
                           { :id => 30, :name => 'Pickups', :parent_id => 10},
                           { :id => 40, :name => 'Jeeps, SUVs y Vans', :parent_id => 10},
                           { :id => 50, :name => 'Motocicletas', :parent_id => 10, :tipo => 3},
                           { :id => 60, :name => 'Auto accesorios', :parent_id => 10},
                           { :id => 70, :name => 'Camiones e Industriales', :parent_id => 10},
                           { :id => 80, :name => 'Náutica y Aeronáutica', :parent_id => 10},

                           { :id => 100, :name => 'Electrónica e Informática', :main => true},
                           { :id => 110, :name => 'Celulares y Tabletas', :parent_id => 100},
                           
                           { :id => 120, :name => 'Laptops', :parent_id => 100},
                           { :id => 130, :name => 'Audio', :parent_id => 100},
                           { :id => 140, :name => 'Consolas y Videojuegos', :parent_id => 100},
                           
                           { :id => 150, :name => 'Discos', :parent_id => 100},
                           { :id => 160, :name => 'TV y Video', :parent_id => 100},
                           { :id => 170, :name => 'Computadoras', :parent_id => 100},

                           { :id => 12, :name => 'Inmuebles', :main => true, :tipo => 4},
                           { :id => 13, :name => 'Casas', :parent_id => 12},
                           { :id => 14, :name => 'Departamentos', :parent_id => 12},
                           { :id => 15, :name => 'Oficinas y Locales', :parent_id => 12},
                           { :id => 16, :name => 'Traspasos', :parent_id => 12},
                           { :id => 17, :name => 'Rentas Vacacionales', :parent_id => 12},

                           { :id => 18, :name => 'Tiempo Libre', :main => true},
                           { :id => 19, :name => 'Bicicletas', :parent_id => 18},
                           { :id => 20, :name => 'Boletos', :parent_id => 18},
                           { :id => 21, :name => 'Coleccionables', :parent_id => 18},
                           { :id => 22, :name => 'Deportes', :parent_id => 18},
                           { :id => 23, :name => 'Libros', :parent_id => 18},

                           { :id => 24, :name => 'Bla', :main => true},
                           { :id => 25, :name => 'Bicicletas', :parent_id => 24},
                           { :id => 26, :name => 'Boletos', :parent_id => 24},

                          ])

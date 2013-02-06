# -*- coding: utf-8 -*-
# tipos. 1 = normal, 2 = car, 3 = moto, 4 = house
Category.create_or_update([
                           { :id => 1, :name => 'Vehículos', :main => true, :tipo => 2 },
                           { :id => 2, :name => 'Autos', :parent_id => 1},
                           { :id => 3, :name => 'Motocicletas', :parent_id => 1, :tipo => 3},
                           { :id => 4, :name => 'Autoesterio', :parent_id => 1},
                           { :id => 5, :name => 'Auto Partes', :parent_id => 1},

                           { :id => 6, :name => 'Electrónica', :main => true},
                           { :id => 7, :name => 'Audio', :parent_id => 6},
                           { :id => 8, :name => 'Consolas y Videojuegos', :parent_id => 6},
                           { :id => 9, :name => 'Discos', :parent_id => 6},
                           { :id => 10, :name => 'TV y Video', :parent_id => 6},
                           { :id => 11, :name => 'Computadoras', :parent_id => 6},

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

# -*- coding: utf-8 -*-
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# Environment variables (ENV['...']) are set in the file config/application.yml.
# See http://railsapps.github.com/rails-environment-variables.html
# puts 'ROLES'
# YAML.load(ENV['ROLES']).each do |role|
#   Role.find_or_create_by_name({ :name => role }, :without_protection => true)
#   puts 'role: ' << role
# end
# puts 'DEFAULT USERS'
# user = User.find_or_create_by_email :name => ENV['ADMIN_NAME'].dup, :email => ENV['ADMIN_EMAIL'].dup, :password => ENV['ADMIN_PASSWORD'].dup, :password_confirmation => ENV['ADMIN_PASSWORD'].dup
# puts 'user: ' << user.name
# user.add_role :admin

Category.create_or_update([
                             { :id => 1, :name => 'Vehículos', :main => true },
                             { :id => 2, :name => 'Autos', :parent_id => 1},
                             { :id => 3, :name => 'Motocicletas', :parent_id => 1},
                             { :id => 4, :name => 'Autoesterio', :parent_id => 1},
                             { :id => 5, :name => 'Auto Partes', :parent_id => 1},

                             { :id => 6, :name => 'Electrónica', :main => true},
                             { :id => 7, :name => 'Audio', :parent_id => 6},
                             { :id => 8, :name => 'Consolas y Videojuegos', :parent_id => 6},
                             { :id => 9, :name => 'Discos', :parent_id => 6},
                             { :id => 10, :name => 'TV y Video', :parent_id => 6},
                             { :id => 11, :name => 'Computadoras', :parent_id => 6},

                             { :id => 12, :name => 'Inmuebles', :main => true},
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
                             { :id => 23, :name => 'Libros', :parent_id => 18}
                            ])

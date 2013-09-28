# -*- coding: ascii-8bit -*-
State.create_or_update([
                        { :id => 1, :name => 'Distrito Federal'},
                        { :id => 2, :name => 'Estado de México'},
                        { :id => 9, :name => 'Jalisco'}
                        /*
                        { :id => 1, :name => 'Aguascalientes'},
                        { :id => 2, :name => 'Baja California N.'},
                        { :id => 3, :name => 'Baja California S.'},
                        { :id => 4, :name => 'Campeche'},
                        { :id => 5, :name => 'Chiapas'},
                        { :id => 6, :name => 'Chihuahua'},
                        { :id => 7, :name => 'Coahuila'},
                        { :id => 8, :name => 'Colima'},
                        { :id => 9, :name => 'Distrito Federal'},
                        { :id => 10, :name => 'Durango'},
                        { :id => 12, :name => 'Guanajuato'},
                        { :id => 13, :name => 'Guerrero'},
                        { :id => 14, :name => 'Hidalgo'},
                        { :id => 15, :name => 'Jalisco'},
                        { :id => 11, :name => 'Estado de México'},
                        { :id => 16, :name => 'Michoacán'},
                        { :id => 17, :name => 'Morelos'},
                        { :id => 18, :name => 'Nayarit'},
                        { :id => 19, :name => 'Nuevo León'},
                        { :id => 20, :name => 'Oaxaca'},
                        { :id => 21, :name => 'Puebla'},
                        { :id => 22, :name => 'Querétaro'},
                        { :id => 23, :name => 'Quintana Roo'},
                        { :id => 24, :name => 'San Luis Potosí'},
                        { :id => 25, :name => 'Sinaloa'},
                        { :id => 26, :name => 'Sonora'},
                        { :id => 27, :name => 'Tabasco'},
                        { :id => 28, :name => 'Tamaulipas'},
                        { :id => 29, :name => 'Tlaxcala'},
                        { :id => 30, :name => 'Veracruz'},
                        { :id => 31, :name => 'Yucatán'},
                        { :id => 32, :name => 'Zacatecas'}
*/
                       ])

City.create_or_update([
                        { :id => 11, :name => 'Álvaro Obregón', :state_id => 1, :metropoly_id => 1},
                        { :id => 12, :name => 'Coyoacán', :state_id => 1, :metropoly_id => 1},
                        { :id => 13, :name => 'Azcapotzalco', :state_id => 1, :metropoly_id => 1},
                        { :id => 14, :name => 'Benito Juárez', :state_id => 1, :metropoly_id => 1},
                        { :id => 15, :name => 'Cuajimalpa', :state_id => 1, :metropoly_id => 1},
                        { :id => 16, :name => 'Iztacalco', :state_id => 1, :metropoly_id => 1},
                        { :id => 113, :name => 'Cuauhtémoc', :state_id => 1, :metropoly_id => 1},
                        { :id => 114, :name => 'Gustavo A. Madero', :state_id => 1, :metropoly_id => 1},
                        { :id => 115, :name => 'Iztapalapa', :state_id => 1, :metropoly_id => 1},
                        { :id => 17, :name => 'Milpa Alta', :state_id => 1, :metropoly_id => 1},
                        { :id => 18, :name => 'Magdalena Contreras', :state_id => 1, :metropoly_id => 1},
                        { :id => 19, :name => 'Miguel Hidalgo', :state_id => 1, :metropoly_id => 1},
                        { :id => 110, :name => 'Tlalpan', :state_id => 1, :metropoly_id => 1},
                        { :id => 111, :name => 'Xochimilco', :state_id => 1, :metropoly_id => 1},
                        { :id => 112, :name => 'Tláhuac', :state_id => 1, :metropoly_id => 1},
                        { :id => 116, :name => 'Venustiano Carranza', :state_id => 1, :metropoly_id => 1},


                        { :id => 21, :name => 'Acolman', :state_id => 2, :metropoly_id => 1},
                        { :id => 22, :name => 'Amecameca', :state_id => 2, :metropoly_id => 1},
                        { :id => 23, :name => 'Apaxco', :state_id => 2, :metropoly_id => 1},
                        { :id => 24, :name => 'Atenco', :state_id => 2, :metropoly_id => 1},
                        { :id => 25, :name => 'Atizapán de Zaragoza', :state_id => 2, :metropoly_id => 1},
                        { :id => 26, :name => 'Atlautla', :state_id => 2, :metropoly_id => 1},
                        { :id => 27, :name => 'Axapusco', :state_id => 2, :metropoly_id => 1},
                        { :id => 28, :name => 'Ayapango', :state_id => 2, :metropoly_id => 1},
                        { :id => 29, :name => 'Coacalco de Berriozábal', :state_id => 2, :metropoly_id => 1},
                        { :id => 210, :name => 'Cocotitlán', :state_id => 2, :metropoly_id => 1},
                        { :id => 211, :name => 'Coyotepec', :state_id => 2, :metropoly_id => 1},
                        { :id => 212, :name => 'Cuautitlán', :state_id => 2, :metropoly_id => 1},
                        { :id => 213, :name => 'Chalco', :state_id => 2, :metropoly_id => 1},
                        { :id => 214, :name => 'Chiautla', :state_id => 2, :metropoly_id => 1},
                        { :id => 215, :name => 'Chicoloapan', :state_id => 2, :metropoly_id => 1},
                        { :id => 216, :name => 'Chiconcuac', :state_id => 2, :metropoly_id => 1},
                        { :id => 217, :name => 'Chimalhuacán', :state_id => 2, :metropoly_id => 1},
                        { :id => 218, :name => 'Ecatepec de Morelos', :state_id => 2, :metropoly_id => 1},
                        { :id => 219, :name => 'Ecatzingo', :state_id => 2, :metropoly_id => 1},
                        { :id => 220, :name => 'Huehuetoca', :state_id => 2, :metropoly_id => 1},
                        { :id => 221, :name => 'Hueypoxtla', :state_id => 2, :metropoly_id => 1},
                        { :id => 222, :name => 'huixquilucan', :state_id => 2, :metropoly_id => 1},
                        { :id => 223, :name => 'Isidro Fabela', :state_id => 2, :metropoly_id => 1},
                        { :id => 224, :name => 'Ixtapaluca', :state_id => 2, :metropoly_id => 1},
                        { :id => 225, :name => 'Jaltenco', :state_id => 2, :metropoly_id => 1},
                        { :id => 226, :name => 'Jilotzingo', :state_id => 2, :metropoly_id => 1},
                        { :id => 227, :name => 'Juchitepec', :state_id => 2, :metropoly_id => 1},
                        { :id => 228, :name => 'Melchor Ocampo', :state_id => 2, :metropoly_id => 1},
                        { :id => 229, :name => 'Naucalpan de Juárez', :state_id => 2, :metropoly_id => 1},
                        { :id => 230, :name => 'Nezahualcóyotl', :state_id => 2, :metropoly_id => 1},
                        { :id => 231, :name => 'Nextlalpan', :state_id => 2, :metropoly_id => 1},
                        { :id => 232, :name => 'Nicolás Romero', :state_id => 2, :metropoly_id => 1},
                        { :id => 233, :name => 'Nopaltepec', :state_id => 2, :metropoly_id => 1},
                        { :id => 234, :name => 'Otumba', :state_id => 2, :metropoly_id => 1},
                        { :id => 235, :name => 'Ozumba', :state_id => 2, :metropoly_id => 1},
                        { :id => 236, :name => 'Papalotla', :state_id => 2, :metropoly_id => 1},
                        { :id => 237, :name => 'La Paz', :state_id => 2, :metropoly_id => 1},
                        { :id => 238, :name => 'San Martín de las Pirámides', :state_id => 2, :metropoly_id => 1},
                        { :id => 239, :name => 'Tecámac', :state_id => 2, :metropoly_id => 1},
                        { :id => 240, :name => 'Temamatla', :state_id => 2, :metropoly_id => 1},
                        { :id => 241, :name => 'Temascalapa', :state_id => 2, :metropoly_id => 1},
                        { :id => 242, :name => 'Tenango del Aire', :state_id => 2, :metropoly_id => 1},
                        { :id => 243, :name => 'Teoloyucán', :state_id => 2, :metropoly_id => 1},
                        { :id => 244, :name => 'Teotihuacán', :state_id => 2, :metropoly_id => 1},
                        { :id => 245, :name => 'Tepetlaoxtoc', :state_id => 2, :metropoly_id => 1},
                        { :id => 246, :name => 'Tepetlixpa', :state_id => 2, :metropoly_id => 1},
                        { :id => 247, :name => 'Tepotzotlán', :state_id => 2, :metropoly_id => 1},
                        { :id => 248, :name => 'Tequixquiac', :state_id => 2, :metropoly_id => 1},
                        { :id => 249, :name => 'Texcoco', :state_id => 2, :metropoly_id => 1},
                        { :id => 250, :name => 'Tezoyuca', :state_id => 2, :metropoly_id => 1},
                        { :id => 251, :name => 'Tlalmanalco', :state_id => 2, :metropoly_id => 1},
                        { :id => 252, :name => 'Tlalnepantla de Baz', :state_id => 2, :metropoly_id => 1},
                        { :id => 253, :name => 'Tultepec', :state_id => 2, :metropoly_id => 1},
                        { :id => 254, :name => 'Tultitlán', :state_id => 2, :metropoly_id => 1},
                        { :id => 255, :name => 'Villa del Carbón', :state_id => 2, :metropoly_id => 1},
                        { :id => 256, :name => 'Zumpango', :state_id => 2, :metropoly_id => 1},
                        { :id => 257, :name => 'Cuautitlán Izcalli', :state_id => 2, :metropoly_id => 1},
                        { :id => 258, :name => 'Valle de Chalco Solidaridad', :state_id => 2, :metropoly_id => 1},
                        { :id => 259, :name => 'Tonanitla', :state_id => 2, :metropoly_id => 1},


                        { :id => 91, :name => 'Guadalajara', :state_id => 9, :metropoly_id => 2},
                        { :id => 92, :name => 'Zapopan', :state_id => 9, :metropoly_id => 2},
                        { :id => 93, :name => 'Tlaquepaque', :state_id => 9, :metropoly_id => 2},
                        { :id => 94, :name => 'Tonalá', :state_id => 9, :metropoly_id => 2},
                        { :id => 95, :name => 'Tlajomulco de Zuñiga', :state_id => 9, :metropoly_id => 2},
                        { :id => 96, :name => 'El Salto', :state_id => 9, :metropoly_id => 2},
                        { :id => 97, :name => 'Ixtlahuacán de los Membrillos', :state_id => 9, :metropoly_id => 2},
                        { :id => 98, :name => 'Juanacatlán', :state_id => 9, :metropoly_id => 2},
                        /*
                        // Aguascalientes
                        { :id => 110, :name => 'Aguascalientes', :state_id => 1},
                        
                        // Baja California Norte
                        { :id => 210, :name => 'Ensenada', :state_id => 2},
                        { :id => 220, :name => 'Mexicali', :state_id => 2},
                        { :id => 230, :name => 'Tijuana', :state_id => 2},
                        
                        // Baja California Sur
                        { :id => 310, :name => 'La Paz', :state_id => 3},
                        { :id => 320, :name => 'Los Cabos', :state_id => 3},
                        
                        // Campeche
                        { :id => 410, :name => 'Campeche', :state_id => 4},
                        { :id => 420, :name => 'Ciudad del Carmen', :state_id => 4},
                        
                        // Chiapas
                        { :id => 510, :name => 'San Cristóbal de las Casas', :state_id => 5},
                        { :id => 520, :name => 'Tapachula', :state_id => 5},
                        { :id => 530, :name => 'Tuxtla Gutiérrez', :state_id => 5},
                        { :id => 540, :name => 'Villaflores', :state_id => 5},
                        
                        // Chihuahua
                        { :id => 610, :name => 'Chihuahua', :state_id => 6},
                        { :id => 620, :name => 'Juárez', :state_id => 6},
                        
                        // Coahuila
                        { :id => 710, :name => 'Acuña', :state_id => 7},
                        { :id => 720, :name => 'Monclova', :state_id => 7},
                        { :id => 730, :name => 'Piedras Negras', :state_id => 7},
                        { :id => 740, :name => 'Ramos Arizpe', :state_id => 7},
                        { :id => 750, :name => 'Saltillo', :state_id => 7},
                        { :id => 760, :name => 'Torreón', :state_id => 7},
                        
                        // Colima
                        { :id => 810, :name => 'Colima', :state_id => 8},
                        { :id => 820, :name => 'Manzanillo', :state_id => 8},
                        
                        // Distrito Federal
                        { :id => 905, :name => 'Alvaro Obregón', :state_id => 9},
                        { :id => 910, :name => 'Azcapotzalco', :state_id => 9},
                        { :id => 915, :name => 'Benito Juárez', :state_id => 9},
                        { :id => 920, :name => 'Coyoacán', :state_id => 9},
                        { :id => 925, :name => 'Cuajimalpa de Morelos', :state_id => 9},
                        { :id => 930, :name => 'Cuauhtémoc', :state_id => 9},
                        { :id => 935, :name => 'Gustavo A. Madero', :state_id => 9},
                        { :id => 940, :name => 'Iztacalco', :state_id => 9},
                        { :id => 945, :name => 'Iztapalapa', :state_id => 9},
                        { :id => 950, :name => 'Magdalena Contreras', :state_id => 9},
                        { :id => 955, :name => 'Miguel Hidalgo', :state_id => 9},
                        { :id => 960, :name => 'Milpa Alta', :state_id => 9},
                        { :id => 965, :name => 'Tláhuac', :state_id => 9},
                        { :id => 970, :name => 'Tlalpan', :state_id => 9},
                        { :id => 975, :name => 'Venustiano Carranza', :state_id => 9},
                        { :id => 980, :name => 'Xochimilco', :state_id => 9},
                        
                        // Durango
                        { :id => 1010, :name => 'Durango', :state_id => 10},
                        { :id => 1020, :name => 'Gómez Palacio', :state_id => 10},
                        { :id => 1030, :name => 'Lerdo', :state_id => 10},
                        
                        // Estado de México
                        { :id => 1110, :name => 'Atizapán de Zaragoza', :state_id => 11},
                        { :id => 1120, :name => 'Ecatepec de Morelos', :state_id => 11},
                        { :id => 1130, :name => 'Ixtapaluca', :state_id => 11},
                        { :id => 1140, :name => 'La Paz', :state_id => 11},
                        { :id => 1150, :name => 'Naucalpan', :state_id => 11},
                        { :id => 1160, :name => 'Nezahualcóyotl', :state_id => 11},
                        { :id => 1170, :name => 'Tlalnepantla de Baz', :state_id => 11},
                        { :id => 1180, :name => 'Toluca', :state_id => 11},
                        
                        // Guanajuato
                        { :id => 1210, :name => 'Celaya', :state_id => 12},
                        { :id => 1220, :name => 'Guanajuato', :state_id => 12},
                        { :id => 1230, :name => 'Irapuato', :state_id => 12},
                        { :id => 1240, :name => 'León', :state_id => 12},
                        { :id => 1250, :name => 'Salamanca', :state_id => 12},
                        { :id => 1260, :name => 'San Miguel de Allende', :state_id => 12},
                         
                        // Guerrero
                        { :id => 1310, :name => 'Acapulco', :state_id => 13},
                        { :id => 1320, :name => 'Chilpancingo', :state_id => 13},
                        
                        // Hidalgo
                        { :id => 1410, :name => 'Pachuca', :state_id => 14},
                        { :id => 1420, :name => 'Tizayuca', :state_id => 14},
                        { :id => 1430, :name => 'Tulancingo', :state_id => 14},
                        
                        // Jalisco
                        { :id => 1510, :name => 'Guadalajara', :state_id => 15},
                        { :id => 1540, :name => 'Tlajomulco de Zúñiga', :state_id => 15},
                        { :id => 1550, :name => 'Tlaquepaque', :state_id => 15},
                        { :id => 1560, :name => 'Tonalá', :state_id => 15},
                        { :id => 1570, :name => 'Zapopan', :state_id => 15},
                        { :id => 1580, :name => 'El Salto', :state_id => 15},
                        { :id => 1590, :name => 'Puerto Vallarta', :state_id => 15},
                        
                        // Michoacan
                        { :id => 1610, :name => 'Morelia', :state_id => 16},
                        { :id => 1620, :name => 'Uruapan', :state_id => 16},
                        { :id => 1630, :name => 'Zamora', :state_id => 16},
                        
                        // Morelos
                        { :id => 1710, :name => 'Cuautla', :state_id => 17},
                        { :id => 1720, :name => 'Cuernavaca', :state_id => 17},
                        { :id => 1730, :name => 'Jiutepec', :state_id => 17},
                        { :id => 2910, :name => 'Apizaco', :state_id => 29},
                        { :id => 1740, :name => 'Temixco', :state_id => 17},
                        { :id => 1750, :name => 'Yautepec', :state_id => 17},

                        // Nayarit
                        { :id => 1810, :name => 'Tepic', :state_id => 18},
                        { :id => 1820, :name => 'Nuevo Vallarta', :state_id => 18},
                        
                        // Nuevo León
                        { :id => 1910, :name => 'Apodaca', :state_id => 19},
                        { :id => 1920, :name => 'General Escobedo', :state_id => 19},
                        { :id => 1930, :name => 'Guadalupe', :state_id => 19},
                        { :id => 1940, :name => 'Monterrey', :state_id => 19},
                        { :id => 1950, :name => 'San Nicolás de los Garza', :state_id => 19},
                        { :id => 1960, :name => 'San Pedro Garza García', :state_id => 19},
                        { :id => 1970, :name => 'Santa Catarina', :state_id => 19},
                        
                        // Oaxaca
                        { :id => 2010, :name => 'Oaxaca', :state_id => 20},
                        
                        // Puebla
                        { :id => 2110, :name => 'Puebla', :state_id => 21},
                        { :id => 2120, :name => 'Tehuacán', :state_id => 21},
                        
                        // Querétaro
                        { :id => 2220, :name => 'San Juan del Río', :state_id => 22},
                        { :id => 2210, :name => 'Querétaro', :state_id => 22},
                        { :id => 2230, :name => 'Tequisquiapan', :state_id => 22},
                        
                        // Quintana Roo
                        { :id => 2310, :name => 'Cancún', :state_id => 23},
                        { :id => 2320, :name => 'Chetumal', :state_id => 23},
                        { :id => 2330, :name => 'Playa del Carmen', :state_id => 23},
                        
                        // San Luis Potosí
                        { :id => 2410, :name => 'Ciudad Valles', :state_id => 24},
                        { :id => 2420, :name => 'Matehuala', :state_id => 24},
                        { :id => 2430, :name => 'San Luis Potosí', :state_id => 24},
                        
                        // Sinaloa
                        { :id => 2510, :name => 'Culiacán', :state_id => 25},
                        { :id => 2520, :name => 'Escuinapa', :state_id => 25},
                        { :id => 2530, :name => 'Los Mochis', :state_id => 25},
                        { :id => 2540, :name => 'Mazatlán', :state_id => 25},
                        { :id => 2550, :name => 'Rosario', :state_id => 25},
                        { :id => 2560, :name => 'Sinaloa', :state_id => 25},
                        
                        // Sonora
                        { :id => 2610, :name => 'Ciudad Obregón', :state_id => 26},
                        { :id => 2620, :name => 'Guaymas', :state_id => 26},
                        { :id => 2630, :name => 'Hermosillo', :state_id => 26},
                        
                        // Tabasco
                        { :id => 2710, :name => 'Cárdenas', :state_id => 27},
                        { :id => 2720, :name => 'Comalcalco', :state_id => 27},
                        { :id => 2730, :name => 'Villahermosa', :state_id => 27},
                        
                        // Tamaulipas
                        { :id => 2820, :name => 'Matamoros', :state_id => 28},
                        { :id => 2830, :name => 'Nuevo Laredo', :state_id => 28},
                        { :id => 2810, :name => 'Ciudad Victoria', :state_id => 28},
                        { :id => 2840, :name => 'Reynosa', :state_id => 28},
                        { :id => 2850, :name => 'Tampico', :state_id => 28},
                        
                        // Tlaxcala
                        { :id => 2930, :name => 'Huamantla', :state_id => 29},
                        { :id => 2940, :name => 'Tlaxcala', :state_id => 29},
                        { :id => 2920, :name => 'Chiautempan', :state_id => 29},
                        
                        // Veracruz
                        { :id => 3050, :name => 'Poza Rica', :state_id => 30},
                        { :id => 3010, :name => 'Boca del Río', :state_id => 30},
                        { :id => 3020, :name => 'Coatzacoalcos', :state_id => 30},
                        { :id => 3030, :name => 'Córdoba', :state_id => 30},
                        { :id => 3040, :name => 'Orizaba', :state_id => 30},
                        { :id => 3060, :name => 'Veracruz', :state_id => 30},
                        { :id => 3070, :name => 'Xalapa', :state_id => 30},
                        
                        // Yucatán
                        { :id => 3110, :name => 'Mérida', :state_id => 31},
                        { :id => 3120, :name => 'Progreso', :state_id => 31},
                        { :id => 3130, :name => 'Tizimín', :state_id => 31},
                        { :id => 3140, :name => 'Valladolid', :state_id => 31},
                        
                        // Zacatecas
                        { :id => 3210, :name => 'Fresnillo', :state_id => 32},
                        { :id => 3220, :name => 'Guadalupe', :state_id => 32},
                        { :id => 3230, :name => 'Zacatecas', :state_id => 32},
  
*/
                      ])

Metropoly.create_or_update([
                            { :id => 1, :name => 'Ciudad de México'},
                            { :id => 2, :name => 'Guadalajara'},
                            { :id => 3, :name => 'Monterrey'},
                           ])

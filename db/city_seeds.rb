# -*- coding: utf-8 -*-
State.create_or_update([
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
                       ])

City.create_or_update([
                        # Aguascalientes
                        { :id => 110, :name => 'Aguascalientes', :state_id => 1},
                        { :id => 120, :name => 'Jesús María', :state_id => 1},
                        { :id => 130, :name => 'Pabellón de Arteaga', :state_id => 1},
                        { :id => 140, :name => 'Rincón de Romos', :state_id => 1},
                        
                        #Baja California Norte
                        { :id => 210, :name => 'Ensenada', :state_id => 2},
                        { :id => 220, :name => 'Mexicali', :state_id => 2},
                        { :id => 230, :name => 'Tijuana', :state_id => 2},
                        { :id => 240, :name => 'Tecate', :state_id => 2},
                        { :id => 250, :name => 'Rosarito', :state_id => 2},
                        
                        #Baja California Sur
                        { :id => 310, :name => 'La Paz', :state_id => 3},
                        { :id => 320, :name => 'Los Cabos', :state_id => 3},
                        { :id => 330, :name => 'Ciudad Constitución', :state_id => 3},
                        { :id => 340, :name => 'Colonia del Sol', :state_id => 3},
                        
                        #Campeche
                        { :id => 410, :name => 'Campeche', :state_id => 4},
                        { :id => 420, :name => 'Ciudad del Carmen', :state_id => 4},
                        { :id => 430, :name => 'Champotón', :state_id => 4},
                        { :id => 440, :name => 'Escárcega', :state_id => 4},
                        
                        #Chiapas
                        { :id => 510, :name => 'San Cristóbal de las Casas', :state_id => 5},
                        { :id => 520, :name => 'Tapachula', :state_id => 5},
                        { :id => 530, :name => 'Tuxtla Gutiérrez', :state_id => 5},
                        { :id => 540, :name => 'Comitán de Domínguez', :state_id => 5},
                        { :id => 550, :name => 'Cintapala de Figueroa', :state_id => 5},
                        { :id => 560, :name => 'Villaflores', :state_id => 5},
                        
                        #Chihuahua
                        { :id => 610, :name => 'Chihuahua', :state_id => 6},
                        { :id => 620, :name => 'Juárez', :state_id => 6},
                        { :id => 630, :name => 'Ciudad Delicias', :state_id => 6},
                        { :id => 640, :name => 'Hidalgo del Parral', :state_id => 6},
                        { :id => 650, :name => 'Ciudad Cuauhtémoc', :state_id => 6},
                        
                        # Coahuila
                        { :id => 710, :name => 'Ciudad Acuña', :state_id => 7},

                        { :id => 720, :name => 'Monclova', :state_id => 7},
                        { :id => 730, :name => 'Piedras Negras', :state_id => 7},
                        { :id => 740, :name => 'Ramos Arizpe', :state_id => 7},
                        { :id => 750, :name => 'Saltillo', :state_id => 7},
                        { :id => 760, :name => 'Torreón', :state_id => 7},
                        
                        #Colima
                        { :id => 810, :name => 'Colima', :state_id => 8},
                        { :id => 820, :name => 'Manzanillo', :state_id => 8},
                        { :id => 830, :name => 'Villa de Álvarez', :state_id => 8},
                        { :id => 840, :name => 'Tecomán', :state_id => 8},
                        
                        #Distrito Federal
                        { :id => 905, :name => 'Alvaro Obregón', :state_id => 9,  :metropoly_id => 1},
                        { :id => 910, :name => 'Azcapotzalco', :state_id => 9, :metropoly_id => 1},
                        { :id => 915, :name => 'Benito Juárez', :state_id => 9, :metropoly_id => 1},
                        { :id => 920, :name => 'Coyoacán', :state_id => 9, :metropoly_id => 1},
                        { :id => 925, :name => 'Cuajimalpa de Morelos', :state_id => 9, :metropoly_id => 1},
                        { :id => 930, :name => 'Cuauhtémoc', :state_id => 9, :metropoly_id => 1},
                        { :id => 935, :name => 'Gustavo A. Madero', :state_id => 9, :metropoly_id => 1},
                        { :id => 940, :name => 'Iztacalco', :state_id => 9, :metropoly_id => 1},
                        { :id => 945, :name => 'Iztapalapa', :state_id => 9, :metropoly_id => 1},
                        { :id => 950, :name => 'Magdalena Contreras', :state_id => 9, :metropoly_id => 1},
                        { :id => 955, :name => 'Miguel Hidalgo', :state_id => 9, :metropoly_id => 1},
                        { :id => 960, :name => 'Milpa Alta', :state_id => 9, :metropoly_id => 1},
                        { :id => 965, :name => 'Tláhuac', :state_id => 9, :metropoly_id => 1},
                        { :id => 970, :name => 'Tlalpan', :state_id => 9, :metropoly_id => 1},
                        { :id => 975, :name => 'Venustiano Carranza', :state_id => 9, :metropoly_id => 1},
                        { :id => 980, :name => 'Xochimilco', :state_id => 9, :metropoly_id => 1},
                        
                        #Durango
                        { :id => 1010, :name => 'Durango', :state_id => 10},
                        { :id => 1020, :name => 'Gómez Palacio', :state_id => 10},
                        { :id => 1030, :name => 'Ciudad Lerdo', :state_id => 10},
                        { :id => 1040, :name => 'Santiago de Papasquiaro', :state_id => 10},
                        { :id => 1040, :name => 'El Salto', :state_id => 10},
                        
                        # Estado de México
                        { :id => 1110, :name => 'Toluca', :state_id => 11},
                        { :id => 1121, :name => 'Acolman', :state_id => 11, :metropoly_id => 1},
                        { :id => 1122, :name => 'Amecameca', :state_id => 11, :metropoly_id => 1},
                        { :id => 1123, :name => 'Apaxco', :state_id => 11, :metropoly_id => 1},
                        { :id => 1124, :name => 'Atenco', :state_id => 11, :metropoly_id => 1},
                        { :id => 1125, :name => 'Atizapán de Zaragoza', :state_id => 11, :metropoly_id => 1},
                        { :id => 1126, :name => 'Atlautla', :state_id => 11, :metropoly_id => 1},
                        { :id => 1127, :name => 'Axapusco', :state_id => 11, :metropoly_id => 1},
                        { :id => 1128, :name => 'Ayapango', :state_id => 11, :metropoly_id => 1},
                        { :id => 1129, :name => 'Coacalco de Berriozábal', :state_id => 11, :metropoly_id => 1},
                        { :id => 1130, :name => 'Cocotitlán', :state_id => 11, :metropoly_id => 1},
                        { :id => 1131, :name => 'Coyotepec', :state_id => 11, :metropoly_id => 1},
                        { :id => 1132, :name => 'Cuautitlán', :state_id => 11, :metropoly_id => 1},
                        { :id => 1133, :name => 'Chalco', :state_id => 11, :metropoly_id => 1},
                        { :id => 1134, :name => 'Chiautla', :state_id => 11, :metropoly_id => 1},
                        { :id => 1135, :name => 'Chicoloapan', :state_id => 11, :metropoly_id => 1},
                        { :id => 1136, :name => 'Chiconcuac', :state_id => 11, :metropoly_id => 1},
                        { :id => 1137, :name => 'Chimalhuacán', :state_id => 11, :metropoly_id => 1},
                        { :id => 1138, :name => 'Ecatepec de Morelos', :state_id => 11, :metropoly_id => 1},
                        { :id => 1139, :name => 'Ecatzingo', :state_id => 11, :metropoly_id => 1},
                        { :id => 1140, :name => 'Huehuetoca', :state_id => 11, :metropoly_id => 1},
                        { :id => 1141, :name => 'Hueypoxtla', :state_id => 11, :metropoly_id => 1},
                        { :id => 1142, :name => 'Huixquilucan', :state_id => 11, :metropoly_id => 1},
                        { :id => 1143, :name => 'Isidro Fabela', :state_id => 11, :metropoly_id => 1},
                        { :id => 1144, :name => 'Ixtapaluca', :state_id => 11, :metropoly_id => 1},
                        { :id => 1145, :name => 'Jaltenco', :state_id => 11, :metropoly_id => 1},
                        { :id => 1146, :name => 'Jilotzingo', :state_id => 11, :metropoly_id => 1},
                        { :id => 1147, :name => 'Juchitepec', :state_id => 11, :metropoly_id => 1},
                        { :id => 1148, :name => 'Melchor Ocampo', :state_id => 11, :metropoly_id => 1},
                        { :id => 1149, :name => 'Naucalpan de Juárez', :state_id => 11, :metropoly_id => 1},
                        { :id => 1150, :name => 'Nezahualcóyotl', :state_id => 11, :metropoly_id => 1},
                        { :id => 1151, :name => 'Nextlalpan', :state_id => 11, :metropoly_id => 1},
                        { :id => 1152, :name => 'Nicolás Romero', :state_id => 11, :metropoly_id => 1},
                        { :id => 1153, :name => 'Nopaltepec', :state_id => 11, :metropoly_id => 1},
                        { :id => 1154, :name => 'Otumba', :state_id => 11, :metropoly_id => 1},
                        { :id => 1155, :name => 'Ozumba', :state_id => 11, :metropoly_id => 1},
                        { :id => 1156, :name => 'Papalotla', :state_id => 11, :metropoly_id => 1},
                        { :id => 1157, :name => 'La Paz', :state_id => 11, :metropoly_id => 1},
                        { :id => 1158, :name => 'San Martín de las Pirámides', :state_id => 11, :metropoly_id => 1},
                        { :id => 1159, :name => 'Tecámac', :state_id => 11, :metropoly_id => 1},
                        { :id => 1160, :name => 'Temamatla', :state_id => 11, :metropoly_id => 1},
                        { :id => 1161, :name => 'Temascalapa', :state_id => 11, :metropoly_id => 1},
                        { :id => 1162, :name => 'Tenango del Aire', :state_id => 11, :metropoly_id => 1},
                        { :id => 1163, :name => 'Teoloyucán', :state_id => 11, :metropoly_id => 1},
                        { :id => 1164, :name => 'Teotihuacán', :state_id => 11, :metropoly_id => 1},
                        { :id => 1165, :name => 'Tepetlaoxtoc', :state_id => 11, :metropoly_id => 1},
                        { :id => 1166, :name => 'Tepetlixpa', :state_id => 11, :metropoly_id => 1},
                        { :id => 1167, :name => 'Tepotzotlán', :state_id => 11, :metropoly_id => 1},
                        { :id => 1168, :name => 'Tequixquiac', :state_id => 11, :metropoly_id => 1},
                        { :id => 1169, :name => 'Texcoco', :state_id => 11, :metropoly_id => 1},
                        { :id => 1170, :name => 'Tezoyuca', :state_id => 11, :metropoly_id => 1},
                        { :id => 1171, :name => 'Tlalmanalco', :state_id => 11, :metropoly_id => 1},
                        { :id => 1172, :name => 'Tlalnepantla de Baz', :state_id => 11, :metropoly_id => 1},
                        { :id => 1173, :name => 'Tonanitla', :state_id => 11, :metropoly_id => 1},
                        { :id => 1174, :name => 'Tultepec', :state_id => 11, :metropoly_id => 1},
                        { :id => 1175, :name => 'Tultitlán', :state_id => 11, :metropoly_id => 1},
                        { :id => 1176, :name => 'Villa del Carbón', :state_id => 11, :metropoly_id => 1},
                        { :id => 1177, :name => 'Zumpango', :state_id => 11, :metropoly_id => 1},
                        { :id => 1178, :name => 'Cuautitlán Izcalli', :state_id => 11, :metropoly_id => 1},
                        { :id => 1179, :name => 'Valle de Chalco Solidaridad', :state_id => 11, :metropoly_id => 1},

                        
                        #Guanajuato
                        { :id => 1210, :name => 'Celaya', :state_id => 12},
                        { :id => 1220, :name => 'Guanajuato', :state_id => 12},
                        { :id => 1230, :name => 'Irapuato', :state_id => 12},
                        { :id => 1240, :name => 'León', :state_id => 12},
                        { :id => 1250, :name => 'Salamanca', :state_id => 12},
                        { :id => 1260, :name => 'San Miguel de Allende', :state_id => 12},
                         
                        #Guerrero
                        { :id => 1310, :name => 'Acapulco', :state_id => 13},
                        { :id => 1320, :name => 'Chilpancingo', :state_id => 13},
                        { :id => 1330, :name => 'Iguala', :state_id => 13},
                        { :id => 1340, :name => 'Taxco', :state_id => 13},
                        { :id => 1350, :name => 'Zihuatanejo', :state_id => 13},
                        
                        #Hidalgo
                        { :id => 1410, :name => 'Pachuca', :state_id => 14},
                        { :id => 1420, :name => 'Tizayuca', :state_id => 14, :metropoly_id => 1},
                        { :id => 1430, :name => 'Tula', :state_id => 14},
                        { :id => 1440, :name => 'Ciudad Sahagún', :state_id => 14},
                        { :id => 1450, :name => 'Huejutla de Reyes', :state_id => 14},
                        
                        #Jalisco
                        { :id => 1510, :name => 'Guadalajara', :state_id => 15, :metropoly_id => 2},
                        { :id => 1515, :name => 'Tlajomulco de Zúñiga', :state_id => 15, :metropoly_id => 2},
                        { :id => 1520, :name => 'Tlaquepaque', :state_id => 15, :metropoly_id => 2},
                        { :id => 1525, :name => 'Tonalá', :state_id => 15, :metropoly_id => 2},
                        { :id => 1530, :name => 'Zapopan', :state_id => 15, :metropoly_id => 2},
                        { :id => 1535, :name => 'Arandas', :state_id => 15},
                        { :id => 1540, :name => 'Autlán', :state_id => 15},
                        { :id => 1545, :name => 'Chapala', :state_id => 15},
                        { :id => 1550, :name => 'Ciudad Guzmán', :state_id => 15},
                        { :id => 1555, :name => 'El Salto', :state_id => 15, :metropoly_id => 2},
                        { :id => 1560, :name => 'Lagos de Moreno', :state_id => 15},
                        { :id => 1565, :name => 'Ocotlán', :state_id => 15},
                        { :id => 1570, :name => 'Puerto Vallarta', :state_id => 15, :metropoly_id => 4},
                        { :id => 1575, :name => 'Tala', :state_id => 15},
                        { :id => 1580, :name => 'Tepatitlán', :state_id => 15},

                        # Michoacan

                        { :id => 1610, :name => 'Morelia', :state_id => 16},
                        { :id => 1620, :name => 'Apatzingán', :state_id => 16},
                        { :id => 1630, :name => 'La Piedad', :state_id => 16},
                        { :id => 1640, :name => 'Uruapan', :state_id => 16},
                        { :id => 1650, :name => 'Zamora', :state_id => 16},
                        
                        #Morelos
                        { :id => 1710, :name => 'Cuautla', :state_id => 17},
                        { :id => 1720, :name => 'Cuernavaca', :state_id => 17},
                        { :id => 1730, :name => 'Jiutepec', :state_id => 17},
                        { :id => 1740, :name => 'Temixco', :state_id => 17},
                        { :id => 1750, :name => 'Yautepec', :state_id => 17},

                        #Nayarit
                        { :id => 1810, :name => 'Tepic', :state_id => 18},
                        { :id => 1820, :name => 'Nuevo Vallarta', :state_id => 18, :metropoly_id => 4},
                        { :id => 1830, :name => 'Ixtlán del Río', :state_id => 18},
                        { :id => 1840, :name => 'Tuxpan', :state_id => 18},
                        { :id => 1850, :name => 'Xalisco', :state_id => 18},
                        
                        # Nuevo León
                        { :id => 1910, :name => 'Monterrey', :state_id => 19, :metropoly_id => 3},
                        { :id => 1915, :name => 'Apodaca', :state_id => 19, :metropoly_id => 3},
                        { :id => 1920, :name => 'García', :state_id => 19, :metropoly_id => 3},
                        { :id => 1925, :name => 'General Escobedo', :state_id => 19, :metropoly_id => 3},
                        { :id => 1930, :name => 'Guadalupe', :state_id => 19, :metropoly_id => 3},
                        { :id => 1935, :name => 'Juárez', :state_id => 19, :metropoly_id => 3},
                        { :id => 1940, :name => 'Linares', :state_id => 19},
                        { :id => 1945, :name => 'Montemorelos', :state_id => 19},
                        { :id => 1950, :name => 'San Nicolás de los Garza', :state_id => 19, :metropoly_id => 3},
                        { :id => 1955, :name => 'San Pedro Garza García', :state_id => 19, :metropoly_id => 3},
                        { :id => 1960, :name => 'Santa Catarina', :state_id => 19, :metropoly_id => 3},
                        { :id => 1965, :name => 'Cadereyta Jiménez', :state_id => 19, :metropoly_id => 3},
                        { :id => 1970, :name => 'Santiago', :state_id => 19, :metropoly_id => 3},
                        { :id => 1975, :name => 'Salinas Victoria', :state_id => 19, :metropoly_id => 3},

                        
                        #Oaxaca
                        { :id => 2010, :name => 'Oaxaca', :state_id => 20},
                        { :id => 2020, :name => 'Juchitlán', :state_id => 20},
                        { :id => 2030, :name => 'Salina Cruz', :state_id => 20},
                        { :id => 2040, :name => 'Santa Cruz Jojocotlán', :state_id => 20},
                        { :id => 2050, :name => 'Tuxtepec', :state_id => 20},
                        
                        #Puebla
                        { :id => 2110, :name => 'Puebla', :state_id => 21},
                        { :id => 2120, :name => 'Tehuacán', :state_id => 21},
                        { :id => 2130, :name => 'Atlixco', :state_id => 21},
                        { :id => 2140, :name => 'Cholula', :state_id => 21},
                        { :id => 2150, :name => 'San Martín Texmelucan', :state_id => 21},
                        
                        #Querétaro
                        { :id => 2210, :name => 'Querétaro', :state_id => 22},
                        { :id => 2220, :name => 'San Juan del Río', :state_id => 22},
                        { :id => 2230, :name => 'Tequisquiapan', :state_id => 22},
                        { :id => 2240, :name => 'El Pueblito', :state_id => 22},
                        
                        #Quintana Roo
                        { :id => 2310, :name => 'Cancún', :state_id => 23},
                        { :id => 2320, :name => 'Chetumal', :state_id => 23},
                        { :id => 2330, :name => 'Playa del Carmen', :state_id => 23},
                        { :id => 2340, :name => 'Cozumel', :state_id => 23},
                        
                        # San Luis Potosí
                        { :id => 2410, :name => 'San Luis Potosí', :state_id => 24},
                        { :id => 2420, :name => 'Ciudad Valles', :state_id => 24},
                        { :id => 2430, :name => 'Matehuala', :state_id => 24},
                        { :id => 2440, :name => 'Soledad Díaz Gutierrez', :state_id => 24},
                        { :id => 2450, :name => 'Río Verde', :state_id => 24},

                        
                        #Sinaloa
                        { :id => 2510, :name => 'Culiacán', :state_id => 25},
                        { :id => 2520, :name => 'Escuinapa', :state_id => 25},
                        { :id => 2530, :name => 'Guasave', :state_id => 25},
                        { :id => 2540, :name => 'Guamuchil', :state_id => 25},
                        { :id => 2550, :name => 'Los Mochis', :state_id => 25},
                        { :id => 2560, :name => 'Mazatlán', :state_id => 25},
                        { :id => 2570, :name => 'Rosario', :state_id => 25},
                        { :id => 2580, :name => 'Sinaloa de Leyva', :state_id => 25},
                        { :id => 2590, :name => 'Estación Bamoa', :state_id => 25},
                        
                        #Sonora
                        { :id => 2610, :name => 'Ciudad Obregón', :state_id => 26},
                        { :id => 2620, :name => 'Guaymas', :state_id => 26},
                        { :id => 2630, :name => 'Hermosillo', :state_id => 26},
                        { :id => 2640, :name => 'Navojoa', :state_id => 26},
                        { :id => 2650, :name => 'Nogales', :state_id => 26},
                        { :id => 2660, :name => 'San Luis Río Colorado', :state_id => 26},
                        
                        #Tabasco
                        { :id => 2710, :name => 'Cárdenas', :state_id => 27},
                        { :id => 2720, :name => 'Comalcalco', :state_id => 27},
                        { :id => 2730, :name => 'Pino Suárez', :state_id => 27},
                        { :id => 2740, :name => 'Villahermosa', :state_id => 27},
                        
                        #Tamaulipas
                        { :id => 2810, :name => 'Ciudad Victoria', :state_id => 28},
                        { :id => 2820, :name => 'Matamoros', :state_id => 28},
                        { :id => 2830, :name => 'Nuevo Laredo', :state_id => 28},
                        { :id => 2840, :name => 'Reynosa', :state_id => 28},
                        { :id => 2850, :name => 'Tampico', :state_id => 28},
                        
                        #Tlaxcala
                        { :id => 2910, :name => 'Apizaco', :state_id => 29},
                        { :id => 2920, :name => 'Chiautempan', :state_id => 29},
                        { :id => 2930, :name => 'Huamantla', :state_id => 29},
                        { :id => 2940, :name => 'Tlaxcala', :state_id => 29},
                        { :id => 2950, :name => 'Vicente Guerrero', :state_id => 29},
                        
                        #Veracruz
                        { :id => 3010, :name => 'Boca del Río', :state_id => 30},
                        { :id => 3020, :name => 'Coatzacoalcos', :state_id => 30},
                        { :id => 3030, :name => 'Córdoba', :state_id => 30},
                        { :id => 3040, :name => 'Orizaba', :state_id => 30},
                        { :id => 3050, :name => 'Poza Rica', :state_id => 30},
                        { :id => 3060, :name => 'Veracruz', :state_id => 30},
                        { :id => 3070, :name => 'Xalapa', :state_id => 30},
                        
                        #Yucatán
                        { :id => 3110, :name => 'Mérida', :state_id => 31},
                        { :id => 3120, :name => 'Kanasín', :state_id => 31},
                        { :id => 3130, :name => 'Progreso', :state_id => 31},
                        { :id => 3140, :name => 'Tizimín', :state_id => 31},
                        { :id => 3150, :name => 'Valladolid', :state_id => 31},
                        
                        # Zacatecas
                        { :id => 3210, :name => 'Zacatecas', :state_id => 32},
                        { :id => 3220, :name => 'Jérez de García Salinas', :state_id => 32},
                        { :id => 3230, :name => 'Fresnillo', :state_id => 32},
                        { :id => 3240, :name => 'Guadalupe', :state_id => 32}

                      ])

Metropoly.create_or_update([
                            { :id => 1, :name => 'Ciudad de México'},
                            { :id => 2, :name => 'Guadalajara'},
                            { :id => 3, :name => 'Monterrey'},
                            { :id => 4, :name => 'Vallarta'}
                           ])




###########################################


CityMapper.create_or_update([
                        # Aguascalientes
                             { :id => 110, :city_id => 110, :anumex_id => 110},
                             { :id => 120, :city_id => 120, :anumex_id => nil},
                             { :id => 130, :city_id => 130, :anumex_id => nil},
                             { :id => 140, :city_id => 140, :anumex_id => nil},
                        
                        #Baja California Norte
                             { :id => 210, :city_id => 210, :anumex_id => 210},
                             { :id => 220, :city_id => 220, :anumex_id => 220},
                             { :id => 230, :city_id => 230, :anumex_id => 230},
                             { :id => 240, :city_id => 240, :anumex_id => nil},
                             { :id => 250, :city_id => 250, :anumex_id => nil},
                        
                        #Baja California Sur
                             { :id => 310, :city_id => 310, :anumex_id => 310},
                             { :id => 320, :city_id => 320, :anumex_id => 320},
                             { :id => 330, :city_id => 330, :anumex_id => nil},
                             { :id => 340, :city_id => 340, :anumex_id => nil},
                        
                        #Campeche
                             { :id => 410, :city_id => 410, :anumex_id => 410},
                             { :id => 420, :city_id => 420, :anumex_id => 420},
                             { :id => 430, :city_id => 430, :anumex_id => nil},
                             { :id => 440, :city_id => 440, :anumex_id => nil},
                        
                        #Chiapas
                             { :id => 510, :city_id => 510, :anumex_id => 510},
                             { :id => 520, :city_id => 520, :anumex_id => 520},
                             { :id => 530, :city_id => 530, :anumex_id => 530},
                             { :id => 540, :city_id => 540, :anumex_id => nil},
                             { :id => 550, :city_id => 550, :anumex_id => nil},
                             { :id => 560, :city_id => 560, :anumex_id => nil},
                        
                        #Chihuahua
                             { :id => 610, :city_id => 610, :anumex_id => 610},
                             { :id => 620, :city_id => 620, :anumex_id => 620},
                             { :id => 630, :city_id => 630, :anumex_id => nil},
                             { :id => 640, :city_id => 640, :anumex_id => nil},
                             { :id => 650, :city_id => 650, :anumex_id => nil},
                        
                        # Coahuila
                             { :id => 710, :city_id => 710, :anumex_id => 710},
                             { :id => 720, :city_id => 720, :anumex_id => 720},
                             { :id => 730, :city_id => 730, :anumex_id => 730},
                             { :id => 740, :city_id => 740, :anumex_id => 740},
                             { :id => 750, :city_id => 750, :anumex_id => 750},
                             { :id => 760, :city_id => 760, :anumex_id => 760},
                        
                        #Colima
                             { :id => 810, :city_id => 810, :anumex_id => 810},
                             { :id => 820, :city_id => 820, :anumex_id => 820},
                             { :id => 830, :city_id => 830, :anumex_id => nil},
                             { :id => 840, :city_id => 840, :anumex_id => nil},
                        
                        #Distrito Federal
                             { :id => 905, :city_id => 905, :anumex_id => 905},
                             { :id => 910, :city_id => 910, :anumex_id => 910},
                             { :id => 915, :city_id => 915, :anumex_id => 915},
                             { :id => 920, :city_id => 920, :anumex_id => 920},
                             { :id => 925, :city_id => 925, :anumex_id => 925},
                             { :id => 930, :city_id => 930, :anumex_id => 930},
                             { :id => 935, :city_id => 935, :anumex_id => 935},
                             { :id => 940, :city_id => 940, :anumex_id => 940},
                             { :id => 945, :city_id => 945, :anumex_id => 945},
                             { :id => 950, :city_id => 950, :anumex_id => 950},
                             { :id => 955, :city_id => 955, :anumex_id => 955},
                             { :id => 960, :city_id => 960, :anumex_id => 960},
                             { :id => 965, :city_id => 965, :anumex_id => 965},
                             { :id => 970, :city_id => 970, :anumex_id => 970},
                             { :id => 975, :city_id => 975, :anumex_id => 975},
                             { :id => 980, :city_id => 980, :anumex_id => 980},
                        
                        #Durango
                             { :id => 1010, :city_id => 1010, :anumex_id => 1010},
                             { :id => 1020, :city_id => 1020, :anumex_id => 120},
                             { :id => 1030, :city_id => 1030, :anumex_id => 130},
                             { :id => 1040, :city_id => 1040, :anumex_id => nil},
                             { :id => 1040, :city_id => 1040, :anumex_id => nil},
                        
                        # Estado de México
                             { :id => 1110, :city_id => 1110, :anumex_id => 1180},
                             { :id => 1121, :city_id => 1121, :anumex_id => nil},
                             { :id => 1122, :city_id => 1122, :anumex_id => nil},
                             { :id => 1123, :city_id => 1123, :anumex_id => nil},
                             { :id => 1124, :city_id => 1124, :anumex_id => nil},
                             { :id => 1125, :city_id => 1125, :anumex_id => 1110},
                             { :id => 1126, :city_id => 1126, :anumex_id => nil },
                             { :id => 1127, :city_id => 1127, :anumex_id => nil },
                             { :id => 1128, :city_id => 1128, :anumex_id => nil },
                             { :id => 1129, :city_id => 1129, :anumex_id => nil },
                             { :id => 1130, :city_id => 1130, :anumex_id => nil },
                             { :id => 1131, :city_id => 1131, :anumex_id => nil },
                             { :id => 1132, :city_id => 1132, :anumex_id => nil },
                             { :id => 1133, :city_id => 1133, :anumex_id => nil },
                             { :id => 1134, :city_id => 1134, :anumex_id => nil },
                             { :id => 1135, :city_id => 1135, :anumex_id => nil },
                             { :id => 1136, :city_id => 1136, :anumex_id => nil },
                             { :id => 1137, :city_id => 1137, :anumex_id => nil },
                             { :id => 1138, :city_id => 1138, :anumex_id => 1120},
                             { :id => 1139, :city_id => 1139, :anumex_id => nil },
                             { :id => 1140, :city_id => 1140, :anumex_id => nil },
                             { :id => 1141, :city_id => 1141, :anumex_id => nil },
                             { :id => 1142, :city_id => 1142, :anumex_id => nil },
                             { :id => 1143, :city_id => 1143, :anumex_id => nil },
                             { :id => 1144, :city_id => 1144, :anumex_id => 1130},
                             { :id => 1145, :city_id => 1145, :anumex_id => nil },
                             { :id => 1146, :city_id => 1146, :anumex_id => nil },
                             { :id => 1147, :city_id => 1147, :anumex_id => nil },
                             { :id => 1148, :city_id => 1148, :anumex_id => nil },
                             { :id => 1149, :city_id => 1149, :anumex_id => 1150},
                             { :id => 1150, :city_id => 1150, :anumex_id => 1160},
                             { :id => 1151, :city_id => 1151, :anumex_id => nil },
                             { :id => 1152, :city_id => 1152, :anumex_id => nil },
                             { :id => 1153, :city_id => 1153, :anumex_id => nil },
                             { :id => 1154, :city_id => 1154, :anumex_id => nil },
                             { :id => 1155, :city_id => 1155, :anumex_id => nil },
                             { :id => 1156, :city_id => 1156, :anumex_id => nil },
                             { :id => 1157, :city_id => 1157, :anumex_id => 1140},
                             { :id => 1158, :city_id => 1158, :anumex_id => nil },
                             { :id => 1159, :city_id => 1159, :anumex_id => nil },
                             { :id => 1160, :city_id => 1160, :anumex_id => nil },
                             { :id => 1161, :city_id => 1161, :anumex_id => nil },
                             { :id => 1162, :city_id => 1162, :anumex_id => nil },
                             { :id => 1163, :city_id => 1163, :anumex_id => nil },
                             { :id => 1164, :city_id => 1164, :anumex_id => nil },
                             { :id => 1165, :city_id => 1165, :anumex_id => nil },
                             { :id => 1166, :city_id => 1166, :anumex_id => nil },
                             { :id => 1167, :city_id => 1167, :anumex_id => nil },
                             { :id => 1168, :city_id => 1168, :anumex_id => nil },
                             { :id => 1169, :city_id => 1169, :anumex_id => nil },
                             { :id => 1170, :city_id => 1170, :anumex_id => nil },
                             { :id => 1171, :city_id => 1171, :anumex_id => nil },
                             { :id => 1172, :city_id => 1172, :anumex_id => 1170},
                             { :id => 1173, :city_id => 1173, :anumex_id => nil },
                             { :id => 1174, :city_id => 1174, :anumex_id => nil },
                             { :id => 1175, :city_id => 1175, :anumex_id => nil },
                             { :id => 1176, :city_id => 1176, :anumex_id => nil },
                             { :id => 1177, :city_id => 1177, :anumex_id => nil },
                             { :id => 1178, :city_id => 1178, :anumex_id => nil },
                             { :id => 1179, :city_id => 1179, :anumex_id => nil },

                        
                        #Guanajuato
                             { :id => 1210, :city_id => 1210, :anumex_id => 1210},
                             { :id => 1220, :city_id => 1220, :anumex_id => 1220},
                             { :id => 1230, :city_id => 1230, :anumex_id => 1230},
                             { :id => 1240, :city_id => 1240, :anumex_id => 1240},
                             { :id => 1250, :city_id => 1250, :anumex_id => 1250},
                             { :id => 1260, :city_id => 1260, :anumex_id => 1260},
                                                                                
                        #Guerrero                                               
                             { :id => 1310, :city_id => 1310, :anumex_id => 1310},
                             { :id => 1320, :city_id => 1320, :anumex_id => 1320},
                             { :id => 1330, :city_id => 1330, :anumex_id => nil },
                             { :id => 1340, :city_id => 1340, :anumex_id => nil },
                             { :id => 1350, :city_id => 1350, :anumex_id => nil },
                                                                                
                        #Hidalgo                                                
                             { :id => 1410, :city_id => 1410, :anumex_id => 1410},
                             { :id => 1420, :city_id => 1420, :anumex_id => 1420},
                             { :id => 1430, :city_id => 1430, :anumex_id => 1430},
                             { :id => 1440, :city_id => 1440, :anumex_id => nil },
                             { :id => 1450, :city_id => 1450, :anumex_id => nil },
                                                                                
                        #Jalisco                                                
                             { :id => 1510, :city_id => 1510, :anumex_id => 1510},
                             { :id => 1515, :city_id => 1515, :anumex_id => 1540},
                             { :id => 1520, :city_id => 1520, :anumex_id => 1550},
                             { :id => 1525, :city_id => 1525, :anumex_id => 1560},
                             { :id => 1530, :city_id => 1530, :anumex_id => 1570},
                             { :id => 1535, :city_id => 1535, :anumex_id => nil },
                             { :id => 1540, :city_id => 1540, :anumex_id => nil },
                             { :id => 1545, :city_id => 1545, :anumex_id => nil },
                             { :id => 1550, :city_id => 1550, :anumex_id => nil },
                             { :id => 1555, :city_id => 1555, :anumex_id => 1580},
                             { :id => 1560, :city_id => 1560, :anumex_id => nil },
                             { :id => 1565, :city_id => 1565, :anumex_id => nil },
                             { :id => 1570, :city_id => 1570, :anumex_id => 1590},
                             { :id => 1575, :city_id => 1575, :anumex_id => nil },
                             { :id => 1580, :city_id => 1580, :anumex_id => nil },

                        # Michoacan

                             { :id => 1610, :city_id => 1610, :anumex_id => 1610},
                             { :id => 1620, :city_id => 1620, :anumex_id => nil },
                             { :id => 1630, :city_id => 1630, :anumex_id => nil },
                             { :id => 1640, :city_id => 1640, :anumex_id => 1620},
                             { :id => 1650, :city_id => 1650, :anumex_id => 1630},
                                                                                
                        #Morelos                                                
                             { :id => 1710, :city_id => 1710, :anumex_id => 1710},
                             { :id => 1720, :city_id => 1720, :anumex_id => 1720},
                             { :id => 1730, :city_id => 1730, :anumex_id => 1730},
                             { :id => 1740, :city_id => 1740, :anumex_id => 1740},
                             { :id => 1750, :city_id => 1750, :anumex_id => 1750},
                                                                                
                        #Nayarit                                                
                             { :id => 1810, :city_id => 1810, :anumex_id => 1810},
                             { :id => 1820, :city_id => 1820, :anumex_id => 1820},
                             { :id => 1830, :city_id => 1830, :anumex_id => nil },
                             { :id => 1840, :city_id => 1840, :anumex_id => nil },
                             { :id => 1850, :city_id => 1850, :anumex_id => nil },
                                                                                
                        # Nuevo León                                            
                             { :id => 1910, :city_id => 1910, :anumex_id => 1940},
                             { :id => 1915, :city_id => 1915, :anumex_id => 1910},
                             { :id => 1920, :city_id => 1920, :anumex_id => nil },
                             { :id => 1925, :city_id => 1925, :anumex_id => 1920},
                             { :id => 1930, :city_id => 1930, :anumex_id => 1930},
                             { :id => 1935, :city_id => 1935, :anumex_id => nil },
                             { :id => 1940, :city_id => 1940, :anumex_id => nil },
                             { :id => 1945, :city_id => 1945, :anumex_id => nil },
                             { :id => 1950, :city_id => 1950, :anumex_id => 1950},
                             { :id => 1955, :city_id => 1955, :anumex_id => 1960},
                             { :id => 1960, :city_id => 1960, :anumex_id => 1970},
                             { :id => 1965, :city_id => 1965, :anumex_id => nil },
                             { :id => 1970, :city_id => 1970, :anumex_id => nil },
                             { :id => 1975, :city_id => 1975, :anumex_id => nil },
                                                                                
                        #Oaxaca                                                 
                             { :id => 2010, :city_id => 2010, :anumex_id => 2010},
                             { :id => 2020, :city_id => 2020, :anumex_id => nil },
                             { :id => 2030, :city_id => 2030, :anumex_id => nil },
                             { :id => 2040, :city_id => 2040, :anumex_id => nil },
                             { :id => 2050, :city_id => 2050, :anumex_id => nil },
                                                                                
                        #Puebla                                                 
                             { :id => 2110, :city_id => 2110, :anumex_id => 2110},
                             { :id => 2120, :city_id => 2120, :anumex_id => 2120},
                             { :id => 2130, :city_id => 2130, :anumex_id => nil },
                             { :id => 2140, :city_id => 2140, :anumex_id => nil },
                             { :id => 2150, :city_id => 2150, :anumex_id => nil },
                                                                                
                        #Querétaro                                              
                             { :id => 2210, :city_id => 2210, :anumex_id => 2210},
                             { :id => 2220, :city_id => 2220, :anumex_id => 2220},
                             { :id => 2230, :city_id => 2230, :anumex_id => 2230},
                             { :id => 2240, :city_id => 2240, :anumex_id => nil },
                                                                                
                        #Quintana Roo                                           
                             { :id => 2310, :city_id => 2310, :anumex_id => 2310},
                             { :id => 2320, :city_id => 2320, :anumex_id => 2320},
                             { :id => 2330, :city_id => 2330, :anumex_id => 2330},
                             { :id => 2340, :city_id => 2340, :anumex_id => nil },
                                                                                
                        # San Luis Potosí                                       
                             { :id => 2410, :city_id => 2410, :anumex_id => 2430},
                             { :id => 2420, :city_id => 2420, :anumex_id => 2410},
                             { :id => 2430, :city_id => 2430, :anumex_id => 2420},
                             { :id => 2440, :city_id => 2440, :anumex_id => nil },
                             { :id => 2450, :city_id => 2450, :anumex_id => nil },
                                                                                
                        #Sinaloa                                                
                             { :id => 2510, :city_id => 2510, :anumex_id => 2510},
                             { :id => 2520, :city_id => 2520, :anumex_id => nil },
                             { :id => 2530, :city_id => 2530, :anumex_id => nil },
                             { :id => 2540, :city_id => 2540, :anumex_id => nil },
                             { :id => 2550, :city_id => 2550, :anumex_id => 2530},
                             { :id => 2560, :city_id => 2560, :anumex_id => 2540},
                             { :id => 2570, :city_id => 2570, :anumex_id => 2550},
                             { :id => 2580, :city_id => 2580, :anumex_id => 2560},
                             { :id => 2590, :city_id => 2590, :anumex_id => nil },
                                                                                
                        #Sonora                                                 
                             { :id => 2610, :city_id => 2610, :anumex_id => 2610},
                             { :id => 2620, :city_id => 2620, :anumex_id => 2620},
                             { :id => 2630, :city_id => 2630, :anumex_id => 2630},
                             { :id => 2640, :city_id => 2640, :anumex_id => nil },
                             { :id => 2650, :city_id => 2650, :anumex_id => nil },
                             { :id => 2660, :city_id => 2660, :anumex_id => nil },
                                                                                
                        #Tabasco                                                
                             { :id => 2710, :city_id => 2710, :anumex_id => 2710},
                             { :id => 2720, :city_id => 2720, :anumex_id => 2720},
                             { :id => 2730, :city_id => 2730, :anumex_id => nil },
                             { :id => 2740, :city_id => 2740, :anumex_id => 2730},
                                                                                
                        #Tamaulipas                                             
                             { :id => 2810, :city_id => 2810, :anumex_id => 2810},
                             { :id => 2820, :city_id => 2820, :anumex_id => 2820},
                             { :id => 2830, :city_id => 2830, :anumex_id => 2830},
                             { :id => 2840, :city_id => 2840, :anumex_id => 2840},
                             { :id => 2850, :city_id => 2850, :anumex_id => 2850},
                                                                                
                        #Tlaxcala                                               
                             { :id => 2910, :city_id => 2910, :anumex_id => 2910},
                             { :id => 2920, :city_id => 2920, :anumex_id => 2910},
                             { :id => 2930, :city_id => 2930, :anumex_id => 2930},
                             { :id => 2940, :city_id => 2940, :anumex_id => 2940},
                             { :id => 2950, :city_id => 2950, :anumex_id => nil },
                                                                                
                        #Veracruz                                               
                             { :id => 3010, :city_id => 3010, :anumex_id => 3010},
                             { :id => 3020, :city_id => 3020, :anumex_id => 3020},
                             { :id => 3030, :city_id => 3030, :anumex_id => 3030},
                             { :id => 3040, :city_id => 3040, :anumex_id => 3040},
                             { :id => 3050, :city_id => 3050, :anumex_id => 3050},
                             { :id => 3060, :city_id => 3060, :anumex_id => 3060},
                             { :id => 3070, :city_id => 3070, :anumex_id => 3070},
                                                                                
                        #Yucatán                                                
                             { :id => 3110, :city_id => 3110, :anumex_id => 3110},
                             { :id => 3120, :city_id => 3120, :anumex_id => nil },
                             { :id => 3130, :city_id => 3130, :anumex_id => 3120},
                             { :id => 3140, :city_id => 3140, :anumex_id => 3130},
                             { :id => 3150, :city_id => 3150, :anumex_id => 3140},
                                                                                
                        # Zacatecas                                             
                             { :id => 3210, :city_id => 3210, :anumex_id => 3230},
                             { :id => 3220, :city_id => 3220, :anumex_id => nil },
                             { :id => 3230, :city_id => 3230, :anumex_id => 3210},
                             { :id => 3240, :city_id => 3240, :anumex_id => 3220}
                      ])


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

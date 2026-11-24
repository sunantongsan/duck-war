"use strict";
var ART={"buildings":{"hq":{"stages":[{"file":"b_hq_1.webp","ax":244.0,"ay":222.4,"ppu":120.084,"w":564,"h":461},{"file":"b_hq_2.webp","ax":188.0,"ay":241.4,"ppu":90.311,"w":508,"h":480},{"file":"b_hq_3.webp","ax":236.0,"ay":332.4,"ppu":110.16,"w":556,"h":571},{"file":"b_hq_4.webp","ax":213.0,"ay":346.4,"ppu":103.461,"w":533,"h":585},{"file":"b_hq_5.webp","ax":279.0,"ay":401.4,"ppu":134.226,"w":599,"h":640}],"rubble":{"file":"b_hq_rubble.webp","ax":190.0,"ay":128.4,"ppu":110.16,"w":396,"h":271}},"barracks":{"stages":[{"file":"b_barracks_1.webp","ax":99.0,"ay":149.4,"ppu":72.199,"w":244,"h":206},{"file":"b_barracks_2.webp","ax":93.0,"ay":219.4,"ppu":80.387,"w":285,"h":282},{"file":"b_barracks_3.webp","ax":93.0,"ay":232.4,"ppu":80.387,"w":285,"h":295},{"file":"b_barracks_4.webp","ax":93.0,"ay":246.4,"ppu":80.759,"w":285,"h":344},{"file":"b_barracks_5.webp","ax":112.0,"ay":259.4,"ppu":97.506,"w":304,"h":357}],"rubble":{"file":"b_barracks_rubble.webp","ax":94.0,"ay":113.4,"ppu":80.387,"w":203,"h":176}},"workshop":{"stages":[{"file":"b_workshop_1.webp","ax":97.0,"ay":193.4,"ppu":72.571,"w":289,"h":291},{"file":"b_workshop_2.webp","ax":102.0,"ay":209.4,"ppu":75.177,"w":294,"h":308},{"file":"b_workshop_3.webp","ax":105.0,"ay":232.4,"ppu":77.782,"w":297,"h":331},{"file":"b_workshop_4.webp","ax":113.0,"ay":238.4,"ppu":86.341,"w":305,"h":337},{"file":"b_workshop_5.webp","ax":114.0,"ay":285.4,"ppu":86.341,"w":306,"h":384}],"rubble":{"file":"b_workshop_rubble.webp","ax":95.0,"ay":112.4,"ppu":77.782,"w":214,"h":173}},"honeypump":{"stages":[{"file":"b_honeypump_1.webp","ax":73.0,"ay":131.4,"ppu":50.242,"w":240,"h":171},{"file":"b_honeypump_2.webp","ax":68.0,"ay":138.4,"ppu":51.358,"w":236,"h":179},{"file":"b_honeypump_3.webp","ax":68.0,"ay":156.4,"ppu":52.103,"w":260,"h":206},{"file":"b_honeypump_4.webp","ax":69.0,"ay":192.4,"ppu":59.918,"w":261,"h":243},{"file":"b_honeypump_5.webp","ax":95.0,"ay":192.4,"ppu":82.62,"w":287,"h":290}],"rubble":{"file":"b_honeypump_rubble.webp","ax":102.0,"ay":113.4,"ppu":52.103,"w":206,"h":154}},"veggieblender":{"stages":[{"file":"b_veggieblender_1.webp","ax":131.0,"ay":285.4,"ppu":96.762,"w":323,"h":361},{"file":"b_veggieblender_2.webp","ax":131.0,"ay":285.4,"ppu":96.762,"w":323,"h":361},{"file":"b_veggieblender_3.webp","ax":131.0,"ay":185.4,"ppu":96.762,"w":323,"h":261},{"file":"b_veggieblender_4.webp","ax":131.0,"ay":190.4,"ppu":96.762,"w":323,"h":266},{"file":"b_veggieblender_5.webp","ax":132.0,"ay":210.4,"ppu":104.577,"w":324,"h":292}],"rubble":{"file":"b_veggieblender_rubble.webp","ax":112.0,"ay":113.4,"ppu":96.762,"w":224,"h":189}},"syrupstove":{"stages":[{"file":"b_syrupstove_1.webp","ax":48.0,"ay":133.4,"ppu":41.379,"w":202,"h":184},{"file":"b_syrupstove_2.webp","ax":112.0,"ay":138.4,"ppu":54.708,"w":284,"h":188},{"file":"b_syrupstove_3.webp","ax":112.0,"ay":155.4,"ppu":63.267,"w":304,"h":205},{"file":"b_syrupstove_4.webp","ax":112.0,"ay":166.4,"ppu":72.944,"w":304,"h":264},{"file":"b_syrupstove_5.webp","ax":112.0,"ay":197.4,"ppu":97.134,"w":304,"h":295}],"rubble":{"file":"b_syrupstove_rubble.webp","ax":94.0,"ay":112.4,"ppu":63.267,"w":211,"h":162}},"honeyjar":{"stages":[{"file":"b_honeyjar_1.webp","ax":60.0,"ay":137.4,"ppu":43.171,"w":252,"h":171},{"file":"b_honeyjar_2.webp","ax":66.0,"ay":155.4,"ppu":47.637,"w":258,"h":199},{"file":"b_honeyjar_3.webp","ax":70.0,"ay":173.4,"ppu":51.358,"w":262,"h":271},{"file":"b_honeyjar_4.webp","ax":94.0,"ay":191.4,"ppu":68.106,"w":286,"h":289},{"file":"b_honeyjar_5.webp","ax":113.0,"ay":209.4,"ppu":97.878,"w":305,"h":308}],"rubble":{"file":"b_honeyjar_rubble.webp","ax":94.0,"ay":124.4,"ppu":51.358,"w":198,"h":165}},"veggiejar":{"stages":[{"file":"b_veggiejar_1.webp","ax":60.0,"ay":137.4,"ppu":43.171,"w":252,"h":171},{"file":"b_veggiejar_2.webp","ax":67.0,"ay":155.4,"ppu":47.637,"w":259,"h":200},{"file":"b_veggiejar_3.webp","ax":70.0,"ay":173.4,"ppu":51.358,"w":262,"h":271},{"file":"b_veggiejar_4.webp","ax":95.0,"ay":191.4,"ppu":68.106,"w":287,"h":289},{"file":"b_veggiejar_5.webp","ax":113.0,"ay":209.4,"ppu":97.878,"w":305,"h":308}],"rubble":{"file":"b_veggiejar_rubble.webp","ax":96.0,"ay":124.4,"ppu":51.358,"w":200,"h":165}},"syrupjar":{"stages":[{"file":"b_syrupjar_1.webp","ax":60.0,"ay":137.4,"ppu":43.171,"w":252,"h":171},{"file":"b_syrupjar_2.webp","ax":67.0,"ay":155.4,"ppu":47.637,"w":259,"h":200},{"file":"b_syrupjar_3.webp","ax":70.0,"ay":173.4,"ppu":51.358,"w":262,"h":271},{"file":"b_syrupjar_4.webp","ax":101.0,"ay":191.4,"ppu":68.106,"w":293,"h":289},{"file":"b_syrupjar_5.webp","ax":113.0,"ay":209.4,"ppu":97.878,"w":305,"h":308}],"rubble":{"file":"b_syrupjar_rubble.webp","ax":98.0,"ay":124.4,"ppu":51.358,"w":202,"h":165}},"camp":{"stages":[{"file":"b_camp_1.webp","ax":270.5,"ay":357.1,"ppu":67.237,"w":542,"h":543},{"file":"b_camp_2.webp","ax":270.5,"ay":357.1,"ppu":67.237,"w":542,"h":543},{"file":"b_camp_3.webp","ax":270.5,"ay":357.1,"ppu":67.237,"w":542,"h":543},{"file":"b_camp_4.webp","ax":221.5,"ay":357.1,"ppu":67.237,"w":493,"h":543},{"file":"b_camp_5.webp","ax":221.5,"ay":357.1,"ppu":67.237,"w":493,"h":543}],"rubble":{"file":"b_camp_rubble.webp","ax":270.5,"ay":356.1,"ppu":67.237,"w":542,"h":542}},"airfield":{"stages":[{"file":"b_airfield_1.webp","ax":183.5,"ay":379.2,"ppu":59.918,"w":415,"h":463},{"file":"b_airfield_2.webp","ax":229.5,"ay":379.2,"ppu":64.384,"w":461,"h":463},{"file":"b_airfield_3.webp","ax":229.5,"ay":379.2,"ppu":71.827,"w":461,"h":463},{"file":"b_airfield_4.webp","ax":229.5,"ay":379.2,"ppu":79.27,"w":461,"h":463},{"file":"b_airfield_5.webp","ax":229.5,"ay":379.2,"ppu":86.341,"w":461,"h":463}],"rubble":{"file":"b_airfield_rubble.webp","ax":230.5,"ay":378.2,"ppu":71.827,"w":462,"h":462}},"lab":{"stages":[{"file":"b_lab_1.webp","ax":67.0,"ay":123.4,"ppu":48.009,"w":207,"h":161},{"file":"b_lab_2.webp","ax":101.0,"ay":211.4,"ppu":78.898,"w":293,"h":273},{"file":"b_lab_3.webp","ax":107.0,"ay":221.4,"ppu":79.27,"w":299,"h":320},{"file":"b_lab_4.webp","ax":117.0,"ay":234.4,"ppu":84.481,"w":309,"h":333},{"file":"b_lab_5.webp","ax":116.0,"ay":229.4,"ppu":97.878,"w":308,"h":306}],"rubble":{"file":"b_lab_rubble.webp","ax":95.0,"ay":112.4,"ppu":79.27,"w":207,"h":175}},"pantry":{"stages":[{"file":"b_pantry_1.webp","ax":113.0,"ay":162.4,"ppu":70.711,"w":305,"h":260},{"file":"b_pantry_2.webp","ax":118.0,"ay":224.4,"ppu":90.807,"w":310,"h":322},{"file":"b_pantry_3.webp","ax":119.0,"ay":237.4,"ppu":90.807,"w":311,"h":336},{"file":"b_pantry_4.webp","ax":120.0,"ay":285.4,"ppu":90.807,"w":312,"h":384},{"file":"b_pantry_5.webp","ax":120.0,"ay":275.4,"ppu":98.251,"w":312,"h":373}],"rubble":{"file":"b_pantry_rubble.webp","ax":105.0,"ay":123.4,"ppu":90.807,"w":210,"h":194}},"hero":{"stages":[{"file":"b_hero_1.webp","ax":89.0,"ay":198.6,"ppu":72.199,"w":301,"h":262},{"file":"b_hero_2.webp","ax":103.0,"ay":198.6,"ppu":82.992,"w":315,"h":277},{"file":"b_hero_3.webp","ax":107.0,"ay":333.6,"ppu":82.248,"w":319,"h":421},{"file":"b_hero_4.webp","ax":107.0,"ay":334.6,"ppu":82.248,"w":319,"h":422},{"file":"b_hero_5.webp","ax":126.0,"ay":334.6,"ppu":109.043,"w":338,"h":422}],"rubble":{"file":"b_hero_rubble.webp","ax":96.0,"ay":137.6,"ppu":82.248,"w":308,"h":202}}},"turrets":{"slingshot":{"stages":[{"file":"t_slingshot_1.webp","cell":192,"ax":96.0,"ay":165.9,"ppu":79.948,"tips":[[107.5,134.8],[102.0,138.5],[94.2,139.1],[88.8,137.9],[83.9,134.8],[80.9,131.2],[77.3,75.1],[70.0,101.6],[66.4,94.4],[67.6,85.3],[117.1,77.5],[123.2,85.3],[124.4,93.8],[121.4,102.8],[114.1,75.1],[110.5,130.6]],"fit":1.894,"band":{"dirs":[{"tips":[[91.9,112.5],[122.7,89.4]],"P":[76.8,94.0],"R":[101.7,100.9]},{"tips":[[82.0,109.8],[122.2,97.3]],"P":[85.6,89.6],"R":[99.1,102.2]},{"tips":[[74.3,104.5],[117.7,104.5]],"P":[96.0,88.0],"R":[96.0,102.7]},{"tips":[[69.8,97.3],[110.0,109.8]],"P":[106.4,89.6],"R":[92.9,102.2]},{"tips":[[69.3,89.4],[100.1,112.5]],"P":[115.2,94.0],"R":[90.3,100.9]},{"tips":[[72.9,82.0],[89.5,112.1]],"P":[121.1,100.6],"R":[88.6,99.0]},{"tips":[[80.0,76.2],[80.0,108.8]],"P":[123.2,108.4],"R":[88.0,96.7]},{"tips":[[89.5,72.8],[72.9,102.9]],"P":[121.1,116.2],"R":[88.6,94.4]},{"tips":[[100.1,72.5],[69.3,95.5]],"P":[115.2,122.9],"R":[90.3,92.5]},{"tips":[[110.0,75.1],[69.8,87.6]],"P":[106.4,127.3],"R":[92.9,91.2]},{"tips":[[117.7,80.5],[74.3,80.5]],"P":[96.0,128.8],"R":[96.0,90.7]},{"tips":[[122.2,87.6],[82.0,75.1]],"P":[85.6,127.3],"R":[99.1,91.2]},{"tips":[[122.7,95.5],[91.9,72.5]],"P":[76.8,122.9],"R":[101.7,92.5]},{"tips":[[119.1,102.9],[102.5,72.8]],"P":[70.9,116.2],"R":[103.4,94.4]},{"tips":[[112.0,108.8],[112.0,76.2]],"P":[68.8,108.4],"R":[104.0,96.7]},{"tips":[[102.5,112.1],[119.1,82.0]],"P":[70.9,100.6],"R":[103.4,99.0]}],"bw":3.2,"pw":6.56}},{"file":"t_slingshot_2.webp","cell":192,"ax":96.0,"ay":163.4,"ppu":78.955,"tips":[[108.5,131.5],[103.8,133.9],[94.2,135.7],[87.7,133.9],[82.3,130.3],[79.9,127.9],[75.7,66.5],[68.6,93.4],[63.8,85.0],[63.8,75.5],[120.4,66.5],[126.4,74.9],[127.6,85.0],[122.8,93.4],[115.7,66.5],[112.1,125.6]],"fit":1.756,"band":{"dirs":[{"tips":[[89.1,103.6],[125.2,76.5]],"P":[77.0,87.7],"R":[101.6,90.8]},{"tips":[[78.5,99.9],[125.6,85.3]],"P":[85.7,83.3],"R":[99.0,92.1]},{"tips":[[70.5,93.5],[121.5,93.5]],"P":[96.0,81.8],"R":[96.0,92.5]},{"tips":[[66.4,85.3],[113.5,99.9]],"P":[106.3,83.3],"R":[93.0,92.1]},{"tips":[[66.8,76.5],[102.9,103.6]],"P":[115.0,87.7],"R":[90.4,90.8]},{"tips":[[71.7,68.5],[91.2,103.9]],"P":[120.8,94.2],"R":[88.7,88.9]},{"tips":[[80.2,62.5],[80.2,100.8]],"P":[122.8,101.9],"R":[88.1,86.6]},{"tips":[[91.2,59.5],[71.7,94.8]],"P":[120.8,109.6],"R":[88.7,84.4]},{"tips":[[102.9,59.8],[66.8,86.8]],"P":[115.0,116.2],"R":[90.4,82.4]},{"tips":[[113.5,63.4],[66.4,78.0]],"P":[106.3,120.5],"R":[93.0,81.2]},{"tips":[[121.5,69.8],[70.5,69.8]],"P":[96.0,122.1],"R":[96.0,80.7]},{"tips":[[125.6,78.0],[78.5,63.4]],"P":[85.7,120.5],"R":[99.0,81.2]},{"tips":[[125.2,86.8],[89.1,59.8]],"P":[77.0,116.2],"R":[101.6,82.4]},{"tips":[[120.3,94.8],[100.8,59.5]],"P":[71.2,109.6],"R":[103.3,84.4]},{"tips":[[111.8,100.8],[111.8,62.5]],"P":[69.2,101.9],"R":[103.9,86.6]},{"tips":[[100.8,103.9],[120.3,68.5]],"P":[71.2,94.2],"R":[103.3,88.9]}],"bw":3.79,"pw":7.42}},{"file":"t_slingshot_3.webp","cell":192,"ax":96.0,"ay":163.8,"ppu":77.041,"tips":[[110.5,126.9],[104.1,131.6],[96.0,133.3],[87.3,131.6],[81.5,128.1],[75.1,115.3],[74.5,100.8],[66.3,86.8],[61.7,76.9],[61.1,67.0],[94.3,53.1],[130.3,67.0],[130.3,78.1],[125.1,86.8],[116.9,101.3],[116.4,115.3]],"fit":1.729,"band":{"dirs":[{"tips":[[86.5,96.1],[106.9,76.3],[127.3,65.5]],"P":[77.5,82.9],"R":[101.4,80.8]},{"tips":[[75.3,91.6],[101.9,78.8],[128.5,75.0]],"P":[86.0,78.6],"R":[98.9,82.1]},{"tips":[[67.2,84.2],[96.0,79.7],[124.8,84.2]],"P":[96.0,77.1],"R":[96.0,82.5]},{"tips":[[63.5,75.0],[90.1,78.8],[116.7,91.6]],"P":[106.0,78.6],"R":[93.1,82.1]},{"tips":[[64.7,65.5],[85.1,76.3],[105.5,96.1]],"P":[114.5,82.9],"R":[90.6,80.8]},{"tips":[[70.7,57.1],[81.8,72.5],[92.8,97.0]],"P":[120.2,89.2],"R":[88.9,78.9]},{"tips":[[80.6,51.0],[80.6,68.1],[80.6,94.2]],"P":[122.2,96.8],"R":[88.3,76.7]},{"tips":[[92.8,48.2],[81.8,63.7],[70.7,88.1]],"P":[120.2,104.3],"R":[88.9,74.5]},{"tips":[[105.5,49.1],[85.1,59.9],[64.7,79.7]],"P":[114.5,110.6],"R":[90.6,72.6]},{"tips":[[116.7,53.7],[90.1,57.4],[63.5,70.2]],"P":[106.0,114.9],"R":[93.1,71.4]},{"tips":[[124.8,61.0],[96.0,56.6],[67.2,61.0]],"P":[96.0,116.4],"R":[96.0,70.9]},{"tips":[[128.5,70.2],[101.9,57.4],[75.3,53.7]],"P":[86.0,114.9],"R":[98.9,71.4]},{"tips":[[127.3,79.7],[106.9,59.9],[86.5,49.1]],"P":[77.5,110.6],"R":[101.4,72.6]},{"tips":[[121.3,88.1],[110.2,63.7],[99.2,48.2]],"P":[71.8,104.3],"R":[103.1,74.5]},{"tips":[[111.4,94.2],[111.4,68.1],[111.4,51.0]],"P":[69.8,96.8],"R":[103.7,76.7]},{"tips":[[99.2,97.0],[110.2,72.5],[121.3,57.1]],"P":[71.8,89.2],"R":[103.1,78.9]}],"bw":4.31,"pw":8.17}},{"file":"t_slingshot_4.webp","cell":192,"ax":96.0,"ay":164.2,"ppu":66.207,"tips":[[109.0,132.5],[104.5,135.0],[95.0,137.0],[87.0,135.0],[82.5,132.5],[76.0,119.5],[75.5,105.0],[64.5,103.0],[55.0,92.0],[58.5,74.0],[80.5,61.5],[133.0,74.0],[137.0,92.0],[126.0,101.0],[116.0,105.5],[115.5,119.5]],"fit":1.491,"band":{"dirs":[{"tips":[[80.8,106.8],[97.2,92.4],[113.6,80.1],[129.9,70.0]],"P":[80.1,90.7],"R":[100.7,89.3]},{"tips":[[69.0,100.5],[90.4,91.7],[111.8,85.0],[133.2,80.6]],"P":[87.4,87.0],"R":[98.5,90.3]},{"tips":[[61.2,91.3],[84.4,89.1],[107.6,89.1],[130.8,91.3]],"P":[96.0,85.7],"R":[96.0,90.7]},{"tips":[[58.8,80.6],[80.2,85.0],[101.6,91.7],[123.0,100.5]],"P":[104.6,87.0],"R":[93.5,90.3]},{"tips":[[62.1,70.0],[78.4,80.1],[94.8,92.4],[111.2,106.8]],"P":[111.9,90.7],"R":[91.3,89.3]},{"tips":[[70.5,61.1],[79.3,75.0],[88.2,91.0],[97.1,109.3]],"P":[116.8,96.2],"R":[89.9,87.7]},{"tips":[[82.8,55.3],[82.8,70.5],[82.8,87.9],[82.8,107.5]],"P":[118.5,102.6],"R":[89.4,85.8]},{"tips":[[97.1,53.5],[88.2,67.4],[79.3,83.4],[70.5,101.7]],"P":[116.8,109.1],"R":[89.9,83.9]},{"tips":[[111.2,55.9],[94.8,66.0],[78.4,78.3],[62.1,92.8]],"P":[111.9,114.6],"R":[91.3,82.2]},{"tips":[[123.0,62.2],[101.6,66.7],[80.2,73.3],[58.8,82.2]],"P":[104.6,118.2],"R":[93.5,81.2]},{"tips":[[130.8,71.4],[107.6,69.3],[84.4,69.3],[61.2,71.4]],"P":[96.0,119.5],"R":[96.0,80.8]},{"tips":[[133.2,82.2],[111.8,73.3],[90.4,66.7],[69.0,62.2]],"P":[87.4,118.2],"R":[98.5,81.2]},{"tips":[[129.9,92.8],[113.6,78.3],[97.2,66.0],[80.8,55.9]],"P":[80.1,114.6],"R":[100.7,82.2]},{"tips":[[121.5,101.7],[112.7,83.4],[103.8,67.4],[94.9,53.5]],"P":[75.2,109.1],"R":[102.1,83.9]},{"tips":[[109.2,107.5],[109.2,87.9],[109.2,70.5],[109.2,55.3]],"P":[73.5,102.6],"R":[102.6,85.8]},{"tips":[[94.9,109.3],[103.8,91.0],[112.7,75.0],[121.5,61.1]],"P":[75.2,96.2],"R":[102.1,87.7]}],"bw":4.24,"pw":7.81}},{"file":"t_slingshot_5.webp","cell":192,"ax":96.0,"ay":161.2,"ppu":66.207,"tips":[[111.0,125.5],[106.5,128.5],[94.0,131.0],[85.0,128.5],[79.5,124.5],[74.0,112.5],[73.0,96.5],[62.5,91.0],[50.5,82.5],[88.5,41.5],[95.5,41.5],[103.0,42.0],[141.0,82.5],[128.5,90.0],[118.5,97.0],[117.5,112.0]],"fit":1.354,"band":{"dirs":[{"tips":[[77.8,96.5],[91.6,84.4],[105.4,67.3],[119.1,63.7],[132.9,55.3]],"P":[80.1,81.5],"R":[100.7,76.1]},{"tips":[[65.1,89.2],[83.1,81.8],[101.1,69.5],[119.1,70.6],[137.0,66.9]],"P":[87.4,77.9],"R":[98.5,77.1]},{"tips":[[57.1,78.8],[76.5,77.0],[96.0,70.2],[115.5,77.0],[134.9,78.8]],"P":[96.0,76.6],"R":[96.0,77.5]},{"tips":[[55.0,66.9],[72.9,70.6],[90.9,69.5],[108.9,81.8],[126.9,89.2]],"P":[104.6,77.9],"R":[93.5,77.1]},{"tips":[[59.1,55.3],[72.9,63.7],[86.6,67.3],[100.4,84.4],[114.2,96.5]],"P":[111.9,81.5],"R":[91.3,76.1]},{"tips":[[68.9,45.7],[76.3,57.4],[83.8,64.1],[91.2,84.3],[98.7,99.7]],"P":[116.8,87.0],"R":[89.9,74.5]},{"tips":[[82.8,39.7],[82.8,52.4],[82.8,60.3],[82.8,81.6],[82.8,98.1]],"P":[118.5,93.5],"R":[89.4,72.6]},{"tips":[[98.7,38.1],[91.2,49.7],[83.8,56.5],[76.3,76.7],[68.9,92.1]],"P":[116.8,99.9],"R":[89.9,70.7]},{"tips":[[114.2,41.2],[100.4,49.7],[86.6,53.3],[72.9,70.3],[59.1,82.5]],"P":[111.9,105.4],"R":[91.3,69.0]},{"tips":[[126.9,48.5],[108.9,52.3],[90.9,51.1],[72.9,63.4],[55.0,70.9]],"P":[104.6,109.1],"R":[93.5,68.0]},{"tips":[[134.9,58.9],[115.5,57.1],[96.0,50.4],[76.5,57.1],[57.1,58.9]],"P":[96.0,110.4],"R":[96.0,67.6]},{"tips":[[137.0,70.9],[119.1,63.4],[101.1,51.1],[83.1,52.3],[65.1,48.5]],"P":[87.4,109.1],"R":[98.5,68.0]},{"tips":[[132.9,82.5],[119.1,70.3],[105.4,53.3],[91.6,49.7],[77.8,41.2]],"P":[80.1,105.4],"R":[100.7,69.0]},{"tips":[[123.1,92.1],[115.7,76.7],[108.2,56.5],[100.8,49.7],[93.3,38.1]],"P":[75.2,99.9],"R":[102.1,70.7]},{"tips":[[109.2,98.1],[109.2,81.6],[109.2,60.3],[109.2,52.4],[109.2,39.7]],"P":[73.5,93.5],"R":[102.6,72.6]},{"tips":[[93.3,99.7],[100.8,84.3],[108.2,64.1],[115.7,57.4],[123.1,45.7]],"P":[75.2,87.0],"R":[102.1,74.5]}],"bw":4.77,"pw":8.61}}],"fit":1.894},"boxtower":{"stages":[{"file":"t_boxtower_1.webp","cell":192,"ax":96.0,"ay":168.4,"ppu":79.448,"tips":[[106.2,114.2],[101.4,120.8],[90.6,122.0],[90.0,120.8],[85.2,114.2],[79.2,102.8],[79.8,97.4],[79.2,99.2],[81.0,94.4],[85.8,90.8],[90.6,89.0],[105.6,90.8],[110.4,95.0],[112.2,99.2],[111.6,97.4],[112.2,102.2]],"fit":2.147},{"file":"t_boxtower_2.webp","cell":192,"ax":96.0,"ay":166.7,"ppu":66.207,"tips":[[104.0,107.0],[101.0,111.5],[92.0,113.0],[91.0,111.5],[87.5,107.0],[82.0,96.5],[82.5,92.0],[82.0,93.5],[83.5,90.0],[87.5,86.5],[92.0,85.0],[104.0,86.5],[108.0,90.0],[109.5,93.5],[109.0,92.0],[109.5,96.5]],"fit":2.147},{"file":"t_boxtower_3.webp","cell":192,"ax":96.0,"ay":142.7,"ppu":66.207,"tips":[[112.5,63.0],[110.5,71.5],[80.0,75.5],[80.0,71.0],[80.0,64.5],[78.0,52.5],[82.5,46.5],[77.5,64.5],[75.5,59.0],[76.5,53.0],[104.0,48.0],[115.0,53.0],[116.0,59.0],[114.0,64.5],[109.0,46.5],[112.0,57.0]],"fit":2.133},{"file":"t_boxtower_4.webp","cell":192,"ax":96.0,"ay":143.7,"ppu":66.207,"tips":[[111.5,59.0],[111.0,65.5],[80.0,70.0],[80.0,65.5],[80.0,59.0],[78.0,47.0],[82.5,41.0],[78.0,58.5],[75.5,53.5],[76.5,47.5],[104.0,42.5],[115.0,47.5],[116.0,53.0],[114.0,59.0],[109.0,41.0],[113.5,47.0]],"fit":1.746},{"file":"t_boxtower_5.webp","cell":192,"ax":96.0,"ay":143.2,"ppu":66.207,"tips":[[115.0,49.0],[115.0,57.5],[75.5,63.0],[76.0,57.0],[76.5,49.0],[76.0,36.0],[82.5,30.5],[76.0,54.5],[72.5,48.5],[72.5,41.5],[115.0,35.0],[119.0,41.5],[119.0,48.5],[115.5,55.0],[109.0,30.5],[115.5,36.0]],"fit":1.729}],"fit":2.147},"mortar":{"stages":[{"file":"t_mortar_1.webp","cell":192,"ax":96.0,"ay":160.0,"ppu":94.864,"tips":[[122.5,114.6],[115.3,121.7],[91.0,126.7],[75.9,121.7],[68.8,114.6],[66.6,109.6],[65.9,97.4],[65.9,97.4],[78.1,76.6],[82.4,73.0],[88.8,70.1],[108.9,73.0],[113.2,77.3],[125.4,97.4],[125.4,98.1],[125.4,107.4]],"fit":2.515},{"file":"t_mortar_2.webp","cell":192,"ax":96.0,"ay":163.0,"ppu":83.083,"tips":[[119.8,119.5],[113.6,125.1],[96.0,130.1],[77.8,125.1],[70.9,118.8],[68.4,112.6],[67.8,103.8],[69.6,96.9],[72.8,92.5],[74.7,85.6],[106.0,79.9],[118.0,86.2],[120.5,95.0],[123.6,103.2],[123.6,105.0],[122.4,114.5]],"fit":1.862},{"file":"t_mortar_3.webp","cell":192,"ax":96.0,"ay":165.7,"ppu":70.231,"tips":[[118.3,123.6],[111.9,130.0],[94.9,134.2],[79.0,129.5],[73.7,124.2],[71.6,119.9],[71.1,109.8],[71.1,109.3],[69.5,108.2],[68.4,99.8],[92.8,89.2],[124.1,100.3],[121.5,107.2],[120.4,109.3],[120.4,109.8],[120.4,118.3]],"fit":2.12},{"file":"t_mortar_4.webp","cell":192,"ax":96.0,"ay":164.2,"ppu":66.207,"tips":[[118.0,123.0],[112.5,128.5],[95.5,133.5],[79.0,128.5],[73.5,123.0],[71.0,116.5],[71.0,110.5],[71.0,109.0],[63.0,115.0],[57.0,105.5],[104.0,91.0],[133.0,104.5],[128.0,114.5],[119.5,106.0],[120.5,110.5],[120.5,116.5]],"fit":1.505},{"file":"t_mortar_5.webp","cell":192,"ax":96.0,"ay":143.7,"ppu":66.207,"tips":[[119.0,99.0],[113.0,104.5],[95.5,109.5],[79.0,105.0],[72.0,98.0],[70.5,94.5],[69.5,86.0],[70.5,81.5],[55.0,97.0],[44.5,85.5],[93.5,64.5],[146.0,85.0],[136.5,97.0],[121.0,81.5],[122.0,86.0],[120.5,96.0]],"fit":1.59}],"fit":2.515},"watergun":{"stages":[{"file":"t_watergun_1.webp","cell":192,"ax":96.0,"ay":168.3,"ppu":97.036,"tips":[[135.6,104.3],[112.9,127.0],[90.1,131.4],[79.1,127.7],[55.7,104.3],[44.0,90.4],[40.3,72.0],[44.0,57.4],[55.7,44.2],[74.0,34.7],[96.0,31.0],[117.3,34.7],[135.6,44.2],[147.3,57.4],[151.0,72.8],[147.3,91.1]],"fit":2.554},{"file":"t_watergun_2.webp","cell":192,"ax":96.0,"ay":162.8,"ppu":83.63,"tips":[[135.2,100.1],[111.8,122.8],[95.4,127.2],[79.6,122.8],[56.2,100.1],[46.7,86.2],[45.5,69.1],[47.4,62.2],[56.2,49.5],[71.4,40.1],[90.3,35.6],[119.4,40.1],[135.2,50.2],[144.0,62.2],[145.9,69.7],[144.6,85.5]],"fit":1.862},{"file":"t_watergun_3.webp","cell":192,"ax":96.0,"ay":168.1,"ppu":69.845,"tips":[[133.5,108.3],[109.7,131.0],[94.4,134.7],[81.8,131.0],[58.0,108.3],[51.7,96.7],[51.7,81.4],[51.7,80.9],[58.0,69.3],[70.7,59.8],[87.0,54.5],[120.8,59.8],[132.9,68.8],[139.8,80.9],[139.8,81.4],[139.8,96.7]],"fit":2.12},{"file":"t_watergun_4.webp","cell":192,"ax":96.0,"ay":167.7,"ppu":66.207,"tips":[[118.0,130.5],[108.0,136.0],[95.5,137.5],[83.5,136.0],[73.0,130.5],[50.5,94.5],[52.0,79.0],[50.5,84.0],[56.0,71.5],[68.0,61.0],[83.0,55.5],[123.5,61.0],[135.5,71.5],[141.0,84.0],[139.5,79.0],[141.0,94.5]],"fit":1.894},{"file":"t_watergun_5.webp","cell":192,"ax":96.0,"ay":161.7,"ppu":66.207,"tips":[[132.5,107.0],[108.5,126.5],[95.5,128.0],[83.0,126.5],[59.0,107.0],[49.0,93.5],[46.5,77.0],[49.0,67.5],[58.5,55.0],[72.5,46.5],[92.5,42.0],[119.0,46.5],[133.0,55.0],[142.5,67.5],[145.0,77.0],[142.5,93.5]],"fit":1.669}],"fit":2.554},"chili":{"stages":[{"file":"t_chili_1.webp","cell":192,"ax":96.0,"ay":171.1,"ppu":72.638,"tips":[[114.7,126.4],[109.7,130.8],[93.8,134.6],[82.3,131.3],[77.3,127.0],[72.4,114.9],[70.8,103.4],[71.9,99.5],[76.8,92.9],[82.3,89.7],[91.1,86.4],[108.1,89.1],[116.3,95.1],[119.6,99.5],[120.7,103.9],[118.5,117.1]],"fit":2.443},{"file":"t_chili_2.webp","cell":192,"ax":96.0,"ay":169.2,"ppu":66.207,"tips":[[113.5,121.0],[108.5,126.0],[95.0,129.5],[83.0,126.0],[78.5,122.0],[73.0,114.5],[70.5,99.0],[71.5,95.5],[76.0,89.0],[83.0,84.5],[93.0,82.0],[108.5,84.5],[116.0,89.5],[120.0,95.0],[121.0,99.0],[119.5,111.5]],"fit":2.443},{"file":"t_chili_3.webp","cell":192,"ax":96.0,"ay":164.7,"ppu":66.207,"tips":[[117.0,108.5],[108.5,115.0],[95.5,118.5],[83.0,115.0],[73.5,107.0],[70.0,102.0],[68.0,85.5],[69.0,82.0],[73.5,75.5],[82.5,69.5],[94.0,67.0],[109.0,69.5],[118.0,75.5],[122.5,82.0],[123.5,86.0],[122.0,100.0]],"fit":2.309},{"file":"t_chili_4.webp","cell":192,"ax":96.0,"ay":143.7,"ppu":66.207,"tips":[[119.0,83.0],[108.5,90.5],[94.0,93.0],[81.5,89.5],[72.5,83.0],[67.5,74.0],[66.0,59.5],[67.0,55.5],[72.0,48.0],[79.0,43.0],[93.0,39.0],[111.5,42.5],[120.0,48.5],[124.5,55.5],[125.5,59.5],[123.5,76.0]],"fit":1.532},{"file":"t_chili_5.webp","cell":192,"ax":96.0,"ay":143.7,"ppu":66.207,"tips":[[120.5,79.0],[111.0,86.0],[95.0,89.5],[80.5,86.0],[71.0,79.0],[65.5,69.5],[64.0,54.0],[65.0,50.0],[70.0,42.0],[79.0,35.5],[91.5,32.0],[112.5,35.5],[121.5,42.0],[126.0,48.0],[127.5,54.0],[125.5,71.0]],"fit":1.694}],"fit":2.443},"rockets":{"stages":[{"file":"t_rockets_1.webp","cell":192,"ax":96.0,"ay":167.9,"ppu":94.864,"tips":[[120.4,122.5],[113.2,128.9],[91.0,133.2],[78.1,128.9],[70.9,122.5],[58.0,93.1],[57.3,81.6],[57.3,81.6],[63.8,71.6],[74.5,63.7],[103.2,58.7],[117.5,63.7],[127.5,71.6],[134.0,81.6],[133.3,81.6],[133.3,93.1]],"fit":2.515},{"file":"t_rockets_2.webp","cell":192,"ax":96.0,"ay":163.5,"ppu":83.63,"tips":[[118.7,119.1],[113.1,124.1],[94.7,129.2],[78.3,124.1],[73.9,120.3],[59.4,92.5],[58.1,81.2],[58.7,80.5],[68.2,65.4],[77.1,58.4],[89.1,54.6],[114.3,58.4],[122.5,65.4],[132.6,80.5],[132.6,81.2],[132.6,92.5]],"fit":1.862},{"file":"t_rockets_3.webp","cell":192,"ax":96.0,"ay":167.9,"ppu":70.231,"tips":[[116.7,125.8],[111.4,131.1],[93.3,135.3],[81.1,131.6],[74.8,125.8],[62.1,99.8],[63.6,89.7],[62.1,96.6],[65.2,87.0],[74.8,75.9],[84.3,71.1],[116.7,75.9],[123.6,82.8],[129.9,96.6],[127.8,89.7],[129.4,99.8]],"fit":2.12},{"file":"t_rockets_4.webp","cell":192,"ax":96.0,"ay":164.2,"ppu":66.207,"tips":[[116.5,123.0],[110.5,128.5],[91.0,132.0],[81.0,128.5],[75.0,123.0],[61.0,98.0],[62.5,87.5],[61.0,93.5],[70.5,76.0],[76.5,69.5],[85.0,65.0],[115.0,69.5],[121.0,76.0],[130.5,93.5],[129.0,87.5],[130.5,98.0]],"fit":1.505},{"file":"t_rockets_5.webp","cell":192,"ax":96.0,"ay":159.7,"ppu":66.207,"tips":[[118.0,114.0],[112.0,120.0],[95.0,124.5],[79.5,120.0],[74.5,115.5],[58.0,85.5],[61.5,82.5],[58.0,87.5],[60.5,76.5],[71.0,61.0],[80.0,55.0],[120.5,61.5],[128.0,73.0],[133.5,87.5],[130.0,74.5],[133.5,85.5]],"fit":1.59}],"fit":2.515},"fan":{"stages":[{"file":"t_fan_1.webp","cell":192,"ax":96.0,"ay":167.8,"ppu":96.301,"tips":[[111.3,93.4],[96.7,111.5],[93.8,111.5],[93.8,110.8],[80.0,93.4],[80.7,85.4],[82.9,75.9],[79.3,76.6],[79.3,65.0],[84.4,57.0],[91.6,53.4],[108.4,57.7],[112.7,65.7],[112.0,76.6],[108.4,75.9],[111.3,83.2]],"fit":2.515},{"file":"t_fan_2.webp","cell":192,"ax":96.0,"ay":162.8,"ppu":83.63,"tips":[[113.7,87.4],[96.6,108.3],[94.1,108.3],[94.7,108.3],[79.6,89.9],[82.1,84.9],[84.6,75.4],[81.5,71.0],[78.9,64.7],[84.6,55.8],[92.8,52.1],[108.0,56.5],[111.8,64.1],[110.5,72.9],[106.7,74.8],[109.3,84.9]],"fit":1.862},{"file":"t_fan_3.webp","cell":192,"ax":96.0,"ay":167.9,"ppu":70.231,"tips":[[109.8,101.9],[96.5,117.3],[95.5,117.8],[94.9,117.3],[81.7,101.9],[83.8,97.1],[86.5,87.0],[82.7,83.9],[80.6,77.0],[84.3,69.5],[95.5,65.3],[107.1,69.5],[109.8,75.9],[108.2,82.3],[105.0,87.0],[109.8,90.2]],"fit":2.12},{"file":"t_fan_4.webp","cell":192,"ax":96.0,"ay":164.7,"ppu":66.207,"tips":[[118.5,93.5],[98.5,114.0],[94.5,115.0],[93.0,114.0],[73.0,93.5],[79.5,88.0],[87.0,84.5],[79.5,85.0],[73.5,79.0],[93.0,58.5],[95.5,58.0],[99.0,58.5],[118.5,79.0],[112.0,84.5],[104.5,85.0],[112.0,88.0]],"fit":1.505},{"file":"t_fan_5.webp","cell":192,"ax":96.0,"ay":159.7,"ppu":66.207,"tips":[[120.5,82.5],[98.5,105.0],[95.5,106.0],[93.0,104.5],[71.0,82.5],[78.0,76.0],[87.0,73.0],[78.5,73.0],[71.5,67.0],[92.5,44.0],[95.5,44.5],[99.0,44.0],[120.0,67.0],[113.0,73.5],[104.5,73.0],[113.5,76.0]],"fit":1.59}],"fit":2.515},"lens":{"stages":[{"file":"t_lens_1.webp","cell":192,"ax":96.0,"ay":167.8,"ppu":100.887,"tips":[[112.0,98.1],[105.1,104.2],[90.7,105.8],[84.6,103.5],[79.2,98.1],[57.9,63.9],[56.4,53.2],[57.9,47.9],[64.8,37.2],[76.2,29.6],[91.4,25.8],[116.6,30.3],[127.2,38.0],[133.3,47.1],[134.9,52.4],[133.3,63.9]],"fit":3.2},{"file":"t_lens_2.webp","cell":192,"ax":96.0,"ay":169.3,"ppu":88.276,"tips":[[128.7,75.7],[104.0,105.0],[90.7,106.3],[85.3,103.7],[64.0,77.0],[58.7,67.0],[57.3,59.7],[59.3,51.7],[66.7,41.7],[75.3,36.3],[92.7,31.7],[116.0,36.3],[124.7,41.7],[132.0,51.7],[133.3,57.0],[132.7,67.0]],"fit":3.2},{"file":"t_lens_3.webp","cell":192,"ax":96.0,"ay":174.2,"ppu":66.207,"tips":[[117.5,121.5],[90.0,137.5],[75.0,134.0],[65.0,126.0],[60.5,117.0],[60.0,105.5],[65.5,94.0],[68.0,81.5],[73.5,72.5],[80.5,68.0],[93.0,64.5],[111.0,68.0],[118.0,72.5],[123.0,79.5],[126.0,103.5],[124.0,113.5]],"fit":3.2},{"file":"t_lens_4.webp","cell":192,"ax":96.0,"ay":169.7,"ppu":66.207,"tips":[[132.5,107.5],[127.5,117.5],[75.5,126.0],[65.0,118.0],[60.0,108.5],[59.0,95.5],[65.0,85.0],[67.0,71.5],[71.5,64.0],[80.5,57.5],[92.0,54.5],[108.0,56.0],[120.0,64.0],[124.5,71.5],[126.5,85.0],[132.5,95.5]],"fit":1.971},{"file":"t_lens_5.webp","cell":192,"ax":96.0,"ay":163.7,"ppu":66.207,"tips":[[132.0,96.5],[127.0,106.0],[75.0,114.0],[64.5,106.0],[59.5,96.5],[58.5,83.5],[63.5,60.5],[64.5,56.5],[68.5,50.0],[80.0,41.5],[92.5,38.5],[112.5,42.0],[122.5,49.5],[127.0,56.5],[128.0,60.0],[133.0,83.5]],"fit":1.59}],"fit":3.2}},"troops":{"fork":{"file":"u_fork.webp","ax":90.0,"ay":150.4,"h":147.4},"sling":{"file":"u_sling.webp","ax":90.0,"ay":150.4,"h":120.4},"giant":{"file":"u_giant.webp","ax":90.0,"ay":155.8,"h":136.8},"nurse":{"file":"u_nurse.webp","ax":90.0,"ay":163.6,"h":141.6},"digger":{"file":"u_digger.webp","ax":90.0,"ay":145.5,"h":121.5},"pot":{"file":"u_pot.webp","ax":90.0,"ay":152.0,"h":131.0},"chef":{"file":"u_chef.webp","ax":90.0,"ay":153.5,"h":123.5},"pig":{"file":"u_pig.webp","ax":90.0,"ay":155.7,"h":142.7},"bomber":{"file":"u_bomber.webp","ax":90.0,"ay":150.4,"h":110.4},"witch":{"file":"u_witch.webp","ax":90.0,"ay":155.1,"h":112.1},"dog":{"file":"u_dog.webp","ax":90.0,"ay":134.1,"h":104.1},"egret":{"file":"u_egret.webp","ax":90.0,"ay":150.9,"h":123.9},"cat_spatula":{"file":"u_cat_spatula.webp","ax":90.0,"ay":141.4,"h":107.4},"cat_pan":{"file":"u_cat_pan.webp","ax":90.0,"ay":144.1,"h":112.1},"cat_chili":{"file":"u_cat_chili.webp","ax":90.0,"ay":141.4,"h":105.4},"cat_bomb":{"file":"u_cat_bomb.webp","ax":90.0,"ay":141.4,"h":105.4},"cat_king":{"file":"u_cat_king.webp","ax":90.0,"ay":145.8,"h":125.8},"colonel":{"file":"u_colonel.webp","ax":135.0,"ay":221.9,"h":180.9,"cw":270,"ch":288},"balloon":{"file":"u_balloon.webp","ax":135.0,"ay":280.0,"h":241.0,"cw":270,"ch":288},"plane":{"file":"u_plane.webp","ax":90.0,"ay":145.2,"h":101.2},"thief":{"file":"u_thief.webp","ax":90.0,"ay":148.6,"h":104.6},"mop":{"file":"u_mop.webp","ax":90.0,"ay":142.5,"h":108.5},"prop":{"file":"u_prop.webp","ax":135.0,"ay":196.4,"h":144.4,"cw":270,"ch":288},"kite":{"file":"u_kite.webp","ax":135.0,"ay":246.2,"h":203.2,"cw":270,"ch":288},"fan":{"file":"u_fan.webp","ax":135.0,"ay":247.4,"h":193.4,"cw":270,"ch":288}},"walls":{"1":{"post":{"file":"w_1_post.webp","ax":65.0,"ay":112.3,"ppu":132.381,"w":130,"h":154},"linkx":{"file":"w_1_linkx.webp","ax":26.0,"ay":79.3,"ppu":132.381,"w":98,"h":100},"linky":{"file":"w_1_linky.webp","ax":26.0,"ay":114.3,"ppu":132.381,"w":98,"h":100}},"2":{"post":{"file":"w_2_post.webp","ax":62.0,"ay":110.3,"ppu":132.381,"w":124,"h":152},"linkx":{"file":"w_2_linkx.webp","ax":21.0,"ay":90.3,"ppu":132.381,"w":89,"h":109},"linky":{"file":"w_2_linky.webp","ax":20.0,"ay":126.3,"ppu":132.381,"w":87,"h":110}},"3":{"post":{"file":"w_3_post.webp","ax":62.0,"ay":133.3,"ppu":132.381,"w":124,"h":175},"linkx":{"file":"w_3_linkx.webp","ax":20.0,"ay":94.3,"ppu":132.381,"w":87,"h":117},"linky":{"file":"w_3_linky.webp","ax":20.0,"ay":129.3,"ppu":132.381,"w":87,"h":117}},"4":{"post":{"file":"w_4_post.webp","ax":62.0,"ay":115.3,"ppu":132.381,"w":124,"h":157},"linkx":{"file":"w_4_linkx.webp","ax":18.0,"ay":100.3,"ppu":132.381,"w":83,"h":120},"linky":{"file":"w_4_linky.webp","ax":18.0,"ay":135.3,"ppu":132.381,"w":83,"h":120}},"5":{"post":{"file":"w_5_post.webp","ax":62.0,"ay":110.3,"ppu":132.381,"w":124,"h":152},"linkx":{"file":"w_5_linkx.webp","ax":19.0,"ay":81.3,"ppu":132.381,"w":88,"h":96},"linky":{"file":"w_5_linky.webp","ax":19.0,"ay":114.3,"ppu":132.381,"w":88,"h":96}},"6":{"post":{"file":"w_6_post.webp","ax":69.0,"ay":161.3,"ppu":132.381,"w":138,"h":203},"linkx":{"file":"w_6_linkx.webp","ax":27.0,"ay":111.3,"ppu":132.381,"w":101,"h":137},"linky":{"file":"w_6_linky.webp","ax":27.0,"ay":146.3,"ppu":132.381,"w":101,"h":137}}},"troopLayout":{"cw":180,"ch":192,"dirs":8,"idle":[0,4],"walk":[4,8],"attack":[12,4],"death":[16,5]}};
// ---- src/01-core.js ----
// Duck War — core: canvas, isometric camera (matches the Blender game camera: yaw 45°, elevation 48.6°),
// touch/mouse input, image loading, save data. Everything else builds on these helpers.
var $ = function (id) { return document.getElementById(id); };
var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
var now = function () { return Date.now(); };
var TEST = !!(window.DuckContent && (window.DuckContent.channel === 'test' || /test/.test(window.DuckContent.label || ''))) || /[?&]test/.test(location.search);
var ISO = 0.75, H = Math.SQRT1_2, ZUP = 0.661;           // sin/cos of the 48.6° camera elevation
var MAP = 40;                                            // the base is MAP x MAP tiles (roomy, like Clash's 44)

var canvas = $('world'), ctx = canvas.getContext('2d');
var cam = { x: 0, y: 0, s: 40 };                         // s = screen px per world unit (one tile edge)
var view = { w: 800, h: 400, dpr: 1 };
function fit() {
  var r = canvas.getBoundingClientRect(); view.dpr = Math.min(2, window.devicePixelRatio || 1);
  view.w = r.width; view.h = r.height;
  canvas.width = Math.round(r.width * view.dpr); canvas.height = Math.round(r.height * view.dpr);
  dirty = true;
}
window.addEventListener('resize', fit);
function toScreen(x, y, z) { return { x: view.w / 2 + cam.x + (x - y) * H * cam.s, y: view.h / 2 + cam.y + ((x + y) * H * ISO - (z || 0) * ZUP) * cam.s }; }
function toWorld(sx, sy) {
  var a = (sx - view.w / 2 - cam.x) / (H * cam.s), b = (sy - view.h / 2 - cam.y) / (H * ISO * cam.s);
  return { x: (a + b) / 2, y: (b - a) / 2 };
}
function centerCamera(scale) {
  cam.s = scale || clamp(Math.min(view.w / 24, view.h / 13.2), 22, 90); cam.x = cam.y = 0;
  var f = arguments[1] || { x: MAP / 2, y: MAP / 2 }, c = toScreen(f.x, f.y); cam.x += view.w / 2 - c.x; cam.y += view.h / 2 - c.y;
}

// ---------- images ----------
var IMG = {};
function img(file) {
  var i = IMG[file]; if (i) return i;
  i = IMG[file] = new Image(); i.onload = function () { dirty = true; }; i.src = 'assets/' + file;
  // unpack the picture off the main thread before its first draw: a big troop sheet unpacked mid-raid froze the game for a moment
  if (typeof i.decode === 'function') { i.dec = false; i.decode().then(function () { i.dec = true; dirty = true; }, function () { i.dec = true; }); }
  return i;
}
function ready(i) { return i && i.complete && i.naturalWidth > 0 && i.dec !== false; }
function preload(files) { files.forEach(function (f) { if (f) img(f); }); }

// ---------- input: one finger pans, two fingers zoom, a short touch is a tap ----------
var pointers = new Map(), gesture = null, dirty = true;
var input = { tap: null, drag: null };   // the active screen sets these
canvas.addEventListener('pointerdown', function (e) {
  canvas.setPointerCapture(e.pointerId); pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size === 1) gesture = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y, t: now(), moved: false, id: e.pointerId, hold: null };
  else gesture = { pinch: dist2(), s: cam.s, cx: cam.x, cy: cam.y, mid: mid2() };
  if (pointers.size === 1 && input.press) { var w = toWorld(e.clientX - rect().left, e.clientY - rect().top); gesture.hold = input.press(w, e); }
});
canvas.addEventListener('pointermove', function (e) {
  if (!pointers.has(e.pointerId)) return; pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (!gesture) return;
  if (gesture.pinch) {
    var s = clamp(gesture.s * dist2() / gesture.pinch, 11, 140), m = gesture.mid, r = rect();
    var wx = toWorld(m.x - r.left, m.y - r.top); cam.s = s; var after = toScreen(wx.x, wx.y);
    cam.x += m.x - r.left - after.x; cam.y += m.y - r.top - after.y; dirty = true; return;
  }
  var dx = e.clientX - gesture.x, dy = e.clientY - gesture.y;
  if (Math.abs(dx) + Math.abs(dy) > 8) gesture.moved = true;
  if (gesture.moved && gesture.hold && input.drag) { var r2 = rect(); input.drag(toWorld(e.clientX - r2.left, e.clientY - r2.top)); return; }
  if (gesture.moved) { cam.x = gesture.cx + dx; cam.y = gesture.cy + dy; dirty = true; }
});
function endPointer(e) {
  if (!pointers.has(e.pointerId)) return; pointers.delete(e.pointerId);
  if (gesture && !gesture.pinch && !gesture.moved && now() - gesture.t < 450 && input.tap) {
    var r = rect(); input.tap(toWorld(e.clientX - r.left, e.clientY - r.top), { x: e.clientX - r.left, y: e.clientY - r.top });
  }
  if (gesture && gesture.hold && input.release) input.release();
  if (pointers.size === 0) gesture = null;
}
canvas.addEventListener('pointerup', endPointer); canvas.addEventListener('pointercancel', endPointer);
canvas.addEventListener('wheel', function (e) {
  e.preventDefault(); var r = rect(), w = toWorld(e.clientX - r.left, e.clientY - r.top);
  cam.s = clamp(cam.s * (e.deltaY < 0 ? 1.1 : 0.9), 11, 140); var a = toScreen(w.x, w.y);
  cam.x += e.clientX - r.left - a.x; cam.y += e.clientY - r.top - a.y; dirty = true;
}, { passive: false });
function rect() { return canvas.getBoundingClientRect(); }
function dist2() { var p = Array.from(pointers.values()); return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1; }
function mid2() { var p = Array.from(pointers.values()); return { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 }; }

// ---------- haptics, toast ----------
function buzz(kind) { try { if (window.DuckHaptics) window.DuckHaptics.tap(kind || 'light'); } catch (e) {} }
function toast(text) { var t = $('toast'); t.textContent = text; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(function () { t.classList.remove('show'); }, 2200); }
function fmt(n) { n = Math.floor(n); return n >= 999500 ? (Math.max(1, n / 1e6)).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M' : n >= 1e4 ? (n / 1e3).toFixed(n >= 99950 ? 0 : 1).replace(/\.0$/, '') + 'K' : n.toLocaleString(); }
function clock(ms) { var s = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60); return h ? h + 'ชม. ' + m + 'น.' : m ? m + 'น. ' + (s % 60) + 'ว.' : s + 'ว.'; }

// ---------- save ----------
var SAVE_KEY = 'duckwar.save.v1';
function loadSave() { try { var d = JSON.parse(localStorage.getItem(SAVE_KEY)); if (d && d.v === 1) return d; } catch (e) {} return null; }
function writeSave() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(D)); } catch (e) {} }

// ---- src/015-sound.js ----
// Duck War — sound: every effect and the music are synthesized with Web Audio (no audio files, nothing to download).
// sfx('name') plays an effect; busy sounds are rate-limited so a 40-duck brawl stays pleasant.
var SND = { ctx: null, master: null, sfxBus: null, musicBus: null, last: {}, on: true, music: true, noiseBuf: null, voices: 0 };
(function () { try { var s = JSON.parse(localStorage.getItem('duckwar.sound') || '{}'); if (s.on === false) SND.on = false; if (s.music === false) SND.music = false; } catch (e) {} })();
function soundSave() { try { localStorage.setItem('duckwar.sound', JSON.stringify({ on: SND.on, music: SND.music })); } catch (e) {} }
function audio() {
  if (SND.ctx) return SND.ctx;
  var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
  var c = SND.ctx = new AC();
  SND.master = c.createGain(); SND.master.gain.value = .9;
  var comp = c.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 6; SND.master.connect(comp); comp.connect(c.destination);
  SND.sfxBus = c.createGain(); SND.sfxBus.gain.value = SND.on ? 1 : 0; SND.sfxBus.connect(SND.master);
  SND.musicBus = c.createGain(); SND.musicBus.gain.value = SND.music ? .32 : 0; SND.musicBus.connect(SND.master);
  var n = c.sampleRate, b = c.createBuffer(1, n, n), d = b.getChannelData(0); for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; SND.noiseBuf = b;
  return c;
}
// browsers (and the Android WebView) only allow sound after a touch
['pointerdown', 'touchstart', 'keydown'].forEach(function (ev) { window.addEventListener(ev, function () { var c = audio(); if (c && c.state !== 'running') c.resume(); startMusic(); }, { passive: true }); });
document.addEventListener('visibilitychange', function () { if (!SND.ctx) return; if (document.hidden) SND.ctx.suspend(); else SND.ctx.resume(); });

function env(g, t, a, peak, dec) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec); }
function tone(o) { // o: f, f2, type, vol, a, d, at, q (bandpass formant), dest
  var c = SND.ctx, t = c.currentTime + (o.at || 0), osc = c.createOscillator(), g = c.createGain(), out = g;
  osc.type = o.type || 'sine'; osc.frequency.setValueAtTime(o.f, t); if (o.f2) osc.frequency.exponentialRampToValueAtTime(o.f2, t + (o.a || .005) + (o.d || .15));
  if (o.vib) { var l = c.createOscillator(), lg = c.createGain(); l.frequency.value = o.vib; lg.gain.value = o.vibAmt || 20; l.connect(lg); lg.connect(osc.frequency); l.start(t); l.stop(t + (o.a || .005) + (o.d || .15) + .05); }
  osc.connect(g);
  if (o.bp) { var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = o.bp; f.Q.value = o.q || 3; g.connect(f); out = f; }
  out.connect(o.dest || SND.sfxBus); env(g, t, o.a || .005, o.vol || .3, o.d || .15); osc.start(t); osc.stop(t + (o.a || .005) + (o.d || .15) + .05);
}
function noise(o) { // o: vol, a, d, at, type (lowpass/highpass/bandpass), f, f2, q
  var c = SND.ctx, t = c.currentTime + (o.at || 0), s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = SND.noiseBuf; s.loop = true; f.type = o.type || 'lowpass'; f.frequency.setValueAtTime(o.f || 1200, t); if (o.f2) f.frequency.exponentialRampToValueAtTime(o.f2, t + (o.a || .005) + (o.d || .2)); f.Q.value = o.q || 1;
  s.connect(f); f.connect(g); g.connect(o.dest || SND.sfxBus); env(g, t, o.a || .005, o.vol || .3, o.d || .2);
  s.start(t, Math.random() * .5); s.stop(t + (o.a || .005) + (o.d || .2) + .05);
}
function quack(at, pitch, vol) { // a cartoon quack: buzzy saw through two formants, falling pitch
  var p = pitch || 1;
  tone({ f: 560 * p, f2: 380 * p, type: 'sawtooth', vol: (vol || .22), a: .01, d: .13, at: at, bp: 1150 * p, q: 5 });
  tone({ f: 560 * p, f2: 380 * p, type: 'square', vol: (vol || .22) * .5, a: .01, d: .11, at: at, bp: 2500 * p, q: 6 });
}
var SFX = {
  tap: function () { tone({ f: 880, f2: 660, type: 'triangle', vol: .12, d: .05 }); },
  quack: function () { quack(0, .9 + Math.random() * .25); },
  colonel: function () { quack(0, .72, .3); quack(.16, .78, .3); tone({ f: 523, type: 'triangle', vol: .12, d: .12, at: .34 }); tone({ f: 784, type: 'triangle', vol: .12, d: .25, at: .44 }); },
  stab: function () { noise({ type: 'highpass', f: 2500, vol: .12, d: .05 }); tone({ f: 1400, f2: 900, type: 'triangle', vol: .08, d: .06 }); },
  smash: function () { tone({ f: 140, f2: 55, type: 'sine', vol: .5, d: .22 }); noise({ type: 'lowpass', f: 900, f2: 200, vol: .3, d: .2 }); tone({ f: 620, f2: 600, type: 'triangle', vol: .06, d: .3, vib: 30, vibAmt: 8 }); },
  bite: function () { noise({ type: 'bandpass', f: 1800, q: 2, vol: .25, d: .06 }); noise({ type: 'bandpass', f: 1200, q: 2, vol: .2, d: .06, at: .07 }); tone({ f: 180, f2: 120, type: 'square', vol: .06, d: .08 }); },
  shot: function () { noise({ type: 'bandpass', f: 3000, f2: 900, q: 1.5, vol: .14, d: .12 }); tone({ f: 300, f2: 900, type: 'triangle', vol: .05, d: .08 }); },
  fire: function () { noise({ type: 'bandpass', f: 600, f2: 2200, q: .8, vol: .22, a: .03, d: .3 }); },
  egg: function () { tone({ f: 220, f2: 90, type: 'sine', vol: .35, d: .18 }); noise({ type: 'lowpass', f: 600, vol: .15, d: .12 }); },
  water: function () { noise({ type: 'bandpass', f: 1800, f2: 3500, q: 3, vol: .12, d: .15 }); },
  thud: function () { tone({ f: 190, f2: 120, type: 'sine', vol: .2, d: .08 }); noise({ type: 'lowpass', f: 700, vol: .08, d: .05 }); },
  cracker: function () { noise({ type: 'highpass', f: 1500, vol: .35, d: .06 }); noise({ type: 'highpass', f: 1500, vol: .3, d: .05, at: .07 }); noise({ type: 'lowpass', f: 900, vol: .3, d: .2, at: .02 }); },
  splat: function () { noise({ type: 'lowpass', f: 1200, f2: 300, vol: .3, d: .25 }); tone({ f: 120, f2: 60, type: 'sine', vol: .3, d: .25 }); },
  crash: function () { // a building falls: crunch, rumble, tumbling bits
    noise({ type: 'lowpass', f: 2500, f2: 150, vol: .5, a: .01, d: .9 }); tone({ f: 90, f2: 35, type: 'sine', vol: .55, d: .7 });
    for (var i = 0; i < 5; i++) tone({ f: 300 + Math.random() * 500, f2: 150, type: 'triangle', vol: .08, d: .07, at: .12 + i * .09 + Math.random() * .05 });
  },
  wall: function () { noise({ type: 'bandpass', f: 1400, q: 1.2, vol: .3, d: .18 }); tone({ f: 260, f2: 140, type: 'square', vol: .06, d: .12 }); },
  duckdie: function () { quack(0, 1.25, .16); tone({ f: 700, f2: 180, type: 'triangle', vol: .1, d: .35, at: .1 }); },
  meow: function () { tone({ f: 620, f2: 880, type: 'triangle', vol: .16, a: .06, d: .12, vib: 7, vibAmt: 25, bp: 1400, q: 1.5 }); tone({ f: 880, f2: 520, type: 'triangle', vol: .15, a: .01, d: .25, at: .17, vib: 7, vibAmt: 25, bp: 1300, q: 1.5 }); },
  hiss: function () { noise({ type: 'highpass', f: 3000, vol: .15, a: .02, d: .3 }); },
  deploy: function () { quack(0, 1 + Math.random() * .3, .18); noise({ type: 'lowpass', f: 500, vol: .12, d: .1 }); },
  dig: function () { noise({ type: 'lowpass', f: 260, f2: 160, vol: .22, a: .04, d: .3 }); },
  surface: function () { noise({ type: 'lowpass', f: 1500, f2: 300, vol: .3, d: .25 }); tone({ f: 300, f2: 700, type: 'triangle', vol: .12, d: .12 }); },
  heal: function () { [1046, 1318, 1568].forEach(function (f, i) { tone({ f: f, type: 'sine', vol: .08, d: .25, at: i * .06 }); }); },
  build: function () { for (var i = 0; i < 3; i++) { tone({ f: 420, f2: 300, type: 'square', vol: .07, d: .05, at: i * .16 }); noise({ type: 'bandpass', f: 1600, q: 2, vol: .15, d: .04, at: i * .16 }); } },
  done: function () { [523, 659, 784, 1046].forEach(function (f, i) { tone({ f: f, type: 'triangle', vol: .16, d: i === 3 ? .4 : .12, at: i * .09 }); }); },
  coin: function () { tone({ f: 1318, type: 'square', vol: .07, d: .08 }); tone({ f: 1760, type: 'square', vol: .07, d: .3, at: .08 }); tone({ f: 2637, type: 'sine', vol: .05, d: .3, at: .08 }); },
  train: function () { tone({ f: 500, f2: 900, type: 'sine', vol: .14, d: .08 }); quack(.06, 1.3, .1); },
  boost: function () { tone({ f: 300, f2: 1400, type: 'sawtooth', vol: .07, a: .02, d: .35, bp: 1600, q: 2 }); [1046, 1568].forEach(function (f, i) { tone({ f: f, type: 'sine', vol: .1, d: .2, at: .3 + i * .08 }); }); },
  horn: function () { [[392, 0], [392, .18], [523, .36]].forEach(function (n) { tone({ f: n[0], type: 'sawtooth', vol: .1, a: .02, d: n[1] === .36 ? .55 : .14, at: n[1], bp: 1200, q: 1 }); }); },
  win: function () { [523, 659, 784, 1046, 784, 1046].forEach(function (f, i) { tone({ f: f, type: 'triangle', vol: .17, d: i === 5 ? .6 : .13, at: i * .12 }); }); quack(.8, 1.1, .2); quack(.95, 1.2, .2); },
  lose: function () { [392, 370, 349, 262].forEach(function (f, i) { tone({ f: f, type: 'triangle', vol: .15, d: i === 3 ? .7 : .22, at: i * .25, vib: i === 3 ? 6 : 0, vibAmt: 6 }); }); },
  // ---------- duck war cries ----------
  quackHi: function () { var p = 1.15 + Math.random() * .3; quack(0, p, .17); if (Math.random() < .4) quack(.1, p * 1.06, .13); },
  quackLo: function () { var p = .62 + Math.random() * .1; quack(0, p, .26); tone({ f: 110, f2: 80, type: 'sine', vol: .12, d: .15 }); },
  peep: function () { tone({ f: 1900, f2: 2500, type: 'sine', vol: .07, d: .06 }); tone({ f: 2100, f2: 2700, type: 'sine', vol: .06, d: .05, at: .08 }); },
  cackle: function () { for (var i = 0; i < 4; i++) tone({ f: 900 - i * 60, f2: 700 - i * 60, type: 'sawtooth', vol: .07, d: .06, at: i * .085, bp: 1600, q: 4 }); },
  bark: function () { tone({ f: 420, f2: 230, type: 'sawtooth', vol: .2, a: .01, d: .11, bp: 900, q: 2 }); noise({ type: 'bandpass', f: 700, q: 1.5, vol: .12, d: .08 }); if (Math.random() < .5) tone({ f: 460, f2: 250, type: 'sawtooth', vol: .16, d: .1, at: .17, bp: 900, q: 2 }); },
  squawk: function () { tone({ f: 1300, f2: 700, type: 'sawtooth', vol: .14, a: .01, d: .2, bp: 1800, q: 3, vib: 25, vibAmt: 80 }); },
  oink: function () { tone({ f: 260, f2: 200, type: 'sawtooth', vol: .16, a: .02, d: .14, bp: 600, q: 4, vib: 30, vibAmt: 25 }); },
  wee: function () { tone({ f: 900, f2: 1600, type: 'triangle', vol: .08, a: .03, d: .25, vib: 9, vibAmt: 40 }); },
  // ---------- duck weapons ----------
  pew: function () { tone({ f: 900, f2: 300, type: 'triangle', vol: .09, d: .09 }); noise({ type: 'highpass', f: 3000, vol: .05, d: .03 }); },
  whirl: function () { noise({ type: 'bandpass', f: 500, f2: 2400, q: 2, vol: .16, a: .05, d: .3 }); noise({ type: 'bandpass', f: 2400, f2: 600, q: 2, vol: .12, a: .02, d: .25, at: .3 }); },
  swoosh: function () { noise({ type: 'bandpass', f: 2600, f2: 500, q: 1.5, vol: .16, a: .04, d: .28 }); },
  gust: function () { noise({ type: 'lowpass', f: 900, f2: 300, vol: .18, a: .08, d: .4 }); },
  swing: function () { noise({ type: 'bandpass', f: 400, f2: 1800, q: 1.2, vol: .14, a: .03, d: .14 }); },
  // ---------- defenses ----------
  twang: function () { tone({ f: 180, f2: 120, type: 'sawtooth', vol: .14, a: .003, d: .3, vib: 22, vibAmt: 18, bp: 700, q: 2 }); noise({ type: 'bandpass', f: 1800, q: 2, vol: .12, d: .05 }); tone({ f: 70, f2: 45, type: 'sine', vol: .25, d: .12 }); },
  cooker: function () { noise({ type: 'highpass', f: 2500, vol: .22, a: .01, d: .35 }); tone({ f: 120, f2: 50, type: 'sine', vol: .45, d: .2, at: .02 }); noise({ type: 'lowpass', f: 500, vol: .2, d: .12, at: .02 }); tone({ f: 1900, f2: 2100, type: 'sine', vol: .05, d: .25, at: .05 }); },
  spray: function () { noise({ type: 'bandpass', f: 3200, f2: 1800, q: 1.5, vol: .16, a: .02, d: .3 }); tone({ f: 200, f2: 140, type: 'sine', vol: .12, d: .1 }); },
  flame: function () { noise({ type: 'bandpass', f: 400, f2: 1600, q: .7, vol: .3, a: .04, d: .35 }); for (var i = 0; i < 4; i++) noise({ type: 'highpass', f: 4000, vol: .06, d: .02, at: .05 + Math.random() * .25 }); },
  // ---------- impacts ----------
  stone: function () { tone({ f: 160, f2: 70, type: 'sine', vol: .32, d: .12 }); noise({ type: 'bandpass', f: 1200, q: 1.5, vol: .2, d: .07 }); for (var i = 0; i < 2; i++) tone({ f: 600 + Math.random() * 600, type: 'triangle', vol: .05, d: .04, at: .07 + i * .06 }); },
  boom: function () { tone({ f: 110, f2: 32, type: 'sine', vol: .6, d: .55 }); noise({ type: 'lowpass', f: 1800, f2: 120, vol: .45, a: .005, d: .6 }); noise({ type: 'highpass', f: 3000, vol: .12, d: .08 }); },
  sizzle: function () { noise({ type: 'highpass', f: 4500, vol: .14, a: .02, d: .4 }); noise({ type: 'lowpass', f: 600, f2: 200, vol: .18, d: .15 }); },
  squish: function () { noise({ type: 'lowpass', f: 1500, f2: 250, vol: .32, d: .22 }); tone({ f: 260, f2: 90, type: 'sine', vol: .22, d: .18 }); tone({ f: 900, f2: 1300, type: 'sine', vol: .05, d: .08, at: .12 }); },
  chime: function () { [1568, 2093].forEach(function (f, i) { tone({ f: f, type: 'sine', vol: .07, d: .2, at: i * .05 }); }); },
  error: function () { tone({ f: 220, type: 'square', vol: .08, d: .12 }); tone({ f: 180, type: 'square', vol: .08, d: .16, at: .12 }); }
};
var SFX_GAP = { quackHi: 140, quackLo: 220, peep: 150, cackle: 500, bark: 260, squawk: 300, oink: 300, wee: 250, pew: 70, whirl: 300, swoosh: 160, gust: 300, swing: 90,
  twang: 90, cooker: 300, spray: 140, flame: 180, stone: 80, boom: 160, sizzle: 200, squish: 120, chime: 160, crash: 120, cracker: 90, quack: 90, deploy: 70, stab: 60, smash: 80, bite: 80, shot: 50, fire: 120, egg: 90, water: 60, thud: 50, wall: 80, duckdie: 150, meow: 400, dig: 250, heal: 300, hiss: 300 };
var SFX_MUST = { crash: 1, boom: 1, win: 1, lose: 1, horn: 1, tap: 1, done: 1, coin: 1, error: 1, colonel: 1, build: 1 };
function sfx(name) {
  if (!SND.on) return; var c = audio(); if (!c || c.state !== 'running' || !SFX[name]) return;
  var t = performance.now(); if (t - (SND.last[name] || 0) < (SFX_GAP[name] || 30)) return;
  var Q = SND.recent || (SND.recent = []); while (Q.length && t - Q[0] > 150) Q.shift();
  if (Q.length >= 9 && !SFX_MUST[name]) return; Q.push(t); SND.last[name] = t;
  try { SFX[name](); } catch (e) {}
}
function setSound(on) { SND.on = on; if (SND.sfxBus) SND.sfxBus.gain.value = on ? 1 : 0; soundSave(); }
function setMusic(on) { SND.music = on; if (SND.musicBus) SND.musicBus.gain.setTargetAtTime(on ? .32 : 0, SND.ctx.currentTime, .2); soundSave(); if (on) startMusic(); }

// ---------- music: a bouncy marimba loop over a plucky bass, calmer at home, punchier in raids ----------
var MUSIC = { timer: null, step: 0, next: 0 };
var SONG = { // 16 steps a bar, 4 bars; numbers are semitones from C4, null = rest
  lead: [0, null, 4, null, 7, null, 4, 7, 9, null, 7, null, 4, null, 2, null,  2, null, 5, null, 9, null, 5, 9, 11, null, 9, null, 7, null, 5, null,
         4, null, 7, null, 12, null, 11, 9, 7, null, 4, null, 7, 9, 7, null,  5, null, 4, null, 2, null, 4, 2, 0, null, null, null, 7, null, null, null],
  bass: [0, 7, 0, 7, 5, 12, 5, 12, 9, 4, 9, 4, 7, 2, 7, 2],   // one note per beat, 16 beats
  chordRoot: [0, 0, 0, 0, 5, 5, 5, 5, 9, 9, 9, 9, 7, 7, 7, 7]
};
function startMusic() {
  if (MUSIC.timer || !SND.ctx || SND.ctx.state !== 'running') return;
  MUSIC.next = SND.ctx.currentTime + .1;
  MUSIC.timer = setInterval(function () {
    var c = SND.ctx; if (!c || c.state !== 'running') return;
    var bpm = (typeof screen !== 'undefined' && screen === 'raid') ? 132 : 108, st = 60 / bpm / 4;
    while (MUSIC.next < c.currentTime + .25) { if (SND.music) playStep(MUSIC.step, MUSIC.next, st); MUSIC.step = (MUSIC.step + 1) % 64; MUSIC.next += st; }
  }, 60);
}
function midi(n) { return 261.63 * Math.pow(2, n / 12); }
function playStep(i, t, st) {
  var c = SND.ctx, at = t - c.currentTime, dst = SND.musicBus, raid = typeof screen !== 'undefined' && screen === 'raid';
  var n = SONG.lead[i]; if (n !== null && n !== undefined) { // marimba: sine + a quick high partial
    tone({ f: midi(n + 12), type: 'sine', vol: .22, a: .004, d: .28, at: at, dest: dst }); tone({ f: midi(n + 12) * 4, type: 'sine', vol: .05, a: .002, d: .05, at: at, dest: dst }); }
  if (i % 4 === 0) { var b = SONG.bass[(i / 4) % 16]; tone({ f: midi(b - 24), type: 'triangle', vol: .32, a: .006, d: st * 3, at: at, dest: dst }); }
  if (i % 8 === 4) { var r = SONG.chordRoot[(i / 4) % 16]; [0, 4, 7].forEach(function (k) { tone({ f: midi(r + k), type: 'triangle', vol: .05, a: .01, d: st * 2.5, at: at, dest: dst }); }); }
  if (raid && i % 4 === 0) noise({ type: 'lowpass', f: 180, vol: .25, d: .08, at: at, dest: dst });          // kick
  if (raid && i % 8 === 4) noise({ type: 'bandpass', f: 1800, q: .8, vol: .14, d: .1, at: at, dest: dst });   // snare
  if (i % 2 === 1) noise({ type: 'highpass', f: 7000, vol: raid ? .05 : .025, d: .03, at: at, dest: dst });   // hat
}

// ---- src/02-data.js ----
// Duck War — what every building and troop is. Levels 1-15; the art changes shape every 3 levels (5 stages).
// cost(lv) = price to build (lv 1) or to upgrade to lv. res: which resource pays. time(lv) in seconds.
var STAGES = 5, MAX_LV = 15;
function stageOf(lv) { return Math.min(STAGES, Math.floor((Math.max(1, lv) - 1) / 3) + 1); }
function grow(base, lv, k) { return Math.round(base * Math.pow(k || 1.55, lv - 1)); }

var B = {
  hq:            { name: 'บ้านเป็ด',          size: 3, art: 'hq',            hp: 1500, res: 'honey', cost: 1000, time: 10, kind: 'hq', max: 1, store: 1500 },
  honeypump:     { name: 'ปั๊มน้ำผึ้ง',        size: 2, art: 'honeypump',     hp: 420, res: 'veggie', cost: 150, time: 5, kind: 'make', make: 'honey', rate: 400, max: [1, 2, 3, 4, 5, 6, 6, 7] },
  veggieblender: { name: 'เครื่องปั่นผัก',     size: 2, art: 'veggieblender', hp: 420, res: 'honey', cost: 150, time: 5, kind: 'make', make: 'veggie', rate: 400, max: [1, 2, 3, 4, 5, 6, 6, 7] },
  syrupstove:    { name: 'เตาเคี่ยวไซรัป',    size: 2, art: 'syrupstove',    hp: 600, res: 'veggie', cost: 20000, time: 60, kind: 'make', make: 'syrup', rate: 20, unlock: 5, max: [0, 0, 0, 0, 1, 2, 2, 3] },
  honeyjar:      { name: 'โหลน้ำผึ้ง',         size: 2, art: 'honeyjar',      hp: 500, res: 'veggie', cost: 300, time: 10, kind: 'store', store: 'honey', cap: 1500, max: [1, 1, 2, 2, 3, 3, 4, 4, 5] },
  veggiejar:     { name: 'โหลน้ำผัก',          size: 2, art: 'veggiejar',     hp: 500, res: 'honey', cost: 300, time: 10, kind: 'store', store: 'veggie', cap: 1500, max: [1, 1, 2, 2, 3, 3, 4, 4, 5] },
  syrupjar:      { name: 'โหลไซรัป',           size: 2, art: 'syrupjar',      hp: 700, res: 'veggie', cost: 25000, time: 60, kind: 'store', store: 'syrup', cap: 2000, unlock: 5, max: [0, 0, 0, 0, 1, 1, 1, 1] },
  camp:          { name: 'ค่ายพักเป็ด',        size: 3, art: 'camp',          hp: 400, res: 'veggie', cost: 200, time: 8, kind: 'camp', space: 20, max: [1, 2, 2, 3, 3, 4, 4, 4] },
  barracks:      { name: 'ลานฝึกเป็ด',         size: 2, art: 'barracks',      hp: 450, res: 'veggie', cost: 150, time: 6, kind: 'train', max: [1, 2, 2, 3, 3, 4, 4, 4] },
  lab:           { name: 'ห้องทดลองเป็ด',      size: 2, art: 'lab',           hp: 500, res: 'veggie', cost: 5000, time: 30, kind: 'lab', unlock: 3, max: [0, 0, 1, 1, 1, 1, 1, 1] },
  herohall:      { name: 'ศาลาผู้นำเป็ด',      size: 2, art: 'hero',          hp: 900, res: 'honey', cost: 8000, time: 40, kind: 'hero', unlock: 3, max: [0, 0, 1, 1, 1, 1, 1, 1] },
  workshop:      { name: 'โรงนาช่างเป็ด',      size: 2, art: 'workshop',      hp: 500, res: 'honey', cost: 4000, time: 30, kind: 'deco', unlock: 4, max: [0, 0, 0, 1, 1, 1, 1, 1] },
  slingshot:     { name: 'หนังสติ๊กยักษ์',      size: 2, turret: 'slingshot',  hp: 520, res: 'honey', cost: 250, time: 8, kind: 'defense', range: 6.5, dmg: 18, rate: 0.9, shot: 'rock', ground: true, max: [2, 2, 3, 3, 4, 4, 5, 5] },
  boxtower:      { name: 'หอกล่องเป็ดยิงไกล',   size: 2, turret: 'boxtower',   hp: 480, res: 'honey', cost: 1000, time: 15, kind: 'defense', range: 8, dmg: 11, rate: 0.75, shot: 'pebble', ground: true, air: true, unlock: 2, max: [0, 1, 2, 2, 3, 3, 4, 4] },
  mortar:        { name: 'หม้อความดันยิงไกล',  size: 2, turret: 'mortar',     hp: 500, res: 'honey', cost: 6000, time: 40, kind: 'defense', range: 10, minRange: 3, dmg: 30, rate: 4.5, shot: 'egg', splash: 1.5, ground: true, unlock: 3, max: [0, 0, 1, 1, 2, 2, 3, 3] },
  watergun:      { name: 'ปืนฉีดน้ำต่อสู้อากาศ', size: 2, turret: 'watergun',  hp: 600, res: 'honey', cost: 22000, time: 60, kind: 'defense', range: 9, dmg: 60, rate: 1, shot: 'water', air: true, unlock: 4, max: [0, 0, 0, 1, 1, 2, 2, 3] },
  chili:         { name: 'ป้อมเชฟพริกไฟ',       size: 2, turret: 'chili',      hp: 650, res: 'honey', cost: 40000, time: 90, kind: 'defense', range: 5, dmg: 40, rate: 0.55, shot: 'chili', ground: true, air: true, unlock: 6, max: [0, 0, 0, 0, 0, 1, 1, 2] },
  wall:          { name: 'กำแพง',               size: 1, wall: true,           hp: 300, res: 'honey', cost: 50, time: 0, kind: 'wall', max: [0, 25, 50, 75, 100, 125, 150, 175] }
};
Object.keys(B).forEach(function (k) { B[k].key = k; });
function maxCount(k, hqLv) { var m = B[k].max; return typeof m === 'number' ? m : (m[Math.min(m.length, hqLv) - 1] || 0); }
function bCost(k, lv) { var b = B[k]; return b.wall ? grow(b.cost, lv, 2.1) : grow(b.cost, lv, 1.9); }
function bTime(k, lv) { var b = B[k]; return lv === 1 && b.kind !== 'hq' ? b.time : Math.round(b.time * Math.pow(2.2, lv - 1)); }
function bHp(k, lv) { return grow(B[k].hp, lv, 1.2); }
function bMaxLv(k, hqLv) { return k === 'hq' ? MAX_LV : Math.min(MAX_LV, hqLv + (B[k].kind === 'wall' ? 0 : 1)); }

// Troops. size = housing space; time = training seconds; pref: what they go for first.
var U = {   // Clash counterpart in the comment; unlock = training-yard level
  fork:    { name: 'เป็ดส้อม',             art: 'fork',    h: 0.95, space: 1,  cost: 25,   res: 'veggie', time: 5,   hp: 45,   dmg: 9,   rate: 1,   range: 0.5, speed: 1.6,  pref: 'any',      hit: 'stab' },                                  // barbarian
  sling:   { name: 'เป็ดหนังสติ๊ก',         art: 'sling',   h: 0.95, space: 1,  cost: 50,   res: 'veggie', time: 6,   hp: 22,   dmg: 8,   rate: 1,   range: 3.5, speed: 1.5,  pref: 'any',      hit: 'shot', unlock: 2 },                       // archer
  giant:   { name: 'เป็ดยักษ์กระทะ',        art: 'giant',   h: 1.35, space: 5,  cost: 250,  res: 'veggie', time: 30,  hp: 320,  dmg: 12,  rate: 2,   range: 0.6, speed: 0.75, pref: 'defense',  hit: 'smash', unlock: 3 },                      // giant
  thief:   { name: 'เป็ดขโมย',             art: 'thief',   h: 0.95, space: 1,  cost: 30,   res: 'veggie', time: 6,   hp: 25,   dmg: 10,  rate: 1,   range: 0.5, speed: 2.6,  pref: 'resource', hit: 'stab', resBonus: 2, unlock: 3 },       // goblin: double damage on resource buildings
  bomber:  { name: 'เป็ดระเบิด',            art: 'bomber',  h: 0.95, space: 2,  cost: 100,  res: 'veggie', time: 12,  hp: 40,   dmg: 60,  rate: 1,   range: 0.5, speed: 2.4,  pref: 'wall',     hit: 'blast', splash: 1.3, wallBonus: 40, unlock: 4 },   // wall breaker: runs at a wall, blows itself up
  digger:  { name: 'เป็ดขุดดิน',            art: 'digger',  h: 0.95, space: 1,  cost: 40,   res: 'veggie', time: 7,   hp: 30,   dmg: 12,  rate: 1,   range: 0.5, speed: 2.2,  pref: 'resource', hit: 'stab', burrow: true, unlock: 5 },     // miner: tunnels under walls
  balloon: { name: 'เป็ดบอลลูนถุงก๊อบแก๊บ',  art: 'balloon', h: 2.7,  space: 5,  cost: 400,  res: 'veggie', time: 35,  hp: 260,  dmg: 72,  rate: 3,   range: 0.35, speed: 0.85, pref: 'defense', hit: 'cracker', splash: 1.2, air: true, unlock: 5 },   // balloon
  chef:    { name: 'เป็ดเชฟพริก',           art: 'chef',    h: 1.0,  space: 4,  cost: 600,  res: 'veggie', time: 40,  hp: 75,   dmg: 50,  rate: 1.5, range: 3,   speed: 1.4,  pref: 'any',      hit: 'fire', splash: 1, unlock: 6 },           // wizard
  nurse:   { name: 'เป็ดพยาบาล',            art: 'nurse',   h: 1.0,  space: 4,  cost: 500,  res: 'veggie', time: 40,  hp: 150,  dmg: 0,   heal: 18, rate: 1, range: 2.5, speed: 1.4, pref: 'heal', hit: 'heal', unlock: 6 },               // healer
  plane:   { name: 'เป็ดขี่จรวดพับ',         art: 'plane',   h: 1.25, space: 2,  cost: 90,   res: 'veggie', time: 10,  hp: 60,   dmg: 15,  rate: 1,   range: 2.5, speed: 2.4,  pref: 'any',      hit: 'shot', air: true, unlock: 7 },          // minion
  prop:    { name: 'เป็ดใบพัด',             art: 'prop',    h: 1.7,  space: 10, cost: 900,  res: 'veggie', time: 60,  hp: 260,  dmg: 32,  rate: 1.2, range: 2,   speed: 1.6,  pref: 'any',      hit: 'tomato', splash: 1.1, air: true, rage: true, unlock: 7 },   // baby dragon: angrier alone; a ceiling fan stuck to its butt hauls it up, it drops tomato bombs
  pot:     { name: 'เป็ดหม้อ',              art: 'pot',     h: 1.25, space: 8,  cost: 450,  res: 'veggie', time: 60,  hp: 800,  dmg: 14,  rate: 2,   range: 0.6, speed: 0.65, pref: 'defense',  hit: 'smash', unlock: 7 },                      // golem-ish tank: soaks the shots
  kite:    { name: 'เป็ดว่าว',              art: 'kite',    h: 1.9,  space: 20, cost: 1800, res: 'veggie', time: 120, hp: 1200, dmg: 90,  rate: 1.5, range: 2.5, speed: 1.2,  pref: 'any',      hit: 'fire', splash: 1, air: true, unlock: 8 },   // dragon
  mop:     { name: 'เป็ดไม้ถูพื้น',          art: 'mop',     h: 1.0,  space: 8,  cost: 90,   res: 'syrup',  time: 60,  hp: 340,  dmg: 48,  rate: 1.8, range: 0.6, speed: 1.6,  pref: 'any',      hit: 'spin', spin: 1.1, unlock: 8 },          // valkyrie: spins, hits all round
  pig:     { name: 'เป็ดขี่หมู',             art: 'pig',     h: 1.2,  space: 5,  cost: 80,   res: 'syrup',  time: 45,  hp: 280,  dmg: 40,  rate: 1,   range: 0.6, speed: 2.0,  pref: 'defense',  hit: 'smash', jump: true, unlock: 8 },          // hog rider
  egret:   { name: 'นกกระยาง',              art: 'egret',   h: 1.6,  space: 25, cost: 1500, res: 'veggie', time: 150, hp: 1400, dmg: 180, rate: 2,   range: 0.7, speed: 0.9,  pref: 'any',      hit: 'stab', unlock: 9 },                       // P.E.K.K.A
  witch:   { name: 'เป็ดแม่มด',             art: 'witch',   h: 1.05, space: 12, cost: 150,  res: 'syrup',  time: 90,  hp: 160,  dmg: 25,  rate: 1.4, range: 3.5, speed: 1.3,  pref: 'any',      hit: 'magic', summon: 'duckling', unlock: 9 },   // witch: raises ducklings
  fan:     { name: 'เป็ดพัดลม',             art: 'fan',     h: 1.7,  space: 30, cost: 250,  res: 'syrup',  time: 120, hp: 2400, dmg: 6,   rate: 1,   range: 1,   speed: 1.0,  pref: 'airdef',   hit: 'shot', air: true, split: 'fanlet', unlock: 9 },   // lava hound: hunts anti-air, bursts into small fans
  dog:     { name: 'หมาดัลเมเชียน',          art: 'dog',     h: 1.45, space: 10, cost: 300,  res: 'syrup',  time: 90,  hp: 1100, dmg: 70,  rate: 1.2, range: 0.7, speed: 1.1,  pref: 'any',      hit: 'bite', unlock: 9 },                       // yeti
  // heroes: never trained; they come from the leaders' hall (ศาลาผู้นำเป็ด), one each per raid, and level with the hall
  h_colonel: { name: 'ผู้พันเป็ด',          art: 'colonel', h: 3.0,  space: 0, hp: 950,  dmg: 38,  rate: 1.2, range: 0.7, speed: 1.55, pref: 'defense', hit: 'smash', hero: true, hidden: true, hq: 3, aura: 3.5,
               skill: 'เป่านกหวีดบุก!', skillTxt: 'ทหารรอบตัวเร็วขึ้น ตีแรงขึ้น และฟื้นเลือด' },                          // grand warden: walks at the front, ducks near him hit harder
  h_king:    { name: 'ราชาดัลเมเชียน',      art: 'dog',     h: 2.2,  space: 0, hp: 1900, dmg: 95,  rate: 1.2, range: 0.8, speed: 1.25, pref: 'any',     hit: 'bite',  hero: true, hidden: true, hq: 5, crown: 'king',
               skill: 'หอนเรียกพล', skillTxt: 'ฟื้นเลือด คลั่ง และเรียกเป็ดส้อมมาช่วย' },                                    // barbarian king
  h_queen:   { name: 'ราชินีนกกระยาง',      art: 'egret',   h: 2.3,  space: 0, hp: 850,  dmg: 62,  rate: 0.9, range: 3.8, speed: 1.4,  pref: 'any',     hit: 'shot', shot: 'feather', hero: true, hidden: true, hq: 7, crown: 'queen',
               skill: 'ม่านขนนก', skillTxt: 'หายตัว ป้อมยิงไม่เห็น และยิงแรงขึ้นสองเท่า' },                                // archer queen: darts feathers from range
  // not trainable: made by other troops
  duckling: { name: 'ลูกเป็ด', art: 'fork', h: 0.55, space: 0, hp: 22, dmg: 6, rate: 1, range: 0.5, speed: 2.0, pref: 'any', hit: 'stab', hidden: true },
  fanlet:   { name: 'พัดลมจิ๋ว', art: 'fan',  h: 0.75, space: 0, hp: 45, dmg: 9, rate: 1, range: 2, speed: 2.0, pref: 'any', hit: 'shot', air: true, hidden: true }
};
Object.keys(U).forEach(function (k) { U[k].key = k; });
// flyers cruise well above the rooftops (tiles of height), bobbing a little; they sink to the ground when shot down
var AIR_ALT = { balloon: 2.5, plane: 1.9, prop: 2.1, kite: 2.9, fan: 2.3, fanlet: 1.5 };
function airAlt(t) {
  var u = U[t.kind]; if (!u || !u.air || t.side !== 'duck') return 0;
  var a = (AIR_ALT[t.kind] || 2) + Math.sin(now() / 420 + t.x * 1.7) * .12;
  if (t.dead) a *= Math.max(0, 1 - (now() - (t.deadAt || now())) / 550);
  return a;
}
function uHp(k, lv) { return grow(U[k].hp, lv || 1, U[k].hero ? 1.1 : 1.18); }
function uDmg(k, lv) { return grow(U[k].dmg, lv || 1, U[k].hero ? 1.1 : 1.18); }
var HERO_KEYS = ['h_colonel', 'h_king', 'h_queen'];
var HEROES = { colonel: { name: 'ผู้พันเป็ด', art: 'colonel', h: 3.0, speed: 0.8 } };   // hero-sized, like a Clash king
var CATS = { cat_spatula: { art: 'cat_spatula', h: 1, hp: 120, dmg: 12, rate: 1, range: 0.6, speed: 1.5, hit: 'smash' },
             cat_pan: { art: 'cat_pan', h: 1.15, hp: 260, dmg: 16, rate: 1.3, range: 0.6, speed: 1.1, hit: 'smash' },
             cat_king: { art: 'cat_king', h: 1.35, hp: 900, dmg: 40, rate: 1.4, range: 0.7, speed: 1.0, hit: 'smash' } };
var RES = { honey: { name: 'น้ำผึ้ง', color: '#ffc93a' }, veggie: { name: 'น้ำผัก', color: '#77d957' }, syrup: { name: 'ไซรัป', color: '#e3425a' }, coin: { name: 'เหรียญเป็ด', color: '#ffb000' } };

// ---- src/03-home.js ----
// Duck War — the home base: resources, building/upgrading with builder ducks, training, offline progress.
var D = null;
function newGame() {
  var d = { v: 1, res: { honey: 1200, veggie: 1200, syrup: 0, coin: TEST ? 1000000 : 250 }, buildings: [], army: {}, queue: [], builders: 2, next: 1, t: now(), raid: 1, stars: 0, name: 'ฐานเป็ด' };
  function add(k, x, y, lv) { d.buildings.push({ id: d.next++, k: k, x: x + 8, y: y + 8, lv: lv || 1 }); }   // laid out round the middle of the 40x40 map
  add('hq', 10, 10); add('honeypump', 6, 9); add('veggieblender', 15, 10); add('honeyjar', 7, 13); add('veggiejar', 14, 14);
  add('camp', 5, 15); add('barracks', 10, 15); add('slingshot', 11, 6);
  d.army = { fork: 8 }; d.map = MAP;
  return d;
}
function migrateSave(d) { // saves from the 24x24 map: move the base to the middle of the bigger one
  if (!d.map) { d.buildings.forEach(function (b) { b.x += 8; b.y += 8; }); d.map = MAP; }
  return d;
}
function hqCenter() { var h = D.buildings.find(function (b) { return b.k === 'hq'; }); return h ? { x: h.x + 1.5, y: h.y + 1.5 } : { x: MAP / 2, y: MAP / 2 }; }
function hqLv() { var h = D.buildings.find(function (b) { return b.k === 'hq'; }); return h ? h.lv : 1; }
function capacity(r) {
  if (r === 'coin') return Infinity;
  var c = r === 'syrup' ? 0 : B.hq.store * Math.pow(1.4, hqLv() - 1);
  D.buildings.forEach(function (b) { var d = B[b.k]; if (d.kind === 'store' && d.store === r && !(b.up && b.lv === 0)) c += d.cap * Math.pow(1.7, b.lv - 1); });   // grows fast enough that every duck-house level stays affordable
  return Math.round(c);
}
function rate(b) { var d = B[b.k]; return d.rate * Math.pow(1.4, b.lv - 1); }   // per hour
function armySpace() { var s = 0; D.buildings.forEach(function (b) { if (B[b.k].kind === 'camp' && b.lv > 0) s += Math.round(B.camp.space * (1 + .25 * (b.lv - 1))); }); return s; }
function armyUsed(withQueue) { var s = 0; Object.keys(D.army).forEach(function (k) { s += (D.army[k] || 0) * U[k].space; }); if (withQueue) D.queue.forEach(function (q) { s += U[q.k].space; }); return s; }
function barracksLv() { var m = 0; D.buildings.forEach(function (b) { if (b.k === 'barracks') m = Math.max(m, b.lv); }); return m; }
// heroes: unlocked by the leaders' hall + duck-house level; one that falls in a raid rests a while before the next one
function hallLv() { var m = 0; D.buildings.forEach(function (b) { if (b.k === 'herohall') m = Math.max(m, b.lv); }); return m; }
function heroOpen(k) { return hallLv() > 0 && hqLv() >= U[k].hq; }
function heroRest(k) { var r = (D.heroRest || {})[k] || 0; return Math.max(0, r - now()); }
function heroRestMs(lv) { return TEST ? 30000 : (4 + lv) * 60000; }
function heroWake(k) { var ms = heroRest(k); if (!ms) return true; if (!pay('coin', coinsFor(ms))) return false; D.heroRest[k] = 0; writeSave(); return true; }
function busyBuilders() { return D.buildings.filter(function (b) { return b.up; }).length; }
function count(k) { return D.buildings.filter(function (b) { return b.k === k; }).length; }

// Advance the base to the current time (also after the app was closed).
function homeTick() {
  var t0 = D.t, t = now(), dt = Math.max(0, Math.min(t - t0, 30 * 864e5)) / 3600000; D.t = t;
  ['honey', 'veggie', 'syrup'].forEach(function (r) {
    var add = 0; D.buildings.forEach(function (b) { var d = B[b.k]; if (d.kind === 'make' && d.make === r && !b.up) {
      var boosted = b.boost ? Math.max(0, Math.min(t, b.boost) - Math.max(t0, t - dt * 3600000)) / 3600000 : 0;   // hours of this stretch under x2
      add += rate(b) * (dt + boosted); } });
    D.res[r] = Math.min(capacity(r), D.res[r] + add);
  });
  D.buildings.forEach(function (b) { if (b.up && b.up.until <= t) { b.lv = b.up.to; delete b.up; b.pop = now(); toast(B[b.k].name + ' เลเวล ' + b.lv + ' เสร็จแล้ว!'); sfx('done'); buzz('success'); dirty = true; } });
  while (D.queue.length && D.queue[0].until <= t) {
    var q = D.queue.shift(); D.army[q.k] = (D.army[q.k] || 0) + 1; dirty = true; sfx('quack');
    if (D.queue.length) D.queue[0].until = Math.max(D.queue[0].until, t);
  }
}
function canPay(r, n) { return D.res[r] >= n; }
function pay(r, n) { if (!canPay(r, n)) { toast(RES[r].name + 'ไม่พอ'); sfx('error'); buzz('heavy'); return false; } D.res[r] -= n; if (r === 'coin') sfx('coin'); return true; }
function coinsFor(ms) { return Math.max(1, Math.ceil(ms / 60000)); }   // 1 duck coin per remaining minute

function footprintFree(k, x, y, ignoreId) {
  var s = B[k].size; if (x < 1 || y < 1 || x + s > MAP - 1 || y + s > MAP - 1) return false;
  return !D.buildings.some(function (b) { if (b.id === ignoreId) return false; var t = B[b.k].size; return x < b.x + t && b.x < x + s && y < b.y + t && b.y < y + s; });
}
function placeBuilding(k, x, y) {
  var d = B[k];
  if (count(k) >= maxCount(k, hqLv())) { toast('สร้างครบแล้ว อัปเกรดบ้านเป็ดเพื่อสร้างเพิ่ม'); return false; }
  if (!footprintFree(k, x, y)) { toast('วางตรงนี้ไม่ได้'); return false; }
  if (d.time > 0 && busyBuilders() >= D.builders) { toast('เป็ดช่างไม่ว่าง'); return false; }
  if (!pay(d.res, bCost(k, 1))) return false;
  var b = { id: D.next++, k: k, x: x, y: y, lv: d.time > 0 ? 0 : 1 };
  if (d.time > 0) b.up = { to: 1, until: now() + bTime(k, 1) * 1000, start: now() };
  b.pop = now(); D.buildings.push(b); writeSave(); buzz('medium'); return b;
}
function upgradeBuilding(b) {
  var to = b.lv + 1, d = B[b.k];
  if (b.up) return false;
  if (to > bMaxLv(b.k, hqLv())) { toast(b.k === 'hq' ? 'เลเวลสูงสุดแล้ว' : 'อัปเกรดบ้านเป็ดก่อน'); return false; }
  if (d.time > 0 && busyBuilders() >= D.builders) { toast('เป็ดช่างไม่ว่าง'); return false; }
  if (!pay(d.res, bCost(b.k, to))) return false;
  var t = bTime(b.k, to);
  if (t > 0) b.up = { to: to, until: now() + t * 1000, start: now() }; else { b.lv = to; b.pop = now(); }
  writeSave(); sfx('build'); buzz('medium'); return true;
}
function finishNow(b) {
  if (!b.up) return; var c = coinsFor(b.up.until - now());
  if (!pay('coin', c)) return; b.up.until = now(); homeTick(); writeSave();
}
function train(k) {
  var u = U[k]; if ((u.unlock || 1) > barracksLv()) { toast('อัปเกรดลานฝึกเป็ดก่อน'); return; }
  if (armyUsed(true) + u.space > armySpace()) { toast('ค่ายพักเต็ม'); return; }
  if (!pay(u.res, u.cost)) return;
  var start = D.queue.length ? D.queue[D.queue.length - 1].until : now();
  D.queue.push({ k: k, until: start + u.time * 1000 }); writeSave(); sfx('train'); buzz('light');
}
function finishTraining() {
  if (!D.queue.length) return; var c = coinsFor(D.queue[D.queue.length - 1].until - now());
  if (!pay('coin', c)) return; D.queue.forEach(function (q) { q.until = now(); }); homeTick(); writeSave();
}
function moveBuilding(b, x, y) { if (!footprintFree(b.k, x, y, b.id)) return false; b.x = x; b.y = y; writeSave(); return true; }

// ---------- speed-ups for resources ----------
// a rewarded video doubles one maker's output for an hour; duck coins fill that resource's storage right away
var BOOST_MS = 3600000, VIDEO_PER_DAY = 5;
function totalRate(r) { var t = 0; D.buildings.forEach(function (b) { var d = B[b.k]; if (d.kind === 'make' && d.make === r && b.lv > 0 && !b.up) t += rate(b); }); return t; }
function fillMissing(r) { return Math.max(0, Math.floor(capacity(r) - D.res[r])); }
function fillCoins(r) { // priced like any other speed-up: 1 duck coin per minute the makers would need
  var miss = fillMissing(r), tr = totalRate(r); if (!miss) return 0;
  return tr > 0 ? coinsFor(miss / tr * 3600000) : Math.max(1, Math.ceil(miss / 50));
}
function fillWithCoins(r) {
  var miss = fillMissing(r), c = fillCoins(r);
  if (!miss) { toast('คลัง' + RES[r].name + 'เต็มอยู่แล้ว'); return false; }
  if (D.res.coin < c) { toast('เหรียญเป็ดไม่พอ'); buzz('heavy'); return false; }
  D.res.coin -= c; D.res[r] += miss; sfx('coin'); buzz('success'); toast('🪙 เติม' + RES[r].name + ' +' + fmt(miss) + ' เต็มคลังแล้ว!');
  D.buildings.forEach(function (b) { var d = B[b.k]; if ((d.kind === 'store' && d.store === r) || (d.kind === 'make' && d.make === r)) b.pop = now(); });
  writeSave(); dirty = true; return true;
}
function videosLeft() { var day = new Date().toDateString(); if (D.vidDay !== day) { D.vidDay = day; D.vids = 0; } return VIDEO_PER_DAY - (D.vids || 0); }
function applyBoost(b) { b.boost = Math.max(now(), b.boost || 0) + BOOST_MS; b.pop = now(); sfx('boost'); buzz('success'); toast('⚡ ' + B[b.k].name + ' ผลิตเร็ว x2 นาน 1 ชั่วโมง'); writeSave(); dirty = true; }
function boostWithVideo(b, done) {
  if (videosLeft() <= 0) { toast('ดูวิดีโอครบ ' + VIDEO_PER_DAY + ' ครั้งแล้ววันนี้'); return; }
  showRewardedVideo(function (ok) { if (!ok) { toast('ต้องดูวิดีโอจนจบถึงได้รางวัล'); return; } D.vids = (D.vids || 0) + 1; applyBoost(b); if (done) done(); });
}
// Rewarded video: the Android app provides window.DuckAds once an ad network is wired in.
// Until then test builds show a 5-second stand-in so the flow can be tried end to end.
function showRewardedVideo(cb) {
  if (window.DuckAds && window.DuckAds.showRewarded) { window.duckAdResult = function (ok) { window.duckAdResult = null; cb(!!ok); }; window.DuckAds.showRewarded(); return; }
  if (!TEST) { toast('วิดีโอยังไม่พร้อม ลองใหม่ภายหลัง'); return; }
  var o = document.createElement('div'); o.className = 'adfake'; document.body.appendChild(o); var left = 5;
  (function tick() { o.innerHTML = '<div>📺 วิดีโอโฆษณา (ตัวอย่างสำหรับทดสอบ)</div><b>' + left + '</b>'; if (left-- > 0) setTimeout(tick, 1000); else { o.remove(); cb(true); } })();
}

// ---------- the colonel: patrols the whole base, building by building; salutes the defenses he inspects ----------
var COLONEL = null;
function colonelTick(dt) {
  var hq = D.buildings.find(function (b) { return b.k === 'hq'; }); if (!hq) return;
  var hc = { x: hq.x + 1.5, y: hq.y + 1.5 };
  if (!COLONEL) COLONEL = { side: 'hero', kind: 'colonel', x: hc.x + 2.8, y: hc.y + .4, face: 2.36, hp: 1, max: 1, wait: 1 };
  var c = COLONEL; c.moving = false;
  if (onFootprint(c.x, c.y)) { var sp = openSpot(c.x, c.y); if (sp) { c.x = sp.x; c.y = sp.y; c.path = null; } }   // a building was put on top of him
  if (c.salutes > 0 && now() - c.atk > 560) { c.salutes--; c.atk = now(); }   // a proper salute: two snaps
  if (c.wait > 0) { c.wait -= dt; return; }
  if (!c.path || !c.path.length) {
    if (c.visit) { c.face = Math.atan2(c.visit.y - c.y, c.visit.x - c.x); // arrived: look at the building, salute a defense (and sometimes the rest)
      var def = B[c.visit.k].kind === 'defense'; if (def ? Math.random() < .8 : Math.random() < .25) { c.atk = now(); c.salutes = 1; if (def && Math.random() < .3) sfx('colonel'); }
      c.visit = null; c.wait = 1.8 + Math.random() * 2.5; dirty = true; return; }
    colonelPlan(c); if (!c.path) c.wait = 1; return;
  }
  var wp = c.path[0], dx = wp.x - c.x, dy = wp.y - c.y, d = Math.hypot(dx, dy), st = HEROES.colonel.speed * dt;
  if (d < .08) { c.path.shift(); return; }
  c.x += dx / d * Math.min(st, d); c.y += dy / d * Math.min(st, d); c.face = Math.atan2(dy, dx); c.moving = true; c.walk = (c.walk || 0) + Math.min(st, d); dirty = true;
}
// pick a building anywhere on the base (defenses more often), walk to open ground next to it along a tile path round the buildings
function colonelPlan(c) {
  var list = D.buildings.filter(function (b) { return b.k !== 'wall' && b !== c.last; }); if (!list.length) return;
  var w = list.map(function (b) { return B[b.k].kind === 'defense' ? 3 : 1; }), tot = w.reduce(function (a, b) { return a + b; }, 0), r = Math.random() * tot, pick = list[0];
  for (var i = 0; i < list.length; i++) { r -= w[i]; if (r <= 0) { pick = list[i]; break; } }
  var blocked = new Uint8Array(MAP * MAP); D.buildings.forEach(function (b) { var s = B[b.k].size; for (var x = b.x; x < b.x + s; x++) for (var y = b.y; y < b.y + s; y++) if (x >= 0 && y >= 0 && x < MAP && y < MAP) blocked[y * MAP + x] = 1; });
  var s = B[pick.k].size, goals = {};
  for (var gx = pick.x - 1; gx <= pick.x + s; gx++) for (var gy = pick.y - 1; gy <= pick.y + s; gy++) if (gx >= 1 && gy >= 1 && gx < MAP - 1 && gy < MAP - 1 && !blocked[gy * MAP + gx]) goals[gy * MAP + gx] = 1;
  var sx = clamp(Math.floor(c.x), 0, MAP - 1), sy = clamp(Math.floor(c.y), 0, MAP - 1), start = sy * MAP + sx, prev = new Int32Array(MAP * MAP).fill(-2), q = [start], end = -1; prev[start] = -1;
  while (q.length && end < 0) { var cur = q.shift(); if (goals[cur]) { end = cur; break; } var cx = cur % MAP, cy = (cur / MAP) | 0;
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (dd) { var nx = cx + dd[0], ny = cy + dd[1]; if (nx < 1 || ny < 1 || nx >= MAP - 1 || ny >= MAP - 1) return; var n = ny * MAP + nx; if (prev[n] !== -2 || blocked[n]) return; prev[n] = cur; q.push(n); }); }
  if (end < 0) { c.last = pick; return; }
  var path = []; for (var p = end; p >= 0 && p !== start; p = prev[p]) path.unshift({ x: p % MAP + .5 + (Math.random() - .5) * .3, y: ((p / MAP) | 0) + .5 + (Math.random() - .5) * .3 });
  for (var k = path.length - 2; k > 0; k--) { var A = path[k - 1], Bp = path[k + 1]; if (Math.abs(A.x - Bp.x) < .6 || Math.abs(A.y - Bp.y) < .6) path.splice(k, 1); }   // drop the middle of straight runs
  c.path = path; c.last = pick; c.visit = { k: pick.k, x: pick.x + s / 2, y: pick.y + s / 2 };
}
function onFootprint(x, y) { return D.buildings.some(function (b) { var s = B[b.k].size; return x > b.x && y > b.y && x < b.x + s && y < b.y + s; }); }
function openSpot(x, y) { for (var r = 1; r < 8; r++) for (var i = 0; i < 16; i++) { var a = i / 16 * 6.283, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; if (px > 1 && py > 1 && px < MAP - 1 && py < MAP - 1 && !insideBuilding(px, py)) return { x: px, y: py }; } return null; }
function insideBuilding(x, y) { return D.buildings.some(function (b) { var s = B[b.k].size; return x > b.x - .45 && y > b.y - .45 && x < b.x + s + .45 && y < b.y + s + .45; }); }
var COLONEL_LINES = ['ทหารเป็ด! เตรียมพร้อม!', 'แมวจะไม่ได้แตะไข่ของเราแม้แต่ฟองเดียว', 'อัปเกรดฐานให้แข็งแรงไว้นะ', 'ก๊าบ! ผู้พันตรวจแถว', 'น้ำผึ้งพร้อม น้ำผักพร้อม บุกได้!'];

// ---- src/04-battle.js ----
// Duck War — raids on cat bases: base generator, troop AI (targets, paths around buildings, breaking walls),
// turret aiming and shots, cat guards, stars and loot. Pure simulation: rendering lives in 05-render.js.
var R = null;   // the running raid
function rng(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function catBase(n) {
  var C = MAP / 2 - 1, r = rng(n * 7919 + 13), hq = Math.min(10, 1 + Math.floor((n + 1) / 2)), list = [], id = 1;
  function lv(base) { return clamp(Math.round(base + (r() - .5) * 2), 1, MAX_LV); }
  function free(k, x, y) { var s = B[k].size; if (x < 2 || y < 2 || x + s > MAP - 2 || y + s > MAP - 2) return false; return !list.some(function (b) { var t = B[b.k].size; return x < b.x + t + (b.k === 'wall' || k === 'wall' ? 0 : 0) && b.x < x + s && y < b.y + t && b.y < y + s; }); }
  function put(k, x, y, l) { if (!free(k, x, y)) return false; list.push({ id: id++, k: k, x: x, y: y, lv: l || lv(hq) }); return true; }
  function scatter(k, l, rad) { for (var i = 0; i < 60; i++) { var a = r() * 6.28, d = rad[0] + r() * (rad[1] - rad[0]); if (put(k, Math.round(C + Math.cos(a) * d), Math.round(C + Math.sin(a) * d), l)) return; } }
  put('hq', C, C, hq);
  var def = ['slingshot', 'slingshot', 'boxtower', 'slingshot', 'mortar', 'boxtower', 'watergun', 'chili', 'mortar', 'boxtower', 'slingshot'];
  var nDef = Math.min(def.length, 1 + Math.floor(n * .8));
  for (var i = 0; i < nDef; i++) scatter(def[i], lv(hq - 1), [3, 5.5]);
  ['honeyjar', 'veggiejar'].forEach(function (k) { for (var j = 0; j < Math.min(3, 1 + Math.floor(n / 3)); j++) scatter(k, lv(hq - 1), [2.5, 5]); });
  if (hq >= 5) scatter('syrupjar', lv(hq - 2), [2, 4]);
  // wall ring around the core
  if (n >= 2) { var ring = n >= 6 ? 6 : 5, wl = clamp(Math.floor(n / 3) + 1, 1, MAX_LV);
    for (var t = -ring; t <= ring; t++) [[C + 1 + t, C + 1 - ring], [C + 1 + t, C + 2 + ring], [C + 1 - ring, C + 1 + t], [C + 2 + ring, C + 1 + t], [C + 2 + ring, C + 2 + ring]].forEach(function (p) { put('wall', p[0], p[1], wl); }); }
  ['honeypump', 'veggieblender', 'honeypump', 'veggieblender', 'camp', 'barracks'].forEach(function (k, j) { if (j < 2 + Math.floor(n / 2)) scatter(k, lv(hq - 1), [7, 10]); });
  var loot = { honey: 2500 + n * 1800, veggie: 2500 + n * 1800, syrup: n >= 8 ? n * 40 : 0 };
  var cats = n >= 3 ? [n >= 10 ? 'cat_king' : n >= 6 ? 'cat_pan' : 'cat_spatula'] : [];
  if (n >= 5) cats.push('cat_spatula');
  return { level: n, buildings: list, loot: loot, cats: cats };
}

function startRaid(n) {
  var base = catBase(n);
  R = { level: n, buildings: base.buildings.map(function (b) { var hp = bHp(b.k, b.lv); return Object.assign({}, b, { hp: hp, max: hp, cool: 0, aim: Math.PI * .75, dead: false }); }),
        routeCache: new Map(), groundRevision: 0, troops: [], shots: [], fx: [], time: 180, deployed: 0, over: false, result: null, taken: { honey: 0, veggie: 0, syrup: 0 }, army: Object.assign({}, D.army), pick: null };
  var share = { honey: 0, veggie: 0, syrup: 0 }, holders = R.buildings.filter(function (b) { var d = B[b.k]; return d.kind === 'store' || d.kind === 'make' || d.kind === 'hq'; });
  holders.forEach(function (b) { var d = B[b.k]; b.loot = {};
    ['honey', 'veggie', 'syrup'].forEach(function (r) { var w = d.kind === 'hq' ? .15 : d.store === r ? 1 : d.make === r ? .25 : 0; share[r] += w; b.loot[r] = w; }); });
  holders.forEach(function (b) { ['honey', 'veggie', 'syrup'].forEach(function (r) { b.loot[r] = share[r] ? Math.round(base.loot[r] * b.loot[r] / share[r]) : 0; }); });
  R.lootTotal = base.loot;
  var hq = R.buildings.find(function (b) { return b.k === 'hq'; });
  base.cats.forEach(function (k, i) { var c = CATS[k], sp = freeSpot(hq.x + 1.5, hq.y + 1.5, 2.2 + i * .6, i); R.troops.push({ side: 'cat', kind: k, x: sp.x, y: sp.y, hp: c.hp, max: c.hp, cool: 0, home: { x: hq.x + 1.5, y: hq.y + 1.5 }, dir: 2 }); });
  R.heroes = {}; HERO_KEYS.forEach(function (k) { if (heroOpen(k) && !heroRest(k)) R.heroes[k] = { state: 'ready', lv: hallLv() }; });
  R.pick = nextPick();
}
function nextPick() { return Object.keys(R.army).find(function (q) { return R.army[q] > 0; }) || HERO_KEYS.find(function (q) { return R.heroes[q] && R.heroes[q].state === 'ready'; }) || null; }

function inBuilding(x, y) { return R.buildings.some(function (b) { if (b.dead || b.k === 'wall') return false; var s = B[b.k].size; return x > b.x - .15 && y > b.y - .15 && x < b.x + s + .15 && y < b.y + s + .15; }); }
function freeSpot(cx, cy, r, seed) { // open ground near (cx, cy), so a guard is never hidden inside a building
  for (var ring = 0; ring < 6; ring++) for (var i = 0; i < 16; i++) { var a = (i + seed * 5) / 16 * 6.283, rr = r + ring * .7, x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
    if (x > 1 && y > 1 && x < MAP - 1 && y < MAP - 1 && !inBuilding(x, y)) return { x: x, y: y }; }
  return { x: cx + r, y: cy };
}
function rectDist(px, py, b) { var s = B[b.k].size, dx = Math.max(b.x - px, 0, px - (b.x + s)), dy = Math.max(b.y - py, 0, py - (b.y + s)); return Math.hypot(dx, dy); }
function center(b) { var s = B[b.k].size / 2; return { x: b.x + s, y: b.y + s }; }
function alive(list) { return list.filter(function (o) { return !o.dead; }); }
// Ducks land only outside the walls: tiles fenced in by walls are off limits, and so is one tile round every building.
function enclosed() {
  if (R.enc) return R.enc;   // fixed when the raid starts: a breach doesn't open the inside for landing
  var wall = new Uint8Array(MAP * MAP), seen = new Uint8Array(MAP * MAP), q = [], n = 0;
  R.buildings.forEach(function (b) { if (b.k === 'wall' && !b.dead && b.x >= 0 && b.y >= 0 && b.x < MAP && b.y < MAP) { wall[b.y * MAP + b.x] = 1; n++; } });
  for (var i = 0; i < MAP; i++) [i, (MAP - 1) * MAP + i, i * MAP, i * MAP + MAP - 1].forEach(function (c) { if (!wall[c] && !seen[c]) { seen[c] = 1; q.push(c); } });
  while (q.length) { var c = q.pop(), x = c % MAP, y = (c / MAP) | 0;
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { var nx = x + d[0], ny = y + d[1]; if (nx < 0 || ny < 0 || nx >= MAP || ny >= MAP) return; var k = ny * MAP + nx; if (!wall[k] && !seen[k]) { seen[k] = 1; q.push(k); } }); }
  var enc = new Uint8Array(MAP * MAP); for (var k = 0; k < MAP * MAP; k++) enc[k] = !seen[k] ? 1 : 0;
  R.enc = enc; return enc;
}
function canDeploy(x, y) {
  if (x < 0.3 || y < 0.3 || x > MAP - .3 || y > MAP - .3) return false;
  if (enclosed()[Math.floor(y) * MAP + Math.floor(x)]) return false;
  return !R.buildings.some(function (b) { return !b.dead && b.k !== 'wall' && rectDist(x, y, b) < 1; });
}
function deploy(x, y) {
  var k = R.pick; if (!k || R.over) return false;
  var hero = R.heroes[k]; if (hero ? hero.state !== 'ready' : !(R.army[k] > 0)) return false;
  if (!canDeploy(x, y)) { R.redFlash = now(); sfx('error'); toast('ปล่อยทหารได้แค่นอกกำแพง และห่างอาคาร 1 ช่อง'); return false; }
  var lv = hero ? hero.lv : 1, t = { side: 'duck', kind: k, x: x, y: y, hp: uHp(k, lv), max: uHp(k, lv), lv: lv, cool: 0.2, dir: 2, born: now() };
  if (hero) { hero.state = 'out'; hero.unit = t; } else R.army[k]--;
  R.deployed++; R.started = true; R.troops.push(t);
  if (hero || R.fx.length < 120) R.fx.push({ t: 'puff', x: x, y: y, life: .5, max: .5, small: !hero && R.ducks && R.ducks.length > 60 });
  if (hero) { sfx(k === 'h_colonel' ? 'colonel' : k === 'h_king' ? 'bite' : 'heal'); buzz('medium'); toast((k === 'h_colonel' ? '🎖 ' : '👑 ') + U[k].name + ' ลงสนาม! แตะการ์ดอีกครั้งเพื่อใช้สกิล'); R.pick = nextPick(); return true; }
  if (!(R.army[k] > 0)) R.pick = nextPick();
  sfx('deploy'); buzz('light'); return true;
}
// a hero's one skill per raid
function heroSkill(k) {
  var h = R.heroes[k]; if (!h || h.state !== 'out' || h.used || R.over) return false;
  var t = h.unit; if (!t || t.dead) return false; h.used = true; t.atk = now(); var until = now() + 6000;
  if (k === 'h_colonel') { // whistle: every duck near him charges — faster, harder hits, a bit of health back
    alive(R.troops).forEach(function (o) { if (o.side === 'duck' && Math.hypot(o.x - t.x, o.y - t.y) < 6) { o.fast = until; o.hp = Math.min(o.max, o.hp + o.max * .2); R.fx.push({ t: 'heal', x: o.x, y: o.y, life: .6, max: .6 }); } });
    sfx('colonel'); sfx('horn'); toast('🎖 ผู้พันเป็ด: บุกกก! ทุกหน่วยตามข้ามา!');
  } else if (k === 'h_king') { // howl: heals, rages and calls fork ducks to his side
    t.hp = Math.min(t.max, t.hp + t.max * .35); t.fast = until; spawnAround(t, 'fork', 3 + Math.floor(h.lv / 3), 1.1);
    sfx('bite'); toast('👑 ราชาดัลเมเชียน: โฮ่งงง! ทหารเป็ดมาช่วยกัน!');
  } else { // feather veil: unseen by turrets and cats, double damage
    t.invis = now() + 4500; t.fast = until; t.hp = Math.min(t.max, t.hp + t.max * .15); sfx('heal'); toast('👑 ราชินีนกกระยาง: ม่านขนนก!');
  }
  R.fx.push({ t: 'boom', x: t.x, y: t.y, life: .5, max: .5, size: .8 }); buzz('heavy'); return true;
}

// ---------- path finding: Dijkstra on tiles; buildings block, walls are passable but cost a lot (troops break them) ----------
function grid() {
  if (R.occupancy) return R.occupancy;
  var g = new Int16Array(MAP * MAP); R.buildings.forEach(function (b, i) { if (b.dead) return; var s = B[b.k].size; for (var x = b.x; x < b.x + s; x++) for (var y = b.y; y < b.y + s; y++) if (x >= 0 && y >= 0 && x < MAP && y < MAP) g[y * MAP + x] = i + 1; });
  R.occupancy = g; return g;
}
function findPath(t, target, range) {
  var sx = clamp(Math.floor(t.x), 0, MAP - 1), sy = clamp(Math.floor(t.y), 0, MAP - 1);
  var key = (sy * MAP + sx) + ':' + target.id + ':' + range;
  if (!R.routeCache.has(key)) {
    if (R.pathBudget !== undefined && R.pathBudget <= 0) return undefined;   // enough searches this frame: ask again next frame (a big crowd re-routing at once used to freeze the game)
    if (R.pathBudget !== undefined) R.pathBudget--;
    if (R.routeCache.size >= 512) R.routeCache.clear();
    R.routeCache.set(key, searchPath(sx, sy, target, range));
  }
  var route = R.routeCache.get(key);
  return route && route.slice(); // troops advance independently through shared waypoints
}
var NDX = [1, -1, 0, 0, 1, 1, -1, -1], NDY = [0, 0, 1, -1, 1, -1, 1, -1], PATHBUF = null;
function wallBand(b) { return Math.ceil(b.hp / b.max * 4); }   // walls cost less to cross as they crumble, in 4 steps
function searchPath(sx, sy, target, range) {
  var g = grid(), N = MAP * MAP;
  if (!PATHBUF || PATHBUF.n !== N) PATHBUF = { n: N, cost: new Float32Array(N), prev: new Int32Array(N), done: new Uint8Array(N) };
  var cost = PATHBUF.cost.fill(1e9), prev = PATHBUF.prev.fill(-1), done = PATHBUF.done.fill(0), hk = [], hn = [];   // binary heap of (cost, cell)
  function push(n, k) { hk.push(k); hn.push(n); var i = hk.length - 1; while (i) { var p = (i - 1) >> 1; if (hk[p] <= k) break; hk[i] = hk[p]; hn[i] = hn[p]; i = p; } hk[i] = k; hn[i] = n; }
  function pop() { var top = hn[0], lk = hk.pop(), ln = hn.pop(), L = hk.length; if (L) { var i = 0; for (;;) { var l = 2 * i + 1, r = l + 1, m = i, mk = lk;
      if (l < L && hk[l] < mk) { m = l; mk = hk[l]; } if (r < L && hk[r] < mk) m = r; if (m === i) break; hk[i] = hk[m]; hn[i] = hn[m]; i = m; } hk[i] = lk; hn[i] = ln; } return top; }
  var start = sy * MAP + sx; cost[start] = 0; push(start, 0);
  var goal = -1;
  while (hk.length) {
    var c = pop(); if (done[c]) continue; done[c] = 1;
    var cx = c % MAP, cy = (c / MAP) | 0;
    if (rectDist(cx + .5, cy + .5, target) <= range + .45) { goal = c; break; }
    for (var d = 0; d < 8; d++) {
      var nx = cx + NDX[d], ny = cy + NDY[d]; if (nx < 0 || ny < 0 || nx >= MAP || ny >= MAP) continue;
      var n = ny * MAP + nx, occ = g[n], step = d < 4 ? 1 : 1.414;
      if (occ) { var ob = R.buildings[occ - 1]; if (ob === target) continue; if (ob.k !== 'wall') continue; step += 6 + ob.max * wallBand(ob) / 4 / 60; }
      if (d >= 4 && (g[cy * MAP + nx] && R.buildings[g[cy * MAP + nx] - 1].k !== 'wall' || g[ny * MAP + cx] && R.buildings[g[ny * MAP + cx] - 1].k !== 'wall')) continue;
      if (cost[c] + step < cost[n]) { cost[n] = cost[c] + step; prev[n] = c; push(n, cost[n]); }
    }
  }
  if (goal < 0) return null;
  var path = []; for (var p = goal; p >= 0 && p !== sy * MAP + sx; p = prev[p]) path.unshift({ x: p % MAP + .5, y: (p / MAP | 0) + .5, wall: g[p] ? R.buildings[g[p] - 1] : null });
  return path;
}

function chooseTarget(t) {
  var u = U[t.kind], list = R.buildings.filter(function (b) { return !b.dead && b.k !== 'wall'; }), want = list;
  if (u.pref === 'defense') { var d = list.filter(function (b) { return B[b.k].kind === 'defense'; }); if (d.length) want = d; }
  if (u.pref === 'resource') { var r = list.filter(function (b) { return /store|make/.test(B[b.k].kind); }); if (r.length) want = r; }
  if (u.pref === 'airdef') { var aa = list.filter(function (b) { return B[b.k].kind === 'defense' && B[b.k].air; }); if (!aa.length) aa = list.filter(function (b) { return B[b.k].kind === 'defense'; }); if (aa.length) want = aa; }
  if (u.pref === 'wall') { var w = R.buildings.filter(function (b) { return !b.dead && b.k === 'wall'; }); if (w.length) want = w; }
  var best = null, bd = 1e9; want.forEach(function (b) { var dd = rectDist(t.x, t.y, b); if (dd < bd) { bd = dd; best = b; } });
  return best;
}
function damage(target, amount, from) {
  if (target.dead) return;
  if (from && U[from.kind] && U[from.kind].wallBonus && target.k === 'wall') amount *= U[from.kind].wallBonus;
  if (from && U[from.kind] && U[from.kind].resBonus && target.k && /store|make/.test(B[target.k].kind)) amount *= U[from.kind].resBonus;
  var band = target.k === 'wall' ? wallBand(target) : 0;
  target.hp -= amount; target.hitAt = R.now || now();
  if (target.k === 'wall' && target.hp > 0 && wallBand(target) !== band) R.routeCache.clear(); // a crumbling wall is cheaper to cross
  if (target.k) { // building: loot and debris
    if (target.loot) ['honey', 'veggie', 'syrup'].forEach(function (r) { var v = target.loot[r] || 0, give = Math.min(v, v * amount / target.max * 1.0001); target.loot[r] -= give; R.taken[r] += give; });
    var c = center(target), nChip = R.fx.length < 90 ? 3 : R.fx.length < 180 ? 1 : 0; for (var i = 0; i < nChip; i++) R.fx.push({ t: 'chip', x: c.x + (Math.random() - .5), y: c.y + (Math.random() - .5), z: .6, vx: (Math.random() - .5) * 3, vy: (Math.random() - .5) * 3, vz: 2 + Math.random() * 2, life: .9, max: .9, color: B[target.k].kind === 'wall' ? '#b98552' : ['#c58a52', '#f2e7c9', '#9b6b3a'][i % 3] });
  }
  if (target.hp <= 0) {
    target.hp = 0; target.dead = true; target.deadAt = now();
    if (target.k) {
      R.occupancy = null; R.routeCache.clear(); R.groundRevision++;
      sfx(target.k === 'wall' ? 'wall' : 'crash'); var c2 = center(target); R.fx.push({ t: 'boom', x: c2.x, y: c2.y, life: .9, max: .9, size: B[target.k].size }); if (target.k !== 'wall') crashFx(c2.x, c2.y, B[target.k].size, target.k === 'hq'); else burst(c2.x, c2.y, .4, 6, 'dot', ['#b98552', '#e2c08a'], 2.4, 2.4, .5, 3.5); buzz(target.k === 'hq' ? 'heavy' : 'medium');
      if (target.loot) ['honey', 'veggie', 'syrup'].forEach(function (r) { R.taken[r] += target.loot[r] || 0; target.loot[r] = 0; }); }
    else { if (target.side === 'duck' && U[target.kind].hero) { D.heroRest = D.heroRest || {}; D.heroRest[target.kind] = now() + heroRestMs(target.lv || 1); toast('💫 ' + U[target.kind].name + ' หมดแรง ต้องพักฟื้นก่อนบุกครั้งหน้า'); if (typeof raidBar === 'function') raidBar(); }
      if (target.side === 'duck' && U[target.kind].split) spawnAround(target, U[target.kind].split, 6, 1.0);
      sfx(target.side === 'cat' ? 'meow' : 'duckdie'); R.fx.push({ t: 'puff', x: target.x, y: target.y, life: 1.2, max: 1.2 }); }
  }
}
var TURRET_SFX = { slingshot: 'twang', boxtower: 'pew', mortar: 'cooker', watergun: 'spray', chili: 'flame' };
var LAND_SFX = { rock: 'stone', egg: 'boom', water: 'water', chili: 'sizzle', tomato: 'squish', cracker: 'cracker', pebble: 'thud', feather: 'thud', magic: 'chime' };
var CRY = { fork: 'quackHi', thief: 'quackHi', digger: 'quackHi', duckling: 'peep', sling: 'quackHi', giant: 'quackLo', pot: 'quackLo', bomber: 'quackHi', chef: 'quack', nurse: 'quack',
  witch: 'cackle', dog: 'bark', h_king: 'bark', egret: 'squawk', h_queen: 'squawk', pig: 'oink', mop: 'quackHi', plane: 'wee', kite: 'wee', prop: 'wee', fan: 'quackLo', fanlet: 'peep', balloon: 'quackHi', h_colonel: 'quackLo' };
var ATK_SFX = { sling: 'pew', mop: 'whirl', plane: 'swoosh', kite: 'swoosh', fan: 'gust', fanlet: 'gust', giant: 'swing', pot: 'swing', h_colonel: 'swing', pig: 'oink', prop: 'swing' };
var BIG_HIT = { giant: 1, pot: 1, egret: 1, dog: 1, pig: 1, cat_king: 1 };
function shoot(from, to, kind, dmg, splash, speed, sx, sy, sz) {
  var tx = to.k ? center(to).x : to.x, ty = to.k ? center(to).y : to.y, d = Math.hypot(tx - sx, ty - sy);
  var tz = to.k ? 0 : airAlt(to) * .9; sz = (sz || .8) + (from && !from.k ? airAlt(from) * .85 : 0);
  R.shots.push({ kind: kind, x: sx, y: sy, z: sz, fx: sx, fy: sy, fz: sz, tz: tz, tx: tx, ty: ty, t: 0, dur: Math.max(.15, d / speed), target: to, dmg: dmg, splash: splash || 0, from: from, arc: kind === 'egg' ? 3 : kind === 'rock' ? .8 : .3 });
  muzzleFx(kind, sx, sy, sz, from);
}
function troopTick(t, dt) {
  if (t.dead) return;
  t.cool -= dt; t.moving = false;
  if (t.pend && (t.pend.left -= dt) <= 0) { var pd = t.pend; t.pend = null; sfx(pd.kind === 'bite' ? 'bite' : pd.kind === 'smash' || pd.kind === 'spin' ? 'smash' : 'stab');
    if (pd.kind === 'spin') spinHit(t, pd.dmg); else damage(pd.target, pd.dmg, t); var pc = pd.target.k ? center(pd.target) : pd.target; if (R.fx.length < 160) R.fx.push({ t: 'hit', x: (pc.x + t.x) / 2, y: (pc.y + t.y) / 2, life: .3, max: .3, kind: pd.kind });
    meleeFx(pd.kind, (pc.x + t.x * 2) / 3, (pc.y + t.y * 2) / 3, t, BIG_HIT[t.kind] || (t.side === 'duck' && U[t.kind].hero)); }
  if (t.side === 'cat') return catTick(t, dt);
  var u = U[t.kind];
  if (u.pref === 'heal') { // nurse: follow and heal the most hurt duck nearby
    var hurt = null, follow = null, ducks = R.ducks || R.troops;
    for (var hi = 0; hi < ducks.length; hi++) { var ho = ducks[hi]; if (ho === t || ho.dead || ho.side !== 'duck') continue; if (!follow) follow = ho; if (ho.hp < ho.max && (!hurt || ho.hp / ho.max < hurt.hp / hurt.max)) hurt = ho; }
    follow = hurt || follow;
    if (!follow) return; var dd = Math.hypot(follow.x - t.x, follow.y - t.y);
    if (dd > u.range * .8) return step(t, follow.x, follow.y, u.speed, dt);
    if (hurt && t.cool <= 0) { t.cool = u.rate; t.atk = now(); alive(R.troops).forEach(function (o) { if (o.side === 'duck' && Math.hypot(o.x - hurt.x, o.y - hurt.y) < 1.5) o.hp = Math.min(o.max, o.hp + u.heal); }); sfx('heal'); R.fx.push({ t: 'heal', x: hurt.x, y: hurt.y, life: .6, max: .6 }); }
    return;
  }
  if (u.summon) { t.sumT = (t.sumT === undefined ? 1 : t.sumT) - dt;
    if (t.sumT <= 0) { t.sumT = 7; var mine = R.troops.filter(function (o) { return !o.dead && o.owner === t; }).length;
      if (mine < 6) { spawnAround(t, u.summon, Math.min(3, 6 - mine), .8); t.atk = now(); sfx('heal'); } } }
  if (u.burrow) return digTick(t, u, dt);
  if (u.air) return flyTick(t, u, dt);
  // fight back against a cat guard close by
  var cat = null; if (u.hit !== 'blast') { var cr = Math.max(1.4, u.range + .6), cats = R.cats || R.troops;
    for (var ci = 0; ci < cats.length; ci++) { var co = cats[ci]; if (co.side === 'cat' && !co.dead && Math.abs(co.x - t.x) < cr && Math.hypot(co.x - t.x, co.y - t.y) < cr) { cat = co; break; } } }
  if (cat) { var cd = Math.hypot(cat.x - t.x, cat.y - t.y); t.face = Math.atan2(cat.y - t.y, cat.x - t.x);
    if (cd > u.range + .45) return step(t, cat.x, cat.y, u.speed, dt); return attack(t, cat, u); }
  if (!t.target || t.target.dead) { t.target = chooseTarget(t); t.path = t.target ? findPath(t, t.target, u.range) : null; t.wall = null; }
  if (!t.target) return;
  if (t.wall && !t.wall.dead) { t.face = Math.atan2(center(t.wall).y - t.y, center(t.wall).x - t.x); return attack(t, t.wall, u); }
  if (t.wall && t.wall.dead) { t.wall = null; t.path = findPath(t, t.target, u.range); }
  if (rectDist(t.x, t.y, t.target) <= u.range + .12) { var c = center(t.target); t.face = Math.atan2(c.y - t.y, c.x - t.x); return attack(t, t.target, u); }
  if (!t.path || !t.path.length) { var np = findPath(t, t.target, u.range); if (np === undefined) return; t.path = np; if (!np) { t.target = null; return; } }
  var wp = t.path[0];
  if (!wp) { // already in the goal cell: walk the last bit straight to the nearest edge of the building
    var s0 = B[t.target.k].size; return step(t, clamp(t.x, t.target.x, t.target.x + s0), clamp(t.y, t.target.y, t.target.y + s0), u.speed, dt); }
  if (wp.wall && !wp.wall.dead && Math.hypot(wp.x - t.x, wp.y - t.y) < 1.2) { t.wall = wp.wall; return; }
  // waypoints are tile centres shared by the whole squad: count one as reached when close, or when the next one is nearer,
  // otherwise ducks pushing each other around the same point never get there and just shuffle on the spot
  var wd = Math.hypot(wp.x - t.x, wp.y - t.y), nx = t.path[1];
  if (wd < .35 || (nx && Math.hypot(nx.x - t.x, nx.y - t.y) < Math.hypot(nx.x - wp.x, nx.y - wp.y))) { t.path.shift(); t.stuck = 0; return; }
  if (t.lastWd !== undefined && wd > t.lastWd - u.speed * dt * .25) t.stuck = (t.stuck || 0) + dt; else t.stuck = 0;
  t.lastWd = wd;
  if (t.stuck > 1.2) { t.path.shift(); t.stuck = 0; t.lastWd = undefined; return; }
  step(t, wp.x, wp.y, u.speed, dt);
}
// Flyers: straight over walls and buildings to the target; only anti-air defenses can hit them, cats can't reach
function flyTick(t, u, dt) {
  if (!t.target || t.target.dead) { t.target = chooseTarget(t); if (!t.target) return; }
  if (u.rage) t.rage = !(R.ducks || R.troops).some(function (o) { return o !== t && !o.dead && o.side === 'duck' && U[o.kind].air && Math.hypot(o.x - t.x, o.y - t.y) < 4; });
  var c = center(t.target), d = rectDist(t.x, t.y, t.target);
  if (d > u.range + .12) { var s = B[t.target.k].size; return step(t, u.range < 1 ? c.x : clamp(t.x, t.target.x, t.target.x + s), u.range < 1 ? c.y : clamp(t.y, t.target.y, t.target.y + s), u.speed * (t.rage ? 1.25 : 1), dt); }
  t.face = Math.atan2(c.y - t.y, c.x - t.x); attack(t, t.target, u);
}
// Digger: travels underground in a straight line (walls don't matter, nothing can hit it), pops up at the target.
function digTick(t, u, dt) {
  if (!t.target || t.target.dead) { t.target = chooseTarget(t); if (!t.target) return; }
  var s = B[t.target.k].size, ex = clamp(t.x, t.target.x, t.target.x + s), ey = clamp(t.y, t.target.y, t.target.y + s), d = rectDist(t.x, t.y, t.target);
  if (d > u.range + .12) {
    if (!t.under && d > 1.2) { t.under = true; t.digAt = now(); sfx('dig'); R.fx.push({ t: 'puff', x: t.x, y: t.y, life: .5, max: .5 }); }
    if (t.under) { t.dirtT = (t.dirtT || 0) - dt; if (t.dirtT <= 0) { t.dirtT = .12; emitSmoke(t.x, t.y, .05, 'dust', .35, 1); } if (Math.random() < dt * 2) sfx('dig'); }
    return step(t, ex, ey, u.speed * (t.under ? 1.15 : 1), dt);
  }
  if (t.under) { t.under = false; t.born = now(); t.cool = .35; sfx('surface'); emitSmoke(t.x, t.y, .1, 'dust', .6, 6); return; }   // burst out of the ground
  var c = center(t.target); t.face = Math.atan2(c.y - t.y, c.x - t.x); attack(t, t.target, u);
}
// wall-breaker duck: one big bang that wrecks walls (x40) and nearby buildings, and the duck with it
function blast(t, u, dmg) {
  R.buildings.forEach(function (b) { if (!b.dead && rectDist(t.x, t.y, b) <= u.splash) damage(b, dmg, t); });
  R.fx.push({ t: 'boom', x: t.x, y: t.y, life: .9, max: .9, size: 1.4 }); sfx('cracker'); sfx('crash'); impactFx('cracker', t.x, t.y); shake(5);
  t.hp = 0; t.dead = true; t.deadAt = now();
}
// mop duck: the spin hits every building and cat around it
function spinHit(t, dmg) {
  var r = U[t.kind].spin;
  R.buildings.forEach(function (b) { if (!b.dead && rectDist(t.x, t.y, b) <= r) damage(b, dmg, t); });
  R.troops.forEach(function (o) { if (!o.dead && o.side === 'cat' && Math.hypot(o.x - t.x, o.y - t.y) <= r + .3) damage(o, dmg, t); });
  R.fx.push({ t: 'splat', x: t.x, y: t.y, life: .4, max: .4, kind: 'water', size: r });
}
function spawnAround(t, kind, n, r) { // witch's ducklings, the fan's little fans
  var u = U[kind];
  for (var i = 0; i < n; i++) { var a = i / n * 6.283 + Math.random() * .4, x = clamp(t.x + Math.cos(a) * r, .3, MAP - .3), y = clamp(t.y + Math.sin(a) * r, .3, MAP - .3);
    R.troops.push({ side: 'duck', kind: kind, x: x, y: y, hp: u.hp, max: u.hp, cool: .4, dir: 2, born: now(), owner: t }); R.fx.push({ t: 'puff', x: x, y: y, life: .5, max: .5 }); }
}
function step(t, x, y, speed, dt) {
  var dx = x - t.x, dy = y - t.y, d = Math.hypot(dx, dy); if (d < 1e-3) return;
  if (t.fast > (R.now || now())) speed *= 1.4;
  var m = Math.min(d, speed * dt); t.x += dx / d * m; t.y += dy / d * m; t.moving = true; t.face = Math.atan2(dy, dx); t.walk = (t.walk || 0) + m;
}
function attack(t, target, u) {
  if (t.cool > 0) return; var T = R.now || now(); t.cool = u.rate; t.atk = T;
  if (t.side === 'duck' && Math.random() < .45) sfx(CRY[t.kind] || 'quack');   // a war cry with the swing (the sound system keeps the crowd from getting noisy)
  if (t.side === 'duck' && ATK_SFX[t.kind]) sfx(ATK_SFX[t.kind]);
  var dmg = t.side === 'cat' ? u.dmg : uDmg(t.kind, t.lv);
  if (t.rage) dmg *= 1.5;
  if (t.side === 'duck') {
    if (t.fast > T) dmg *= t.invis > T ? 2 : 1.4;
    if (!u.hero && R.heroes.h_colonel && R.heroes.h_colonel.unit) { var col = R.heroes.h_colonel.unit; if (!col.dead && Math.hypot(col.x - t.x, col.y - t.y) < U.h_colonel.aura) dmg *= 1.25; }   // the colonel leads: ducks by his side fight harder
  }
  if (u.shot === 'feather') { sfx('shot'); shoot(t, target, 'feather', dmg, 0, 11, t.x, t.y, 1.4); return; }
  if (u.hit === 'blast') { blast(t, u, dmg); return; }
  if (u.hit === 'magic') { sfx('heal'); shoot(t, target, 'magic', dmg, 0, 8, t.x, t.y, .9); return; }
  if (u.hit === 'tomato') { sfx('shot'); shoot(t, target, 'tomato', dmg, u.splash, 6, t.x, t.y, -.2); return; }   // dropped from under the fan
  if (u.hit === 'cracker') { sfx('shot'); shoot(t, target, 'cracker', dmg, u.splash, 5, t.x, t.y, 1.9); return; }
  if (u.hit === 'shot' || u.hit === 'fire') { sfx(u.hit === 'fire' ? 'fire' : 'shot'); shoot(t, target, u.hit === 'fire' ? 'chili' : 'pebble', dmg, u.splash, 9, t.x, t.y, .7); return; }
  t.pend = { target: target, dmg: dmg, left: .23, kind: u.hit }; if (t.side === 'cat') sfx('hiss');   // the blow lands when the swing does
}
function catTick(t, dt) {
  var c = CATS[t.kind], foe = null, fd = 4.5, T = R.now || now(), ducks = R.ducks || R.troops;
  for (var i = 0; i < ducks.length; i++) { var o = ducks[i]; if (o.dead || o.side !== 'duck' || o.under || U[o.kind].air || o.invis > T) continue; var dx = o.x - t.x, dy = o.y - t.y; if (Math.abs(dx) >= fd || Math.abs(dy) >= fd) continue; var d = Math.sqrt(dx * dx + dy * dy); if (d < fd) { fd = d; foe = o; } }
  if (foe) { t.face = Math.atan2(foe.y - t.y, foe.x - t.x); if (fd > c.range + .45) return step(t, foe.x, foe.y, c.speed, dt); return attack(t, foe, c); }
  if (!t.stroll || Math.hypot(t.stroll.x - t.x, t.stroll.y - t.y) < .1) { t.stroll = null;
    for (var i = 0; i < 12 && !t.stroll; i++) { var g = { x: t.home.x + (Math.random() - .5) * 7, y: t.home.y + (Math.random() - .5) * 7 }; if (!inBuilding(g.x, g.y)) t.stroll = g; }
    if (!t.stroll) return; }
  var sx0 = t.x, sy0 = t.y; step(t, t.stroll.x, t.stroll.y, c.speed * .35, dt);
  if (inBuilding(t.x, t.y) && !inBuilding(sx0, sy0)) { t.x = sx0; t.y = sy0; t.stroll = null; }   // walk round buildings, not through them
}
function turretTick(b, dt) {
  var d = B[b.k]; if (d.kind !== 'defense' || b.dead) return; b.cool -= dt;
  var c = center(b), lv = b.lv, range = d.range, r2 = range * range, m2 = (d.minRange || 0) * (d.minRange || 0), target = null, best = 1e9, T = R.now || now(), ducks = R.ducks || R.troops;
  for (var i = 0; i < ducks.length; i++) { var o = ducks[i]; if (o.dead || o.side !== 'duck' || o.under || o.invis > T) continue; var air = !!U[o.kind].air; if (air ? !d.air : !d.ground) continue;
    var dx = o.x - c.x, dy = o.y - c.y, dd = dx * dx + dy * dy; if (dd <= r2 && dd >= m2 && dd < best) { best = dd; target = o; } }
  if (!target) return;
  var want = Math.atan2(target.y - c.y, target.x - c.x), diff = Math.atan2(Math.sin(want - b.aim), Math.cos(want - b.aim));
  b.aim += clamp(diff, -6 * dt, 6 * dt);
  if (b.cool <= 0 && Math.abs(diff) < .35) {
    b.cool = d.rate; b.fire = T; sfx(TURRET_SFX[b.k] || 'shot');
    shoot(b, target, d.shot, grow(d.dmg, lv, 1.17), d.splash, d.shot === 'egg' ? 6 : 12, c.x + Math.cos(b.aim) * .6, c.y + Math.sin(b.aim) * .6, 1.2);
  }
}
function shotTick(s, dt) {
  s.t += dt; var k = Math.min(1, s.t / s.dur);
  if (s.target && !s.target.dead && !s.target.k) { s.tx = s.target.x; s.ty = s.target.y; }
  s.x = s.fx + (s.tx - s.fx) * k; s.y = s.fy + (s.ty - s.fy) * k; s.z = s.fz * (1 - k) + (s.tz || 0) * k + Math.sin(k * Math.PI) * s.arc;
  if (k < 1) return false;
  if (s.splash) { R.troops.concat(R.buildings).forEach(function (o) { if (o.dead) return; var ox = o.k ? center(o).x : o.x, oy = o.k ? center(o).y : o.y;
      if ((s.from.k ? !o.k && o.side === 'duck' && !o.under && (!U[o.kind].air || B[s.from.k].air) : o.k) && Math.hypot(ox - s.tx, oy - s.ty) <= s.splash) damage(o, s.dmg, s.from); });
    R.fx.push({ t: s.kind === 'cracker' ? 'boom' : 'splat', x: s.tx, y: s.ty, life: s.kind === 'tomato' ? .9 : .5, max: s.kind === 'tomato' ? .9 : .5, kind: s.kind, size: s.kind === 'cracker' ? 1 : s.splash, seed: Math.random() * 100 }); impactFx(s.kind, s.tx, s.ty); sfx(LAND_SFX[s.kind] || 'splat'); }
  else if (s.target) { sfx(LAND_SFX[s.kind] || 'thud'); impactFx(s.kind, s.tx, s.ty); damage(s.target, s.dmg, s.from); if (R.fx.length < 160) R.fx.push({ t: 'hit', x: s.tx, y: s.ty, life: .25, max: .25, kind: s.kind }); }
  return true;
}
// soft separation so ducks don't stack on one spot: a 1-tile bucket grid, so each duck only checks its neighbours
// (all pairs was 65,000 checks a frame with 360 ducks; push radii add up to at most 1 tile)
var SEP = null;
function separate() {
  var live = alive(R.troops), n = live.length, W = MAP + 2;
  if (!SEP || SEP.W !== W) SEP = { W: W, head: new Int32Array(W * W), next: new Int32Array(0), cell: new Int32Array(0), rad: new Float32Array(0) };
  if (SEP.next.length < n) { SEP.next = new Int32Array(n * 2); SEP.cell = new Int32Array(n * 2); SEP.rad = new Float32Array(n * 2); }
  var head = SEP.head.fill(-1), next = SEP.next, cell = SEP.cell, rad = SEP.rad;
  for (var i = 0; i < n; i++) { var o = live[i], cx = clamp(Math.floor(o.x) + 1, 0, W - 1), cy = clamp(Math.floor(o.y) + 1, 0, W - 1), c = cy * W + cx;
    cell[i] = c; rad[i] = big(o); next[i] = head[c]; head[c] = i; }
  for (i = 0; i < n; i++) {
    var a = live[i], ac = cell[i], ax = ac % W, ay = (ac / W) | 0;
    for (var yy = ay - 1; yy <= ay + 1; yy++) { if (yy < 0 || yy >= W) continue;
      for (var xx = ax - 1; xx <= ax + 1; xx++) { if (xx < 0 || xx >= W) continue;
        for (var j = head[yy * W + xx]; j >= 0; j = next[j]) { if (j <= i) continue;
          var b = live[j], dx = b.x - a.x, dy = b.y - a.y, squared = dx * dx + dy * dy, radius = rad[i] + rad[j];
          if (squared === 0 || squared >= radius * radius) continue;
          var distance = Math.sqrt(squared), push = (radius - distance) / (4 * distance);
          a.x -= dx * push; a.y -= dy * push; b.x += dx * push; b.y += dy * push; } } }
  }
}
function big(o) { var u = U[o.kind] || CATS[o.kind] || {}; return u.hero ? .5 : u.space >= 5 ? .35 : .2; }
function destruction() {
  var all = R.buildings.filter(function (b) { return b.k !== 'wall'; }), dead = all.filter(function (b) { return b.dead; }).length;
  return all.length ? dead / all.length : 0;
}
function raidTick(dt) {
  if (!R || R.over) return;
  if (R.started) R.time -= dt;
  R.now = now(); R.pathBudget = 6;   // one clock read per frame; at most 6 new route searches per frame
  // bodies stay ~2 s for the fall-and-dissolve, then leave the list so a 360-duck raid doesn't keep looping over the fallen
  if (R.troops.length > 40 && (!R.pruneAt || R.now > R.pruneAt)) { R.pruneAt = R.now + 500; R.troops = R.troops.filter(function (t) { return !t.dead || R.now - (t.deadAt || 0) < 2200; }); }
  var ducks = [], cats = []; for (var q = 0; q < R.troops.length; q++) { var o = R.troops[q]; if (!o.dead) (o.side === 'cat' ? cats : ducks).push(o); }
  R.ducks = ducks; R.cats = cats;
  for (q = 0; q < R.troops.length; q++) troopTick(R.troops[q], dt);
  for (q = 0; q < R.buildings.length; q++) turretTick(R.buildings[q], dt);
  R.shots = R.shots.filter(function (s) { return !shotTick(s, dt); });
  separate();
  var pct = destruction(), hqDead = R.buildings.some(function (b) { return b.k === 'hq' && b.dead; });
  R.stars = (pct >= .5 ? 1 : 0) + (hqDead ? 1 : 0) + (pct >= 1 ? 1 : 0); R.pct = pct;
  var ducksLeft = R.ducks.some(function (t) { return !t.dead; }) || R.troops.some(function (t) { return !t.dead && t.side === 'duck'; }) || Object.keys(R.army).some(function (k) { return R.army[k] > 0; }) || HERO_KEYS.some(function (k) { return R.heroes[k] && R.heroes[k].state === 'ready'; });
  if (pct >= 1 || R.time <= 0 || (R.started && !ducksLeft)) endRaid();
}
function endRaid() {
  if (R.over) return; R.over = true;
  var got = {}; ['honey', 'veggie', 'syrup'].forEach(function (r) { got[r] = Math.floor(R.taken[r]); D.res[r] = Math.min(capacity(r), D.res[r] + got[r]); });
  // troops that were deployed are used up (Clash style); the rest go home
  D.army = {}; Object.keys(R.army).forEach(function (k) { if (R.army[k] > 0) D.army[k] = R.army[k]; });
  var coins = R.stars * (1 + Math.floor(R.level / 3)); D.res.coin += coins;
  if (R.stars > 0 && R.level >= D.raid) D.raid = R.level + 1;
  D.stars = (D.stars || 0) + R.stars;
  R.result = { stars: R.stars, pct: R.pct, got: got, coins: coins }; writeSave();
  setTimeout(showResult, 900);
}

// ---- src/05-render.js ----
// Duck War — drawing: grass field with tufts, flowers, rocks and trees, buildings (with contact shadows baked in), turrets that turn, walls that join,
// troops from 8-direction sheets with cartoon squash & stretch, shots and effects. Depth = x + y (back to front).
// Keep the visible terrain and deployment overlay in one screen-sized bitmap.
var groundCache = null;
function drawGround() {
  var raid = screen === 'raid' && R && !R.over && R.pick ? R : null;
  var flash = !!(raid && raid.redFlash && now() - raid.redFlash < 700);
  var revision = raid ? raid.groundRevision : 0, theme = groundTheme();
  if (!groundCache) groundCache = { image: document.createElement('canvas') };
  var cache = groundCache, image = cache.image;
  if (cache.x !== cam.x || cache.y !== cam.y || cache.scale !== cam.s ||
      cache.w !== view.w || cache.h !== view.h || cache.dpr !== view.dpr ||
      cache.raid !== raid || cache.revision !== revision || cache.flash !== flash || cache.theme !== theme) {
    if (image.width !== canvas.width) image.width = canvas.width;
    if (image.height !== canvas.height) image.height = canvas.height;
    var c = image.getContext('2d');
    c.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    paintGround(c);
    if (raid) paintDeployZone(c, raid, flash);
    cache.x = cam.x; cache.y = cam.y; cache.scale = cam.s;
    cache.w = view.w; cache.h = view.h; cache.dpr = view.dpr;
    cache.raid = raid; cache.revision = revision; cache.flash = flash; cache.theme = theme;
  }
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, 0, 0);
  ctx.restore();
}
function paintDeployZone(c, raid, flash) {
  var red = flash ? 'rgba(255,60,60,.24)' : 'rgba(255,80,80,.12)', enc = enclosed();
  c.beginPath();
  for (var y = 0; y < MAP; y++) for (var x = 0; x < MAP; x++) if (enc[y * MAP + x]) { var a = toScreen(x, y), b = toScreen(x + 1, y), d = toScreen(x + 1, y + 1), e = toScreen(x, y + 1); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.lineTo(d.x, d.y); c.lineTo(e.x, e.y); c.closePath(); }
  c.fillStyle = red; c.fill();
  raid.buildings.forEach(function (b) {
    if (!b.dead && b.k !== 'wall' && !enc[(b.y - 1) * MAP + b.x - 1])
      tileDiamond(b.x - 1, b.y - 1, B[b.k].size + 2, red, null, c);
  });
}
// ---------- terrain: 5 map looks the player picks on first start (D.ground); cat bases in raids rotate through them ----------
// Decorations are placed once per look from a fixed seed (same spot every visit) and drawn from small pre-painted stamps,
// so panning only re-blits a few hundred tiny images. Tall things (trees, boulders) live outside the 40x40 base
// so they never sit under a building; inside there are only flat things: tufts, flowers, pebbles, leaves, worn patches.
var GU = 64;                       // stamp resolution: px per tile edge
var GROUNDS = [
  { name: 'สนามฟุตบอล', desc: 'หญ้าตัดเป็นแถบ มีเส้นปูนขาว', outer: ['#4f9132', '#5ea33b', '#4c8c30'], lawn: ['#a6e46e', '#8fd65c', '#79c64f'], rim: '#9c8452', edge: 'rgba(60,95,30,.55)',
    stripes: 'rows', stripeA: .11, chalk: true, grass: ['#3f8423', '#4f9a2e', '#86cf4f'], petals: ['#ffffff', '#ffe14d', '#ff8fb8', '#b79bff', '#ff6a5a'], leaf: ['#8fd457', '#3f8a26', '#2f6d1f'],
    berry: ['#e0313a', '#fff4f8'], trees: ['round', 'fruit', 'pine'], patch: ['rgba(150,120,60,.1)', 'rgba(220,255,160,.1)'],
    inside: { tuft: .07, flower: .025, pebble: .015, rock: .004 }, outside: { tree: .2, bush: .1, rock: .07, stump: .02, mushroom: .02, tuft: .17, flower: .08 } },
  { name: 'ทุ่งดอกไม้', desc: 'ดอกไม้บานทั้งทุ่ง ต้นซากุระสีชมพู', outer: ['#5a9c3a', '#69ad43', '#57953a'], lawn: ['#b4e87e', '#9edc6a', '#8ccd5c'], rim: '#b39a6a', edge: 'rgba(80,120,45,.5)',
    stripes: 'check', stripeA: .06, grass: ['#4a8f2a', '#5aa536', '#98d862'], petals: ['#ffffff', '#ffe14d', '#ff8fb8', '#b79bff', '#ff6a5a', '#7fc8ff'], leaf: ['#9ad95f', '#4a9a2c', '#33722a'],
    berry: ['#ff8fb8', '#fff4f8'], trees: ['blossom', 'blossom', 'round'], patch: ['rgba(255,200,230,.12)', 'rgba(230,255,170,.12)'],
    inside: { tuft: .04, flower: .1, pebble: .01, rock: .003 }, outside: { tree: .16, bush: .14, rock: .04, stump: .01, mushroom: .01, tuft: .12, flower: .25 } },
  { name: 'ป่าสน', desc: 'ป่าสนทึบ เห็ด ตอไม้ หินมีมอส', outer: ['#2f6a27', '#3b7a2e', '#2d6426'], lawn: ['#8fcf5e', '#79bd50', '#66aa45'], rim: '#7d6440', edge: 'rgba(40,75,25,.6)',
    stripes: 'check', stripeA: .05, grass: ['#2f6d1f', '#3f8423', '#73bb46'], petals: ['#ffffff', '#ffe14d'], leaf: ['#6fb84a', '#2c6e22', '#1f5218'],
    berry: ['#3a5fd0', '#e0313a'], trees: ['pine', 'pine', 'pine', 'round'], patch: ['rgba(110,85,50,.12)', 'rgba(200,240,150,.08)'],
    inside: { tuft: .08, flower: .01, pebble: .02, rock: .006, mushroom: .006 }, outside: { tree: .34, bush: .08, rock: .07, stump: .04, mushroom: .05, tuft: .14, flower: .02 } },
  { name: 'ใบไม้ร่วง', desc: 'หญ้าสีทอง ต้นไม้สีส้มแดง ใบไม้โปรย', outer: ['#8a8f35', '#9aa03c', '#858a32'], lawn: ['#d2dc74', '#bfcd62', '#aabc52'], rim: '#9c7448', edge: 'rgba(110,100,40,.55)',
    stripes: 'rows', stripeA: .07, grass: ['#7f8a2a', '#9aa638', '#d6d878'], petals: ['#ffcf3a', '#ff8a2a', '#ffffff'], leaf: ['#ffb347', '#c9521f', '#8e3a17'],
    berry: ['#e0313a', '#ffd23a'], trees: ['autumnO', 'autumnR', 'autumnY', 'pine'], patch: ['rgba(170,110,50,.14)', 'rgba(255,230,140,.12)'], fallen: ['#e8741f', '#cf3d1f', '#f2b330', '#a8551c'],
    inside: { tuft: .05, flower: .008, pebble: .012, rock: .004, leaves: .07 }, outside: { tree: .26, bush: .1, rock: .05, stump: .03, mushroom: .02, tuft: .1, leaves: .2 } },
  { name: 'หิมะ', desc: 'หิมะขาวโพลน ต้นสนมีหิมะเกาะ', outer: ['#c9d8e6', '#d6e2ee', '#c6d5e4'], lawn: ['#edf3f9', '#e0e9f2', '#d3dfeb'], rim: '#a9bccd', edge: 'rgba(120,150,180,.55)',
    stripes: 'check', stripeA: -.035, grass: ['#8a8a5a', '#a6a274', '#c9c7a0'], petals: [], leaf: ['#e9f2f8', '#9fb7c9', '#7f98ad'],
    berry: ['#e0313a', '#e0313a'], trees: ['snowpine', 'snowpine', 'snowpine', 'bare'], patch: ['rgba(150,180,210,.12)', 'rgba(255,255,255,.3)'], snow: true,
    inside: { mound: .035, tuft: .015, pebble: .012, rock: .004 }, outside: { tree: .3, bush: .08, rock: .08, stump: .02, mound: .14, tuft: .05 } },
  { name: 'ทุ่งทานตะวัน', desc: 'ทานตะวันบานเหลืองอร่ามรอบฐาน', outer: ['#5f9a34', '#6ca83b', '#5a9232'], lawn: ['#b9e477', '#a3d765', '#8fc957'], rim: '#a9864e', edge: 'rgba(80,115,40,.55)',
    stripes: 'rows', stripeA: .06, grass: ['#4a8f2a', '#5aa536', '#a2dc66'], petals: ['#ffd21f', '#ffe14d', '#ffffff'], leaf: ['#8fd457', '#3f8a26', '#2f6d1f'],
    berry: ['#ffd21f', '#ffe14d'], trees: ['sunflowers', 'sunflowers', 'sunflowers', 'round'], sun: true, patch: ['rgba(150,120,60,.1)', 'rgba(255,240,150,.12)'],
    inside: { tuft: .05, flower: .04, sunflower: .012, pebble: .01, rock: .003 }, outside: { tree: .3, sunflower: .3, bush: .05, rock: .03, tuft: .1, flower: .06 } },
  { name: 'ทุ่งนาข้าว', desc: 'นาข้าวเขียวขจี คันนา ต้นตาล หุ่นไล่กา', outer: ['#5f9d6b', '#6aa877', '#5b9767'], lawn: ['#c4df7a', '#b0d268', '#9cc458'], rim: '#a88a56', edge: 'rgba(100,110,45,.55)',
    stripes: 'check', stripeA: .05, grass: ['#4f8f22', '#68aa2c', '#b5df5a'], petals: ['#ffffff', '#ffe14d'], leaf: ['#8fd457', '#3f8a26', '#2f6d1f'],
    berry: ['#e0313a', '#ffe14d'], trees: ['palm', 'palm', 'palm', 'round'], paddy: true, patch: ['rgba(150,120,60,.12)', 'rgba(240,255,170,.12)'],
    inside: { tuft: .06, flower: .015, pebble: .012, rock: .004 }, outside: { tree: .07, scarecrow: .006, bush: .015, rice: .9 } }
];
var DECOR = {}, STAMPS = {};
function rnd(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function stampCanvas(w, h, paint) { var cv = document.createElement('canvas'); cv.width = w; cv.height = h; var g = cv.getContext('2d'); try { paint(g, w, h); } catch (e) {} return { cv: cv, w: w, h: h, ax: w / 2, ay: h - 10 }; }
function blade(g, x, y, len, lean, w, col) { g.beginPath(); g.moveTo(x - w, y); g.quadraticCurveTo(x + lean * .3, y - len * .6, x + lean, y - len); g.quadraticCurveTo(x + lean * .3 + w * .4, y - len * .5, x + w, y); g.closePath(); g.fillStyle = col; g.fill(); }
function snowCap(g, cx, cy, rw, rh) { g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(cx, cy, rw, rh, 0, Math.PI, 0); g.quadraticCurveTo(cx + rw * .5, cy + rh * .9, cx, cy + rh * .4); g.quadraticCurveTo(cx - rw * .5, cy + rh * .9, cx - rw, cy); g.fill(); }
function makeStamps(T) {
  var r = rnd(7), S = {}, G = T.grass;
  function many(n, f) { var out = []; for (var i = 0; i < n; i++) out.push(f(i)); return out; }
  S.tuft = many(4, function (v) { return stampCanvas(56, 46, function (g, w, h) {
    var n = 5 + v * 2; for (var i = 0; i < n; i++) { var x = w / 2 + (r() - .5) * 26, l = 14 + r() * 20 + (v === 3 ? 6 : 0);
      blade(g, x, h - 10, l, (x - w / 2) * .7 + (r() - .5) * 10, 2.6, i % 3 ? G[1] : G[0]); }
    for (i = 0; i < n - 2; i++) { x = w / 2 + (r() - .5) * 18; blade(g, x, h - 10, 10 + r() * 12, (x - w / 2) * .6, 2, G[2]); }
    if (T.snow) { g.fillStyle = '#fff'; g.beginPath(); g.ellipse(w / 2, h - 10, 16, 5, 0, 0, 7); g.fill(); } }); });
  S.flower = T.petals.length ? many(T.petals.length, function (v) { return stampCanvas(60, 42, function (g, w, h) {
    for (var i = 0; i < 6; i++) blade(g, w / 2 + (r() - .5) * 30, h - 10, 6 + r() * 8, (r() - .5) * 8, 1.6, G[1]);
    var n = 3 + Math.floor(r() * 3), col = T.petals[v];
    for (i = 0; i < n; i++) { var x = w / 2 + (r() - .5) * 34, y = h - 14 - r() * 14;
      g.strokeStyle = G[0]; g.lineWidth = 1.4; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - .5) * 3, h - 10); g.stroke();
      g.fillStyle = col; for (var k = 0; k < 5; k++) { var a = k / 5 * 6.283; g.beginPath(); g.ellipse(x + Math.cos(a) * 3, y + Math.sin(a) * 2.3, 2.6, 2.1, 0, 0, 7); g.fill(); }
      g.fillStyle = col === '#ffe14d' || col === '#ffcf3a' ? '#e07a10' : '#ffcc22'; g.beginPath(); g.arc(x, y, 1.7, 0, 7); g.fill(); } }); }) : null;
  S.pebble = many(3, function (v) { return stampCanvas(50, 30, function (g, w, h) {
    var n = 2 + v; for (var i = 0; i < n; i++) { var x = w / 2 + (r() - .5) * 26, y = h - 12 + (r() - .5) * 8, rx = 3 + r() * 4, ry = rx * .62;
      g.fillStyle = T.snow ? 'rgba(90,120,150,.25)' : 'rgba(40,70,20,.28)'; g.beginPath(); g.ellipse(x + 1, y + 1.5, rx + 1, ry + .8, 0, 0, 7); g.fill();
      g.fillStyle = ['#a9a59a', '#bdb7a8', '#8f8b80'][i % 3]; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fill();
      g.fillStyle = T.snow ? '#fff' : 'rgba(255,255,255,.45)'; g.beginPath(); g.ellipse(x - rx * .3, y - ry * .35, rx * .45, ry * .35, 0, 0, 7); g.fill(); } }); });
  function boulder(g, cx, by, rw, rh, moss) {
    g.fillStyle = T.snow ? 'rgba(80,110,140,.3)' : 'rgba(30,60,15,.35)'; g.beginPath(); g.ellipse(cx + rw * .15, by, rw * 1.1, rw * .45, 0, 0, 7); g.fill();
    var pts = [], n = 9; for (var i = 0; i < n; i++) { var a = Math.PI + i / (n - 1) * Math.PI, k = .82 + r() * .2; pts.push([cx + Math.cos(a) * rw * k, by - 2 + Math.sin(a) * rh * k]); }
    g.beginPath(); g.moveTo(cx - rw, by - 2); pts.forEach(function (p) { g.lineTo(p[0], p[1]); }); g.lineTo(cx + rw, by - 2); g.quadraticCurveTo(cx, by + rw * .28, cx - rw, by - 2); g.closePath();
    var gr = g.createLinearGradient(cx - rw, by - rh, cx + rw, by); gr.addColorStop(0, '#d2cdbf'); gr.addColorStop(.55, '#9d988b'); gr.addColorStop(1, '#6d695f'); g.fillStyle = gr; g.fill();
    g.strokeStyle = 'rgba(50,45,40,.55)'; g.lineWidth = 2; g.stroke();
    g.strokeStyle = 'rgba(60,55,50,.45)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(cx - rw * .2, by - rh * .75); g.lineTo(cx + rw * .05, by - rh * .4); g.lineTo(cx - rw * .1, by - rh * .15); g.stroke();
    g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(cx - rw * .35, by - rh * .6, rw * .25, rh * .14, -.4, 0, 7); g.fill();
    if (T.snow) snowCap(g, cx - rw * .05, by - rh * .72, rw * .78, rh * .3);
    else if (moss) { g.fillStyle = G[1]; g.beginPath(); g.ellipse(cx - rw * .1, by - rh * .86, rw * .42, rh * .14, .1, 0, 7); g.fill(); g.fillStyle = G[2]; g.beginPath(); g.ellipse(cx - rw * .2, by - rh * .9, rw * .22, rh * .07, .1, 0, 7); g.fill(); }
    if (!T.snow) for (i = 0; i < 4; i++) blade(g, cx - rw + r() * rw * 2, by + 2, 6 + r() * 8, (r() - .5) * 6, 1.8, G[1]);
  }
  S.rock = many(4, function (v) { return stampCanvas(110, 90, function (g, w, h) {
    var big = 26 + v * 4; boulder(g, w / 2 + (v % 2 ? 8 : -6), h - 12, big, big * (.8 + r() * .25), v !== 2);
    if (v % 2) boulder(g, w / 2 - 24, h - 9, 13, 11, false); }); });
  var L = T.leaf;
  S.bush = many(3, function (v) { return stampCanvas(120, 90, function (g, w, h) {
    g.fillStyle = T.snow ? 'rgba(80,110,140,.3)' : 'rgba(25,55,10,.35)'; g.beginPath(); g.ellipse(w / 2 + 4, h - 10, 42, 15, 0, 0, 7); g.fill();
    var blobs = many(7, function () { return [w / 2 + (r() - .5) * 56, h - 22 - r() * 26, 14 + r() * 10]; }).sort(function (a, b) { return a[1] - b[1]; });
    blobs.forEach(function (b) { g.fillStyle = L[2]; g.beginPath(); g.arc(b[0], b[1] + 2, b[2], 0, 7); g.fill(); });
    blobs.forEach(function (b) { var gr = g.createRadialGradient(b[0] - b[2] * .4, b[1] - b[2] * .5, 2, b[0], b[1], b[2]); gr.addColorStop(0, L[0]); gr.addColorStop(1, L[1]); g.fillStyle = gr; g.beginPath(); g.arc(b[0], b[1], b[2] - 2, 0, 7); g.fill(); });
    if (v) for (var i = 0; i < 7; i++) { g.fillStyle = T.berry[v - 1]; g.beginPath(); g.arc(w / 2 + (r() - .5) * 50, h - 26 - r() * 26, 2.7, 0, 7); g.fill(); } }); });
  function roundTree(g, cx, by, c0, c1, c2, dots) {
    var blobs = many(8, function () { return [cx + (r() - .5) * 70, by - 96 - r() * 62, 22 + r() * 14]; }).sort(function (a, b) { return a[1] - b[1]; });
    blobs.forEach(function (b) { g.fillStyle = c2; g.beginPath(); g.arc(b[0] + 2, b[1] + 4, b[2], 0, 7); g.fill(); });
    blobs.forEach(function (b) { var gr = g.createRadialGradient(b[0] - b[2] * .45, b[1] - b[2] * .5, 3, b[0], b[1], b[2]); gr.addColorStop(0, c0); gr.addColorStop(1, c1); g.fillStyle = gr; g.beginPath(); g.arc(b[0], b[1], b[2] - 2, 0, 7); g.fill(); });
    if (dots) for (var i = 0; i < 9; i++) { g.fillStyle = dots; g.beginPath(); g.arc(cx + (r() - .5) * 64, by - 100 - r() * 50, 3.5, 0, 7); g.fill(); }
  }
  S.tree = T.trees.map(function (kind) { return stampCanvas(150, 200, function (g, w, h) {
    var cx = w / 2, by = h - 12;
    g.fillStyle = T.snow ? 'rgba(70,100,130,.3)' : 'rgba(20,50,10,.38)'; g.beginPath(); g.ellipse(cx + 14, by, 50, 18, 0, 0, 7); g.fill();
    var tg = g.createLinearGradient(cx - 8, 0, cx + 8, 0); tg.addColorStop(0, '#9a6a3c'); tg.addColorStop(1, '#5e3c1e'); g.fillStyle = tg;
    g.beginPath(); g.moveTo(cx - 9, by); g.quadraticCurveTo(cx - 5, by - 40, cx - 6, by - 70); g.lineTo(cx + 6, by - 70); g.quadraticCurveTo(cx + 5, by - 40, cx + 11, by); g.closePath(); g.fill();
    if (kind === 'pine' || kind === 'snowpine') {
      for (var t = 0; t < 4; t++) { var y0 = by - 40 - t * 30, hw = 46 - t * 9; g.fillStyle = '#245a24'; g.beginPath(); g.moveTo(cx - hw, y0 + 4); g.lineTo(cx, y0 - 54); g.lineTo(cx + hw, y0 + 4); g.quadraticCurveTo(cx, y0 + 14, cx - hw, y0 + 4); g.fill();
        g.fillStyle = '#3d8a33'; g.beginPath(); g.moveTo(cx - hw + 6, y0); g.lineTo(cx, y0 - 50); g.lineTo(cx + 4, y0 + 6); g.quadraticCurveTo(cx - hw * .5, y0 + 8, cx - hw + 6, y0); g.fill();
        if (kind === 'snowpine') { g.fillStyle = '#fff'; g.beginPath(); g.moveTo(cx, y0 - 54); g.lineTo(cx - hw * .55, y0 - 22); g.quadraticCurveTo(cx - hw * .2, y0 - 14, cx, y0 - 24); g.quadraticCurveTo(cx + hw * .3, y0 - 12, cx + hw * .6, y0 - 20); g.closePath(); g.fill();
          g.beginPath(); g.ellipse(cx, y0 + 6, hw * .8, 4, 0, 0, 7); g.fill(); } }
      return; }
    if (kind === 'bare') { g.strokeStyle = '#5e3c1e'; g.lineCap = 'round'; for (var i = 0; i < 6; i++) { var a = -Math.PI / 2 + (r() - .5) * 1.8, y1 = by - 60 - r() * 20, l = 30 + r() * 30;
        g.lineWidth = 5; g.beginPath(); g.moveTo(cx, y1); g.lineTo(cx + Math.cos(a) * l, y1 + Math.sin(a) * l); g.stroke();
        g.fillStyle = '#fff'; g.beginPath(); g.ellipse(cx + Math.cos(a) * l * .7, y1 + Math.sin(a) * l * .7 - 3, 7, 3, a + Math.PI / 2, 0, 7); g.fill(); } return; }
    if (kind === 'sunflowers') { g.clearRect(0, 0, w, h); return sunflowerClump(g, cx, by, 5, 60); }
    if (kind === 'palm') { // a Thai sugar palm: tall thin trunk, round crown of fan leaves
      g.clearRect(0, 0, w, h); g.fillStyle = 'rgba(20,50,20,.32)'; g.beginPath(); g.ellipse(cx + 18, by, 36, 12, 0, 0, 7); g.fill();
      var tg2 = g.createLinearGradient(cx - 6, 0, cx + 6, 0); tg2.addColorStop(0, '#8a6a4a'); tg2.addColorStop(1, '#4e3826'); g.fillStyle = tg2;
      g.beginPath(); g.moveTo(cx - 6, by); g.lineTo(cx - 3.5, by - 140); g.lineTo(cx + 3.5, by - 140); g.lineTo(cx + 7, by); g.closePath(); g.fill();
      g.fillStyle = '#2f5f22'; g.beginPath(); g.arc(cx, by - 150, 15, 0, 7); g.fill();
      for (var f = 0; f < 13; f++) { var fa = -Math.PI + f / 12 * Math.PI * 1.0 + (r() - .5) * .2, fx = cx + Math.cos(fa) * 30, fy = by - 150 + Math.sin(fa) * 26 + (f % 2) * 4;
        g.save(); g.translate(fx, fy); g.rotate(fa + Math.PI / 2); g.fillStyle = f % 2 ? '#3f8a2e' : '#5aa83a';
        g.beginPath(); g.moveTo(0, 14); for (var p2 = 0; p2 <= 6; p2++) { var pa = Math.PI + p2 / 6 * Math.PI; g.lineTo(Math.cos(pa) * 15, Math.sin(pa) * 15 + 2); } g.closePath(); g.fill(); g.restore(); }
      g.fillStyle = '#3a6e28'; for (f = 0; f < 4; f++) { g.beginPath(); g.ellipse(cx + (f - 1.5) * 9, by - 140, 6, 14, (f - 1.5) * .3, 0, 7); g.fill(); }
      return; }
    if (kind === 'blossom') return roundTree(g, cx, by, '#ffd3e6', '#f28ab7', '#c9638f', '#ffffff');
    if (kind === 'autumnO') return roundTree(g, cx, by, '#ffc25a', '#e8741f', '#a84a14');
    if (kind === 'autumnR') return roundTree(g, cx, by, '#ff8a5a', '#cf3d1f', '#8e2614');
    if (kind === 'autumnY') return roundTree(g, cx, by, '#ffe680', '#e9b52a', '#a87a14');
    roundTree(g, cx, by, kind === 'fruit' ? '#b6e264' : '#94d85a', kind === 'fruit' ? '#4e9a2a' : '#3a8526', '#285f1c', kind === 'fruit' ? '#ff9a1f' : null); }); });
  S.stump = [stampCanvas(70, 50, function (g, w, h) { var cx = w / 2, by = h - 12;
    g.fillStyle = 'rgba(30,60,15,.33)'; g.beginPath(); g.ellipse(cx + 3, by, 22, 8, 0, 0, 7); g.fill();
    g.fillStyle = '#7a4f2a'; g.fillRect(cx - 14, by - 16, 28, 16); g.beginPath(); g.ellipse(cx, by, 14, 5, 0, 0, 7); g.fill();
    g.fillStyle = T.snow ? '#ffffff' : '#d9b27a'; g.beginPath(); g.ellipse(cx, by - 16, 14, 5.5, 0, 0, 7); g.fill(); if (!T.snow) { g.strokeStyle = '#a77a45'; g.lineWidth = 1; g.beginPath(); g.ellipse(cx, by - 16, 8, 3, 0, 0, 7); g.stroke(); }
    blade(g, cx - 16, by + 1, 10, -3, 2, G[1]); blade(g, cx + 15, by + 1, 12, 3, 2, G[1]); })];
  S.mushroom = many(2, function (v) { return stampCanvas(46, 40, function (g, w, h) {
    for (var i = 0; i < 2 + v; i++) { var x = w / 2 + (i - .5) * 11, by = h - 10, s = 1 - i * .25;
      g.fillStyle = '#f3ead6'; g.fillRect(x - 2.5 * s, by - 10 * s, 5 * s, 10 * s);
      g.fillStyle = v ? '#c0742f' : '#e2392f'; g.beginPath(); g.ellipse(x, by - 10 * s, 9 * s, 6.5 * s, 0, Math.PI, 0); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(x - 3 * s, by - 13 * s, 1.5 * s, 0, 7); g.arc(x + 3 * s, by - 12 * s, 1.2 * s, 0, 7); g.fill(); } }); });
  if (T.sun) S.sunflower = many(3, function (v) { return stampCanvas(70, 90, function (g, w, h) { sunflowerClump(g, w / 2, h - 10, 2 + v, 34 + v * 6); }); });
  function sunflowerClump(g, cx, by, n, tall) {
    g.fillStyle = 'rgba(30,60,15,.3)'; g.beginPath(); g.ellipse(cx + 3, by, 10 + n * 6, 5 + n, 0, 0, 7); g.fill();
    var heads = many(n, function (i) { return [cx + (i - (n - 1) / 2) * 14 + (r() - .5) * 8, by - tall * (.75 + r() * .35), 7 + r() * 2.5]; }).sort(function (a, b) { return a[1] - b[1]; });
    heads.forEach(function (q) {
      g.strokeStyle = '#3f8423'; g.lineWidth = 2.6; g.beginPath(); g.moveTo(q[0], q[1]); g.quadraticCurveTo(q[0] + 3, (q[1] + by) / 2, q[0] - 1, by); g.stroke();
      g.fillStyle = '#4f9a2e'; g.beginPath(); g.ellipse(q[0] - 6, (q[1] + by) / 2 + 4, 6, 3, .5, 0, 7); g.ellipse(q[0] + 6, (q[1] + by) / 2 - 2, 6, 3, -.5, 0, 7); g.fill();
      g.fillStyle = '#ffc21a'; for (var k = 0; k < 12; k++) { var a = k / 12 * 6.283; g.beginPath(); g.ellipse(q[0] + Math.cos(a) * q[2] * .95, q[1] + Math.sin(a) * q[2] * .8, q[2] * .5, q[2] * .22, a, 0, 7); g.fill(); }
      g.fillStyle = '#ffe14d'; for (k = 0; k < 12; k++) { a = (k + .5) / 12 * 6.283; g.beginPath(); g.ellipse(q[0] + Math.cos(a) * q[2] * .8, q[1] + Math.sin(a) * q[2] * .66, q[2] * .4, q[2] * .17, a, 0, 7); g.fill(); }
      g.fillStyle = '#6b3d14'; g.beginPath(); g.ellipse(q[0], q[1], q[2] * .55, q[2] * .48, 0, 0, 7); g.fill();
      g.fillStyle = '#4a2a0c'; g.beginPath(); g.ellipse(q[0] + 1, q[1] + 1, q[2] * .3, q[2] * .25, 0, 0, 7); g.fill(); });
  }
  if (T.paddy) {
    S.rice = many(4, function (v) { return stampCanvas(80, 50, function (g, w, h) {
      g.fillStyle = 'rgba(170,220,235,.45)'; g.beginPath(); g.ellipse(w / 2, h - 10, 30, 10, 0, 0, 7); g.fill();
      for (var row = -1; row <= 1; row++) for (var col = -1; col <= 1; col++) { var x = w / 2 + (col - row) * 9, y = h - 10 + (col + row) * 3.4;
        for (var i = 0; i < 6; i++) blade(g, x + (r() - .5) * 4, y, 12 + r() * 8 + v * 2, (r() - .5) * 10, 1.2, i % 2 ? (v === 3 ? '#c9c43a' : '#5fae2c') : (v === 3 ? '#a8a02a' : '#3f8a1f'));
        if (v === 3) { g.fillStyle = '#e6c24a'; g.beginPath(); g.ellipse(x + 3, y - 18, 2, 4, .4, 0, 7); g.fill(); } } }); });
    S.scarecrow = [stampCanvas(80, 110, function (g, w, h) { var cx = w / 2, by = h - 10;
      g.fillStyle = 'rgba(30,60,30,.3)'; g.beginPath(); g.ellipse(cx + 6, by, 18, 6, 0, 0, 7); g.fill();
      g.fillStyle = '#7a4f2a'; g.fillRect(cx - 2, by - 70, 4, 70); g.fillRect(cx - 26, by - 58, 52, 4);
      g.fillStyle = '#c0392b'; g.beginPath(); g.moveTo(cx - 14, by - 58); g.lineTo(cx + 14, by - 58); g.lineTo(cx + 11, by - 30); g.lineTo(cx - 11, by - 30); g.closePath(); g.fill();
      g.fillStyle = '#e6c56a'; for (var i = 0; i < 5; i++) { g.fillRect(cx - 28 + i * 1.5, by - 56 + i, 3, 8); g.fillRect(cx + 24 - i * 1.5, by - 56 + i, 3, 8); g.fillRect(cx - 10 + i * 4, by - 31, 2, 6); }
      g.fillStyle = '#f2deb0'; g.beginPath(); g.arc(cx, by - 66, 8, 0, 7); g.fill();
      g.fillStyle = '#333'; g.fillRect(cx - 4, by - 68, 2, 2); g.fillRect(cx + 2, by - 68, 2, 2);
      g.fillStyle = '#d9b25a'; g.beginPath(); g.ellipse(cx, by - 72, 16, 4, 0, 0, 7); g.fill(); g.beginPath(); g.moveTo(cx - 8, by - 72); g.lineTo(cx, by - 84); g.lineTo(cx + 8, by - 72); g.fill(); })];
  }
  if (T.fallen) S.leaves = many(4, function () { return stampCanvas(70, 40, function (g, w, h) {
    for (var i = 0; i < 9; i++) { var x = w / 2 + (r() - .5) * 52, y = h - 12 + (r() - .5) * 18; g.fillStyle = T.fallen[Math.floor(r() * T.fallen.length)];
      g.beginPath(); g.ellipse(x, y, 4.5, 2.4, r() * 3, 0, 7); g.fill(); } }); });
  if (T.snow) S.mound = many(3, function (v) { return stampCanvas(80, 44, function (g, w, h) {
    g.fillStyle = 'rgba(120,150,185,.28)'; g.beginPath(); g.ellipse(w / 2 + 4, h - 9, 26 + v * 5, 8, 0, 0, 7); g.fill();
    var gr = g.createLinearGradient(0, h - 30, 0, h - 8); gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#d6e4f0'); g.fillStyle = gr;
    g.beginPath(); g.ellipse(w / 2, h - 11, 22 + v * 5, 9 + v * 2, 0, Math.PI, 0); g.quadraticCurveTo(w / 2, h - 5, w / 2 - 22 - v * 5, h - 11); g.fill();
    if (v === 2) { g.fillStyle = '#6b4a2a'; g.fillRect(w / 2 + 8, h - 30, 2, 14); } }); });
  return S;
}
function makeDecor(T, S) {
  var r = rnd(20261124), out = [], M = MAP, E = 9;
  function add(k, x, y, sc) { var list = S[k]; if (!list) return; out.push({ st: list[Math.floor(r() * list.length)], x: x, y: y, s: sc || 1, small: k === 'tuft' || k === 'flower' || k === 'pebble' || k === 'mushroom' || k === 'leaves' || k === 'mound', flip: r() < .5 }); }
  function pick(w, q) { for (var k in w) { if (q < w[k]) return k; q -= w[k]; } return null; }
  var ring = { tuft: .22, flower: .08, pebble: .06 }; if (T.snow) ring = { mound: .14, pebble: .06, tuft: .04 }; if (T.fallen) ring.leaves = .14; if (T.sun) ring.sunflower = .08; if (T.paddy) ring = { tuft: .3, flower: .05, pebble: .05 };
  for (var ty = -E; ty < M + E; ty++) for (var tx = -E; tx < M + E; tx++) {
    var inside = tx >= 0 && ty >= 0 && tx < M && ty < M, x = tx + r(), y = ty + r(), q = r(), k;
    if (inside) { k = pick(T.inside, q); if (k) add(k, x, y, k === 'rock' ? .32 + r() * .12 : k === 'sunflower' ? .55 + r() * .15 : k === 'tuft' ? .8 + r() * .4 : .8 + r() * .3); continue; }
    var edge = Math.max(-tx - 1, -ty - 1, tx - M, ty - M);            // 0 = the ring right next to the base
    var back = tx < 0 || ty < 0;                                      // behind the base on screen: tall trees are fine there
    if (edge === 0) { k = pick(ring, q); if (k) add(k, x, y); continue; }
    k = pick(T.outside, q);
    if (k === 'rice') { add('rice', tx + .5 + (r() - .5) * .08, ty + .5 + (r() - .5) * .08, 1.45); continue; }   // paddy rows: planted on the grid
    if (k === 'tree' && !(back && edge >= 2)) k = 'bush';
    if (k) add(k, x, y, k === 'tree' ? (T.paddy ? 1 + r() * .3 : .85 + r() * .35) : k === 'rice' ? 1 + r() * .15 : k === 'sunflower' ? .9 + r() * .3 : k === 'bush' ? .7 + r() * .5 : k === 'rock' ? .6 + r() * .6 : 1);
  }
  out.sort(function (a, b) { return (a.x + a.y) - (b.x + b.y); });
  var patches = []; for (var i = 0; i < 18; i++) patches.push({ x: 2 + r() * (M - 4), y: 2 + r() * (M - 4), rx: .8 + r() * 1.6, ry: .6 + r() * 1.2, a: r() * 3, dirt: r() < .35 });
  return { items: out, patches: patches };
}
function groundTheme() { var i = screen === 'raid' && R ? (R.level + 1) % GROUNDS.length : (D && D.ground) || 0; return clamp(i | 0, 0, GROUNDS.length - 1); }
function paintGround(c, themeIndex) {
  var ti = themeIndex === undefined ? groundTheme() : themeIndex, T = GROUNDS[ti];
  if (!STAMPS[ti]) STAMPS[ti] = makeStamps(T);
  if (!DECOR[ti]) DECOR[ti] = makeDecor(T, STAMPS[ti]);
  var DEC = DECOR[ti], p = [toScreen(0, 0), toScreen(MAP, 0), toScreen(MAP, MAP), toScreen(0, MAP)], s = cam.s;
  var bg = c.createLinearGradient(0, 0, 0, view.h); bg.addColorStop(0, T.outer[0]); bg.addColorStop(.5, T.outer[1]); bg.addColorStop(1, T.outer[2]);
  c.fillStyle = bg; c.fillRect(0, 0, view.w, view.h);
  if (T.paddy) { // rice paddies: water-green plots split by raised dikes (คันนา)
    c.fillStyle = 'rgba(160,215,230,.18)'; c.beginPath(); for (var px = -12; px < MAP + 12; px += 4) for (var py = -12; py < MAP + 12; py += 4) { var q0 = toScreen(px + .3, py + .3), q1 = toScreen(px + 3.7, py + .3), q2 = toScreen(px + 3.7, py + 3.7), q3 = toScreen(px + .3, py + 3.7); c.moveTo(q0.x, q0.y); c.lineTo(q1.x, q1.y); c.lineTo(q2.x, q2.y); c.lineTo(q3.x, q3.y); c.closePath(); } c.fill();
    c.strokeStyle = '#9c8a52'; c.lineWidth = Math.max(1.5, s * .22); c.lineCap = 'round'; c.beginPath();
    for (var dk = -12; dk <= MAP + 12; dk += 4) { var d0 = toScreen(dk, -12), d1 = toScreen(dk, MAP + 12), d2 = toScreen(-12, dk), d3 = toScreen(MAP + 12, dk); c.moveTo(d0.x, d0.y); c.lineTo(d1.x, d1.y); c.moveTo(d2.x, d2.y); c.lineTo(d3.x, d3.y); } c.stroke();
    c.strokeStyle = 'rgba(190,230,110,.6)'; c.lineWidth = Math.max(1, s * .07); c.stroke(); }
  // a dirt rim around the base (like a trampled edge), then the lawn inside
  var rim = [toScreen(-.35, -.35), toScreen(MAP + .35, -.35), toScreen(MAP + .35, MAP + .35), toScreen(-.35, MAP + .35)];
  c.beginPath(); c.moveTo(rim[0].x, rim[0].y); for (var i = 1; i < 4; i++) c.lineTo(rim[i].x, rim[i].y); c.closePath(); c.fillStyle = T.rim; c.fill();
  c.save(); c.beginPath(); c.moveTo(p[0].x, p[0].y); for (i = 1; i < 4; i++) c.lineTo(p[i].x, p[i].y); c.closePath();
  var g = c.createLinearGradient(p[0].x, p[0].y, p[2].x, p[2].y); g.addColorStop(0, T.lawn[0]); g.addColorStop(.5, T.lawn[1]); g.addColorStop(1, T.lawn[2]); c.fillStyle = g; c.fill();
  c.clip();
  var A = Math.abs(T.stripeA), tone = T.stripeA < 0 ? '120,150,190' : '255,255,255', a, b, d, e;
  function band(x0, y0, x1, y1, x2, y2, x3, y3) { a = toScreen(x0, y0); b = toScreen(x1, y1); d = toScreen(x2, y2); e = toScreen(x3, y3); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.lineTo(d.x, d.y); c.lineTo(e.x, e.y); c.closePath(); }
  if (T.stripes === 'rows') { // wide mown bands, football-pitch style
    c.fillStyle = 'rgba(' + tone + ',' + A + ')'; c.beginPath(); for (var row = 0; row < MAP; row += 4) band(row, 0, row + 2, 0, row + 2, MAP, row, MAP); c.fill();
    c.fillStyle = 'rgba(0,40,0,.035)'; c.beginPath(); for (var col = 0; col < MAP; col += 2) band(0, col, MAP, col, MAP, col + 1, 0, col + 1); c.fill();
  } else { // soft checkerboard
    c.fillStyle = 'rgba(' + tone + ',' + A + ')'; c.beginPath(); for (var x = 0; x < MAP; x++) for (var y = (x & 1); y < MAP; y += 2) band(x, y, x + 1, y, x + 1, y + 1, x, y + 1); c.fill();
  }
  DEC.patches.forEach(function (q) { var o = toScreen(q.x, q.y); c.fillStyle = q.dirt ? T.patch[0] : T.patch[1];
    c.beginPath(); c.ellipse(o.x, o.y, q.rx * s, q.ry * s * ISO, q.a, 0, 7); c.fill(); });
  if (T.chalk) { // white pitch lines: a border, the halfway line and the centre circle
    c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = Math.max(1.5, s * .08); c.beginPath(); band(1, 1, MAP - 1, 1, MAP - 1, MAP - 1, 1, MAP - 1);
    a = toScreen(MAP / 2, 1); b = toScreen(MAP / 2, MAP - 1); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
    var o = toScreen(MAP / 2, MAP / 2); c.beginPath(); c.ellipse(o.x, o.y, 5 * s * H * 2 * .72, 5 * s * H * 2 * ISO * .72, 0, 0, 7); c.stroke(); }
  c.restore();
  c.strokeStyle = T.edge; c.lineWidth = Math.max(1.5, s * .06); c.beginPath(); c.moveTo(p[0].x, p[0].y); for (i = 1; i < 4; i++) c.lineTo(p[i].x, p[i].y); c.closePath(); c.stroke();
  // decorations (culled to the screen; the tiniest ones skipped when zoomed far out)
  var k = s / GU, tiny = s < 13, W = view.w, Hh = view.h;
  c.imageSmoothingEnabled = true;
  for (i = 0; i < DEC.items.length; i++) {
    var it = DEC.items[i]; if (tiny && it.small) continue;
    var q = toScreen(it.x, it.y), st = it.st, z = k * it.s, w = st.w * z, hh = st.h * z;
    if (q.x + w < 0 || q.x - w > W || q.y - hh > Hh || q.y + hh < 0) continue;
    if (it.flip) { c.save(); c.translate(q.x, q.y); c.scale(-1, 1); c.drawImage(st.cv, -st.ax * z, -st.ay * z, w, hh); c.restore(); }
    else c.drawImage(st.cv, q.x - st.ax * z, q.y - st.ay * z, w, hh);
  }
}
// a small picture of a map look for the picker: paints the whole base into a little canvas using a temporary camera
function groundPreview(ti, w, h) {
  var cv = document.createElement('canvas'), dpr = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  var sv = { w: view.w, h: view.h }, sc = { x: cam.x, y: cam.y, s: cam.s };
  try { view.w = w; view.h = h; cam.s = w / (MAP * 2 * H) * 1.25; cam.x = cam.y = 0; var m = toScreen(MAP / 2, MAP / 2); cam.x = w / 2 - m.x; cam.y = h / 2 - m.y;
    var g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); paintGround(g, ti); }
  catch (e) {}
  view.w = sv.w; view.h = sv.h; cam.x = sc.x; cam.y = sc.y; cam.s = sc.s;
  return cv;
}
function tileDiamond(x, y, s, fill, stroke, c) {
  c = c || ctx;
  var a = toScreen(x, y), b = toScreen(x + s, y), d = toScreen(x + s, y + s), e = toScreen(x, y + s);
  c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.lineTo(d.x, d.y); c.lineTo(e.x, e.y); c.closePath();
  if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.strokeStyle = stroke; c.lineWidth = 2; c.stroke(); }
}
function sprite(a, wx, wy, opt) {
  var im = img(a.file); if (!ready(im)) return; var p = toScreen(wx, wy), k = cam.s / a.ppu * ((opt && opt.fit) || 1);
  var sx = 1, sy = 1; if (opt && opt.squash) { sx = opt.squash[0]; sy = opt.squash[1]; }
  ctx.save(); ctx.translate(p.x, p.y); ctx.scale(sx, sy); if (opt && opt.alpha !== undefined) ctx.globalAlpha = opt.alpha;
  ctx.drawImage(im, -a.ax * k, -a.ay * k, im.width * k, im.height * k); ctx.restore();
}
function wobble(o) { // jelly pop when placed / upgraded, squish when hit
  var t = (now() - (o.pop || 0)) / 1000, h = (now() - (o.hitAt || 0)) / 1000, sx = 1, sy = 1;
  if (t < .7) { var w = Math.exp(-6 * t) * Math.sin(t * 22); sx = 1 + w * .18; sy = 1 - w * .22; }
  if (h < .25) { var q = Math.sin(h / .25 * Math.PI) * .07; sx *= 1 + q; sy *= 1 - q; }
  return [sx, sy];
}
function drawBuilding(b, scene) {
  var d = B[b.k], s = d.size, c = { x: b.x + s / 2, y: b.y + s / 2 };
  if (d.wall) return drawWall(b, scene);
  if (b.dead) { var art = d.turret ? null : ART.buildings[d.art].rubble; if (art) sprite(art, c.x, c.y); else drawTurret(b, c, true); if (b.deadAt) smoulder(c, b); return; }
  var stage = stageOf(Math.max(1, b.lv));
  if (d.turret) drawTurret(b, c, false);
  else sprite(ART.buildings[d.art].stages[stage - 1], c.x, c.y, { squash: wobble(b), alpha: b.lv === 0 ? .55 : 1 });
  if (b.up) drawScaffold(b, c);
  else if (b.boost && b.boost > now()) drawBoost(b, c);
  if (b.max && b.hp < b.max * .5) smoke(c, b);
}
function drawTurret(b, c, dead) {
  var tu = ART.turrets[B[b.k].turret], st = tu.stages[stageOf(Math.max(1, b.lv)) - 1], im = img(st.file); if (!ready(im)) return;
  var p = toScreen(c.x, c.y), k = cam.s / st.ppu * (st.fit || tu.fit || 1), cs = st.cell, w = wobble(b);
  var dir = ((Math.round((b.aim === undefined ? 2.36 : b.aim) / (Math.PI / 8)) % 16) + 16) % 16, rec = b.fire ? Math.max(0, 1 - (now() - b.fire) / 220) : 0;
  function cell(n, dx, dy) { ctx.drawImage(im, (n % 6) * cs, Math.floor(n / 6) * cs, cs, cs, -st.ax * k + dx, -st.ay * k + dy, cs * k, cs * k); }
  ctx.save(); ctx.translate(p.x, p.y); ctx.scale(w[0], w[1]); if (b.lv === 0) ctx.globalAlpha = .55;
  if (dead) { cell(17, 0, 0); ctx.restore(); return; }
  cell(16, 0, 0);
  if (st.band) { slingHead(b, st, dir, k, cell); ctx.restore(); return; }
  var ax = Math.cos(b.aim || 0) - Math.sin(b.aim || 0), ay = (Math.cos(b.aim || 0) + Math.sin(b.aim || 0)) * ISO;
  cell(dir, -ax * rec * 4, -ay * rec * 4);
  ctx.restore();
}
// Giant slingshot: the frame stays put; the rubber band is drawn live. While reloading the duck stretches it back
// (band thins as it stretches), on firing it snaps forward past the fork, wobbles and settles; the stone leaves the pouch.
// At home the duck practises: a slow pull, a trembling hold, a dry snap.
function slingPull(b, rate) {
  var raid = screen === 'raid' && R, T = raid ? (R.now || now()) : now(), e, f, loaded = true;
  function spring(t) { return Math.exp(-t * 7) * Math.cos(t * 24); }
  if (raid) {
    if (!b.fire) return { f: 0, loaded: true, e: 9 };
    e = (T - b.fire) / 1000;
    if (e < .45) { f = spring(e); loaded = false; }
    else { var c = clamp((e - .45) / Math.max(.2, rate - .55), 0, 1); f = 1 - (1 - c) * (1 - c); }
    return { f: f, loaded: loaded, e: e };
  }
  var t = ((T / 1000) + (b.id || 0) * 1.37) % 6;
  if (t < 1.3) f = .85 * (1 - Math.pow(1 - t / 1.3, 2));
  else if (t < 1.9) f = .85 + Math.sin(t * 60) * .015;
  else { f = .85 * spring(t - 1.9); }
  return { f: f, loaded: false, e: t < 1.9 ? 9 : t - 1.9 };
}
function slingHead(b, st, dir, k, cell) {
  var B0 = st.band, D = B0.dirs[dir], s = stageOf(Math.max(1, b.lv)), p = slingPull(b, B[b.k].rate);
  var tw = p.e < .3 ? Math.sin(p.e * 70) * (1 - p.e / .3) * 1.6 : 0;   // the fork twangs right after a release
  cell(dir, tw, 0);
  var f = p.f, px = (D.R[0] + (D.P[0] - D.R[0]) * f) * k - st.ax * k, py = (D.R[1] + (D.P[1] - D.R[1]) * f) * k - st.ay * k;
  var w = Math.max(1.1, B0.bw * k * (1 - .35 * Math.max(0, f)));
  var col = s >= 4 ? '#8e1010' : '#d2401c', dark = s >= 4 ? '#3a0505' : '#6e1a08';
  ctx.lineCap = 'round';
  D.tips.forEach(function (t) { var tx = t[0] * k - st.ax * k + tw, ty = t[1] * k - st.ay * k;
    ctx.strokeStyle = dark; ctx.lineWidth = w + 1.2; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py); ctx.stroke(); });
  var pr = B0.pw * k * .55;
  ctx.fillStyle = '#4a2810'; ctx.beginPath(); ctx.ellipse(px, py, pr * 1.25, pr * .85, 0, 0, 7); ctx.fill();
  if (p.loaded) { var rr = pr * .75; ctx.fillStyle = s === 5 ? '#ff7a1a' : s === 4 ? '#2a2a30' : '#8f8b84'; ctx.beginPath(); ctx.arc(px, py - rr * .35, rr, 0, 7); ctx.fill();
    ctx.fillStyle = s === 5 ? 'rgba(255,230,120,.9)' : 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(px - rr * .3, py - rr * .7, rr * .35, 0, 7); ctx.fill(); }
  if (screen !== 'raid' || (p.f > .02 && p.f < .99) || p.e < .45) dirty = true;   // keep animating while the band moves
}
var WALLSET = null;   // live wall tiles of the scene being drawn, rebuilt each frame (was a scan of every building per wall)
function buildWallSet(list) { var set = new Set(); for (var i = 0; i < list.length; i++) { var o = list[i]; if (o.k === 'wall' && !o.dead) set.add(o.x * 1000 + o.y); } WALLSET = { list: list, set: set }; }
function drawWall(b, scene) {
  var tier = clamp(Math.ceil(b.lv * 6 / MAX_LV), 1, 6), set = ART.walls[tier] || ART.walls['1']; if (!set) return;
  var list = scene.buildings, set2 = WALLSET && WALLSET.list === list ? WALLSET.set : null,
      has = set2 ? function (x, y) { return set2.has(x * 1000 + y); } : function (x, y) { return list.some(function (o) { return o.k === 'wall' && !o.dead && o.x === x && o.y === y; }); };
  if (b.dead) return;
  var cx = b.x + .5, cy = b.y + .5, w = wobble(b), f = {}, fw = { squash: w };
  if (has(b.x, b.y - 1) && set.linky) { sprite(set.linky, cx, cy - .5, f); sprite(set.linky, cx, cy, f); }
  if (has(b.x - 1, b.y) && set.linkx) { sprite(set.linkx, cx - .5, cy, f); sprite(set.linkx, cx - 1, cy, f); }
  if (set.post) sprite(set.post, cx, cy, fw);
}
function drawScaffold(b, c) {
  var p = toScreen(c.x, c.y), left = b.up.until - now(), tot = b.up.until - b.up.start, k = clamp(1 - left / tot, 0, 1);
  var w = 60, x = p.x - w / 2, y = p.y - cam.s * 2.2;
  ctx.fillStyle = 'rgba(20,40,60,.75)'; roundRect(x - 4, y - 18, w + 8, 26, 8); ctx.fill();
  ctx.fillStyle = '#ffe36b'; roundRect(x, y, w * k, 5, 3); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🔨 ' + clock(left), p.x, y - 4);
}
// ---------- smoke: soft billowing puffs that rise, drift, grow, lighten and fade ----------
function puffTexture(rgb, seed) {
  var c = document.createElement('canvas'); c.width = c.height = 96; var g = c.getContext('2d'), r = rng(seed);
  for (var i = 0; i < 11; i++) {
    var x = 48 + (r() - .5) * 36, y = 50 + (r() - .5) * 30, rr = 16 + r() * 16, gr = g.createRadialGradient(x - rr * .25, y - rr * .3, rr * .1, x, y, rr);
    gr.addColorStop(0, 'rgba(' + rgb + ',.62)'); gr.addColorStop(.55, 'rgba(' + rgb + ',.35)'); gr.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, rr, 0, 7); g.fill();
  }
  return c;
}
var PUFFS = null, SMOKE = [], FDT = 0;
function puffs() { if (!PUFFS) PUFFS = { dark: [puffTexture('58,54,52', 3), puffTexture('62,58,55', 9)], grey: [puffTexture('140,136,134', 5), puffTexture('150,146,142', 11)], light: [puffTexture('236,232,226', 7), puffTexture('242,238,230', 13)], dust: [puffTexture('214,196,160', 17), puffTexture('226,210,176', 19)] }; return PUFFS; }
var SMOKE_MAX = 140;   // a huge brawl makes lots of dust: keep the newest puffs within budget
function emitSmoke(x, y, z, kind, size, n) {
  n = n || 1; if (SMOKE.length >= SMOKE_MAX) return; if (SMOKE.length > SMOKE_MAX * .6) n = Math.max(1, Math.ceil(n / 3));
  for (var i = 0; i < n; i++) SMOKE.push({ x: x + (Math.random() - .5) * .3 * size, y: y + (Math.random() - .5) * .3 * size, z: z, vz: kind === 'dust' ? .5 + Math.random() * .6 : .7 + Math.random() * .4,
    vx: (Math.random() - .5) * (kind === 'dust' ? 1.6 : .15), vy: (Math.random() - .5) * (kind === 'dust' ? 1.6 : .15), age: 0, life: kind === 'dust' ? .9 + Math.random() * .6 : 2.2 + Math.random() * 1.2,
    size: size * (.45 + Math.random() * .3), kind: kind, tex: Math.random() < .5 ? 0 : 1, rot: Math.random() * 6.28, spin: (Math.random() - .5) * .6 });
}
function drawBoost(b, c) { // little ⚡x2 tag with time left over a boosted maker
  var p = toScreen(c.x, c.y), y = p.y - cam.s * 1.9 - Math.sin(now() / 300) * 3, txt = '⚡x2 ' + clock(b.boost - now());
  ctx.font = 'bold 12px sans-serif'; var w = ctx.measureText(txt).width + 14;
  ctx.fillStyle = 'rgba(255,190,30,.92)'; roundRect(p.x - w / 2, y - 16, w, 20, 10); ctx.fill();
  ctx.fillStyle = '#5a3300'; ctx.textAlign = 'center'; ctx.fillText(txt, p.x, y - 2);
}
function smoke(c, b) { // a damaged building keeps smoking, thicker and darker the lower its HP
  var hurt = 1 - b.hp / b.max; b.smokeT = (b.smokeT || 0) - FDT; if (b.smokeT > 0) return;
  b.smokeT = .32 - hurt * .18; var s = B[b.k].size; emitSmoke(c.x + (Math.random() - .5) * s * .3, c.y + (Math.random() - .5) * s * .3, .5 + s * .25, hurt > .75 ? 'dark' : 'grey', .8 + s * .35);
}
function smoulder(c, b) { // rubble smoulders for a few seconds after it falls
  var t = (now() - b.deadAt) / 1000; if (t > 7) return; b.smokeT = (b.smokeT || 0) - FDT; if (b.smokeT > 0) return;
  b.smokeT = .35 + t * .12; var s = B[b.k].size; emitSmoke(c.x + (Math.random() - .5) * s * .5, c.y + (Math.random() - .5) * s * .5, .2, t < 2 ? 'dark' : 'grey', .5 + s * .22);
}
function drawSmoke(dt) {
  var P = puffs(), dpr = view.dpr;
  SMOKE = SMOKE.filter(function (p) {
    p.age += dt; if (p.age >= p.life) return false; var q = p.age / p.life;
    p.z += p.vz * dt; p.vz *= p.kind === 'dust' ? .96 : .995; p.x += (p.vx + .18) * dt; p.y += (p.vy - .18) * dt; p.vx *= .97; p.vy *= .97; p.rot += p.spin * dt;   // gentle breeze
    var sc = toScreen(p.x, p.y, p.z), r = p.size * cam.s * (.55 + q * (p.kind === 'dust' ? 1.1 : 1.6)), a = Math.min(1, p.age / .18) * (1 - q) * (1 - q);
    var cs = Math.cos(p.rot) * dpr, sn = Math.sin(p.rot) * dpr; ctx.setTransform(cs, sn, -sn, cs, sc.x * dpr, sc.y * dpr);
    var base = P[p.kind][p.tex], lite = P[p.kind === 'dust' ? 'dust' : 'light'][p.tex];
    ctx.globalAlpha = a * (1 - q * .7); ctx.drawImage(base, -r, -r, 2 * r, 2 * r);                     // starts dark and sooty
    if (p.kind !== 'dust') { ctx.globalAlpha = a * q * .8; ctx.drawImage(lite, -r, -r, 2 * r, 2 * r); } // turns pale as it thins out
    return true;
  });
  ctx.globalAlpha = 1; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function drawTunnel(t) { // a digger underground: a wobbling mound of earth with clods popping off
  var p = toScreen(t.x, t.y), s = cam.s, w = Math.sin(now() / 70 + t.x * 3) * .08;
  ctx.fillStyle = 'rgba(60,40,20,.35)'; ctx.beginPath(); ctx.ellipse(p.x, p.y + s * .04, s * .42, s * .2, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#8a5a2b'; ctx.beginPath(); ctx.ellipse(p.x, p.y - s * .06, s * (.34 + w), s * (.17 - w * .5), 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#a8743c'; ctx.beginPath(); ctx.ellipse(p.x - s * .05, p.y - s * .1, s * .18, s * .08, 0, Math.PI, 0); ctx.fill();
  for (var i = 0; i < 3; i++) { var q = (now() / 400 + i / 3 + t.x) % 1; ctx.fillStyle = '#6d4520';
    ctx.fillRect(p.x + Math.cos(i * 2.1 + t.y) * s * .3 * q - 2, p.y - s * .1 - Math.sin(q * Math.PI) * s * .35, 4, 4); }
}
function hpBar(x, y, z, k, color) {
  var p = toScreen(x, y, z), w = 34; ctx.fillStyle = 'rgba(20,30,40,.7)'; ctx.fillRect(p.x - w / 2 - 1, p.y - 1, w + 2, 6); ctx.fillStyle = color; ctx.fillRect(p.x - w / 2, p.y, w * k, 4);
}

// ---------- troop sheets sized for the phone ----------
// The original sheets are huge (the colonel's is 5670 px wide, wider than the 4096 px most phone GPUs can hold, so every
// frame he was drawn the slow way, and the dog's and egret's add ~50 MB more). Each sheet is copied once, a row at a time
// in the background, at the size the screen really needs (1/2, 3/4 or full) and cut into pieces no wider than 2048 px.
// Until a copy is ready the original is drawn.
var SHEETS = {}, SHEETQ = [], TILE_W = 2048;
function sheetLevel(need) { return need <= .5 ? .5 : need <= .75 ? .75 : 1; }
function sheetFor(im, cw, ch, need) {
  var level = sheetLevel(need), key = im.src + '@' + level, sh = SHEETS[key];
  if (sh && sh.done) return sh;
  if (!sh) { sh = SHEETS[key] = { im: im, level: level, cw: Math.max(1, Math.round(cw * level)), ch: Math.max(1, Math.round(ch * level)), scw: cw, sch: ch,
      cols: 0, dirs: 0, rows: [], next: 0, done: false };
    sh.per = Math.max(1, Math.floor(TILE_W / sh.cw)); SHEETQ.push(sh); }
  for (var l in { '.5': 1, '.75': 1, '1': 1 }) { var o = SHEETS[im.src + '@' + Number(l)]; if (o && o.done) return o; }   // another size of this sheet while the right one is made
  return null;
}
function sheetWork(rows) { // build a few sheet rows per frame
  while (rows-- > 0 && SHEETQ.length) {
    var sh = SHEETQ[0]; if (!ready(sh.im)) { SHEETQ.push(SHEETQ.shift()); return; }
    if (!sh.cols) { sh.cols = Math.round(sh.im.naturalWidth / sh.scw); sh.dirs = Math.round(sh.im.naturalHeight / sh.sch); }
    var d = sh.next++, tiles = [];
    try {
      for (var c0 = 0; c0 < sh.cols; c0 += sh.per) { var n = Math.min(sh.per, sh.cols - c0), cv = document.createElement('canvas'); cv.width = n * sh.cw; cv.height = sh.ch;
        var g = cv.getContext('2d'); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
        g.drawImage(sh.im, c0 * sh.scw, d * sh.sch, n * sh.scw, sh.sch, 0, 0, n * sh.cw, sh.ch); tiles.push(cv); }
    } catch (e) { tiles = null; }
    sh.rows[d] = tiles;
    if (!tiles) { SHEETQ.shift(); delete SHEETS[sh.im.src + '@' + sh.level]; continue; }
    if (sh.next >= sh.dirs) { sh.done = true; SHEETQ.shift();
      Object.keys(SHEETS).forEach(function (k) { var o = SHEETS[k]; if (o !== sh && o.im === sh.im && o.done) delete SHEETS[k]; }); }   // free the other sizes
  }
}
function troopNeed(u, a) { return u.h * cam.s * 1.05 / a.h * view.dpr * 1.35; }   // 1.35: room for the squash & stretch
function sheetPrime(kinds) { // queue the sheets a raid (or the home base) is about to show
  kinds.forEach(function (k) { var u = U[k] || CATS[k]; if (!u) return; var a = ART.troops[u.art], L = ART.troopLayout; if (!a) return;
    sheetFor(img(a.file), a.cw || L.cw, a.ch || L.ch, troopNeed(u, a)); });
}

// ---------- troops ----------
var SHADOW = null;   // one soft ellipse, stamped under every troop (a path + fill per duck was a big cost with hundreds on screen)
function shadowImg() { if (SHADOW) return SHADOW; var c = document.createElement('canvas'); c.width = 64; c.height = 32; var g = c.getContext('2d');
  g.fillStyle = 'rgb(30,60,30)'; g.beginPath(); g.ellipse(32, 16, 31, 15, 0, 0, 7); g.fill(); return SHADOW = c; }
function drawTroop(t) {
  var u = t.side === 'cat' ? CATS[t.kind] : t.side === 'hero' ? HEROES[t.kind] : U[t.kind], a = ART.troops[u.art], L = ART.troopLayout; if (!a) return;
  if (t.under) return drawTunnel(t);
  var im = img(a.file); if (!ready(im)) return;
  var dir = ((Math.round((t.face === undefined ? Math.PI / 2 : t.face) / (Math.PI / 4)) % 8) + 8) % 8, col, n = now(), alpha = 1;
  var atkQ = t.atk ? (n - t.atk) / 520 : 9;
  if (t.dead) { var dq = (n - t.deadAt) / 1000; col = L.death[0] + Math.min(L.death[1] - 1, Math.floor(dq / .14)); alpha = dq < 1.2 ? 1 : Math.max(0, 1 - (dq - 1.2) / .6); if (alpha <= 0) return; }
  else if (atkQ < 1) { var AS = atkStyle(t, u), fr = AS.frames[Math.min(AS.frames.length - 1, Math.floor(atkQ * AS.frames.length))]; col = fr < 0 ? L.idle[0] : L.attack[0] + fr; }
  else if (t.moving) col = L.walk[0] + Math.floor((t.walk || 0) * 9) % L.walk[1];
  else col = L.idle[0] + Math.floor(n / 180 + (t.x * 7 | 0)) % L.idle[1];
  var p = toScreen(t.x, t.y), k = u.h * cam.s * 1.05 / a.h, sx = 1, sy = 1, ox = 0, oy = 0, m = cam.s * 2;
  if (p.x < -m || p.x > view.w + m || p.y < -m * .5 || p.y > view.h + m * 1.5) return;   // off screen: skip
  var alt = airAlt(t), rot = 0, pose = null, fx = Math.cos(t.face || 0) - Math.sin(t.face || 0), fy = (Math.cos(t.face || 0) + Math.sin(t.face || 0)) * ISO, fl = Math.hypot(fx, fy) || 1; fx /= fl; fy /= fl;
  if (u.air && !t.dead && t.moving) rot = Math.sin(n / 300 + t.x) * .05;   // flyers sway as they cruise
  if (!t.dead && atkQ < 1) { // every kind of troop attacks its own way (see ATK_POSE)
    pose = ATK_POSE[atkStyle(t, u).pose](atkQ, t, n);
    ox = fx * (pose.f || 0) * cam.s + (pose.jx || 0) * cam.s; oy = fy * (pose.f || 0) * cam.s - (pose.lift || 0) * ZUP * cam.s;
    sx = pose.sx || 1; sy = pose.sy || 1; rot += pose.rot || 0; if (pose.dir) dir = (dir + pose.dir) % 8;
  } else if (t.moving) { var b = Math.sin((t.walk || 0) * 9 * Math.PI / 4); sy = 1 + .06 * b; sx = 1 - .05 * b; }
  else if (!t.dead) { var br = Math.sin(n / 260 + t.x); sy = 1 + .025 * br; sx = 1 - .02 * br; }
  if (t.born && n - t.born < 400) { var bq = (n - t.born) / 400, bw = Math.exp(-5 * bq) * Math.sin(bq * 18); sx *= 1 + bw * .3; sy *= 1 - bw * .3; }
  if (t.invis > n) alpha *= .35 + Math.sin(n / 90) * .08;   // the queen's feather veil
  var dpr = view.dpr; ctx.globalAlpha = alpha;
  if (u.hero && !t.dead) { // a gold ring on the ground marks a hero; the colonel's shows how far his leadership reaches
    var rr = (u.aura || .75) * cam.s; ctx.strokeStyle = 'rgba(255,205,60,' + (u.aura ? .45 : .7) + ')'; ctx.lineWidth = 2.5; ctx.setLineDash(u.aura ? [8, 6] : []);
    ctx.beginPath(); ctx.ellipse(p.x, p.y, rr, rr * ISO, 0, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
  if (t.fast > n && !t.dead) { ctx.fillStyle = 'rgba(255,120,40,.22)'; ctx.beginPath(); ctx.ellipse(p.x, p.y, .55 * cam.s, .3 * cam.s, 0, 0, 7); ctx.fill(); }
  var sh = u.air ? .3 / (1 + alt * .15) : .32, rw = sh * cam.s * Math.min(u.h, 1.6); ctx.globalAlpha = alpha * (u.air ? .3 : .28); ctx.drawImage(shadowImg(), p.x - rw, p.y - rw * .5, rw * 2, rw); ctx.globalAlpha = alpha;
  oy -= alt * ZUP * cam.s;
  if (pose && pose.under) pose.under(ctx, p.x + ox, p.y + oy + alt * ZUP * cam.s, fx, fy, atkQ, u);   // ground effects (slam ring, whirl)
  var cr = Math.cos(rot), sr = Math.sin(rot);
  ctx.setTransform(dpr * sx * cr, dpr * sx * sr, -dpr * sy * sr, dpr * sy * cr, (p.x + ox) * dpr, (p.y + oy) * dpr);
  var cw = a.cw || L.cw, ch = a.ch || L.ch, sh = sheetFor(im, cw, ch, troopNeed(u, a)), row = sh && sh.rows[dir];
  if (row) { var gi = Math.floor(col / sh.per); ctx.drawImage(row[gi], (col - gi * sh.per) * sh.cw, 0, sh.cw, sh.ch, -a.ax * k, -a.ay * k, cw * k, ch * k); }
  else ctx.drawImage(im, col * cw, dir * ch, cw, ch, -a.ax * k, -a.ay * k, cw * k, ch * k);
  if (u.crown && !t.dead) { var ht = headTop(im, col, dir, cw, ch); if (ht) drawCrown((ht.x - a.ax) * k, (ht.y - a.ay) * k + cam.s * .1, cam.s * .5, u.crown); }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalAlpha = 1;
  if (pose && pose.over) pose.over(ctx, p.x + ox, p.y + oy, fx, fy, atkQ, u, k);   // weapon effects in front (thrust streaks, sparkles)
  if (!t.dead && t.hp < t.max) hpBar(t.x, t.y, u.h * 1.45 + alt, t.hp / t.max, t.side === 'cat' ? '#ff6b5a' : '#7be36a');
}
// ---------- attack styles: which baked frames to use (the shared atlas attack bows forward, which reads as a peck,
// so only birds and the dog keep that frame) and how the body moves. Frames: 0 ready, 1 wind-up, 2 forward bow, 3 recover, -1 idle.
var ATK_KIND = { egret: 'peck', h_queen: 'shoot', dog: 'bite', h_king: 'bite', mop: 'spin', pig: 'stomp', chef: 'throw', witch: 'magic', nurse: 'heal',
  plane: 'dive', kite: 'swoop', prop: 'hurl', fan: 'blow', fanlet: 'blow', balloon: 'flail', bomber: 'blast', duckling: 'stab' };
var ATK_HIT = { stab: 'stab', shot: 'shoot', smash: 'smash', bite: 'bite', fire: 'throw', magic: 'magic', heal: 'heal', spin: 'spin', blast: 'blast', cracker: 'flail' };
var ATK_FRAMES = { stab: [1, 0, 1, 0], shoot: [1, 1, 0, 0], smash: [1, 1, 3, 3], stomp: [1, 1, 3, 3], throw: [1, 1, 0, 0], magic: [1, 1, 1, 0], heal: [1, 0, 0, 0],
  spin: [-1], peck: [0, 1, 1, 0], bite: [0, 2, 2, 3], dive: [-1], swoop: [-1], hover: [-1], blow: [-1], flail: [-1], hurl: [0, 1, 2, 3], blast: [1, 1, 3, 3], classic: [0, 1, 2, 3] };
function atkStyle(t, u) { var k = t.side === 'hero' ? 'classic' : t.side === 'cat' ? 'smash' : ATK_KIND[t.kind] || ATK_HIT[u.hit] || 'stab'; return { pose: k, frames: ATK_FRAMES[k] }; }
function bell(q, a, b) { return q < a || q > b ? 0 : Math.sin((q - a) / (b - a) * Math.PI); }
function streak(c, x, y, fx, fy, len, w, col, a) { c.strokeStyle = col; c.globalAlpha = a; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + fx * len, y + fy * len); c.stroke(); c.globalAlpha = 1; }
var ATK_POSE = {
  classic: function (q) { var hit = q < .35 ? 0 : Math.sin(Math.min(1, (q - .35) / .45) * Math.PI), up = q < .35 ? Math.sin(q / .35 * Math.PI) : 0;   // the colonel's salute at home
    return { f: .3 * hit, sx: 1 - .14 * up + .3 * hit, sy: 1 + .2 * up - .25 * hit }; },
  stab: function (q) { var j = bell(q, 0, .45) + bell(q, .5, .95); return { f: .32 * j, sx: 1 + .16 * j, sy: 1 - .1 * j,   // two quick fork jabs
    over: function (c, x, y, fx, fy, q, u) { var j2 = Math.max(bell(q, .1, .45), bell(q, .6, .95)); if (j2 > .4) streak(c, x + fx * cam.s * .35, y - u.h * cam.s * .45, fx, fy, cam.s * .45 * j2, 2.5 * cam.s / 40, '#ffffff', j2 * .9); } }; },
  shoot: function (q) { var back = q < .4 ? q / .4 : 0, kick = q >= .4 ? Math.exp(-(q - .4) * 12) : 0;   // draw back, let go, small kick back
    return { f: -.12 * back - .1 * kick, sx: 1 - .08 * back + .12 * kick, sy: 1 + .08 * back - .1 * kick, rot: -.08 * back }; },
  smash: function (q) { var up = q < .45 ? Math.sin(q / .45 * Math.PI / 2) : Math.max(0, 1 - (q - .45) / .1), land = q > .55 ? Math.exp(-(q - .55) * 9) : 0;   // jump, then slam down
    return { lift: .6 * up, f: .12 * up, sx: 1 - .12 * up + .4 * land, sy: 1 + .2 * up - .32 * land,
      under: function (c, x, y, fx, fy, q, u) { if (q < .55) return; var r = (q - .55) / .45; c.strokeStyle = 'rgba(255,240,190,' + (1 - r) * .9 + ')'; c.lineWidth = 4 * cam.s / 40 * (1 - r) + 1;
        c.beginPath(); c.ellipse(x + fx * cam.s * .3, y + fy * cam.s * .3, cam.s * (.3 + r * .9) * Math.min(1.5, u.h), cam.s * (.3 + r * .9) * Math.min(1.5, u.h) * ISO, 0, 0, 7); c.stroke(); } }; },
  stomp: function (q) { var up = bell(q, 0, .5), land = q > .5 ? Math.exp(-(q - .5) * 10) : 0;   // the pig rears up and stamps
    return { lift: .35 * up, rot: -.25 * up, f: .2 * land, sx: 1 + .3 * land, sy: 1 + .1 * up - .25 * land, under: ATK_POSE.smash(Math.max(.55, q)).under }; },
  throw: function (q) { var back = q < .35 ? q / .35 : 0, fling = bell(q, .35, .9);   // lean back, then fling the chili forward
    return { f: -.14 * back + .22 * fling, rot: -.15 * back + .12 * fling, sx: 1 + .12 * fling, sy: 1 - .06 * fling + .06 * back }; },
  magic: function (q, t, n) { var up = Math.sin(q * Math.PI); return { lift: .45 * up, sx: 1 - .05 * up, sy: 1 + .1 * up, dir: Math.floor(q * 8) % 8,   // floats up in a twirl
    over: function (c, x, y, fx, fy, q, u) { for (var i = 0; i < 7; i++) { var a = q * 9 + i * .9, rr = cam.s * (.35 + .2 * Math.sin(q * 6 + i));
      c.fillStyle = 'rgba(200,120,255,' + (1 - q) + ')'; c.beginPath(); c.arc(x + Math.cos(a) * rr, y - u.h * cam.s * .5 + Math.sin(a) * rr * .5, 2.5 * cam.s / 40 + 1, 0, 7); c.fill(); } } }; },
  heal: function (q) { var h = Math.sin(q * Math.PI); return { lift: .28 * h, sy: 1 + .12 * h, sx: 1 - .06 * h,
    under: function (c, x, y, fx, fy, q) { c.fillStyle = 'rgba(120,240,140,' + (.35 * (1 - q)) + ')'; c.beginPath(); c.ellipse(x, y, cam.s * (.4 + q), cam.s * (.4 + q) * ISO, 0, 0, 7); c.fill(); } }; },
  spin: function (q) { return { dir: Math.floor(q * 16) % 8, sx: 1.1, sy: .94, lift: .08 * Math.sin(q * Math.PI),   // the mop whirls round twice
    under: function (c, x, y, fx, fy, q, u) { c.strokeStyle = 'rgba(255,255,255,' + (.7 * Math.sin(q * Math.PI)) + ')'; c.lineWidth = 3 * cam.s / 40 + 1; var r = cam.s * (u.spin || 1);
      for (var i = 0; i < 2; i++) { var a0 = q * 14 + i * Math.PI; c.beginPath(); c.ellipse(x, y - cam.s * .2, r, r * ISO, 0, a0, a0 + 1.6); c.stroke(); } } }; },
  peck: function (q) { var up = q < .4 ? Math.sin(q / .4 * Math.PI / 2) : 0, hit = bell(q, .4, .85);   // the egret rears tall, then stabs its beak down
    return { f: .38 * hit, sx: 1 - .12 * up + .25 * hit, sy: 1 + .25 * up - .2 * hit, lift: .1 * up }; },
  bite: function (q) { var hit = bell(q, .2, .7); return { f: .34 * hit, rot: q > .35 && q < .9 ? Math.sin(q * 55) * .14 : 0, sx: 1 + .15 * hit, sy: 1 - .1 * hit }; },   // lunge and shake
  dive: function (q) { var d = Math.sin(q * Math.PI); return { lift: -.9 * d, f: .35 * d, rot: .3 * d }; },          // paper plane swoops at the target
  swoop: function (q) { var d = Math.sin(q * Math.PI); return { lift: -1.2 * d, f: .25 * d, rot: .18 * d, sx: 1 + .08 * d }; },
  hover: function (q) { var d = Math.sin(q * Math.PI); return { rot: .22 * d, f: .15 * d, jx: Math.sin(q * 70) * .03 }; },   // propeller duck tilts in to fire
  blow: function (q) { return { jx: Math.sin(q * 90) * .04, sx: 1 + .06 * Math.sin(q * 40), sy: 1 - .04 * Math.sin(q * 40),   // the fan shudders and blows
    over: function (c, x, y, fx, fy, q, u) { for (var i = -1; i <= 1; i++) streak(c, x + fx * cam.s * (.3 + q * .6) - fy * i * cam.s * .2, y - u.h * cam.s * .4 + fx * i * cam.s * .1, fx, fy, cam.s * .35, 2, '#e8f6ff', .8 * (1 - q)); } }; },
  hurl: function (q) { var b = q < .4 ? q / .4 : 0, h = bell(q, .4, .8); return { rot: -.12 * b + .2 * h, f: .12 * h, lift: .1 * b - .15 * h, jx: Math.sin(q * 60) * .015 }; },
  flail: function (q) { return { rot: Math.sin(q * 30) * .2, jx: Math.sin(q * 23) * .03, lift: .15 * Math.sin(q * Math.PI) }; },   // dangling balloon duck kicks about as it drops the cracker
  blast: function (q) { var w = Math.sin(q * 50) * .5 + .5; return { sx: 1 + .2 * q + .06 * w, sy: 1 + .15 * q - .06 * w }; }
};

// Where the crown sits = top of the head in each animation frame. Finding it means reading pixels back from the image,
// which took ~30 ms a time on phones and froze raids whenever the king or queen showed a new pose. Now whole sheet rows
// are measured a little at a time while nothing is happening (mostly at home), and remembered on the phone for good.
var HEADS_KEY = 'duckwar.heads.v1', HEADS = (function () { try { return JSON.parse(localStorage.getItem(HEADS_KEY)) || {}; } catch (e) { return {}; } })(), HEADQ = [], HEADT = 0;
function headKey(im) { return String(im.src || '').split('/').pop(); }
function headTop(im, col, dir, cw, ch) {
  var f = headKey(im), key = f + '|' + col + '|' + dir; if (key in HEADS) return HEADS[key];
  headQueue(im, dir, cw, ch);
  for (var c = 0; c < 32; c++) { var k2 = f + '|' + c + '|' + dir; if (HEADS[k2]) return HEADS[k2]; }   // borrow another pose facing the same way until measured
  return null;
}
function headQueue(im, dir, cw, ch) { var id = headKey(im) + '#' + dir; if (HEADQ.some(function (q) { return q.id === id; })) return; HEADQ.push({ id: id, im: im, dir: dir, cw: cw, ch: ch }); }
function headPrepare() { // crowned heroes: queue every direction of their sheets
  HERO_KEYS.forEach(function (k) { var u = U[k]; if (!u.crown) return; var a = ART.troops[u.art]; if (!a) return; var L = ART.troopLayout, im = img(a.file);
    for (var d = 0; d < L.dirs; d++) if (!(headKey(im) + '|0|' + d in HEADS)) headQueue(im, d, a.cw || L.cw, a.ch || L.ch); });
}
function headWork(raid) { // measure one sheet row now and then: often at home, rarely mid-raid
  if (!HEADQ.length) return; var t = now(); if (t < HEADT) return;
  if (raid) return;   // reading pixels back stalls the GPU: only ever at home (mid-raid the crown borrows a measured pose)
  var q = HEADQ[0]; if (!ready(q.im)) { HEADT = t + 300; return; }
  HEADQ.shift(); HEADT = t + 120;
  var cw = q.cw, ch = q.ch, cols = Math.floor(q.im.naturalWidth / cw), f = headKey(q.im);
  try {
    var c = headWork.c || (headWork.c = document.createElement('canvas')); c.width = cw * cols; c.height = ch; var g = c.getContext('2d', { willReadFrequently: true });
    g.clearRect(0, 0, c.width, ch); g.drawImage(q.im, 0, q.dir * ch, cw * cols, ch, 0, 0, cw * cols, ch); var d = g.getImageData(0, 0, cw * cols, ch).data, W = cw * cols;
    for (var col = 0; col < cols; col++) {
      // the king and queen wear the army helmet: its olive green marks the head (the dog's tail sticks up higher than his head)
      var scan = function (test) { for (var y = 0; y < ch; y++) { var sx = 0, n = 0; for (var x = col * cw; x < col * cw + cw; x++) { var i = (y * W + x) * 4; if (test(d[i], d[i + 1], d[i + 2], d[i + 3])) { sx += x - col * cw; n++; } } if (n >= 4) return { x: sx / n, y: y }; } return null; };
      HEADS[f + '|' + col + '|' + q.dir] = scan(function (R0, G, B0, A) { return A > 200 && G > R0 + 8 && G > B0 + 18 && G < 170 && R0 < 150; }) || scan(function (R0, G, B0, A) { return A > 140; });
    }
  } catch (e) { for (var k = 0; k < cols; k++) HEADS[f + '|' + k + '|' + q.dir] = null; }
  if (!HEADQ.length) try { localStorage.setItem(HEADS_KEY, JSON.stringify(HEADS)); } catch (e) {}
}
function drawCrown(x, y, s, kind) { // gold crown that sits on the king's and queen's heads, bobbing with them
  ctx.save(); ctx.translate(x, y + Math.sin(now() / 220) * s * .05);
  var w = s, hgt = s * (kind === 'queen' ? .8 : .62);
  ctx.fillStyle = '#ffcc2e'; ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = Math.max(1.2, s * .07);
  ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w / 2, -hgt);
  var pts = kind === 'queen' ? 5 : 3;
  for (var i = 0; i < pts; i++) { var x0 = -w / 2 + w * i / pts, x1 = x0 + w / pts; ctx.lineTo(x0 + w / pts / 2, -hgt * (kind === 'queen' ? .55 : .45)); ctx.lineTo(x1, -hgt); }
  ctx.lineTo(w / 2, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = kind === 'queen' ? '#5ad1ff' : '#e8322a'; ctx.beginPath(); ctx.arc(0, -hgt * .3, s * .1, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(-w / 2 + s * .08, -s * .14, w - s * .16, s * .06);
  ctx.restore();
}
// ---------- shots and effects ----------
var SHOT = { rock: ['#8a7a6a', 6], pebble: ['#c9b38f', 3.5], egg: ['#fff6e0', 7], water: ['#6fd0ff', 5], chili: ['#ff3d1f', 5], cracker: ['#e8322a', 4], magic: ['#b46bff', 5], feather: ['#ffffff', 4], tomato: ['#e8231a', 6] };
function drawShot(s) {
  trailFx(s);
  var p = toScreen(s.x, s.y, s.z), g = toScreen(s.x, s.y), st = SHOT[s.kind] || SHOT.pebble, r = st[1] * cam.s / 40;
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(g.x, g.y, r, r * .5, 0, 0, 7); ctx.fill();
  ctx.fillStyle = st[0]; ctx.strokeStyle = 'rgba(60,40,20,.6)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill(); ctx.stroke();
  if (s.kind === 'cracker') { ctx.fillStyle = '#ffd23f'; ctx.fillRect(p.x - r * .5, p.y - r * 1.6, r, r * .6); ctx.fillStyle = 'rgba(255,220,120,' + (.5 + Math.random() * .5) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y - r * 2, r * .5, 0, 7); ctx.fill(); }   // lit fuse
  if (s.kind === 'feather') { var ang = Math.atan2((s.ty - s.fy) * ISO, s.tx - s.fx); ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(ang); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#9fb3c8'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(0, 0, r * 2.4, r * .7, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-r * 2.4, 0); ctx.lineTo(r * 2.4, 0); ctx.stroke(); ctx.restore(); }
  if (s.kind === 'tomato') { ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.arc(p.x - r * .35, p.y - r * .35, r * .3, 0, 7); ctx.fill();
    ctx.fillStyle = '#2f8a22'; for (var i = 0; i < 5; i++) { var a = i * 1.257; ctx.beginPath(); ctx.ellipse(p.x + Math.cos(a) * r * .35, p.y - r * .85 + Math.sin(a) * r * .2, r * .35, r * .14, a, 0, 7); ctx.fill(); } }
  if (s.kind === 'water') { ctx.fillStyle = 'rgba(160,230,255,.5)'; ctx.beginPath(); ctx.arc(p.x - r * .3, p.y - r * .3, r * .45, 0, 7); ctx.fill(); }
}
function drawFx(f, dt) {
  f.life -= dt; var q = 1 - f.life / f.max; if (f.life <= 0) return false; var s = cam.s / 40;
  if (f.t === 'chip') { f.vz -= 9 * dt; f.x += f.vx * dt; f.y += f.vy * dt; f.z = Math.max(0, f.z + f.vz * dt); if (f.z === 0 && f.vz < 0) { f.vz *= -.45; f.vx *= .6; f.vy *= .6; }
    var p = toScreen(f.x, f.y, f.z); ctx.fillStyle = f.color; ctx.globalAlpha = Math.min(1, f.life * 3); ctx.fillRect(p.x - 2.5 * s, p.y - 2.5 * s, 5 * s, 4 * s); ctx.globalAlpha = 1; return true; }
  var c = toScreen(f.x, f.y);
  if (f.t === 'boom') { if (!f.done) { f.done = 1; var sz = f.size || 2; emitSmoke(f.x, f.y, .2, 'dust', .6 + sz * .35, 10 + sz * 3); emitSmoke(f.x, f.y, .4, 'dark', .5 + sz * .3, 4); } return false; }
  if (f.t === 'puff') { if (!f.done) { f.done = 1; emitSmoke(f.x, f.y, .1, 'dust', .55, f.small ? 2 : 5); } return false; }
  if (f.t === 'hit') { ctx.strokeStyle = f.kind === 'smash' ? 'rgba(255,240,150,' + (1 - q) + ')' : 'rgba(255,255,255,' + (1 - q) + ')'; ctx.lineWidth = 3 * s;
    ctx.beginPath(); for (var j = 0; j < 5; j++) { var b = j * 1.26 + q; ctx.moveTo(c.x + Math.cos(b) * 6 * s, c.y - 14 * s + Math.sin(b) * 4 * s); ctx.lineTo(c.x + Math.cos(b) * (10 + q * 14) * s, c.y - 14 * s + Math.sin(b) * (6 + q * 9) * s); } ctx.stroke(); return true; }
  if (f.t === 'splat' && f.kind === 'tomato') {
    var R0 = (f.size || 1) * cam.s, a1 = 1 - q;
    ctx.fillStyle = 'rgba(205,20,15,' + (.55 * a1) + ')'; ctx.beginPath(); ctx.ellipse(c.x, c.y, R0 * (.35 + .65 * Math.min(1, q * 3)), R0 * ISO * (.35 + .65 * Math.min(1, q * 3)), 0, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(235,40,30,' + (.9 * a1) + ')'; ctx.lineWidth = Math.max(2, 6 * s * a1); ctx.beginPath(); ctx.ellipse(c.x, c.y, R0 * (.4 + q * .9), R0 * ISO * (.4 + q * .9), 0, 0, 7); ctx.stroke();
    for (var j = 0; j < 9; j++) { var ang = j * .7 + (f.seed || 0), dd = R0 * (.2 + q * 1.1) * (.6 + (j % 3) * .2), hh = Math.sin(Math.min(1, q * 1.6) * Math.PI) * R0 * .5;
      ctx.fillStyle = j % 3 ? 'rgba(220,25,20,' + a1 + ')' : 'rgba(255,220,120,' + a1 + ')'; ctx.beginPath(); ctx.arc(c.x + Math.cos(ang) * dd, c.y + Math.sin(ang) * dd * ISO - hh, (j % 3 ? 3.2 : 2) * s + 1, 0, 7); ctx.fill(); }
    return true; }
  if (f.t === 'splat') { ctx.fillStyle = f.kind === 'egg' ? 'rgba(255,214,80,' + (.7 * (1 - q)) + ')' : f.kind === 'chili' ? 'rgba(255,90,30,' + (.7 * (1 - q)) + ')' : 'rgba(130,210,255,' + (.6 * (1 - q)) + ')';
    ctx.beginPath(); ctx.ellipse(c.x, c.y, (f.size || 1) * cam.s * .7 * (.5 + q), (f.size || 1) * cam.s * .35 * (.5 + q), 0, 0, 7); ctx.fill(); return true; }
  if (f.t === 'heal') { ctx.fillStyle = 'rgba(110,230,120,' + (1 - q) + ')'; ctx.font = 'bold ' + (16 * s | 0) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('+', c.x, c.y - 30 * s - q * 20 * s); return true; }
  return true;
}

// ---- src/055-fx.js ----
// Duck War — weapon effects: muzzle flashes, trails, impact bursts, comic hit words and a little screen shake.
// Built to stay smooth on phones: one pooled particle list with a hard cap (fewer particles when the battle is crowded),
// only flat shapes (no gradients, no blur), comic words rate-limited, and the shake moves the canvas with CSS (free on the GPU).
var PARTS = [], PART_MAX = 260, WORDS = [], WORD_MAX = 5, WORD_LAST = 0, SHAKE = { a: 0 };
function partBudget(n) { // how many of n particles we can afford right now
  var room = PART_MAX - PARTS.length; if (room <= 0) return 0;
  var crowd = R && R.troops ? R.troops.length : 0; if (crowd > 60) n = Math.ceil(n / 2);
  return Math.min(n, room);
}
// kinds: dot (falls), spark (streak along its velocity), ember (rises, flickers), drop (falls, stretches), star (spins, fades), ring (grows on the ground), feather (drifts down)
function part(o) { if (PARTS.length < PART_MAX) PARTS.push(o); }
function burst(x, y, z, n, kind, colors, speed, up, life, size) {
  n = partBudget(n);
  for (var i = 0; i < n; i++) { var a = Math.random() * 6.283, v = speed * (.5 + Math.random() * .7);
    part({ k: kind, x: x, y: y, z: z, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vz: up * (.5 + Math.random() * .8), life: life * (.7 + Math.random() * .5), age: 0,
           c: colors[i % colors.length], s: size * (.7 + Math.random() * .6), r: Math.random() * 6.28 }); }
}
function ring(x, y, r, color, life, w) { if (PARTS.length < PART_MAX) PARTS.push({ k: 'ring', x: x, y: y, z: 0, vx: 0, vy: 0, vz: 0, life: life, age: 0, c: color, s: r, w: w || 4 }); }
function word(text, x, y, z, color, big) { // comic sound word that pops and floats up
  var t = now(); if (WORDS.length >= WORD_MAX || t - WORD_LAST < 220) return; WORD_LAST = t;
  WORDS.push({ t: text, x: x, y: y, z: z, c: color, age: 0, life: .75, big: big || 1, tilt: (Math.random() - .5) * .3 });
}
function shake(a) { SHAKE.a = Math.min(7, Math.max(SHAKE.a, a)); }

// ---------- what each weapon does ----------
function muzzleFx(kind, x, y, z, from) { // a shot leaves: flash + puff at the muzzle
  if (kind === 'rock') { burst(x, y, z, 6, 'dot', ['#bda88a', '#8a7a6a'], 1.6, 1, .45, 3); ring(x, y, .5, 'rgba(255,240,200,', .3, 3); }
  else if (kind === 'pebble') burst(x, y, z, 3, 'spark', ['#fff1c4', '#ffd36b'], 3, .6, .2, 2);
  else if (kind === 'egg') { emitSmoke(x, y, z, 'grey', .9, 3); burst(x, y, z, 10, 'ember', ['#ffffff', '#dfe8ee'], 1.2, 2.2, .6, 4); shake(2); }   // the pressure cooker vents a gush of steam
  else if (kind === 'water') burst(x, y, z, 9, 'drop', ['#8fe0ff', '#d4f4ff', '#4cc2ff'], 2.6, 1.2, .5, 3);
  else if (kind === 'chili') burst(x, y, z, 12, 'ember', ['#ffef7a', '#ffae2b', '#ff5a1a', '#e3261a'], 2.2, 1.2, .45, 4.5);
  else if (kind === 'tomato') burst(x, y, z, 3, 'drop', ['#e8231a'], .8, -.5, .4, 2.5);
  else if (kind === 'feather') burst(x, y, z, 3, 'feather', ['#ffffff', '#e7eef6'], .8, .6, .8, 4);
  else if (kind === 'magic') burst(x, y, z, 8, 'star', ['#e4b8ff', '#b46bff', '#ffffff'], 1.4, 1, .5, 3.5);
  else if (kind === 'cracker') burst(x, y, z, 4, 'spark', ['#ffe08a', '#ff9d2b'], 2, .8, .25, 2);
}
function trailFx(s) { // called every frame per shot in flight; cheap, throttled
  if (PARTS.length > PART_MAX * .7 || Math.random() < .35) return;
  if (s.kind === 'chili') part({ k: 'ember', x: s.x, y: s.y, z: s.z, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, vz: .6, life: .35, age: 0, c: Math.random() < .5 ? '#ffae2b' : '#ff5a1a', s: 4, r: 0 });
  else if (s.kind === 'magic') part({ k: 'star', x: s.x, y: s.y, z: s.z, vx: 0, vy: 0, vz: .2, life: .4, age: 0, c: '#d9a8ff', s: 3, r: Math.random() * 6 });
  else if (s.kind === 'cracker') part({ k: 'spark', x: s.x, y: s.y, z: s.z + .25, vx: (Math.random() - .5) * 2, vy: (Math.random() - .5) * 2, vz: 1, life: .2, age: 0, c: '#ffd36b', s: 2, r: 0 });
  else if (s.kind === 'egg') part({ k: 'ember', x: s.x, y: s.y, z: s.z, vx: 0, vy: 0, vz: .4, life: .5, age: 0, c: '#ffffff', s: 3.5, r: 0 });
  else if (s.kind === 'water') part({ k: 'drop', x: s.x, y: s.y, z: s.z, vx: (Math.random() - .5) * .6, vy: (Math.random() - .5) * .6, vz: -.5, life: .3, age: 0, c: '#9fe3ff', s: 2.5, r: 0 });
}
function impactFx(kind, x, y, big) { // a shot lands
  if (kind === 'rock') { burst(x, y, .3, 8, 'dot', ['#8a7a6a', '#bda88a', '#5e5246'], 2.4, 2.6, .6, 3.5); emitSmoke(x, y, .1, 'dust', .45, 2); word('ปั้ก!', x, y, 1.1, '#fff2c2'); shake(1.5); }
  else if (kind === 'pebble') burst(x, y, .4, 4, 'spark', ['#fff4cf', '#ffd36b'], 2.6, 1.2, .2, 2);
  else if (kind === 'egg') { burst(x, y, .2, 14, 'dot', ['#ffd94a', '#fff6e0', '#ffb300'], 3.2, 3, .7, 4); ring(x, y, 1.6, 'rgba(255,236,150,', .45, 6); emitSmoke(x, y, .2, 'grey', 1, 3); word('ตูม!', x, y, 1.3, '#ffd94a', 1.3); shake(4.5); }
  else if (kind === 'water') { burst(x, y, .6, 10, 'drop', ['#8fe0ff', '#d4f4ff', '#4cc2ff'], 2.4, 2, .55, 3); ring(x, y, .7, 'rgba(160,230,255,', .35, 3); }
  else if (kind === 'chili') { burst(x, y, .3, 14, 'ember', ['#ffef7a', '#ffae2b', '#ff5a1a', '#e3261a'], 2.2, 2.2, .6, 5); ring(x, y, 1, 'rgba(255,120,40,', .4, 5); word('ฟู่!', x, y, 1.1, '#ffae2b'); shake(1.5); }
  else if (kind === 'tomato') { burst(x, y, .2, 12, 'dot', ['#e8231a', '#c4140f', '#ffd27a'], 2.8, 2.4, .65, 3.5); word('แปะ!', x, y, 1.1, '#ff5a4a', 1.1); shake(2.5); }
  else if (kind === 'feather') burst(x, y, .6, 4, 'feather', ['#ffffff', '#e7eef6'], 1, .5, .9, 4);
  else if (kind === 'magic') { burst(x, y, .5, 10, 'star', ['#e4b8ff', '#b46bff', '#ffffff'], 2, 1.4, .55, 4); ring(x, y, .8, 'rgba(190,120,255,', .4, 4); }
  else if (kind === 'cracker') { burst(x, y, .3, 16, 'spark', ['#fff3a0', '#ffb02b', '#ff5a1a'], 4, 2.6, .35, 3); ring(x, y, 1.3, 'rgba(255,200,90,', .4, 6); word('ปัง!', x, y, 1.2, '#ffd23f', 1.2); shake(3.5); }
}
var HIT_WORD = { stab: ['ฉึก!', '#ffffff'], smash: ['ปึ้ก!', '#ffe08a'], bite: ['งับ!', '#ff8a7a'], spin: ['วืด!', '#cfefff'] };
function meleeFx(kind, x, y, attacker, big) { // a blow lands
  if (kind === 'stab') burst(x, y, .5, 5, 'spark', ['#ffffff', '#fff1b0'], 3.4, 1, .18, 2.2);
  else if (kind === 'smash') { burst(x, y, .3, big ? 12 : 6, 'dot', ['#c8a46e', '#8f7450', '#efe1c0'], 2.6, 2.6, .55, 3.5); ring(x, y, big ? 1.4 : .9, 'rgba(255,240,190,', .35, 5); emitSmoke(x, y, .1, 'dust', big ? .8 : .5, big ? 3 : 1); shake(big ? 4 : 1.5); }
  else if (kind === 'bite') { burst(x, y, .6, 6, 'star', ['#ffffff', '#ffd0c8'], 2, 1, .3, 3); shake(1.5); }
  else if (kind === 'spin') burst(x, y, .5, 8, 'spark', ['#e8f6ff', '#ffffff', '#9fdcff'], 3.6, .6, .22, 2.4);
  var w = HIT_WORD[kind]; if (w && (big || Math.random() < .3)) word(w[0], x, y, 1.1 + (big ? .4 : 0), w[1], big ? 1.25 : 1);
}
function crashFx(x, y, size, hq) { // a building falls
  burst(x, y, .5, 10 + size * 4, 'dot', ['#c58a52', '#f2e7c9', '#9b6b3a', '#6d5a4a'], 3.2, 3.4, .9, 4.5);
  ring(x, y, size * .9, 'rgba(255,230,180,', .5, 7); word(hq ? 'พังทลาย!' : 'พัง!', x, y, 1.6, '#ffcf3a', hq ? 1.6 : 1.3); shake(hq ? 7 : 4);
}

// ---------- drawing (called once a frame after the troops) ----------
function drawParts(dt) {
  var s = cam.s / 40, n = 0;
  for (var i = 0; i < PARTS.length; i++) {
    var p = PARTS[i]; p.age += dt; if (p.age >= p.life) continue; PARTS[n++] = p;
    var q = p.age / p.life, a = 1 - q;
    if (p.k === 'ring') { var c = toScreen(p.x, p.y), r = p.s * cam.s * (.25 + q * .9);
      ctx.strokeStyle = p.c + (a * .9) + ')'; ctx.lineWidth = Math.max(1, p.w * s * a); ctx.beginPath(); ctx.ellipse(c.x, c.y, r, r * ISO, 0, 0, 7); ctx.stroke(); continue; }
    var g = p.k === 'ember' ? -.6 : p.k === 'feather' ? 1.2 : 9;   // embers rise, feathers float, the rest fall
    p.vz -= g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
    if (p.z < 0) { p.z = 0; p.vz *= -.35; p.vx *= .6; p.vy *= .6; }
    var o = toScreen(p.x, p.y, p.z), sz = p.s * s + .6;
    ctx.globalAlpha = Math.min(1, a * 1.6); ctx.fillStyle = p.c;
    if (p.k === 'spark') { var e = toScreen(p.x - p.vx * .06, p.y - p.vy * .06, p.z - p.vz * .06); ctx.strokeStyle = p.c; ctx.lineWidth = sz * .7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(e.x, e.y); ctx.stroke(); }
    else if (p.k === 'drop') { ctx.beginPath(); ctx.ellipse(o.x, o.y, sz * .55, sz * (1 + Math.min(1.5, Math.abs(p.vz) * .25)) * .6, 0, 0, 7); ctx.fill(); }
    else if (p.k === 'ember') { var f = sz * (1 - q * .6) * (.8 + Math.random() * .4); ctx.fillRect(o.x - f / 2, o.y - f / 2, f, f); }
    else if (p.k === 'star') { p.r += dt * 8; var t = sz * 1.3; ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(p.r); ctx.fillRect(-t / 2, -t / 8, t, t / 4); ctx.fillRect(-t / 8, -t / 2, t / 4, t); ctx.restore(); }
    else if (p.k === 'feather') { p.r += dt * 3; ctx.save(); ctx.translate(o.x + Math.sin(p.r) * 3 * s, o.y); ctx.rotate(Math.sin(p.r) * .6); ctx.beginPath(); ctx.ellipse(0, 0, sz * 1.2, sz * .4, 0, 0, 7); ctx.fill(); ctx.restore(); }
    else { ctx.fillRect(o.x - sz / 2, o.y - sz / 2, sz, sz); }
  }
  PARTS.length = n; ctx.globalAlpha = 1;
  // comic words: pop in big, settle, float up and fade
  var m = 0;
  for (i = 0; i < WORDS.length; i++) { var w = WORDS[i]; w.age += dt; if (w.age >= w.life) continue; WORDS[m++] = w;
    var wq = w.age / w.life, pop = wq < .15 ? .6 + wq / .15 * .7 : 1.3 - Math.min(.3, (wq - .15) * 1.2), wp = toScreen(w.x, w.y, w.z + wq * .6), fs = Math.round(15 * s * w.big * pop + 6);
    ctx.save(); ctx.translate(wp.x, wp.y); ctx.rotate(w.tilt); ctx.globalAlpha = wq > .7 ? (1 - wq) / .3 : 1;
    ctx.font = '900 ' + fs + 'px "Kanit","Prompt",sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(3, fs * .22); ctx.strokeStyle = '#3a2210'; ctx.strokeText(w.t, 0, 0); ctx.fillStyle = w.c; ctx.fillText(w.t, 0, 0); ctx.restore(); }
  WORDS.length = m; ctx.globalAlpha = 1;
  // shake: move the canvas element itself (no redraw cost); decays quickly
  if (SHAKE.a > .05) { SHAKE.a *= Math.pow(.0009, dt); var sx = (Math.random() - .5) * 2 * SHAKE.a, sy = (Math.random() - .5) * 2 * SHAKE.a; canvas.style.transform = 'translate(' + sx.toFixed(1) + 'px,' + sy.toFixed(1) + 'px)'; SHAKE.on = true; }
  else if (SHAKE.on) { SHAKE.a = 0; SHAKE.on = false; canvas.style.transform = ''; }
}
function clearFx() { PARTS.length = 0; WORDS.length = 0; SHAKE.a = 0; if (SHAKE.on) { SHAKE.on = false; canvas.style.transform = ''; } }

// ---- src/06-ui.js ----
// Duck War — screens and panels (HTML over the canvas): home HUD, building panel, build menu, army, raid HUD, results.
var screen = 'home', selected = null, placing = null, moving = null;
function h(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
function icon(r) { return '<i class="ic ic-' + r + '"></i>'; }
function costTag(r, n) { return '<span class="cost' + (D.res[r] >= n ? '' : ' short') + '">' + icon(r) + fmt(n) + '</span>'; }
function closeSheet() { $('sheet').classList.remove('open'); $('sheet').innerHTML = ''; }
function openSheet(title, body) {
  var s = $('sheet'), old = s.querySelector('.sheet-body'), keep = s.classList.contains('open') && s.dataset.title === title ? (old ? old.scrollTop : 0) : 0;   // refreshing the same sheet keeps its scroll
  s.dataset.title = title; s.innerHTML = ''; var head = h('div', 'sheet-head', '<b>' + title + '</b>'); var x = h('button', 'x', '✕'); x.onclick = closeSheet; head.appendChild(x);
  s.appendChild(head); var b = h('div', 'sheet-body'); s.appendChild(b); body(b); s.classList.add('open'); b.scrollTop = keep;
}

// ---------- HUD ----------
function hud() {
  var top = $('res'); top.innerHTML = '';
  ['honey', 'veggie', 'syrup', 'coin'].forEach(function (r) {
    if (r === 'syrup' && hqLv() < 5 && !D.res.syrup) return;
    var cap = capacity(r), pill = h('div', 'pill', icon(r) + '<b>' + fmt(D.res[r]) + '</b>' + (cap !== Infinity ? '<small>/' + fmt(cap) + '</small>' : ''));
    if (cap !== Infinity) { var bar = h('span', 'fill'); bar.style.width = Math.min(100, D.res[r] / cap * 100) + '%'; bar.style.background = RES[r].color; pill.appendChild(bar); }
    if (r !== 'coin') pill.onclick = function () { // tap a resource: jump to its maker to boost it
      if (screen !== 'home') return; var mk = D.buildings.filter(function (b) { return B[b.k].kind === 'make' && B[b.k].make === r && b.lv > 0; });
      if (!mk.length) { toast('ยังไม่มีอาคารผลิต' + RES[r].name); return; }
      mk.sort(function (a, b) { return (a.boost || 0) - (b.boost || 0); }); closeSheet(); selectBuilding(mk[0]); dirty = true; };
    top.appendChild(pill);
  });
  top.appendChild(h('div', 'pill', '🔨 <b>' + (D.builders - busyBuilders()) + '/' + D.builders + '</b>'));
  $('home-ui').hidden = screen !== 'home'; $('raid-ui').hidden = screen !== 'raid'; $('res').hidden = screen === 'raid';
  $('army-count').textContent = armyUsed() + '/' + armySpace();
}

// ---------- building panel ----------
function selectBuilding(b, keepGroup) {
  if (!keepGroup || b !== selected) group = null; if (moving && b !== selected) moving = null;
  var fresh = b !== selected; selected = b; var p = $('panel'); p.innerHTML = ''; if (!b) { p.classList.remove('open'); return; } var d = B[b.k];
  var lvTxt = b.lv ? 'เลเวล ' + b.lv : 'กำลังสร้าง';
  p.appendChild(h('div', 'p-title', '<b>' + d.name + '</b><small>' + lvTxt + '</small>'));
  var info = [];
  if (d.kind === 'make') info.push(icon(d.make) + ' ' + fmt(rate(b)) + '/ชม.');
  if (d.kind === 'store') info.push('จุ ' + icon(d.store) + ' ' + fmt(d.cap * Math.pow(1.7, b.lv - 1)));
  if (d.kind === 'defense') info.push('⚔ ' + grow(d.dmg, Math.max(1, b.lv), 1.17) + ' · ระยะ ' + d.range + (d.air && d.ground ? ' · ยิงพื้น+อากาศ' : d.air ? ' · ยิงอากาศ' : ''));
  if (d.kind === 'camp') info.push('จุทหาร ' + Math.round(B.camp.space * (1 + .25 * (b.lv - 1))));
  info.push('♥ ' + fmt(bHp(b.k, Math.max(1, b.lv))));
  p.appendChild(h('div', 'p-info', info.join(' · ')));
  var row = h('div', 'p-row');
  if (b.up) {
    var f = h('button', 'btn gold', 'เสร็จทันที ' + costTag('coin', coinsFor(b.up.until - now()))); f.onclick = function () { finishNow(b); selectBuilding(b); hud(); }; row.appendChild(f);
  } else if (b.lv < bMaxLv(b.k, hqLv())) {
    var c = bCost(b.k, b.lv + 1), u = h('button', 'btn green', 'อัปเกรด ' + costTag(d.res, c) + (d.time ? '<small>⏱ ' + clock(bTime(b.k, b.lv + 1) * 1000) + '</small>' : ''));
    u.onclick = function () { if (upgradeBuilding(b)) { selectBuilding(b); hud(); } }; row.appendChild(u);
  } else row.appendChild(h('span', 'note', b.k === 'hq' ? 'เลเวลสูงสุด' : 'อัปเกรดบ้านเป็ดเพื่อปลดล็อกเลเวลถัดไป'));
  if (b.k === 'wall') {
    if (group && group.length > 1) {
      var lv0 = Math.min.apply(null, group.map(function (w) { return w.lv; })), n0 = group.filter(function (w) { return w.lv === lv0; }).length;
      var ur = h('button', 'btn green', 'อัปเกรดทั้งแถว (' + n0 + ') ' + costTag(d.res, bCost('wall', lv0 + 1) * n0)); ur.onclick = upgradeRow; row.appendChild(ur);
      var rr = h('button', 'btn', '⟳ หมุนแถว'); rr.onclick = rotateRow; row.appendChild(rr);
    } else { var sr = h('button', 'btn', '▦ เลือกทั้งแถว'); sr.onclick = selectRow; row.appendChild(sr); }
  }
  if (d.kind === 'make' && b.lv > 0 && !b.up) {
    var on = b.boost && b.boost > now(), row2 = h('div', 'p-row boost'), r = d.make, fc = fillCoins(r);
    var bv = h('button', 'btn video', on ? '▶ ต่อเวลา x2 <small>⚡ ' + clock(b.boost - now()) + ' · เหลือ ' + videosLeft() + '</small>' : '▶ ดูวิดีโอ ผลิต x2 1 ชม. <small>เหลือ ' + videosLeft() + '</small>');
    bv.onclick = function () { boostWithVideo(b, function () { selectBuilding(b); }); }; row2.appendChild(bv);
    var bc = h('button', 'btn gold' + (fc ? '' : ' off'), fc ? 'เติม' + RES[r].name + 'เต็มทันที ' + costTag('coin', fc) : 'คลังเต็มแล้ว');
    bc.onclick = function () { if (fillWithCoins(r)) { selectBuilding(b); hud(); } }; row2.appendChild(bc);
    p.appendChild(row2);
  }
  if (d.kind === 'hero') { var hl = h('div', 'p-heroes');
    HERO_KEYS.forEach(function (k) { var u = U[k], open = b.lv > 0 && hqLv() >= u.hq, rest = heroRest(k), cell = h('div', 'hcell' + (open ? '' : ' off'));
      cell.innerHTML = '<span class="portrait" style="' + heroThumb(k) + '"></span><b>' + (u.crown ? '👑 ' : '🎖 ') + u.name + '</b><small>' +
        (!open ? 'ปลดล็อกบ้านเป็ดเลเวล ' + u.hq : rest ? '💫 พักฟื้น ' + clock(rest) : 'Lv' + b.lv + ' · ♥' + fmt(uHp(k, b.lv)) + ' · ⚔' + fmt(uDmg(k, b.lv))) + '</small><small class="sk">⚡ ' + u.skill + ': ' + u.skillTxt + '</small>';
      if (open && rest) { var wk = h('button', 'btn gold', 'ปลุกทันที ' + costTag('coin', coinsFor(rest))); wk.onclick = function () { if (heroWake(k)) { selectBuilding(b, true); hud(); } }; cell.appendChild(wk); }
      hl.appendChild(cell); });
    p.appendChild(hl); }
  if (d.kind === 'train' || d.kind === 'camp') { var a = h('button', 'btn', '🪖 กองทัพ'); a.onclick = armyMenu; row.appendChild(a); }
  p.appendChild(row); p.appendChild(h('div', 'note drag-hint', '✋ แตะค้างแล้วลากเพื่อย้าย' + (group && group.length > 1 ? 'ทั้งแถว' : ''))); p.classList.add('open');
  if (fresh) keepClearOfPanel(b);
}
function keepClearOfPanel(b) { // if the panel would cover the selected building, slide the view up a little
  var top = view.h - $('panel').offsetHeight - 14, s = B[b.k].size, c = toScreen(b.x + s / 2, b.y + s / 2);
  if (c.y > top - cam.s * .6) { cam.y -= c.y - (top - cam.s * .6); dirty = true; }
}

// ---------- build menu ----------
function buildMenu() {
  openSheet('สร้างและพัฒนาฐาน', function (body) {
    var grid = h('div', 'cards');
    Object.keys(B).forEach(function (k) {
      var d = B[k]; if (k === 'hq') return;
      var have = count(k), max = maxCount(k, hqLv()), card = h('button', 'card' + (have >= max ? ' off' : ''));
      var art = d.turret ? ART.turrets[d.turret].stages[0] : d.wall ? null : ART.buildings[d.art].stages[0];
      card.innerHTML = '<span class="n">' + have + '/' + max + '</span>' + (art ? '<span class="thumb" style="background-image:url(assets/' + art.file + ')' + (d.turret ? ';background-size:600% 300%;background-position:80% 100%' : '') + '"></span>' : '<span class="thumb wallthumb">🧱</span>') +
        '<b>' + d.name + '</b>' + (have >= max ? '<small>' + (d.unlock && d.unlock > hqLv() ? 'ปลดล็อกบ้านเป็ดเลเวล ' + d.unlock : 'ครบแล้ว') + '</small>' : costTag(d.res, bCost(k, 1)));
      card.onclick = function () { if (have >= max) { toast(d.unlock && d.unlock > hqLv() ? 'ต้องมีบ้านเป็ดเลเวล ' + d.unlock : 'สร้างครบแล้ว'); return; } closeSheet(); startPlacing(k); };
      grid.appendChild(card);
    });
    body.appendChild(grid);
  });
}
function startPlacing(k) {
  var c = toWorld(view.w / 2, view.h / 2), s = B[k].size; placing = { k: k, x: Math.round(c.x - s / 2), y: Math.round(c.y - s / 2) };
  selectBuilding(null); setMode('place');
}
function setMode(m) {
  var bar = $('confirm'); bar.hidden = m !== 'place';
  $('confirm-text').textContent = m === 'place' ? (B[placing.k].wall && placing.last ? 'วางกำแพงต่อ? ' + count('wall') + '/' + maxCount('wall', hqLv()) : 'ลากเพื่อเลือกที่วาง ' + B[placing.k].name) : '';
  dirty = true;
}
function confirmPlace() {
  if (placing) { var b = placeBuilding(placing.k, placing.x, placing.y); if (!b) return;
    if (B[placing.k].wall && count('wall') < maxCount('wall', hqLv())) {   // offer the next wall on the next tile of the line
      var dir = placing.last ? [Math.sign(b.x - placing.last.x) || 0, Math.sign(b.y - placing.last.y) || 0] : (placing.dir || [1, 0]);
      if (!dir[0] && !dir[1] || dir[0] && dir[1]) dir = placing.dir || [1, 0];
      var nx = nextWallSpot(b.x, b.y, dir); placing.last = { x: b.x, y: b.y }; placing.dir = nx.dir; placing.x = nx.x; placing.y = nx.y; setMode('place'); hud(); return; }
    placing = null; selectBuilding(b); }
  setMode(null); hud();
}
function cancelPlace() { placing = null; moving = null; setMode(null); }

// ---------- army ----------
function armyMenu() {
  openSheet('กองทัพเป็ด', function (body) {
    body.appendChild(h('div', 'army-head', '<b>ค่ายพัก ' + armyUsed() + '/' + armySpace() + '</b>' + (D.queue.length ? ' · กำลังฝึก ' + D.queue.length + ' ตัว (เสร็จใน ' + clock(D.queue[D.queue.length - 1].until - now()) + ')' : '')));
    if (D.queue.length) { var f = h('button', 'btn gold', 'ฝึกเสร็จทันที ' + costTag('coin', coinsFor(D.queue[D.queue.length - 1].until - now()))); f.onclick = function () { finishTraining(); armyMenu(); hud(); }; body.appendChild(f); }
    var grid = h('div', 'cards');
    Object.keys(U).forEach(function (k) {
      if (U[k].hidden) return;
      var u = U[k], locked = (u.unlock || 1) > barracksLv(), card = h('button', 'card troop' + (locked ? ' off' : ''));
      card.innerHTML = '<span class="n">' + (D.army[k] || 0) + '</span><span class="portrait" style="background-image:url(assets/p_' + u.art + '.webp)"></span><b>' + u.name + '</b>' +
        (locked ? '<small>ลานฝึกเลเวล ' + u.unlock + '</small>' : costTag(u.res, u.cost) + '<small>🏠' + u.space + ' · ⏱' + u.time + 'ว.</small>');
      card.onclick = function () { if (locked) { toast('อัปเกรดลานฝึกเป็ดเป็นเลเวล ' + u.unlock); return; } train(k); armyMenu(); hud(); };
      grid.appendChild(card);
    });
    body.appendChild(grid);
  });
}

// ---------- attack ----------
function attackMenu() {
  if (!armyUsed() && !HERO_KEYS.some(function (k) { return heroOpen(k) && !heroRest(k); })) { toast('ยังไม่มีทหาร ไปฝึกที่ลานฝึกเป็ดก่อน'); armyMenu(); return; }
  openSheet('บุกฐานแมว', function (body) {
    body.appendChild(h('p', 'note', 'เลือกด่าน ด่านต่อไปเปิดเมื่อได้อย่างน้อย 1 ดาว'));
    var grid = h('div', 'levels');
    for (var n = 1; n <= Math.min(60, D.raid + 2); n++) (function (n) {
      var b = h('button', 'lvl' + (n > D.raid ? ' off' : ''), '<b>' + n + '</b><small>' + (n < D.raid ? '⭐' : n === D.raid ? 'ใหม่' : '🔒') + '</small>');
      b.onclick = function () { if (n > D.raid) return; closeSheet(); enterRaid(n); }; grid.appendChild(b);
    })(n);
    body.appendChild(grid);
  });
}
// start unpacking every picture this raid can show (troops, their summons, heroes, cats, the cat base) before it is needed
function raidPreload() {
  var files = [], troop = function (k) { var u = U[k] || CATS[k]; if (u && ART.troops[u.art]) files.push(ART.troops[u.art].file); if (U[k]) { if (U[k].split) troop(U[k].split); if (U[k].summon) troop(U[k].summon); } };
  Object.keys(R.army).forEach(function (k) { if (R.army[k] > 0) troop(k); }); Object.keys(R.heroes).forEach(troop);
  R.troops.forEach(function (t) { troop(t.kind); });
  R.buildings.forEach(function (b) { var d = B[b.k], st = stageOf(Math.max(1, b.lv)) - 1;
    if (d.turret && ART.turrets[d.turret]) files.push(ART.turrets[d.turret].stages[st].file);
    else if (d.art && ART.buildings[d.art]) { var ab = ART.buildings[d.art]; files.push(ab.stages[st].file); if (ab.rubble) files.push(ab.rubble.file); } });
  preload(files);
}
function enterRaid(n) { clearFx(); startRaid(n); raidPreload(); screen = 'raid'; sfx('horn'); selectBuilding(null); centerCamera(); sheetPrime(Object.keys(R.army).filter(function (k) { return R.army[k] > 0; }).concat(Object.keys(R.heroes), R.troops.map(function (t) { return t.kind; }))); raidBar(); hud(); dirty = true; }
function heroThumb(k) { // portrait for a hero card: the dog and egret have their own; the colonel is cut from his sheet (front-facing idle)
  var u = U[k]; if (u.art !== 'colonel') return 'background-image:url(assets/p_' + u.art + '.webp)';
  var L = ART.troopLayout, a = ART.troops.colonel, cols = 21; return 'background-image:url(assets/' + a.file + ');background-size:' + cols * 100 + '% ' + L.dirs * 100 + '%;background-position:0% ' + (2 / (L.dirs - 1) * 100) + '%';
}
// An ordinary drop only changes one count. Rebuild when a card disappears
// or a hero changes state, which also refreshes the automatically selected card.
function dropTroop(x, y) {
  var k = R.pick;
  if (!deploy(x, y)) return;
  if (R.pick === k && R.pickedCount) R.pickedCount.textContent = 'x' + R.army[k];
  else raidBar();
}
function raidBar() {
  R.pickedCount = null;
  if (R.pick) {
    var art = ART.troops[U[R.pick].art];
    if (art && !IMG[art.file]) {
      var sheet = img(art.file);
      if (typeof sheet.decode === 'function') Promise.resolve(sheet.decode()).catch(function () {});
    }
  }
  var bar = $('troops'); bar.innerHTML = '';
  HERO_KEYS.forEach(function (k) {
    var hs = R.heroes[k]; if (!hs) return; var u = U[k], dead = hs.unit && hs.unit.dead, st = hs.state === 'ready' ? (R.pick === k ? ' on' : '') : dead || hs.used ? ' off' : ' skill';
    var lab = hs.state === 'ready' ? 'Lv' + hs.lv : dead ? '💫' : hs.used ? '✓' : '⚡สกิล';
    var c = h('button', 'tcard hero' + st, '<span class="cnt">' + lab + '</span><span class="portrait" style="' + heroThumb(k) + '"></span>' + (u.crown ? '<span class="crown">👑</span>' : '<span class="crown">🎖</span>') + '<small>' + u.name + '</small>');
    c.onclick = function () { if (hs.state === 'ready') { R.pick = k; raidBar(); } else if (heroSkill(k)) raidBar(); }; bar.appendChild(c);
  });
  Object.keys(R.army).forEach(function (k) {
    if (!(R.army[k] > 0) && R.pick !== k) return;
    var c = h('button', 'tcard' + (R.pick === k ? ' on' : '') + (R.army[k] > 0 ? '' : ' off'), '<span class="cnt">x' + (R.army[k] || 0) + '</span><span class="portrait" style="background-image:url(assets/p_' + U[k].art + '.webp)"></span><small>' + U[k].name + '</small>');
    if (R.pick === k) R.pickedCount = c.querySelector('.cnt');
    c.onclick = function () { if (R.army[k] > 0) { R.pick = k; raidBar(); } }; bar.appendChild(c);
  });
}
function raidHud() {
  if (!R) return; var s = $('raid-top');
  var html = '<span class="stars">' + '★★★'.slice(0, R.stars || 0) + '<em>' + '★★★'.slice(R.stars || 0) + '</em></span><b>' + Math.floor((R.pct || 0) * 100) + '%</b>' +
    '<span>⏱ ' + clock(R.time * 1000) + '</span><span>' + icon('honey') + fmt(R.taken.honey) + ' ' + icon('veggie') + fmt(R.taken.veggie) + (R.lootTotal.syrup ? ' ' + icon('syrup') + fmt(R.taken.syrup) : '') + '</span>';
  if (html !== R.hudHtml) { s.innerHTML = html; R.hudHtml = html; }
}
function showResult() {
  var r = R.result; sfx(r.stars ? 'win' : 'lose'); openSheet(r.stars ? 'ชนะ!' : 'แพ้แล้ว', function (body) {
    body.appendChild(h('div', 'result-stars', '★★★'.slice(0, r.stars) + '<em>' + '★★★'.slice(r.stars) + '</em>'));
    body.appendChild(h('p', 'result', 'ทำลาย ' + Math.floor(r.pct * 100) + '% · ได้ ' + icon('honey') + fmt(r.got.honey) + ' ' + icon('veggie') + fmt(r.got.veggie) + (r.got.syrup ? ' ' + icon('syrup') + fmt(r.got.syrup) : '') + (r.coins ? ' ' + icon('coin') + r.coins : '')));
    var b = h('button', 'btn green big', 'กลับบ้าน'); b.onclick = goHome; body.appendChild(b);
  });
}
function goHome() { clearFx(); closeSheet(); screen = 'home'; R = null; SMOKE = []; centerCamera(0, hqCenter()); hud(); dirty = true; }

// ---------- sound settings ----------
function soundMenu() {
  openSheet('เสียง', function (body) {
    var row = h('div', 'p-row sound-row');
    var a = h('button', 'btn ' + (SND.on ? 'green' : ''), (SND.on ? '🔊' : '🔇') + ' เสียงเอฟเฟกต์ ' + (SND.on ? 'เปิด' : 'ปิด')); a.onclick = function () { setSound(!SND.on); soundMenu(); sfx('quack'); };
    var m = h('button', 'btn ' + (SND.music ? 'green' : ''), '🎵 เพลง ' + (SND.music ? 'เปิด' : 'ปิด')); m.onclick = function () { setMusic(!SND.music); soundMenu(); };
    row.appendChild(a); row.appendChild(m); body.appendChild(row);
    var gr = h('div', 'p-row sound-row'), gb = h('button', 'btn', '🌳 พื้นแผนที่: ' + GROUNDS[D.ground || 0].name); gb.onclick = function () { groundPicker(false); }; gr.appendChild(gb); body.appendChild(gr);
  });
  $('btn-sound').textContent = SND.on || SND.music ? '🔊' : '🔇';
}
// ---------- map look: chosen on first start (and changeable later from the settings button) ----------
function groundPicker(first) {
  openSheet(first ? 'เลือกพื้นแผนที่ของฐานเป็ด' : 'เปลี่ยนพื้นแผนที่', function (body) {
    if (first) body.appendChild(h('div', 'gp-note', 'เลือกได้ 1 แบบ เปลี่ยนทีหลังได้ที่ปุ่ม 🔊'));
    var grid = h('div', 'gp-grid');
    GROUNDS.forEach(function (T, i) {
      var card = h('div', 'card gp-card' + ((D.ground || 0) === i && !first ? ' on' : ''));
      var pic = groundPreview(i, 220, 124); pic.className = 'gp-pic'; card.appendChild(pic);
      card.appendChild(h('b', '', T.name)); card.appendChild(h('small', '', T.desc));
      card.onclick = function () { D.ground = i; writeSave(); closeSheet(); dirty = true; toast('พื้นแผนที่: ' + T.name); };
      grid.appendChild(card);
    });
    body.appendChild(grid);
  });
  if (first) { var x = $('sheet').querySelector('.x'); if (x) x.onclick = function () { D.ground = 0; writeSave(); closeSheet(); dirty = true; }; }
}
document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('button')) sfx('tap'); }, true);

// ---- src/065-edit.js ----
// Duck War — editing the base the Clash of Clans way:
//  * tap a building to select it, then drag it; it drops where you let go if the spot is free,
//    otherwise it waits there in red until you drag it somewhere free (tap elsewhere = put it back)
//  * walls: "select row" grabs the whole straight run, which then drags, rotates and upgrades together
//  * building walls: after each wall the next one is offered on the next tile along the same line
var group = null;   // buildings selected together (a wall row); null = just `selected`
function selection() { return group && group.length ? group : selected ? [selected] : []; }
function footprintFreeFor(k, x, y, ignore) {
  var s = B[k].size; if (x < 1 || y < 1 || x + s > MAP - 1 || y + s > MAP - 1) return false;
  return !D.buildings.some(function (b) { if (ignore.indexOf(b) >= 0) return false; var t = B[b.k].size; return x < b.x + t && b.x < x + s && y < b.y + t && b.y < y + s; });
}
function moveOk(m) {
  var items = m.items.map(function (i) { return i.b; });
  return m.items.every(function (i, n) {
    if (!footprintFreeFor(i.b.k, i.x, i.y, items)) return false;
    return m.items.every(function (j, q) { if (q === n) return true; var s = B[i.b.k].size, t = B[j.b.k].size; return !(i.x < j.x + t && j.x < i.x + s && i.y < j.y + t && j.y < i.y + s); });
  });
}
function startDrag(w) { // press on a selected building: pick up the whole selection
  var sel = selection(); if (!sel.length) return false;
  var hit = sel.some(function (b) { var s = B[b.k].size; return w.x >= b.x - .3 && w.x < b.x + s + .3 && w.y >= b.y - .3 && w.y < b.y + s + .3; });
  if (!hit && !(moving && moving.items.some(function (i) { var s = B[i.b.k].size; return w.x >= i.x - .3 && w.x < i.x + s + .3 && w.y >= i.y - .3 && w.y < i.y + s + .3; }))) return false;
  if (!moving) moving = { items: sel.map(function (b) { return { b: b, x: b.x, y: b.y, ox: b.x, oy: b.y }; }) };
  moving.from = { x: w.x, y: w.y }; moving.base = moving.items.map(function (i) { return { x: i.x, y: i.y }; });
  $('panel').classList.remove('open'); sfx('tap'); return true;
}
function dragTo(w) {
  if (!moving || !moving.from) return; var dx = Math.round(w.x - moving.from.x), dy = Math.round(w.y - moving.from.y);
  moving.items.forEach(function (i, n) { i.x = moving.base[n].x + dx; i.y = moving.base[n].y + dy; }); dirty = true;
}
function dropDrag() {
  if (!moving) return; moving.from = null;
  if (moving.items.every(function (i) { return i.x === i.ox && i.y === i.oy; })) { moving = null; reopenPanel(); return; }
  if (moveOk(moving)) { moving.items.forEach(function (i) { i.b.x = i.x; i.b.y = i.y; i.b.pop = now() - 300; }); moving = null; writeSave(); sfx('thud'); buzz('light'); reopenPanel(); }
  else { sfx('error'); toast('วางตรงนี้ไม่ได้ ลากไปที่ว่าง'); }   // stays red where it was dropped
}
function cancelMove() { moving = null; dirty = true; }
function reopenPanel() { if (selected) selectBuilding(selected, true); }
// ---------- wall rows ----------
function wallAt(x, y) { return D.buildings.find(function (b) { return b.k === 'wall' && b.x === x && b.y === y; }); }
function wallRow(w) {
  function run(dx, dy) { var out = [w], x = w.x + dx, y = w.y + dy, b; while ((b = wallAt(x, y))) { out.push(b); x += dx; y += dy; } x = w.x - dx; y = w.y - dy; while ((b = wallAt(x, y))) { out.unshift(b); x -= dx; y -= dy; } return out; }
  var a = run(1, 0), b = run(0, 1), pick = a.length > b.length ? a : b.length > a.length ? b : (group && group[0] && group[0].x === group[group.length - 1].x ? a : b);
  return pick;
}
function selectRow() { if (!selected || selected.k !== 'wall') return; group = wallRow(selected); toast('เลือกกำแพง ' + group.length + ' ก้อน · ลากเพื่อย้ายทั้งแถว'); selectBuilding(selected, true); keepClearOfPanel(selected); dirty = true; }
function rotateRow() { // turn the row 90° round the wall you tapped
  if (!group || group.length < 2) return; var p = selected;
  moving = { items: group.map(function (b) { var rx = b.x - p.x, ry = b.y - p.y; return { b: b, x: p.x - ry, y: p.y + rx, ox: b.x, oy: b.y }; }) };
  dropDrag(); dirty = true;
}
function upgradeRow() {
  var lv = Math.min.apply(null, group.map(function (b) { return b.lv; })), ws = group.filter(function (b) { return b.lv === lv; });
  if (lv + 1 > bMaxLv('wall', hqLv())) { toast('อัปเกรดบ้านเป็ดก่อน'); return; }
  var cost = bCost('wall', lv + 1) * ws.length; if (!pay(B.wall.res, cost)) return;
  ws.forEach(function (b) { b.lv = lv + 1; b.pop = now(); }); writeSave(); sfx('done'); toast('อัปเกรดกำแพง ' + ws.length + ' ก้อนเป็นเลเวล ' + (lv + 1)); selectBuilding(selected, true); hud();
}
// ---------- placing walls one after another along a line ----------
function nextWallSpot(x, y, dir) {
  var tries = [dir, [dir[1], dir[0]], [-dir[1], -dir[0]], [-dir[0], -dir[1]]];
  for (var i = 0; i < tries.length; i++) { var nx = x + tries[i][0], ny = y + tries[i][1]; if (footprintFree('wall', nx, ny)) return { x: nx, y: ny, dir: tries[i] }; }
  return { x: x + dir[0], y: y + dir[1], dir: dir };
}

// ---- src/07-main.js ----
// Duck War — start-up, the main loop, and what taps do on each screen.
var last = 0;
function scene() { return screen === 'raid' ? R : D; }
function buildingAt(w, list) {
  var hit = null; list.forEach(function (b) { var s = B[b.k].size; if (w.x >= b.x && w.x < b.x + s && w.y >= b.y && w.y < b.y + s) hit = b; }); return hit;
}
input.tap = function (w) {
  if (screen === 'home') {
    if (placing) { var s = B[placing.k].size; placing.x = Math.round(w.x - s / 2); placing.y = Math.round(w.y - s / 2); placing.last = null; dirty = true; return; }
    if (moving) { cancelMove(); }   // tapping away from a red, unplaced move puts the buildings back
    if (COLONEL && Math.hypot(w.x - COLONEL.x, w.y - COLONEL.y) < 1.3) { // tap the colonel: he salutes and says something
      COLONEL.atk = now(); COLONEL.salutes = 1; COLONEL.wait = 2; COLONEL.face = Math.PI / 4; sfx('colonel'); buzz('light'); toast('🎖 ผู้พันเป็ด: ' + COLONEL_LINES[Math.floor(Math.random() * COLONEL_LINES.length)]); return; }
    var b = buildingAt(w, D.buildings); selectBuilding(b); if (b) { b.pop = now() - 450; sfx('tap'); buzz('light'); } dirty = true;
  } else if (screen === 'raid' && R && !R.over) { dropTroop(w.x, w.y); }
};
input.press = function (w) {
  if (screen === 'home' && placing) { var o = placing, s = B[placing.k].size; return w.x >= o.x - .5 && w.x <= o.x + s + .5 && w.y >= o.y - .5 && w.y <= o.y + s + .5; }
  if (screen === 'home' && (selected || moving)) return startDrag(w);
  if (screen === 'raid' && R && !R.over && R.pick) { stream = { x: w.x, y: w.y, next: now() + 350 }; return true; }
  return false;
};
var stream = null;
input.drag = function (w) {
  if (screen === 'home' && placing) { var o = placing, s = B[placing.k].size; o.x = Math.round(w.x - s / 2); o.y = Math.round(w.y - s / 2); o.last = null; dirty = true; }
  if (screen === 'home' && moving && moving.from) dragTo(w);
  if (stream) { stream.x = w.x; stream.y = w.y; }
};
input.release = function () { stream = null; if (screen === 'home' && moving && moving.from) dropDrag(); };

function frame(t) {
  var dt = Math.min(.05, (t - last) / 1000 || 0); last = t;
  if (screen === 'home') { colonelTick(dt); homeTick(); if (Math.floor(t / 1000) !== Math.floor((t - dt * 1000) / 1000)) { hud(); if (selected && !moving) selectBuilding(selected, true); writeSave(); } }
  if (screen === 'raid' && R) {
    raidTick(dt); raidHud();
    if (stream && now() > stream.next && R.army[R.pick] > 0) { stream.next = now() + 110; dropTroop(stream.x + (Math.random() - .5) * .4, stream.y + (Math.random() - .5) * .4); }
  }
  draw(dt); headWork(screen === 'raid'); sheetWork(screen === 'raid' ? 1 : 3);
  requestAnimationFrame(frame);
}
function rangeRing(b) {
  var d = B[b.k], s = d.size, c = toScreen(b.x + s / 2, b.y + s / 2), t = now() / 1000;
  function ring(r) { ctx.beginPath(); ctx.ellipse(c.x, c.y, r * cam.s, r * cam.s * ISO, 0, 0, 7); }
  ctx.save(); ring(d.range); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2; ctx.setLineDash([10, 7]); ctx.lineDashOffset = -t * 12; ctx.stroke();
  if (d.minRange) { ring(d.minRange); ctx.fillStyle = 'rgba(255,80,60,.13)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,90,70,.45)'; ctx.stroke(); }
  ctx.restore(); dirty = true;
}
function draw(dt) {
  FDT = dt || 0; ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0); ctx.imageSmoothingQuality = 'high';
  drawGround();
  var sc = scene(), list = [];
  if (screen === 'home' && !moving) selection().forEach(function (b) { tileDiamond(b.x, b.y, B[b.k].size, 'rgba(255,255,255,.18)', 'rgba(255,255,255,.75)'); });
  // a defense that is tapped, being placed or moved shows how far it reaches: faint ring on the grass (and the mortar's blind spot)
  if (screen === 'home') { var rings = []; if (placing) rings.push(placing); if (moving) moving.items.forEach(function (i) { rings.push({ k: i.b.k, x: i.x, y: i.y }); }); else if (selected) rings.push(selected);
    rings.forEach(function (b) { if (B[b.k].kind === 'defense') rangeRing(b); }); }
  var mvOk = moving ? moveOk(moving) : true;
  if (screen === 'home' && moving) moving.items.forEach(function (i) { tileDiamond(i.x, i.y, B[i.b.k].size, mvOk ? 'rgba(120,255,140,.35)' : 'rgba(255,80,80,.4)', mvOk ? '#5fe07a' : '#ff5a5a'); });
  if (screen === 'home' && placing) { var pok = footprintFree(placing.k, placing.x, placing.y);
    tileDiamond(placing.x, placing.y, B[placing.k].size, pok ? 'rgba(120,255,140,.35)' : 'rgba(255,80,80,.35)', pok ? '#5fe07a' : '#ff5a5a'); }
  var movingSet = moving && screen === 'home' ? moving.items.map(function (i) { return i.b; }) : [], ghosts = moving && screen === 'home' ? moving.items.map(function (i) { return Object.assign({}, i.b, { x: i.x, y: i.y }); }) : [];
  if (moving && screen === 'home') sc = { buildings: D.buildings.filter(function (b) { return movingSet.indexOf(b) < 0; }).concat(ghosts) };   // walls join up with where the moved walls are now
  buildWallSet(sc.buildings);
  // rubble lies flat on the ground: drawn first and faded, so ducks walk over it instead of under it
  sc.buildings.forEach(function (b) { if (b.dead && b.k !== 'wall') { ctx.globalAlpha = .62; drawBuilding(b, sc); ctx.globalAlpha = 1; } });
  sc.buildings.forEach(function (b) { if (b.dead || movingSet.indexOf(b) >= 0) return; var s = B[b.k].size; list.push({ d: b.x + b.y + s, f: function () { drawBuilding(b, sc); } }); });
  if (placing && screen === 'home') { var gb = { id: -1, k: placing.k, x: placing.x, y: placing.y, lv: 1, aim: 2.36 }; list.push({ d: placing.x + placing.y + B[placing.k].size, f: function () { ctx.globalAlpha = .8; drawBuilding(gb, { buildings: D.buildings.concat([gb]) }); ctx.globalAlpha = 1; } }); }
  ghosts.forEach(function (g) { list.push({ d: g.x + g.y + B[g.k].size, f: function () { ctx.globalAlpha = mvOk ? .9 : .7; drawBuilding(g, sc); ctx.globalAlpha = 1; } }); });
  if (screen === 'home' && COLONEL && ART.troops.colonel) list.push({ d: COLONEL.x + COLONEL.y + .2, f: function () { drawTroop(COLONEL); } });
  if (screen === 'raid' && R) {
    R.troops.forEach(function (t) { list.push({ d: t.x + t.y + .2 + (t.side === 'duck' && U[t.kind].air ? 6 : 0), f: function () { drawTroop(t); } }); });   // flyers are drawn above the buildings
  }
  list.sort(function (a, b) { return a.d - b.d; }).forEach(function (o) { o.f(); });
  drawSmoke(dt || 0);
  if (screen === 'raid' && R) {
    R.buildings.forEach(function (b) { if (!b.dead && b.hp < b.max && b.k !== 'wall') { var c = center(b); hpBar(c.x, c.y, B[b.k].size * 1.3, b.hp / b.max, '#7be36a'); } });
    R.shots.forEach(drawShot); R.fx = R.fx.filter(function (f) { return drawFx(f, dt); });
  }
  if (PARTS.length || WORDS.length || SHAKE.on) drawParts(dt || 0);
}
function boot() {
  D = migrateSave(loadSave() || newGame()); if (TEST && !D.testCoins) { D.res.coin = Math.max(D.res.coin, 1000000); D.testCoins = 1; }   // test builds: 1M duck coins for trying upgrades
  fit(); centerCamera(0, hqCenter()); homeTick(); hud();
  $('btn-build').onclick = buildMenu; $('btn-army').onclick = armyMenu; $('btn-attack').onclick = attackMenu;
  $('btn-ok').onclick = confirmPlace; $('btn-no').onclick = cancelPlace;
  $('btn-end').onclick = function () { if (R && !R.over) endRaid(); };
  $('btn-sound').onclick = soundMenu; $('btn-sound').textContent = SND.on || SND.music ? '🔊' : '🔇';
  window.duckBack = function () { if ($('sheet').classList.contains('open')) closeSheet(); else if (placing) cancelPlace(); else if (moving) cancelMove(); else if (selected) selectBuilding(null); };
  window.duckPause = writeSave;
  document.addEventListener('visibilitychange', function () { if (document.hidden) writeSave(); });
  headPrepare(); sheetPrime(HERO_KEYS);   // the colonel walks the base, and all three heroes are ready for raids
  if (D.ground === undefined) groundPicker(true);   // first start (or a save from before map looks): let the player pick a map
  window.duckReady = true;
  requestAnimationFrame(frame);
}
window.addEventListener('error', function (e) { window.duckError = String(e.message || e); });
boot();

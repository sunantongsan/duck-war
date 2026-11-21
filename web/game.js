"use strict";
var ART={"buildings":{"hq":{"stages":[{"file":"b_hq_1.webp","ax":244.0,"ay":222.4,"ppu":120.084,"w":564,"h":461},{"file":"b_hq_2.webp","ax":188.0,"ay":241.4,"ppu":90.311,"w":508,"h":480},{"file":"b_hq_3.webp","ax":236.0,"ay":332.4,"ppu":110.16,"w":556,"h":571},{"file":"b_hq_4.webp","ax":213.0,"ay":346.4,"ppu":103.461,"w":533,"h":585},{"file":"b_hq_5.webp","ax":279.0,"ay":401.4,"ppu":134.226,"w":599,"h":640}],"rubble":{"file":"b_hq_rubble.webp","ax":190.0,"ay":128.4,"ppu":110.16,"w":396,"h":271}},"barracks":{"stages":[{"file":"b_barracks_1.webp","ax":99.0,"ay":149.4,"ppu":72.199,"w":244,"h":206},{"file":"b_barracks_2.webp","ax":93.0,"ay":219.4,"ppu":80.387,"w":285,"h":282},{"file":"b_barracks_3.webp","ax":93.0,"ay":232.4,"ppu":80.387,"w":285,"h":295},{"file":"b_barracks_4.webp","ax":93.0,"ay":246.4,"ppu":80.759,"w":285,"h":344},{"file":"b_barracks_5.webp","ax":112.0,"ay":259.4,"ppu":97.506,"w":304,"h":357}],"rubble":{"file":"b_barracks_rubble.webp","ax":94.0,"ay":113.4,"ppu":80.387,"w":203,"h":176}},"workshop":{"stages":[{"file":"b_workshop_1.webp","ax":97.0,"ay":193.4,"ppu":72.571,"w":289,"h":291},{"file":"b_workshop_2.webp","ax":102.0,"ay":209.4,"ppu":75.177,"w":294,"h":308},{"file":"b_workshop_3.webp","ax":105.0,"ay":232.4,"ppu":77.782,"w":297,"h":331},{"file":"b_workshop_4.webp","ax":113.0,"ay":238.4,"ppu":86.341,"w":305,"h":337},{"file":"b_workshop_5.webp","ax":114.0,"ay":285.4,"ppu":86.341,"w":306,"h":384}],"rubble":{"file":"b_workshop_rubble.webp","ax":95.0,"ay":112.4,"ppu":77.782,"w":214,"h":173}},"honeypump":{"stages":[{"file":"b_honeypump_1.webp","ax":73.0,"ay":131.4,"ppu":50.242,"w":240,"h":171},{"file":"b_honeypump_2.webp","ax":68.0,"ay":138.4,"ppu":51.358,"w":236,"h":179},{"file":"b_honeypump_3.webp","ax":68.0,"ay":156.4,"ppu":52.103,"w":260,"h":206},{"file":"b_honeypump_4.webp","ax":69.0,"ay":192.4,"ppu":59.918,"w":261,"h":243},{"file":"b_honeypump_5.webp","ax":95.0,"ay":192.4,"ppu":82.62,"w":287,"h":290}],"rubble":{"file":"b_honeypump_rubble.webp","ax":102.0,"ay":113.4,"ppu":52.103,"w":206,"h":154}},"veggieblender":{"stages":[{"file":"b_veggieblender_1.webp","ax":131.0,"ay":285.4,"ppu":96.762,"w":323,"h":361},{"file":"b_veggieblender_2.webp","ax":131.0,"ay":285.4,"ppu":96.762,"w":323,"h":361},{"file":"b_veggieblender_3.webp","ax":131.0,"ay":185.4,"ppu":96.762,"w":323,"h":261},{"file":"b_veggieblender_4.webp","ax":131.0,"ay":190.4,"ppu":96.762,"w":323,"h":266},{"file":"b_veggieblender_5.webp","ax":132.0,"ay":210.4,"ppu":104.577,"w":324,"h":292}],"rubble":{"file":"b_veggieblender_rubble.webp","ax":112.0,"ay":113.4,"ppu":96.762,"w":224,"h":189}},"syrupstove":{"stages":[{"file":"b_syrupstove_1.webp","ax":48.0,"ay":133.4,"ppu":41.379,"w":202,"h":184},{"file":"b_syrupstove_2.webp","ax":112.0,"ay":138.4,"ppu":54.708,"w":284,"h":188},{"file":"b_syrupstove_3.webp","ax":112.0,"ay":155.4,"ppu":63.267,"w":304,"h":205},{"file":"b_syrupstove_4.webp","ax":112.0,"ay":166.4,"ppu":72.944,"w":304,"h":264},{"file":"b_syrupstove_5.webp","ax":112.0,"ay":197.4,"ppu":97.134,"w":304,"h":295}],"rubble":{"file":"b_syrupstove_rubble.webp","ax":94.0,"ay":112.4,"ppu":63.267,"w":211,"h":162}},"honeyjar":{"stages":[{"file":"b_honeyjar_1.webp","ax":60.0,"ay":137.4,"ppu":43.171,"w":252,"h":171},{"file":"b_honeyjar_2.webp","ax":66.0,"ay":155.4,"ppu":47.637,"w":258,"h":199},{"file":"b_honeyjar_3.webp","ax":70.0,"ay":173.4,"ppu":51.358,"w":262,"h":271},{"file":"b_honeyjar_4.webp","ax":94.0,"ay":191.4,"ppu":68.106,"w":286,"h":289},{"file":"b_honeyjar_5.webp","ax":113.0,"ay":209.4,"ppu":97.878,"w":305,"h":308}],"rubble":{"file":"b_honeyjar_rubble.webp","ax":94.0,"ay":124.4,"ppu":51.358,"w":198,"h":165}},"veggiejar":{"stages":[{"file":"b_veggiejar_1.webp","ax":60.0,"ay":137.4,"ppu":43.171,"w":252,"h":171},{"file":"b_veggiejar_2.webp","ax":67.0,"ay":155.4,"ppu":47.637,"w":259,"h":200},{"file":"b_veggiejar_3.webp","ax":70.0,"ay":173.4,"ppu":51.358,"w":262,"h":271},{"file":"b_veggiejar_4.webp","ax":95.0,"ay":191.4,"ppu":68.106,"w":287,"h":289},{"file":"b_veggiejar_5.webp","ax":113.0,"ay":209.4,"ppu":97.878,"w":305,"h":308}],"rubble":{"file":"b_veggiejar_rubble.webp","ax":96.0,"ay":124.4,"ppu":51.358,"w":200,"h":165}},"syrupjar":{"stages":[{"file":"b_syrupjar_1.webp","ax":60.0,"ay":137.4,"ppu":43.171,"w":252,"h":171},{"file":"b_syrupjar_2.webp","ax":67.0,"ay":155.4,"ppu":47.637,"w":259,"h":200},{"file":"b_syrupjar_3.webp","ax":70.0,"ay":173.4,"ppu":51.358,"w":262,"h":271},{"file":"b_syrupjar_4.webp","ax":101.0,"ay":191.4,"ppu":68.106,"w":293,"h":289},{"file":"b_syrupjar_5.webp","ax":113.0,"ay":209.4,"ppu":97.878,"w":305,"h":308}],"rubble":{"file":"b_syrupjar_rubble.webp","ax":98.0,"ay":124.4,"ppu":51.358,"w":202,"h":165}},"camp":{"stages":[{"file":"b_camp_1.webp","ax":270.5,"ay":357.1,"ppu":67.237,"w":542,"h":543},{"file":"b_camp_2.webp","ax":270.5,"ay":357.1,"ppu":67.237,"w":542,"h":543},{"file":"b_camp_3.webp","ax":270.5,"ay":357.1,"ppu":67.237,"w":542,"h":543},{"file":"b_camp_4.webp","ax":221.5,"ay":357.1,"ppu":67.237,"w":493,"h":543},{"file":"b_camp_5.webp","ax":221.5,"ay":357.1,"ppu":67.237,"w":493,"h":543}],"rubble":{"file":"b_camp_rubble.webp","ax":270.5,"ay":356.1,"ppu":67.237,"w":542,"h":542}},"airfield":{"stages":[{"file":"b_airfield_1.webp","ax":183.5,"ay":379.2,"ppu":59.918,"w":415,"h":463},{"file":"b_airfield_2.webp","ax":229.5,"ay":379.2,"ppu":64.384,"w":461,"h":463},{"file":"b_airfield_3.webp","ax":229.5,"ay":379.2,"ppu":71.827,"w":461,"h":463},{"file":"b_airfield_4.webp","ax":229.5,"ay":379.2,"ppu":79.27,"w":461,"h":463},{"file":"b_airfield_5.webp","ax":229.5,"ay":379.2,"ppu":86.341,"w":461,"h":463}],"rubble":{"file":"b_airfield_rubble.webp","ax":230.5,"ay":378.2,"ppu":71.827,"w":462,"h":462}},"lab":{"stages":[{"file":"b_lab_1.webp","ax":67.0,"ay":123.4,"ppu":48.009,"w":207,"h":161},{"file":"b_lab_2.webp","ax":101.0,"ay":211.4,"ppu":78.898,"w":293,"h":273},{"file":"b_lab_3.webp","ax":107.0,"ay":221.4,"ppu":79.27,"w":299,"h":320},{"file":"b_lab_4.webp","ax":117.0,"ay":234.4,"ppu":84.481,"w":309,"h":333},{"file":"b_lab_5.webp","ax":116.0,"ay":229.4,"ppu":97.878,"w":308,"h":306}],"rubble":{"file":"b_lab_rubble.webp","ax":95.0,"ay":112.4,"ppu":79.27,"w":207,"h":175}},"pantry":{"stages":[{"file":"b_pantry_1.webp","ax":113.0,"ay":162.4,"ppu":70.711,"w":305,"h":260},{"file":"b_pantry_2.webp","ax":118.0,"ay":224.4,"ppu":90.807,"w":310,"h":322},{"file":"b_pantry_3.webp","ax":119.0,"ay":237.4,"ppu":90.807,"w":311,"h":336},{"file":"b_pantry_4.webp","ax":120.0,"ay":285.4,"ppu":90.807,"w":312,"h":384},{"file":"b_pantry_5.webp","ax":120.0,"ay":275.4,"ppu":98.251,"w":312,"h":373}],"rubble":{"file":"b_pantry_rubble.webp","ax":105.0,"ay":123.4,"ppu":90.807,"w":210,"h":194}},"hero":{"stages":[{"file":"b_hero_1.webp","ax":89.0,"ay":198.6,"ppu":72.199,"w":301,"h":262},{"file":"b_hero_2.webp","ax":103.0,"ay":198.6,"ppu":82.992,"w":315,"h":277},{"file":"b_hero_3.webp","ax":107.0,"ay":333.6,"ppu":82.248,"w":319,"h":421},{"file":"b_hero_4.webp","ax":107.0,"ay":334.6,"ppu":82.248,"w":319,"h":422},{"file":"b_hero_5.webp","ax":126.0,"ay":334.6,"ppu":109.043,"w":338,"h":422}],"rubble":{"file":"b_hero_rubble.webp","ax":96.0,"ay":137.6,"ppu":82.248,"w":308,"h":202}}},"turrets":{"slingshot":{"stages":[{"file":"t_slingshot_1.webp","cell":192,"ax":96.0,"ay":165.7,"ppu":79.948,"tips":[[107.5,134.6],[102.0,138.3],[94.2,138.9],[88.8,137.7],[83.9,134.6],[80.9,130.4],[77.3,74.9],[70.0,102.0],[67.0,93.6],[67.6,85.1],[117.1,77.3],[123.2,85.1],[124.4,93.6],[121.4,102.6],[114.1,74.9],[110.5,130.4]],"fit":1.894},{"file":"t_slingshot_2.webp","cell":192,"ax":96.0,"ay":163.6,"ppu":78.955,"tips":[[109.1,130.5],[103.8,134.1],[94.2,135.9],[87.7,134.1],[82.3,130.5],[79.9,127.6],[75.7,66.7],[68.6,93.6],[63.8,85.2],[63.8,75.7],[120.4,66.7],[126.4,75.1],[127.6,85.2],[122.8,93.6],[115.7,66.7],[112.1,125.8]],"fit":1.756},{"file":"t_slingshot_3.webp","cell":192,"ax":96.0,"ay":163.5,"ppu":77.041,"tips":[[110.5,126.6],[104.1,131.3],[96.0,133.0],[87.3,131.3],[82.0,128.4],[75.1,114.4],[74.5,101.0],[66.3,87.1],[62.3,76.0],[61.1,66.7],[94.3,52.7],[130.3,66.7],[130.3,77.7],[125.1,86.5],[116.9,101.0],[116.4,115.0]],"fit":1.729},{"file":"t_slingshot_4.webp","cell":192,"ax":96.0,"ay":163.7,"ppu":66.207,"tips":[[109.0,132.0],[104.5,134.5],[95.0,136.5],[87.0,134.5],[82.5,132.0],[76.5,120.5],[75.5,105.0],[66.0,98.5],[55.0,92.0],[58.5,73.5],[80.5,61.0],[133.0,73.5],[137.0,91.5],[126.0,100.5],[116.0,105.0],[115.5,119.0]],"fit":1.491},{"file":"t_slingshot_5.webp","cell":192,"ax":96.0,"ay":161.2,"ppu":66.207,"tips":[[111.0,125.5],[106.5,128.5],[94.0,131.0],[85.0,128.5],[79.5,124.5],[74.0,112.0],[73.0,97.5],[63.0,90.0],[51.5,82.5],[88.5,41.5],[95.5,41.5],[103.0,42.0],[141.0,82.5],[128.5,90.0],[118.5,97.0],[117.5,112.0]],"fit":1.354}],"fit":1.894},"boxtower":{"stages":[{"file":"t_boxtower_1.webp","cell":192,"ax":96.0,"ay":168.4,"ppu":79.448,"tips":[[106.2,114.2],[101.4,120.8],[90.6,122.0],[90.0,120.8],[85.2,114.2],[79.2,102.8],[79.8,97.4],[79.2,99.2],[81.0,94.4],[85.8,90.8],[90.6,89.0],[105.6,90.8],[110.4,95.0],[112.2,99.2],[111.6,97.4],[112.2,102.2]],"fit":2.147},{"file":"t_boxtower_2.webp","cell":192,"ax":96.0,"ay":166.7,"ppu":66.207,"tips":[[104.0,107.0],[101.0,111.5],[92.0,113.0],[91.0,111.5],[87.5,107.0],[82.0,96.5],[82.5,92.0],[82.0,93.5],[83.5,90.0],[87.5,86.5],[92.0,85.0],[104.0,86.5],[108.0,90.0],[109.5,93.5],[109.0,92.0],[109.5,96.5]],"fit":2.147},{"file":"t_boxtower_3.webp","cell":192,"ax":96.0,"ay":142.7,"ppu":66.207,"tips":[[112.5,63.0],[110.5,71.5],[80.0,75.5],[80.0,71.0],[80.0,64.5],[78.0,52.5],[82.5,46.5],[77.5,64.5],[75.5,59.0],[76.5,53.0],[104.0,48.0],[115.0,53.0],[116.0,59.0],[114.0,64.5],[109.0,46.5],[112.0,57.0]],"fit":2.133},{"file":"t_boxtower_4.webp","cell":192,"ax":96.0,"ay":143.7,"ppu":66.207,"tips":[[111.5,59.0],[111.0,65.5],[80.0,70.0],[80.0,65.5],[80.0,59.0],[78.0,47.0],[82.5,41.0],[78.0,58.5],[75.5,53.5],[76.5,47.5],[104.0,42.5],[115.0,47.5],[116.0,53.0],[114.0,59.0],[109.0,41.0],[113.5,47.0]],"fit":1.746},{"file":"t_boxtower_5.webp","cell":192,"ax":96.0,"ay":143.2,"ppu":66.207,"tips":[[115.0,49.0],[115.0,57.5],[75.5,63.0],[76.0,57.0],[76.5,49.0],[76.0,36.0],[82.5,30.5],[76.0,54.5],[72.5,48.5],[72.5,41.5],[115.0,35.0],[119.0,41.5],[119.0,48.5],[115.5,55.0],[109.0,30.5],[115.5,36.0]],"fit":1.729}],"fit":2.147},"mortar":{"stages":[{"file":"t_mortar_1.webp","cell":192,"ax":96.0,"ay":160.0,"ppu":94.864,"tips":[[122.5,114.6],[115.3,121.7],[91.0,126.7],[75.9,121.7],[68.8,114.6],[66.6,109.6],[65.9,97.4],[65.9,97.4],[78.1,76.6],[82.4,73.0],[88.8,70.1],[108.9,73.0],[113.2,77.3],[125.4,97.4],[125.4,98.1],[125.4,107.4]],"fit":2.515},{"file":"t_mortar_2.webp","cell":192,"ax":96.0,"ay":163.0,"ppu":83.083,"tips":[[119.8,119.5],[113.6,125.1],[96.0,130.1],[77.8,125.1],[70.9,118.8],[68.4,112.6],[67.8,103.8],[69.6,96.9],[72.8,92.5],[74.7,85.6],[106.0,79.9],[118.0,86.2],[120.5,95.0],[123.6,103.2],[123.6,105.0],[122.4,114.5]],"fit":1.862},{"file":"t_mortar_3.webp","cell":192,"ax":96.0,"ay":165.7,"ppu":70.231,"tips":[[118.3,123.6],[111.9,130.0],[94.9,134.2],[79.0,129.5],[73.7,124.2],[71.6,119.9],[71.1,109.8],[71.1,109.3],[69.5,108.2],[68.4,99.8],[92.8,89.2],[124.1,100.3],[121.5,107.2],[120.4,109.3],[120.4,109.8],[120.4,118.3]],"fit":2.12},{"file":"t_mortar_4.webp","cell":192,"ax":96.0,"ay":164.2,"ppu":66.207,"tips":[[118.0,123.0],[112.5,128.5],[95.5,133.5],[79.0,128.5],[73.5,123.0],[71.0,116.5],[71.0,110.5],[71.0,109.0],[63.0,115.0],[57.0,105.5],[104.0,91.0],[133.0,104.5],[128.0,114.5],[119.5,106.0],[120.5,110.5],[120.5,116.5]],"fit":1.505},{"file":"t_mortar_5.webp","cell":192,"ax":96.0,"ay":143.7,"ppu":66.207,"tips":[[119.0,99.0],[113.0,104.5],[95.5,109.5],[79.0,105.0],[72.0,98.0],[70.5,94.5],[69.5,86.0],[70.5,81.5],[55.0,97.0],[44.5,85.5],[93.5,64.5],[146.0,85.0],[136.5,97.0],[121.0,81.5],[122.0,86.0],[120.5,96.0]],"fit":1.59}],"fit":2.515},"watergun":{"stages":[{"file":"t_watergun_1.webp","cell":192,"ax":96.0,"ay":168.3,"ppu":97.036,"tips":[[135.6,104.3],[112.9,127.0],[90.1,131.4],[79.1,127.7],[55.7,104.3],[44.0,90.4],[40.3,72.0],[44.0,57.4],[55.7,44.2],[74.0,34.7],[96.0,31.0],[117.3,34.7],[135.6,44.2],[147.3,57.4],[151.0,72.8],[147.3,91.1]],"fit":2.554},{"file":"t_watergun_2.webp","cell":192,"ax":96.0,"ay":162.8,"ppu":83.63,"tips":[[135.2,100.1],[111.8,122.8],[95.4,127.2],[79.6,122.8],[56.2,100.1],[46.7,86.2],[45.5,69.1],[47.4,62.2],[56.2,49.5],[71.4,40.1],[90.3,35.6],[119.4,40.1],[135.2,50.2],[144.0,62.2],[145.9,69.7],[144.6,85.5]],"fit":1.862},{"file":"t_watergun_3.webp","cell":192,"ax":96.0,"ay":168.1,"ppu":69.845,"tips":[[133.5,108.3],[109.7,131.0],[94.4,134.7],[81.8,131.0],[58.0,108.3],[51.7,96.7],[51.7,81.4],[51.7,80.9],[58.0,69.3],[70.7,59.8],[87.0,54.5],[120.8,59.8],[132.9,68.8],[139.8,80.9],[139.8,81.4],[139.8,96.7]],"fit":2.12},{"file":"t_watergun_4.webp","cell":192,"ax":96.0,"ay":167.7,"ppu":66.207,"tips":[[118.0,130.5],[108.0,136.0],[95.5,137.5],[83.5,136.0],[73.0,130.5],[50.5,94.5],[52.0,79.0],[50.5,84.0],[56.0,71.5],[68.0,61.0],[83.0,55.5],[123.5,61.0],[135.5,71.5],[141.0,84.0],[139.5,79.0],[141.0,94.5]],"fit":1.894},{"file":"t_watergun_5.webp","cell":192,"ax":96.0,"ay":161.7,"ppu":66.207,"tips":[[132.5,107.0],[108.5,126.5],[95.5,128.0],[83.0,126.5],[59.0,107.0],[49.0,93.5],[46.5,77.0],[49.0,67.5],[58.5,55.0],[72.5,46.5],[92.5,42.0],[119.0,46.5],[133.0,55.0],[142.5,67.5],[145.0,77.0],[142.5,93.5]],"fit":1.669}],"fit":2.554},"chili":{"stages":[{"file":"t_chili_1.webp","cell":192,"ax":96.0,"ay":171.1,"ppu":72.638,"tips":[[114.7,126.4],[109.7,130.8],[93.8,134.6],[82.3,131.3],[77.3,127.0],[72.4,114.9],[70.8,103.4],[71.9,99.5],[76.8,92.9],[82.3,89.7],[91.1,86.4],[108.1,89.1],[116.3,95.1],[119.6,99.5],[120.7,103.9],[118.5,117.1]],"fit":2.443},{"file":"t_chili_2.webp","cell":192,"ax":96.0,"ay":169.2,"ppu":66.207,"tips":[[113.5,121.0],[108.5,126.0],[95.0,129.5],[83.0,126.0],[78.5,122.0],[73.0,114.5],[70.5,99.0],[71.5,95.5],[76.0,89.0],[83.0,84.5],[93.0,82.0],[108.5,84.5],[116.0,89.5],[120.0,95.0],[121.0,99.0],[119.5,111.5]],"fit":2.443},{"file":"t_chili_3.webp","cell":192,"ax":96.0,"ay":164.7,"ppu":66.207,"tips":[[117.0,108.5],[108.5,115.0],[95.5,118.5],[83.0,115.0],[73.5,107.0],[70.0,102.0],[68.0,85.5],[69.0,82.0],[73.5,75.5],[82.5,69.5],[94.0,67.0],[109.0,69.5],[118.0,75.5],[122.5,82.0],[123.5,86.0],[122.0,100.0]],"fit":2.309},{"file":"t_chili_4.webp","cell":192,"ax":96.0,"ay":143.7,"ppu":66.207,"tips":[[119.0,83.0],[108.5,90.5],[94.0,93.0],[81.5,89.5],[72.5,83.0],[67.5,74.0],[66.0,59.5],[67.0,55.5],[72.0,48.0],[79.0,43.0],[93.0,39.0],[111.5,42.5],[120.0,48.5],[124.5,55.5],[125.5,59.5],[123.5,76.0]],"fit":1.532},{"file":"t_chili_5.webp","cell":192,"ax":96.0,"ay":143.7,"ppu":66.207,"tips":[[120.5,79.0],[111.0,86.0],[95.0,89.5],[80.5,86.0],[71.0,79.0],[65.5,69.5],[64.0,54.0],[65.0,50.0],[70.0,42.0],[79.0,35.5],[91.5,32.0],[112.5,35.5],[121.5,42.0],[126.0,48.0],[127.5,54.0],[125.5,71.0]],"fit":1.694}],"fit":2.443},"rockets":{"stages":[{"file":"t_rockets_1.webp","cell":192,"ax":96.0,"ay":167.9,"ppu":94.864,"tips":[[120.4,122.5],[113.2,128.9],[91.0,133.2],[78.1,128.9],[70.9,122.5],[58.0,93.1],[57.3,81.6],[57.3,81.6],[63.8,71.6],[74.5,63.7],[103.2,58.7],[117.5,63.7],[127.5,71.6],[134.0,81.6],[133.3,81.6],[133.3,93.1]],"fit":2.515},{"file":"t_rockets_2.webp","cell":192,"ax":96.0,"ay":163.5,"ppu":83.63,"tips":[[118.7,119.1],[113.1,124.1],[94.7,129.2],[78.3,124.1],[73.9,120.3],[59.4,92.5],[58.1,81.2],[58.7,80.5],[68.2,65.4],[77.1,58.4],[89.1,54.6],[114.3,58.4],[122.5,65.4],[132.6,80.5],[132.6,81.2],[132.6,92.5]],"fit":1.862},{"file":"t_rockets_3.webp","cell":192,"ax":96.0,"ay":167.9,"ppu":70.231,"tips":[[116.7,125.8],[111.4,131.1],[93.3,135.3],[81.1,131.6],[74.8,125.8],[62.1,99.8],[63.6,89.7],[62.1,96.6],[65.2,87.0],[74.8,75.9],[84.3,71.1],[116.7,75.9],[123.6,82.8],[129.9,96.6],[127.8,89.7],[129.4,99.8]],"fit":2.12},{"file":"t_rockets_4.webp","cell":192,"ax":96.0,"ay":164.2,"ppu":66.207,"tips":[[116.5,123.0],[110.5,128.5],[91.0,132.0],[81.0,128.5],[75.0,123.0],[61.0,98.0],[62.5,87.5],[61.0,93.5],[70.5,76.0],[76.5,69.5],[85.0,65.0],[115.0,69.5],[121.0,76.0],[130.5,93.5],[129.0,87.5],[130.5,98.0]],"fit":1.505},{"file":"t_rockets_5.webp","cell":192,"ax":96.0,"ay":159.7,"ppu":66.207,"tips":[[118.0,114.0],[112.0,120.0],[95.0,124.5],[79.5,120.0],[74.5,115.5],[58.0,85.5],[61.5,82.5],[58.0,87.5],[60.5,76.5],[71.0,61.0],[80.0,55.0],[120.5,61.5],[128.0,73.0],[133.5,87.5],[130.0,74.5],[133.5,85.5]],"fit":1.59}],"fit":2.515},"fan":{"stages":[{"file":"t_fan_1.webp","cell":192,"ax":96.0,"ay":167.8,"ppu":96.301,"tips":[[111.3,93.4],[96.7,111.5],[93.8,111.5],[93.8,110.8],[80.0,93.4],[80.7,85.4],[82.9,75.9],[79.3,76.6],[79.3,65.0],[84.4,57.0],[91.6,53.4],[108.4,57.7],[112.7,65.7],[112.0,76.6],[108.4,75.9],[111.3,83.2]],"fit":2.515},{"file":"t_fan_2.webp","cell":192,"ax":96.0,"ay":162.8,"ppu":83.63,"tips":[[113.7,87.4],[96.6,108.3],[94.1,108.3],[94.7,108.3],[79.6,89.9],[82.1,84.9],[84.6,75.4],[81.5,71.0],[78.9,64.7],[84.6,55.8],[92.8,52.1],[108.0,56.5],[111.8,64.1],[110.5,72.9],[106.7,74.8],[109.3,84.9]],"fit":1.862},{"file":"t_fan_3.webp","cell":192,"ax":96.0,"ay":167.9,"ppu":70.231,"tips":[[109.8,101.9],[96.5,117.3],[95.5,117.8],[94.9,117.3],[81.7,101.9],[83.8,97.1],[86.5,87.0],[82.7,83.9],[80.6,77.0],[84.3,69.5],[95.5,65.3],[107.1,69.5],[109.8,75.9],[108.2,82.3],[105.0,87.0],[109.8,90.2]],"fit":2.12},{"file":"t_fan_4.webp","cell":192,"ax":96.0,"ay":164.7,"ppu":66.207,"tips":[[118.5,93.5],[98.5,114.0],[94.5,115.0],[93.0,114.0],[73.0,93.5],[79.5,88.0],[87.0,84.5],[79.5,85.0],[73.5,79.0],[93.0,58.5],[95.5,58.0],[99.0,58.5],[118.5,79.0],[112.0,84.5],[104.5,85.0],[112.0,88.0]],"fit":1.505},{"file":"t_fan_5.webp","cell":192,"ax":96.0,"ay":159.7,"ppu":66.207,"tips":[[120.5,82.5],[98.5,105.0],[95.5,106.0],[93.0,104.5],[71.0,82.5],[78.0,76.0],[87.0,73.0],[78.5,73.0],[71.5,67.0],[92.5,44.0],[95.5,44.5],[99.0,44.0],[120.0,67.0],[113.0,73.5],[104.5,73.0],[113.5,76.0]],"fit":1.59}],"fit":2.515},"lens":{"stages":[{"file":"t_lens_1.webp","cell":192,"ax":96.0,"ay":167.8,"ppu":100.887,"tips":[[112.0,98.1],[105.1,104.2],[90.7,105.8],[84.6,103.5],[79.2,98.1],[57.9,63.9],[56.4,53.2],[57.9,47.9],[64.8,37.2],[76.2,29.6],[91.4,25.8],[116.6,30.3],[127.2,38.0],[133.3,47.1],[134.9,52.4],[133.3,63.9]],"fit":3.2},{"file":"t_lens_2.webp","cell":192,"ax":96.0,"ay":169.3,"ppu":88.276,"tips":[[128.7,75.7],[104.0,105.0],[90.7,106.3],[85.3,103.7],[64.0,77.0],[58.7,67.0],[57.3,59.7],[59.3,51.7],[66.7,41.7],[75.3,36.3],[92.7,31.7],[116.0,36.3],[124.7,41.7],[132.0,51.7],[133.3,57.0],[132.7,67.0]],"fit":3.2},{"file":"t_lens_3.webp","cell":192,"ax":96.0,"ay":174.2,"ppu":66.207,"tips":[[117.5,121.5],[90.0,137.5],[75.0,134.0],[65.0,126.0],[60.5,117.0],[60.0,105.5],[65.5,94.0],[68.0,81.5],[73.5,72.5],[80.5,68.0],[93.0,64.5],[111.0,68.0],[118.0,72.5],[123.0,79.5],[126.0,103.5],[124.0,113.5]],"fit":3.2},{"file":"t_lens_4.webp","cell":192,"ax":96.0,"ay":169.7,"ppu":66.207,"tips":[[132.5,107.5],[127.5,117.5],[75.5,126.0],[65.0,118.0],[60.0,108.5],[59.0,95.5],[65.0,85.0],[67.0,71.5],[71.5,64.0],[80.5,57.5],[92.0,54.5],[108.0,56.0],[120.0,64.0],[124.5,71.5],[126.5,85.0],[132.5,95.5]],"fit":1.971},{"file":"t_lens_5.webp","cell":192,"ax":96.0,"ay":163.7,"ppu":66.207,"tips":[[132.0,96.5],[127.0,106.0],[75.0,114.0],[64.5,106.0],[59.5,96.5],[58.5,83.5],[63.5,60.5],[64.5,56.5],[68.5,50.0],[80.0,41.5],[92.5,38.5],[112.5,42.0],[122.5,49.5],[127.0,56.5],[128.0,60.0],[133.0,83.5]],"fit":1.59}],"fit":3.2}},"troops":{"fork":{"file":"u_fork.webp","ax":90.0,"ay":150.4,"h":147.4},"sling":{"file":"u_sling.webp","ax":90.0,"ay":150.4,"h":120.4},"giant":{"file":"u_giant.webp","ax":90.0,"ay":155.8,"h":136.8},"nurse":{"file":"u_nurse.webp","ax":90.0,"ay":163.6,"h":141.6},"digger":{"file":"u_digger.webp","ax":90.0,"ay":145.5,"h":121.5},"pot":{"file":"u_pot.webp","ax":90.0,"ay":152.0,"h":131.0},"chef":{"file":"u_chef.webp","ax":90.0,"ay":153.5,"h":123.5},"pig":{"file":"u_pig.webp","ax":90.0,"ay":155.7,"h":142.7},"bomber":{"file":"u_bomber.webp","ax":90.0,"ay":150.4,"h":110.4},"witch":{"file":"u_witch.webp","ax":90.0,"ay":155.1,"h":112.1},"dog":{"file":"u_dog.webp","ax":90.0,"ay":134.1,"h":104.1},"egret":{"file":"u_egret.webp","ax":90.0,"ay":150.9,"h":123.9},"cat_spatula":{"file":"u_cat_spatula.webp","ax":90.0,"ay":141.4,"h":107.4},"cat_pan":{"file":"u_cat_pan.webp","ax":90.0,"ay":144.1,"h":112.1},"cat_chili":{"file":"u_cat_chili.webp","ax":90.0,"ay":141.4,"h":105.4},"cat_bomb":{"file":"u_cat_bomb.webp","ax":90.0,"ay":141.4,"h":105.4},"cat_king":{"file":"u_cat_king.webp","ax":90.0,"ay":145.8,"h":125.8},"colonel":{"file":"u_colonel.webp","ax":135.0,"ay":221.9,"h":180.9,"cw":270,"ch":288},"balloon":{"file":"u_balloon.webp","ax":135.0,"ay":280.0,"h":241.0,"cw":270,"ch":288},"plane":{"file":"u_plane.webp","ax":90.0,"ay":145.2,"h":101.2},"thief":{"file":"u_thief.webp","ax":90.0,"ay":148.6,"h":104.6},"mop":{"file":"u_mop.webp","ax":90.0,"ay":142.5,"h":108.5},"prop":{"file":"u_prop.webp","ax":90.0,"ay":164.5,"h":139.5},"kite":{"file":"u_kite.webp","ax":135.0,"ay":246.2,"h":203.2,"cw":270,"ch":288},"fan":{"file":"u_fan.webp","ax":135.0,"ay":247.4,"h":193.4,"cw":270,"ch":288}},"walls":{"1":{"post":{"file":"w_1_post.webp","ax":6.0,"ay":86.5,"ppu":132.5,"w":55,"h":67},"linkx":{"file":"w_1_linkx.webp","ax":2.0,"ay":54.5,"ppu":132.5,"w":51,"h":51},"linky":{"file":"w_1_linky.webp","ax":2.0,"ay":86.5,"ppu":132.5,"w":51,"h":46}},"2":{"post":{"file":"w_2_post.webp","ax":10.0,"ay":94.5,"ppu":132.5,"w":59,"h":76},"linkx":{"file":"w_2_linkx.webp","ax":2.0,"ay":59.5,"ppu":132.5,"w":51,"h":66},"linky":{"file":"w_2_linky.webp","ax":2.0,"ay":94.5,"ppu":132.5,"w":51,"h":66}},"3":{"post":{"file":"w_3_post.webp","ax":12.0,"ay":105.5,"ppu":132.5,"w":64,"h":90},"linkx":{"file":"w_3_linkx.webp","ax":4.0,"ay":70.5,"ppu":132.5,"w":55,"h":85},"linky":{"file":"w_3_linky.webp","ax":5.0,"ay":105.5,"ppu":132.5,"w":57,"h":84}},"4":{"post":{"file":"w_4_post.webp","ax":14.0,"ay":106.5,"ppu":132.5,"w":63,"h":92},"linkx":{"file":"w_4_linkx.webp","ax":2.0,"ay":73.5,"ppu":132.5,"w":51,"h":82},"linky":{"file":"w_4_linky.webp","ax":2.0,"ay":106.5,"ppu":132.5,"w":51,"h":81}},"5":{"post":{"file":"w_5_post.webp","ax":21.0,"ay":96.5,"ppu":132.5,"w":81,"h":83},"linkx":{"file":"w_5_linkx.webp","ax":7.0,"ay":64.5,"ppu":132.5,"w":67,"h":73},"linky":{"file":"w_5_linky.webp","ax":7.0,"ay":96.5,"ppu":132.5,"w":67,"h":73}},"6":{"post":{"file":"w_6_post.webp","ax":49.0,"ay":119.5,"ppu":132.5,"w":108,"h":115},"linkx":{"file":"w_6_linkx.webp","ax":12.0,"ay":84.5,"ppu":132.5,"w":71,"h":104},"linky":{"file":"w_6_linky.webp","ax":12.0,"ay":119.5,"ppu":132.5,"w":71,"h":104}}},"troopLayout":{"cw":180,"ch":192,"dirs":8,"idle":[0,4],"walk":[4,8],"attack":[12,4],"death":[16,5]}};
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
  i = IMG[file] = new Image(); i.onload = function () { dirty = true; }; i.src = 'assets/' + file; return i;
}
function ready(i) { return i && i.complete && i.naturalWidth > 0; }

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
  error: function () { tone({ f: 220, type: 'square', vol: .08, d: .12 }); tone({ f: 180, type: 'square', vol: .08, d: .16, at: .12 }); }
};
var SFX_GAP = { quack: 90, deploy: 70, stab: 60, smash: 80, bite: 80, shot: 50, fire: 120, egg: 90, water: 60, thud: 50, wall: 80, duckdie: 150, meow: 400, dig: 250, heal: 300, hiss: 300 };
function sfx(name) {
  if (!SND.on) return; var c = audio(); if (!c || c.state !== 'running' || !SFX[name]) return;
  var t = performance.now(); if (t - (SND.last[name] || 0) < (SFX_GAP[name] || 30)) return; SND.last[name] = t;
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
  prop:    { name: 'เป็ดใบพัด',             art: 'prop',    h: 1.2,  space: 10, cost: 900,  res: 'veggie', time: 60,  hp: 260,  dmg: 32,  rate: 1.2, range: 2,   speed: 1.6,  pref: 'any',      hit: 'shot', splash: 0.8, air: true, rage: true, unlock: 7 },   // baby dragon: angrier alone
  pot:     { name: 'เป็ดหม้อ',              art: 'pot',     h: 1.25, space: 8,  cost: 450,  res: 'veggie', time: 60,  hp: 800,  dmg: 14,  rate: 2,   range: 0.6, speed: 0.65, pref: 'defense',  hit: 'smash', unlock: 7 },                      // golem-ish tank: soaks the shots
  kite:    { name: 'เป็ดว่าว',              art: 'kite',    h: 1.9,  space: 20, cost: 1800, res: 'veggie', time: 120, hp: 1200, dmg: 90,  rate: 1.5, range: 2.5, speed: 1.2,  pref: 'any',      hit: 'fire', splash: 1, air: true, unlock: 8 },   // dragon
  mop:     { name: 'เป็ดไม้ถูพื้น',          art: 'mop',     h: 1.0,  space: 8,  cost: 90,   res: 'syrup',  time: 60,  hp: 340,  dmg: 48,  rate: 1.8, range: 0.6, speed: 1.6,  pref: 'any',      hit: 'spin', spin: 1.1, unlock: 8 },          // valkyrie: spins, hits all round
  pig:     { name: 'เป็ดขี่หมู',             art: 'pig',     h: 1.2,  space: 5,  cost: 80,   res: 'syrup',  time: 45,  hp: 280,  dmg: 40,  rate: 1,   range: 0.6, speed: 2.0,  pref: 'defense',  hit: 'smash', jump: true, unlock: 8 },          // hog rider
  egret:   { name: 'นกกระยาง',              art: 'egret',   h: 1.6,  space: 25, cost: 1500, res: 'veggie', time: 150, hp: 1400, dmg: 180, rate: 2,   range: 0.7, speed: 0.9,  pref: 'any',      hit: 'stab', unlock: 9 },                       // P.E.K.K.A
  witch:   { name: 'เป็ดแม่มด',             art: 'witch',   h: 1.05, space: 12, cost: 150,  res: 'syrup',  time: 90,  hp: 160,  dmg: 25,  rate: 1.4, range: 3.5, speed: 1.3,  pref: 'any',      hit: 'magic', summon: 'duckling', unlock: 9 },   // witch: raises ducklings
  fan:     { name: 'เป็ดพัดลม',             art: 'fan',     h: 1.7,  space: 30, cost: 250,  res: 'syrup',  time: 120, hp: 2400, dmg: 6,   rate: 1,   range: 1,   speed: 1.0,  pref: 'airdef',   hit: 'shot', air: true, split: 'fanlet', unlock: 9 },   // lava hound: hunts anti-air, bursts into small fans
  dog:     { name: 'หมาดัลเมเชียน',          art: 'dog',     h: 1.45, space: 10, cost: 300,  res: 'syrup',  time: 90,  hp: 1100, dmg: 70,  rate: 1.2, range: 0.7, speed: 1.1,  pref: 'any',      hit: 'bite', unlock: 9 },                       // yeti
  // not trainable: made by other troops
  duckling: { name: 'ลูกเป็ด', art: 'fork', h: 0.55, space: 0, hp: 22, dmg: 6, rate: 1, range: 0.5, speed: 2.0, pref: 'any', hit: 'stab', hidden: true },
  fanlet:   { name: 'พัดลมจิ๋ว', art: 'fan',  h: 0.75, space: 0, hp: 45, dmg: 9, rate: 1, range: 2, speed: 2.0, pref: 'any', hit: 'shot', air: true, hidden: true }
};
Object.keys(U).forEach(function (k) { U[k].key = k; });
function uHp(k, lv) { return grow(U[k].hp, lv || 1, 1.18); }
function uDmg(k, lv) { return grow(U[k].dmg, lv || 1, 1.18); }
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

// ---------- the colonel: strolls round the duck house, stops to look about ----------
var COLONEL = null;
function colonelTick(dt) {
  var hq = D.buildings.find(function (b) { return b.k === 'hq'; }); if (!hq) return;
  var hc = { x: hq.x + 1.5, y: hq.y + 1.5 };
  if (!COLONEL) COLONEL = { side: 'hero', kind: 'colonel', x: hc.x + 2.8, y: hc.y + .4, face: 2.36, hp: 1, max: 1, wait: 1 };
  var c = COLONEL; c.moving = false;
  if (c.wait > 0) { c.wait -= dt; return; }
  if (!c.goal) {
    for (var i = 0; i < 20 && !c.goal; i++) { var a = Math.random() * 6.28, r = 2.6 + Math.random() * 2.2, g = { x: hc.x + Math.cos(a) * r, y: hc.y + Math.sin(a) * r };
      if (g.x > .5 && g.y > .5 && g.x < MAP - .5 && g.y < MAP - .5 && !insideBuilding(g.x, g.y)) c.goal = g; }
    if (!c.goal) { c.wait = 1; return; }
  }
  var dx = c.goal.x - c.x, dy = c.goal.y - c.y, d = Math.hypot(dx, dy), st = HEROES.colonel.speed * dt;
  if (d < .05) { c.goal = null; c.wait = 1.5 + Math.random() * 3; if (Math.random() < .4) c.atk = now(); return; }   // pause, sometimes a salute
  var nx = c.x + dx / d * Math.min(st, d), ny = c.y + dy / d * Math.min(st, d);
  if (insideBuilding(nx, ny)) { c.goal = null; c.wait = .5; return; }
  c.x = nx; c.y = ny; c.face = Math.atan2(dy, dx); c.moving = true; c.walk = (c.walk || 0) + st; dirty = true;
}
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
        troops: [], shots: [], fx: [], time: 180, deployed: 0, over: false, result: null, taken: { honey: 0, veggie: 0, syrup: 0 }, army: Object.assign({}, D.army), pick: null };
  var share = { honey: 0, veggie: 0, syrup: 0 }, holders = R.buildings.filter(function (b) { var d = B[b.k]; return d.kind === 'store' || d.kind === 'make' || d.kind === 'hq'; });
  holders.forEach(function (b) { var d = B[b.k]; b.loot = {};
    ['honey', 'veggie', 'syrup'].forEach(function (r) { var w = d.kind === 'hq' ? .15 : d.store === r ? 1 : d.make === r ? .25 : 0; share[r] += w; b.loot[r] = w; }); });
  holders.forEach(function (b) { ['honey', 'veggie', 'syrup'].forEach(function (r) { b.loot[r] = share[r] ? Math.round(base.loot[r] * b.loot[r] / share[r]) : 0; }); });
  R.lootTotal = base.loot;
  var hq = R.buildings.find(function (b) { return b.k === 'hq'; });
  base.cats.forEach(function (k, i) { var c = CATS[k], sp = freeSpot(hq.x + 1.5, hq.y + 1.5, 2.2 + i * .6, i); R.troops.push({ side: 'cat', kind: k, x: sp.x, y: sp.y, hp: c.hp, max: c.hp, cool: 0, home: { x: hq.x + 1.5, y: hq.y + 1.5 }, dir: 2 }); });
  R.pick = Object.keys(R.army).find(function (k) { return R.army[k] > 0; }) || null;
}

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
  var k = R.pick; if (!k || !(R.army[k] > 0) || R.over) return false;
  if (!canDeploy(x, y)) { R.redFlash = now(); sfx('error'); toast('ปล่อยทหารได้แค่นอกกำแพง และห่างอาคาร 1 ช่อง'); return false; }
  var u = U[k]; R.army[k]--; R.deployed++; R.started = true;
  R.troops.push({ side: 'duck', kind: k, x: x, y: y, hp: uHp(k), max: uHp(k), cool: 0.2, dir: 2, born: now() });
  R.fx.push({ t: 'puff', x: x, y: y, life: .5, max: .5 });
  if (!(R.army[k] > 0)) R.pick = Object.keys(R.army).find(function (q) { return R.army[q] > 0; }) || null;
  sfx('deploy'); buzz('light'); return true;
}

// ---------- path finding: Dijkstra on tiles; buildings block, walls are passable but cost a lot (troops break them) ----------
function grid() {
  var g = new Int16Array(MAP * MAP); R.buildings.forEach(function (b, i) { if (b.dead) return; var s = B[b.k].size; for (var x = b.x; x < b.x + s; x++) for (var y = b.y; y < b.y + s; y++) if (x >= 0 && y >= 0 && x < MAP && y < MAP) g[y * MAP + x] = i + 1; });
  return g;
}
function findPath(t, target, range) {
  var g = grid(), sx = clamp(Math.floor(t.x), 0, MAP - 1), sy = clamp(Math.floor(t.y), 0, MAP - 1), N = MAP * MAP;
  var cost = new Float32Array(N).fill(1e9), prev = new Int32Array(N).fill(-1), done = new Uint8Array(N), hk = [], hn = [];   // binary heap of (cost, cell)
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
      var nx = cx + [1, -1, 0, 0, 1, 1, -1, -1][d], ny = cy + [0, 0, 1, -1, 1, -1, 1, -1][d]; if (nx < 0 || ny < 0 || nx >= MAP || ny >= MAP) continue;
      var n = ny * MAP + nx, occ = g[n], step = d < 4 ? 1 : 1.414;
      if (occ) { var ob = R.buildings[occ - 1]; if (ob === target) continue; if (ob.k !== 'wall') continue; step += 6 + ob.hp / 60; }
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
  target.hp -= amount; target.hitAt = now();
  if (target.k) { // building: loot and debris
    if (target.loot) ['honey', 'veggie', 'syrup'].forEach(function (r) { var v = target.loot[r] || 0, give = Math.min(v, v * amount / target.max * 1.0001); target.loot[r] -= give; R.taken[r] += give; });
    var c = center(target); for (var i = 0; i < 3; i++) R.fx.push({ t: 'chip', x: c.x + (Math.random() - .5), y: c.y + (Math.random() - .5), z: .6, vx: (Math.random() - .5) * 3, vy: (Math.random() - .5) * 3, vz: 2 + Math.random() * 2, life: .9, max: .9, color: B[target.k].kind === 'wall' ? '#b98552' : ['#c58a52', '#f2e7c9', '#9b6b3a'][i % 3] });
  }
  if (target.hp <= 0) {
    target.hp = 0; target.dead = true; target.deadAt = now();
    if (target.k) { sfx(target.k === 'wall' ? 'wall' : 'crash'); var c2 = center(target); R.fx.push({ t: 'boom', x: c2.x, y: c2.y, life: .9, max: .9, size: B[target.k].size }); buzz(target.k === 'hq' ? 'heavy' : 'medium');
      if (target.loot) ['honey', 'veggie', 'syrup'].forEach(function (r) { R.taken[r] += target.loot[r] || 0; target.loot[r] = 0; }); }
    else { if (target.side === 'duck' && U[target.kind].split) spawnAround(target, U[target.kind].split, 6, 1.0);
      sfx(target.side === 'cat' ? 'meow' : 'duckdie'); R.fx.push({ t: 'puff', x: target.x, y: target.y, life: 1.2, max: 1.2 }); }
  }
}
function shoot(from, to, kind, dmg, splash, speed, sx, sy, sz) {
  var tx = to.k ? center(to).x : to.x, ty = to.k ? center(to).y : to.y, d = Math.hypot(tx - sx, ty - sy);
  R.shots.push({ kind: kind, x: sx, y: sy, z: sz || .8, fx: sx, fy: sy, fz: sz || .8, tx: tx, ty: ty, t: 0, dur: Math.max(.15, d / speed), target: to, dmg: dmg, splash: splash || 0, from: from, arc: kind === 'egg' ? 3 : kind === 'rock' ? .8 : .3 });
}
function troopTick(t, dt) {
  if (t.dead) return;
  t.cool -= dt; t.moving = false;
  if (t.pend && (t.pend.left -= dt) <= 0) { var pd = t.pend; t.pend = null; sfx(pd.kind === 'bite' ? 'bite' : pd.kind === 'smash' || pd.kind === 'spin' ? 'smash' : 'stab');
    if (pd.kind === 'spin') spinHit(t, pd.dmg); else damage(pd.target, pd.dmg, t); var pc = pd.target.k ? center(pd.target) : pd.target; R.fx.push({ t: 'hit', x: (pc.x + t.x) / 2, y: (pc.y + t.y) / 2, life: .3, max: .3, kind: pd.kind }); }
  if (t.side === 'cat') return catTick(t, dt);
  var u = U[t.kind];
  if (u.pref === 'heal') { // nurse: follow and heal the most hurt duck nearby
    var hurt = alive(R.troops).filter(function (o) { return o.side === 'duck' && o !== t && o.hp < o.max; }).sort(function (a, b) { return a.hp / a.max - b.hp / b.max; })[0];
    var follow = hurt || alive(R.troops).filter(function (o) { return o.side === 'duck' && o !== t; })[0];
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
  var cat = u.hit === 'blast' ? null : alive(R.troops).filter(function (o) { return o.side === 'cat' && Math.hypot(o.x - t.x, o.y - t.y) < Math.max(1.4, u.range + .6); })[0];
  if (cat) { var cd = Math.hypot(cat.x - t.x, cat.y - t.y); t.face = Math.atan2(cat.y - t.y, cat.x - t.x);
    if (cd > u.range + .45) return step(t, cat.x, cat.y, u.speed, dt); return attack(t, cat, u); }
  if (!t.target || t.target.dead) { t.target = chooseTarget(t); t.path = t.target ? findPath(t, t.target, u.range) : null; t.wall = null; }
  if (!t.target) return;
  if (t.wall && !t.wall.dead) { t.face = Math.atan2(center(t.wall).y - t.y, center(t.wall).x - t.x); return attack(t, t.wall, u); }
  if (t.wall && t.wall.dead) { t.wall = null; t.path = findPath(t, t.target, u.range); }
  if (rectDist(t.x, t.y, t.target) <= u.range + .12) { var c = center(t.target); t.face = Math.atan2(c.y - t.y, c.x - t.x); return attack(t, t.target, u); }
  if (!t.path || !t.path.length) { t.path = findPath(t, t.target, u.range); if (!t.path) { t.target = null; return; } }
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
  if (u.rage) t.rage = !R.troops.some(function (o) { return o !== t && !o.dead && o.side === 'duck' && U[o.kind].air && Math.hypot(o.x - t.x, o.y - t.y) < 4; });
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
  R.fx.push({ t: 'boom', x: t.x, y: t.y, life: .9, max: .9, size: 1.4 }); sfx('cracker'); sfx('crash');
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
  var m = Math.min(d, speed * dt); t.x += dx / d * m; t.y += dy / d * m; t.moving = true; t.face = Math.atan2(dy, dx); t.walk = (t.walk || 0) + m;
}
function attack(t, target, u) {
  if (t.cool > 0) return; t.cool = u.rate; t.atk = now();
  var dmg = t.side === 'cat' ? u.dmg : uDmg(t.kind);
  if (t.rage) dmg *= 1.5;
  if (u.hit === 'blast') { blast(t, u, dmg); return; }
  if (u.hit === 'magic') { sfx('heal'); shoot(t, target, 'magic', dmg, 0, 8, t.x, t.y, .9); return; }
  if (u.hit === 'cracker') { sfx('shot'); shoot(t, target, 'cracker', dmg, u.splash, 5, t.x, t.y, 1.9); return; }
  if (u.hit === 'shot' || u.hit === 'fire') { sfx(u.hit === 'fire' ? 'fire' : 'shot'); shoot(t, target, u.hit === 'fire' ? 'chili' : 'pebble', dmg, u.splash, 9, t.x, t.y, .7); return; }
  t.pend = { target: target, dmg: dmg, left: .23, kind: u.hit }; if (t.side === 'cat') sfx('hiss');   // the blow lands when the swing does
}
function catTick(t, dt) {
  var c = CATS[t.kind], foe = null, fd = 4.5;
  alive(R.troops).forEach(function (o) { if (o.side === 'duck' && !o.under && !U[o.kind].air) { var d = Math.hypot(o.x - t.x, o.y - t.y); if (d < fd) { fd = d; foe = o; } } });
  if (foe) { t.face = Math.atan2(foe.y - t.y, foe.x - t.x); if (fd > c.range + .45) return step(t, foe.x, foe.y, c.speed, dt); return attack(t, foe, c); }
  if (!t.stroll || Math.hypot(t.stroll.x - t.x, t.stroll.y - t.y) < .1) { t.stroll = null;
    for (var i = 0; i < 12 && !t.stroll; i++) { var g = { x: t.home.x + (Math.random() - .5) * 7, y: t.home.y + (Math.random() - .5) * 7 }; if (!inBuilding(g.x, g.y)) t.stroll = g; }
    if (!t.stroll) return; }
  var sx0 = t.x, sy0 = t.y; step(t, t.stroll.x, t.stroll.y, c.speed * .35, dt);
  if (inBuilding(t.x, t.y) && !inBuilding(sx0, sy0)) { t.x = sx0; t.y = sy0; t.stroll = null; }   // walk round buildings, not through them
}
function turretTick(b, dt) {
  var d = B[b.k]; if (d.kind !== 'defense' || b.dead) return; b.cool -= dt;
  var c = center(b), lv = b.lv, range = d.range, target = null, best = 1e9;
  alive(R.troops).forEach(function (o) { if (o.side !== 'duck' || o.under) return; var air = !!U[o.kind].air; if (air ? !d.air : !d.ground) return;
    var dd = Math.hypot(o.x - c.x, o.y - c.y); if (dd <= range && dd >= (d.minRange || 0) && dd < best) { best = dd; target = o; } });
  if (!target) return;
  var want = Math.atan2(target.y - c.y, target.x - c.x), diff = Math.atan2(Math.sin(want - b.aim), Math.cos(want - b.aim));
  b.aim += clamp(diff, -6 * dt, 6 * dt);
  if (b.cool <= 0 && Math.abs(diff) < .35) {
    b.cool = d.rate; b.fire = now(); sfx(d.shot === 'egg' ? 'egg' : d.shot === 'water' ? 'water' : 'shot');
    shoot(b, target, d.shot, grow(d.dmg, lv, 1.17), d.splash, d.shot === 'egg' ? 6 : 12, c.x + Math.cos(b.aim) * .6, c.y + Math.sin(b.aim) * .6, 1.2);
  }
}
function shotTick(s, dt) {
  s.t += dt; var k = Math.min(1, s.t / s.dur);
  if (s.target && !s.target.dead && !s.target.k) { s.tx = s.target.x; s.ty = s.target.y; }
  s.x = s.fx + (s.tx - s.fx) * k; s.y = s.fy + (s.ty - s.fy) * k; s.z = s.fz * (1 - k) + Math.sin(k * Math.PI) * s.arc;
  if (k < 1) return false;
  if (s.splash) { R.troops.concat(R.buildings).forEach(function (o) { if (o.dead) return; var ox = o.k ? center(o).x : o.x, oy = o.k ? center(o).y : o.y;
      if ((s.from.k ? !o.k && o.side === 'duck' && !o.under && (!U[o.kind].air || B[s.from.k].air) : o.k) && Math.hypot(ox - s.tx, oy - s.ty) <= s.splash) damage(o, s.dmg, s.from); });
    R.fx.push({ t: s.kind === 'cracker' ? 'boom' : 'splat', x: s.tx, y: s.ty, life: .5, max: .5, kind: s.kind, size: s.kind === 'cracker' ? 1 : s.splash }); sfx(s.kind === 'cracker' ? 'cracker' : 'splat'); }
  else if (s.target) { sfx('thud'); damage(s.target, s.dmg, s.from); R.fx.push({ t: 'hit', x: s.tx, y: s.ty, life: .25, max: .25, kind: s.kind }); }
  return true;
}
function destruction() {
  var all = R.buildings.filter(function (b) { return b.k !== 'wall'; }), dead = all.filter(function (b) { return b.dead; }).length;
  return all.length ? dead / all.length : 0;
}
function raidTick(dt) {
  if (!R || R.over) return;
  if (R.started) R.time -= dt;
  R.troops.forEach(function (t) { troopTick(t, dt); });
  R.buildings.forEach(function (b) { turretTick(b, dt); });
  R.shots = R.shots.filter(function (s) { return !shotTick(s, dt); });
  // soft separation so ducks don't stack on one spot
  var live = alive(R.troops); for (var i = 0; i < live.length; i++) for (var j = i + 1; j < live.length; j++) { var a = live[i], b = live[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy), r0 = ((U[a.kind] || CATS[a.kind] || {}).space >= 5 ? .35 : .2) + ((U[b.kind] || CATS[b.kind] || {}).space >= 5 ? .35 : .2); if (d > 0 && d < r0) { var p = (r0 - d) / 4 / d; a.x -= dx * p; a.y -= dy * p; b.x += dx * p; b.y += dy * p; } }
  var pct = destruction(), hqDead = R.buildings.some(function (b) { return b.k === 'hq' && b.dead; });
  R.stars = (pct >= .5 ? 1 : 0) + (hqDead ? 1 : 0) + (pct >= 1 ? 1 : 0); R.pct = pct;
  var ducksLeft = alive(R.troops).some(function (t) { return t.side === 'duck'; }) || Object.keys(R.army).some(function (k) { return R.army[k] > 0; });
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
// Duck War — drawing: grass field, buildings (with contact shadows baked in), turrets that turn, walls that join,
// troops from 8-direction sheets with cartoon squash & stretch, shots and effects. Depth = x + y (back to front).
var GRASS = null;
function drawGround(t) {
  var c = ctx; c.fillStyle = '#6fb84a'; c.fillRect(0, 0, view.w, view.h);
  var p = [toScreen(0, 0), toScreen(MAP, 0), toScreen(MAP, MAP), toScreen(0, MAP)];
  c.save(); c.beginPath(); c.moveTo(p[0].x, p[0].y); for (var i = 1; i < 4; i++) c.lineTo(p[i].x, p[i].y); c.closePath();
  var g = c.createLinearGradient(p[0].x, p[0].y, p[2].x, p[2].y); g.addColorStop(0, '#9fe06a'); g.addColorStop(1, '#7fcb55'); c.fillStyle = g; c.fill();
  c.clip();
  // checkerboard of soft lighter tiles (like a mown lawn)
  c.fillStyle = 'rgba(255,255,255,.06)';
  for (var x = 0; x < MAP; x++) for (var y = 0; y < MAP; y++) if ((x + y) % 2 === 0) { var a = toScreen(x, y), b = toScreen(x + 1, y), d = toScreen(x + 1, y + 1), e = toScreen(x, y + 1); c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.lineTo(d.x, d.y); c.lineTo(e.x, e.y); c.fill(); }
  c.restore();
  c.strokeStyle = 'rgba(70,120,40,.55)'; c.lineWidth = 3; c.beginPath(); c.moveTo(p[0].x, p[0].y); for (i = 1; i < 4; i++) c.lineTo(p[i].x, p[i].y); c.closePath(); c.stroke();
}
function tileDiamond(x, y, s, fill, stroke) {
  var a = toScreen(x, y), b = toScreen(x + s, y), d = toScreen(x + s, y + s), e = toScreen(x, y + s);
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(d.x, d.y); ctx.lineTo(e.x, e.y); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
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
  var ax = Math.cos(b.aim || 0) - Math.sin(b.aim || 0), ay = (Math.cos(b.aim || 0) + Math.sin(b.aim || 0)) * ISO;
  cell(dir, -ax * rec * 4, -ay * rec * 4);
  ctx.restore();
}
function drawWall(b, scene) {
  var tier = clamp(Math.ceil(b.lv * 6 / MAX_LV), 1, 6), set = ART.walls[tier] || ART.walls['1']; if (!set) return;
  var list = scene.buildings, has = function (x, y) { return list.some(function (o) { return o.k === 'wall' && !o.dead && o.x === x && o.y === y; }); };
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
function emitSmoke(x, y, z, kind, size, n) {
  for (var i = 0; i < (n || 1); i++) SMOKE.push({ x: x + (Math.random() - .5) * .3 * size, y: y + (Math.random() - .5) * .3 * size, z: z, vz: kind === 'dust' ? .5 + Math.random() * .6 : .7 + Math.random() * .4,
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
  var P = puffs();
  SMOKE = SMOKE.filter(function (p) {
    p.age += dt; if (p.age >= p.life) return false; var q = p.age / p.life;
    p.z += p.vz * dt; p.vz *= p.kind === 'dust' ? .96 : .995; p.x += (p.vx + .18) * dt; p.y += (p.vy - .18) * dt; p.vx *= .97; p.vy *= .97; p.rot += p.spin * dt;   // gentle breeze
    var sc = toScreen(p.x, p.y, p.z), r = p.size * cam.s * (.55 + q * (p.kind === 'dust' ? 1.1 : 1.6)), a = Math.min(1, p.age / .18) * (1 - q) * (1 - q);
    ctx.save(); ctx.translate(sc.x, sc.y); ctx.rotate(p.rot);
    var base = P[p.kind][p.tex], lite = P[p.kind === 'dust' ? 'dust' : 'light'][p.tex];
    ctx.globalAlpha = a * (1 - q * .7); ctx.drawImage(base, -r, -r, 2 * r, 2 * r);                     // starts dark and sooty
    if (p.kind !== 'dust') { ctx.globalAlpha = a * q * .8; ctx.drawImage(lite, -r, -r, 2 * r, 2 * r); } // turns pale as it thins out
    ctx.restore(); return true;
  });
  ctx.globalAlpha = 1;
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

// ---------- troops ----------
function drawTroop(t) {
  var u = t.side === 'cat' ? CATS[t.kind] : t.side === 'hero' ? HEROES[t.kind] : U[t.kind], a = ART.troops[u.art], L = ART.troopLayout; if (!a) return;
  if (t.under) return drawTunnel(t);
  var im = img(a.file); if (!ready(im)) return;
  var dir = ((Math.round((t.face === undefined ? Math.PI / 2 : t.face) / (Math.PI / 4)) % 8) + 8) % 8, col, n = now(), alpha = 1;
  var atkQ = t.atk ? (n - t.atk) / 520 : 9;
  if (t.dead) { var dq = (n - t.deadAt) / 1000; col = L.death[0] + Math.min(L.death[1] - 1, Math.floor(dq / .14)); alpha = dq < 1.2 ? 1 : Math.max(0, 1 - (dq - 1.2) / .6); if (alpha <= 0) return; }
  else if (atkQ < 1) col = L.attack[0] + Math.min(L.attack[1] - 1, Math.floor(atkQ * L.attack[1]));
  else if (t.moving) col = L.walk[0] + Math.floor((t.walk || 0) * 9) % L.walk[1];
  else col = L.idle[0] + Math.floor(n / 180 + (t.x * 7 | 0)) % L.idle[1];
  var p = toScreen(t.x, t.y), k = u.h * cam.s * 1.05 / a.h, sx = 1, sy = 1, ox = 0, oy = 0;
  if (!t.dead && atkQ < 1) { // wind-up stretch, then lunge and squash flat on the hit, spring back
    var hit = atkQ < .35 ? 0 : Math.sin(Math.min(1, (atkQ - .35) / .45) * Math.PI), up = atkQ < .35 ? Math.sin(atkQ / .35 * Math.PI) : 0;
    var fx = Math.cos(t.face) - Math.sin(t.face), fy = (Math.cos(t.face) + Math.sin(t.face)) * ISO, fl = Math.hypot(fx, fy) || 1;
    ox = fx / fl * hit * .3 * cam.s; oy = fy / fl * hit * .3 * cam.s; sx = 1 - .14 * up + .3 * hit; sy = 1 + .2 * up - .25 * hit;
  } else if (t.moving) { var b = Math.sin((t.walk || 0) * 9 * Math.PI / 4); sy = 1 + .06 * b; sx = 1 - .05 * b; }
  else if (!t.dead) { var br = Math.sin(n / 260 + t.x); sy = 1 + .025 * br; sx = 1 - .02 * br; }
  if (t.born && n - t.born < 400) { var bq = (n - t.born) / 400, bw = Math.exp(-5 * bq) * Math.sin(bq * 18); sx *= 1 + bw * .3; sy *= 1 - bw * .3; }
  ctx.save(); ctx.globalAlpha = alpha;
  var sh = u.air ? .14 : .32; ctx.fillStyle = u.air ? 'rgba(30,60,30,.18)' : 'rgba(30,60,30,.28)'; ctx.beginPath(); ctx.ellipse(p.x, p.y, sh * cam.s * Math.min(u.h, 1.6), sh * .5 * cam.s * Math.min(u.h, 1.6), 0, 0, 7); ctx.fill();
  ctx.translate(p.x + ox, p.y + oy); ctx.scale(sx, sy);
  var cw = a.cw || L.cw, ch = a.ch || L.ch; ctx.drawImage(im, col * cw, dir * ch, cw, ch, -a.ax * k, -a.ay * k, cw * k, ch * k);
  ctx.restore();
  if (!t.dead && t.hp < t.max) hpBar(t.x, t.y, u.h * 1.45, t.hp / t.max, t.side === 'cat' ? '#ff6b5a' : '#7be36a');
}

// ---------- shots and effects ----------
var SHOT = { rock: ['#8a7a6a', 6], pebble: ['#c9b38f', 3.5], egg: ['#fff6e0', 7], water: ['#6fd0ff', 5], chili: ['#ff3d1f', 5], cracker: ['#e8322a', 4], magic: ['#b46bff', 5] };
function drawShot(s) {
  var p = toScreen(s.x, s.y, s.z), g = toScreen(s.x, s.y), st = SHOT[s.kind] || SHOT.pebble, r = st[1] * cam.s / 40;
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(g.x, g.y, r, r * .5, 0, 0, 7); ctx.fill();
  ctx.fillStyle = st[0]; ctx.strokeStyle = 'rgba(60,40,20,.6)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill(); ctx.stroke();
  if (s.kind === 'cracker') { ctx.fillStyle = '#ffd23f'; ctx.fillRect(p.x - r * .5, p.y - r * 1.6, r, r * .6); ctx.fillStyle = 'rgba(255,220,120,' + (.5 + Math.random() * .5) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y - r * 2, r * .5, 0, 7); ctx.fill(); }   // lit fuse
  if (s.kind === 'water') { ctx.fillStyle = 'rgba(160,230,255,.5)'; ctx.beginPath(); ctx.arc(p.x - r * .3, p.y - r * .3, r * .45, 0, 7); ctx.fill(); }
}
function drawFx(f, dt) {
  f.life -= dt; var q = 1 - f.life / f.max; if (f.life <= 0) return false; var s = cam.s / 40;
  if (f.t === 'chip') { f.vz -= 9 * dt; f.x += f.vx * dt; f.y += f.vy * dt; f.z = Math.max(0, f.z + f.vz * dt); if (f.z === 0 && f.vz < 0) { f.vz *= -.45; f.vx *= .6; f.vy *= .6; }
    var p = toScreen(f.x, f.y, f.z); ctx.fillStyle = f.color; ctx.globalAlpha = Math.min(1, f.life * 3); ctx.fillRect(p.x - 2.5 * s, p.y - 2.5 * s, 5 * s, 4 * s); ctx.globalAlpha = 1; return true; }
  var c = toScreen(f.x, f.y);
  if (f.t === 'boom') { if (!f.done) { f.done = 1; var sz = f.size || 2; emitSmoke(f.x, f.y, .2, 'dust', .6 + sz * .35, 10 + sz * 3); emitSmoke(f.x, f.y, .4, 'dark', .5 + sz * .3, 4); } return false; }
  if (f.t === 'puff') { if (!f.done) { f.done = 1; emitSmoke(f.x, f.y, .1, 'dust', .55, 5); } return false; }
  if (f.t === 'hit') { ctx.strokeStyle = f.kind === 'smash' ? 'rgba(255,240,150,' + (1 - q) + ')' : 'rgba(255,255,255,' + (1 - q) + ')'; ctx.lineWidth = 3 * s;
    for (var j = 0; j < 5; j++) { var b = j * 1.26 + q; ctx.beginPath(); ctx.moveTo(c.x + Math.cos(b) * 6 * s, c.y - 14 * s + Math.sin(b) * 4 * s); ctx.lineTo(c.x + Math.cos(b) * (10 + q * 14) * s, c.y - 14 * s + Math.sin(b) * (6 + q * 9) * s); ctx.stroke(); } return true; }
  if (f.t === 'splat') { ctx.fillStyle = f.kind === 'egg' ? 'rgba(255,214,80,' + (.7 * (1 - q)) + ')' : f.kind === 'chili' ? 'rgba(255,90,30,' + (.7 * (1 - q)) + ')' : 'rgba(130,210,255,' + (.6 * (1 - q)) + ')';
    ctx.beginPath(); ctx.ellipse(c.x, c.y, (f.size || 1) * cam.s * .7 * (.5 + q), (f.size || 1) * cam.s * .35 * (.5 + q), 0, 0, 7); ctx.fill(); return true; }
  if (f.t === 'heal') { ctx.fillStyle = 'rgba(110,230,120,' + (1 - q) + ')'; ctx.font = 'bold ' + (16 * s | 0) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('+', c.x, c.y - 30 * s - q * 20 * s); return true; }
  return true;
}

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
function selectBuilding(b) {
  selected = b; var p = $('panel'); p.innerHTML = ''; if (!b) { p.classList.remove('open'); return; } var d = B[b.k];
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
  var mv = h('button', 'btn', '↔ ย้าย'); mv.onclick = function () { moving = { b: b, x: b.x, y: b.y }; p.classList.remove('open'); setMode('move'); }; row.appendChild(mv);
  if (d.kind === 'make' && b.lv > 0 && !b.up) {
    var on = b.boost && b.boost > now(), row2 = h('div', 'p-row boost'), r = d.make, fc = fillCoins(r);
    var bv = h('button', 'btn video', on ? '▶ ต่อเวลา x2 <small>⚡ ' + clock(b.boost - now()) + ' · เหลือ ' + videosLeft() + '</small>' : '▶ ดูวิดีโอ ผลิต x2 1 ชม. <small>เหลือ ' + videosLeft() + '</small>');
    bv.onclick = function () { boostWithVideo(b, function () { selectBuilding(b); }); }; row2.appendChild(bv);
    var bc = h('button', 'btn gold' + (fc ? '' : ' off'), fc ? 'เติม' + RES[r].name + 'เต็มทันที ' + costTag('coin', fc) : 'คลังเต็มแล้ว');
    bc.onclick = function () { if (fillWithCoins(r)) { selectBuilding(b); hud(); } }; row2.appendChild(bc);
    p.appendChild(row2);
  }
  if (d.kind === 'train' || d.kind === 'camp') { var a = h('button', 'btn', '🪖 กองทัพ'); a.onclick = armyMenu; row.appendChild(a); }
  p.appendChild(row); p.classList.add('open');
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
  var bar = $('confirm'); bar.hidden = !(m === 'place' || m === 'move');
  $('confirm-text').textContent = m === 'place' ? 'ลากเพื่อเลือกที่วาง ' + B[placing.k].name : m === 'move' ? 'ลากเพื่อย้าย ' + B[moving.b.k].name : '';
  dirty = true;
}
function confirmPlace() {
  if (placing) { var b = placeBuilding(placing.k, placing.x, placing.y); if (!b) return; if (B[placing.k].wall && count('wall') < maxCount('wall', hqLv())) { placing.x += 1; setMode('place'); hud(); return; } placing = null; selectBuilding(b); }
  if (moving) { if (!moveBuilding(moving.b, moving.x, moving.y)) { toast('วางตรงนี้ไม่ได้'); return; } moving = null; }
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
  if (!armyUsed()) { toast('ยังไม่มีทหาร ไปฝึกที่ลานฝึกเป็ดก่อน'); armyMenu(); return; }
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
function enterRaid(n) { startRaid(n); screen = 'raid'; sfx('horn'); selectBuilding(null); centerCamera(); raidBar(); hud(); dirty = true; }
function raidBar() {
  var bar = $('troops'); bar.innerHTML = '';
  Object.keys(R.army).forEach(function (k) {
    if (!(R.army[k] > 0) && R.pick !== k) return;
    var c = h('button', 'tcard' + (R.pick === k ? ' on' : '') + (R.army[k] > 0 ? '' : ' off'), '<span class="cnt">x' + (R.army[k] || 0) + '</span><span class="portrait" style="background-image:url(assets/p_' + U[k].art + '.webp)"></span><small>' + U[k].name + '</small>');
    c.onclick = function () { if (R.army[k] > 0) { R.pick = k; raidBar(); } }; bar.appendChild(c);
  });
}
function raidHud() {
  if (!R) return; var s = $('raid-top');
  s.innerHTML = '<span class="stars">' + '★★★'.slice(0, R.stars || 0) + '<em>' + '★★★'.slice(R.stars || 0) + '</em></span><b>' + Math.floor((R.pct || 0) * 100) + '%</b>' +
    '<span>⏱ ' + clock(R.time * 1000) + '</span><span>' + icon('honey') + fmt(R.taken.honey) + ' ' + icon('veggie') + fmt(R.taken.veggie) + (R.lootTotal.syrup ? ' ' + icon('syrup') + fmt(R.taken.syrup) : '') + '</span>';
}
function showResult() {
  var r = R.result; sfx(r.stars ? 'win' : 'lose'); openSheet(r.stars ? 'ชนะ!' : 'แพ้แล้ว', function (body) {
    body.appendChild(h('div', 'result-stars', '★★★'.slice(0, r.stars) + '<em>' + '★★★'.slice(r.stars) + '</em>'));
    body.appendChild(h('p', 'result', 'ทำลาย ' + Math.floor(r.pct * 100) + '% · ได้ ' + icon('honey') + fmt(r.got.honey) + ' ' + icon('veggie') + fmt(r.got.veggie) + (r.got.syrup ? ' ' + icon('syrup') + fmt(r.got.syrup) : '') + (r.coins ? ' ' + icon('coin') + r.coins : '')));
    var b = h('button', 'btn green big', 'กลับบ้าน'); b.onclick = goHome; body.appendChild(b);
  });
}
function goHome() { closeSheet(); screen = 'home'; R = null; SMOKE = []; centerCamera(0, hqCenter()); hud(); dirty = true; }

// ---------- sound settings ----------
function soundMenu() {
  openSheet('เสียง', function (body) {
    var row = h('div', 'p-row sound-row');
    var a = h('button', 'btn ' + (SND.on ? 'green' : ''), (SND.on ? '🔊' : '🔇') + ' เสียงเอฟเฟกต์ ' + (SND.on ? 'เปิด' : 'ปิด')); a.onclick = function () { setSound(!SND.on); soundMenu(); sfx('quack'); };
    var m = h('button', 'btn ' + (SND.music ? 'green' : ''), '🎵 เพลง ' + (SND.music ? 'เปิด' : 'ปิด')); m.onclick = function () { setMusic(!SND.music); soundMenu(); };
    row.appendChild(a); row.appendChild(m); body.appendChild(row);
  });
  $('btn-sound').textContent = SND.on || SND.music ? '🔊' : '🔇';
}
document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('button')) sfx('tap'); }, true);

// ---- src/07-main.js ----
// Duck War — start-up, the main loop, and what taps do on each screen.
var last = 0;
function scene() { return screen === 'raid' ? R : D; }
function buildingAt(w, list) {
  var hit = null; list.forEach(function (b) { var s = B[b.k].size; if (w.x >= b.x && w.x < b.x + s && w.y >= b.y && w.y < b.y + s) hit = b; }); return hit;
}
input.tap = function (w) {
  if (screen === 'home') {
    if (placing || moving) { var o = placing || moving, s = B[placing ? placing.k : moving.b.k].size; o.x = Math.round(w.x - s / 2); o.y = Math.round(w.y - s / 2); dirty = true; return; }
    if (COLONEL && Math.hypot(w.x - COLONEL.x, w.y - COLONEL.y) < 1.3) { // tap the colonel: he salutes and says something
      COLONEL.atk = now(); COLONEL.wait = 2; COLONEL.goal = null; sfx('colonel'); buzz('light'); toast('🎖 ผู้พันเป็ด: ' + COLONEL_LINES[Math.floor(Math.random() * COLONEL_LINES.length)]); return; }
    var b = buildingAt(w, D.buildings); selectBuilding(b); if (b) { b.pop = now() - 450; sfx('tap'); buzz('light'); } dirty = true;
  } else if (screen === 'raid' && R && !R.over) { if (deploy(w.x, w.y)) raidBar(); }
};
input.press = function (w) {
  if (screen === 'home' && (placing || moving)) { var o = placing || moving, s = B[placing ? placing.k : moving.b.k].size; return w.x >= o.x - .5 && w.x <= o.x + s + .5 && w.y >= o.y - .5 && w.y <= o.y + s + .5; }
  if (screen === 'raid' && R && !R.over && R.pick) { stream = { x: w.x, y: w.y, next: now() + 350 }; return true; }
  return false;
};
var stream = null;
input.drag = function (w) {
  if (screen === 'home' && (placing || moving)) { var o = placing || moving, s = B[placing ? placing.k : moving.b.k].size; o.x = Math.round(w.x - s / 2); o.y = Math.round(w.y - s / 2); dirty = true; }
  if (stream) { stream.x = w.x; stream.y = w.y; }
};
input.release = function () { stream = null; };

function frame(t) {
  var dt = Math.min(.05, (t - last) / 1000 || 0); last = t;
  if (screen === 'home') { colonelTick(dt); homeTick(); if (Math.floor(t / 1000) !== Math.floor((t - dt * 1000) / 1000)) { hud(); if (selected) selectBuilding(selected); writeSave(); } }
  if (screen === 'raid' && R) {
    raidTick(dt); raidHud();
    if (stream && now() > stream.next && R.army[R.pick] > 0) { stream.next = now() + 110; if (deploy(stream.x + (Math.random() - .5) * .4, stream.y + (Math.random() - .5) * .4)) raidBar(); }
  }
  draw(dt);
  requestAnimationFrame(frame);
}
function draw(dt) {
  FDT = dt || 0; ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0); ctx.imageSmoothingQuality = 'high';
  drawGround();
  var sc = scene(), list = [];
  if (screen === 'raid' && R && !R.over && R.pick) { // red zone where ducks can't land
    var flash = R.redFlash && now() - R.redFlash < 700;
    var red = flash ? 'rgba(255,60,60,.24)' : 'rgba(255,80,80,.12)', enc = enclosed();
    for (var ty = 0; ty < MAP; ty++) for (var tx = 0; tx < MAP; tx++) if (enc[ty * MAP + tx]) tileDiamond(tx, ty, 1, red, null);   // inside the walls
    sc.buildings.forEach(function (b) { if (!b.dead && b.k !== 'wall' && !enc[(b.y - 1) * MAP + (b.x - 1)]) tileDiamond(b.x - 1, b.y - 1, B[b.k].size + 2, red, null); });
  }
  if (screen === 'home' && selected) tileDiamond(selected.x, selected.y, B[selected.k].size, 'rgba(255,255,255,.18)', 'rgba(255,255,255,.75)');
  var ghost = placing || moving;
  if (screen === 'home' && ghost) { var gk = placing ? placing.k : moving.b.k, ok = footprintFree(gk, ghost.x, ghost.y, moving && moving.b.id);
    tileDiamond(ghost.x, ghost.y, B[gk].size, ok ? 'rgba(120,255,140,.35)' : 'rgba(255,80,80,.35)', ok ? '#5fe07a' : '#ff5a5a'); }
  // rubble lies flat on the ground: drawn first and faded, so ducks walk over it instead of under it
  sc.buildings.forEach(function (b) { if (b.dead && b.k !== 'wall') { ctx.globalAlpha = .62; drawBuilding(b, sc); ctx.globalAlpha = 1; } });
  sc.buildings.forEach(function (b) { if (b.dead || (moving && moving.b === b)) return; var s = B[b.k].size; list.push({ d: b.x + b.y + s, f: function () { drawBuilding(b, sc); } }); });
  if (ghost && screen === 'home') { var k2 = placing ? placing.k : moving.b.k, gb = { id: -1, k: k2, x: ghost.x, y: ghost.y, lv: placing ? 1 : moving.b.lv, aim: 2.36 }; list.push({ d: ghost.x + ghost.y + B[k2].size, f: function () { ctx.globalAlpha = .8; drawBuilding(gb, sc); ctx.globalAlpha = 1; } }); }
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
}
function boot() {
  D = migrateSave(loadSave() || newGame()); if (TEST && !D.testCoins) { D.res.coin = Math.max(D.res.coin, 1000000); D.testCoins = 1; }   // test builds: 1M duck coins for trying upgrades
  fit(); centerCamera(0, hqCenter()); homeTick(); hud();
  $('btn-build').onclick = buildMenu; $('btn-army').onclick = armyMenu; $('btn-attack').onclick = attackMenu;
  $('btn-ok').onclick = confirmPlace; $('btn-no').onclick = cancelPlace;
  $('btn-end').onclick = function () { if (R && !R.over) endRaid(); };
  $('btn-sound').onclick = soundMenu; $('btn-sound').textContent = SND.on || SND.music ? '🔊' : '🔇';
  window.duckBack = function () { if ($('sheet').classList.contains('open')) closeSheet(); else if (placing || moving) cancelPlace(); else if (selected) selectBuilding(null); };
  window.duckPause = writeSave;
  document.addEventListener('visibilitychange', function () { if (document.hidden) writeSave(); });
  window.duckReady = true;
  requestAnimationFrame(frame);
}
window.addEventListener('error', function (e) { window.duckError = String(e.message || e); });
boot();

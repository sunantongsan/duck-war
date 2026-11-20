"use strict";
var ART={"buildings":{"hq":{"stages":[{"file":"b_hq_1.webp","ax":353.0,"ay":237.4,"ppu":120.084,"w":706,"h":511},{"file":"b_hq_2.webp","ax":353.0,"ay":237.4,"ppu":120.084,"w":706,"h":511},{"file":"b_hq_3.webp","ax":353.0,"ay":325.4,"ppu":120.084,"w":706,"h":599},{"file":"b_hq_4.webp","ax":353.0,"ay":335.4,"ppu":120.084,"w":706,"h":609},{"file":"b_hq_5.webp","ax":353.0,"ay":401.4,"ppu":120.084,"w":706,"h":675}],"rubble":{"file":"b_hq_rubble.webp","ax":353.0,"ay":237.4,"ppu":120.084,"w":706,"h":511}},"barracks":{"stages":[{"file":"b_barracks_1.webp","ax":142.0,"ay":147.4,"ppu":72.199,"w":284,"h":258},{"file":"b_barracks_2.webp","ax":142.0,"ay":215.4,"ppu":72.199,"w":284,"h":326},{"file":"b_barracks_3.webp","ax":142.0,"ay":229.4,"ppu":72.199,"w":284,"h":340},{"file":"b_barracks_4.webp","ax":142.0,"ay":242.4,"ppu":72.199,"w":284,"h":353},{"file":"b_barracks_5.webp","ax":142.0,"ay":255.4,"ppu":72.199,"w":303,"h":366}],"rubble":{"file":"b_barracks_rubble.webp","ax":142.0,"ay":142.4,"ppu":72.199,"w":284,"h":253}},"workshop":{"stages":[{"file":"b_workshop_1.webp","ax":142.0,"ay":189.4,"ppu":72.199,"w":284,"h":300},{"file":"b_workshop_2.webp","ax":142.0,"ay":205.4,"ppu":72.199,"w":284,"h":316},{"file":"b_workshop_3.webp","ax":142.0,"ay":229.4,"ppu":72.199,"w":284,"h":340},{"file":"b_workshop_4.webp","ax":142.0,"ay":233.4,"ppu":72.199,"w":284,"h":344},{"file":"b_workshop_5.webp","ax":142.0,"ay":244.4,"ppu":72.199,"w":284,"h":355}],"rubble":{"file":"b_workshop_rubble.webp","ax":142.0,"ay":150.4,"ppu":72.199,"w":284,"h":261}},"honeypump":{"stages":[{"file":"b_honeypump_1.webp","ax":99.0,"ay":128.4,"ppu":50.242,"w":198,"h":205},{"file":"b_honeypump_2.webp","ax":99.0,"ay":135.4,"ppu":50.242,"w":198,"h":212},{"file":"b_honeypump_3.webp","ax":99.0,"ay":153.4,"ppu":50.242,"w":198,"h":230},{"file":"b_honeypump_4.webp","ax":99.0,"ay":190.4,"ppu":50.242,"w":198,"h":267},{"file":"b_honeypump_5.webp","ax":99.0,"ay":190.4,"ppu":50.242,"w":247,"h":267}],"rubble":{"file":"b_honeypump_rubble.webp","ax":101.0,"ay":145.4,"ppu":50.242,"w":200,"h":222}},"veggieblender":{"stages":[{"file":"b_veggieblender_1.webp","ax":100.0,"ay":150.4,"ppu":50.986,"w":200,"h":228},{"file":"b_veggieblender_2.webp","ax":100.0,"ay":155.4,"ppu":50.986,"w":200,"h":233},{"file":"b_veggieblender_3.webp","ax":113.0,"ay":175.4,"ppu":50.986,"w":213,"h":253},{"file":"b_veggieblender_4.webp","ax":113.0,"ay":180.4,"ppu":50.986,"w":214,"h":258},{"file":"b_veggieblender_5.webp","ax":113.0,"ay":201.4,"ppu":50.986,"w":265,"h":279}],"rubble":{"file":"b_veggieblender_rubble.webp","ax":100.0,"ay":142.4,"ppu":50.986,"w":200,"h":220}},"syrupstove":{"stages":[{"file":"b_syrupstove_1.webp","ax":82.0,"ay":131.4,"ppu":41.379,"w":164,"h":194},{"file":"b_syrupstove_2.webp","ax":111.0,"ay":136.4,"ppu":41.379,"w":193,"h":199},{"file":"b_syrupstove_3.webp","ax":111.0,"ay":153.4,"ppu":41.379,"w":193,"h":216},{"file":"b_syrupstove_4.webp","ax":111.0,"ay":163.4,"ppu":41.379,"w":198,"h":226},{"file":"b_syrupstove_5.webp","ax":111.0,"ay":192.4,"ppu":41.379,"w":264,"h":255}],"rubble":{"file":"b_syrupstove_rubble.webp","ax":94.0,"ay":145.4,"ppu":41.379,"w":187,"h":208}},"honeyjar":{"stages":[{"file":"b_honeyjar_1.webp","ax":85.0,"ay":136.4,"ppu":43.171,"w":170,"h":203},{"file":"b_honeyjar_2.webp","ax":85.0,"ay":153.4,"ppu":43.171,"w":170,"h":220},{"file":"b_honeyjar_3.webp","ax":85.0,"ay":170.4,"ppu":43.171,"w":170,"h":237},{"file":"b_honeyjar_4.webp","ax":93.0,"ay":188.4,"ppu":43.171,"w":186,"h":255},{"file":"b_honeyjar_5.webp","ax":99.0,"ay":205.4,"ppu":43.171,"w":266,"h":272}],"rubble":{"file":"b_honeyjar_rubble.webp","ax":94.0,"ay":147.4,"ppu":43.171,"w":187,"h":214}},"veggiejar":{"stages":[{"file":"b_veggiejar_1.webp","ax":85.0,"ay":136.4,"ppu":43.171,"w":170,"h":203},{"file":"b_veggiejar_2.webp","ax":85.0,"ay":153.4,"ppu":43.171,"w":170,"h":220},{"file":"b_veggiejar_3.webp","ax":85.0,"ay":170.4,"ppu":43.171,"w":170,"h":237},{"file":"b_veggiejar_4.webp","ax":93.0,"ay":188.4,"ppu":43.171,"w":186,"h":255},{"file":"b_veggiejar_5.webp","ax":99.0,"ay":205.4,"ppu":43.171,"w":266,"h":272}],"rubble":{"file":"b_veggiejar_rubble.webp","ax":94.0,"ay":147.4,"ppu":43.171,"w":187,"h":214}},"syrupjar":{"stages":[{"file":"b_syrupjar_1.webp","ax":85.0,"ay":136.4,"ppu":43.171,"w":170,"h":203},{"file":"b_syrupjar_2.webp","ax":85.0,"ay":153.4,"ppu":43.171,"w":170,"h":220},{"file":"b_syrupjar_3.webp","ax":85.0,"ay":170.4,"ppu":43.171,"w":170,"h":237},{"file":"b_syrupjar_4.webp","ax":93.0,"ay":188.4,"ppu":43.171,"w":186,"h":255},{"file":"b_syrupjar_5.webp","ax":99.0,"ay":205.4,"ppu":43.171,"w":266,"h":272}],"rubble":{"file":"b_syrupjar_rubble.webp","ax":94.0,"ay":147.4,"ppu":43.171,"w":187,"h":214}},"camp":{"stages":[{"file":"b_camp_1.webp","ax":121.0,"ay":215.3,"ppu":41.346,"w":242,"h":309},{"file":"b_camp_2.webp","ax":121.0,"ay":219.3,"ppu":41.346,"w":320,"h":313},{"file":"b_camp_3.webp","ax":208.0,"ay":223.3,"ppu":41.346,"w":411,"h":317},{"file":"b_camp_4.webp","ax":211.0,"ay":263.3,"ppu":41.346,"w":418,"h":381},{"file":"b_camp_5.webp","ax":215.0,"ay":275.3,"ppu":41.346,"w":425,"h":396}],"rubble":{"file":"b_camp_rubble.webp","ax":121.0,"ay":147.3,"ppu":41.346,"w":242,"h":241}},"airfield":{"stages":[{"file":"b_airfield_1.webp","ax":117.5,"ay":255.2,"ppu":59.918,"w":235,"h":347},{"file":"b_airfield_2.webp","ax":117.5,"ay":290.2,"ppu":59.918,"w":235,"h":382},{"file":"b_airfield_3.webp","ax":117.5,"ay":324.2,"ppu":59.918,"w":235,"h":416},{"file":"b_airfield_4.webp","ax":117.5,"ay":351.2,"ppu":59.918,"w":236,"h":443},{"file":"b_airfield_5.webp","ax":117.5,"ay":377.2,"ppu":59.918,"w":246,"h":469}],"rubble":{"file":"b_airfield_rubble.webp","ax":117.5,"ay":169.2,"ppu":59.918,"w":235,"h":261}},"lab":{"stages":[{"file":"b_lab_1.webp","ax":93.0,"ay":122.4,"ppu":47.637,"w":186,"h":195},{"file":"b_lab_2.webp","ax":99.0,"ay":208.4,"ppu":47.637,"w":215,"h":281},{"file":"b_lab_3.webp","ax":99.0,"ay":217.4,"ppu":47.637,"w":215,"h":290},{"file":"b_lab_4.webp","ax":112.0,"ay":230.4,"ppu":47.637,"w":228,"h":303},{"file":"b_lab_5.webp","ax":112.0,"ay":226.4,"ppu":47.637,"w":264,"h":299}],"rubble":{"file":"b_lab_rubble.webp","ax":94.0,"ay":143.4,"ppu":47.637,"w":187,"h":216}},"pantry":{"stages":[{"file":"b_pantry_1.webp","ax":138.0,"ay":160.4,"ppu":69.966,"w":276,"h":267},{"file":"b_pantry_2.webp","ax":138.0,"ay":221.4,"ppu":69.966,"w":276,"h":328},{"file":"b_pantry_3.webp","ax":138.0,"ay":234.4,"ppu":69.966,"w":276,"h":341},{"file":"b_pantry_4.webp","ax":138.0,"ay":254.4,"ppu":69.966,"w":276,"h":361},{"file":"b_pantry_5.webp","ax":138.0,"ay":270.4,"ppu":69.966,"w":290,"h":377}],"rubble":{"file":"b_pantry_rubble.webp","ax":138.0,"ay":147.4,"ppu":69.966,"w":276,"h":254}},"hero":{"stages":[{"file":"b_hero_1.webp","ax":142.0,"ay":136.6,"ppu":72.199,"w":284,"h":247},{"file":"b_hero_2.webp","ax":142.0,"ay":144.6,"ppu":72.199,"w":284,"h":255},{"file":"b_hero_3.webp","ax":142.0,"ay":235.6,"ppu":72.199,"w":284,"h":346},{"file":"b_hero_4.webp","ax":142.0,"ay":243.6,"ppu":72.199,"w":284,"h":354},{"file":"b_hero_5.webp","ax":142.0,"ay":302.6,"ppu":72.199,"w":313,"h":413}],"rubble":{"file":"b_hero_rubble.webp","ax":142.0,"ay":161.6,"ppu":72.199,"w":284,"h":272}}},"turrets":{"slingshot":{"stages":[{"file":"t_slingshot_1.webp","cell":192,"ax":95.3,"ay":127.8,"ppu":100.488,"tips":[[109.7,88.8],[102.9,93.3],[93.0,94.1],[86.2,92.6],[80.1,88.8],[76.3,83.5],[71.8,13.7],[62.7,47.8],[58.9,37.2],[59.6,26.6],[121.9,16.7],[129.5,26.6],[131.0,37.2],[127.2,48.6],[118.1,13.7],[113.5,83.5]]},{"file":"t_slingshot_2.webp","cell":192,"ax":96.2,"ay":130.7,"ppu":95.938,"tips":[[112.2,90.6],[105.6,94.9],[94.0,97.1],[86.1,94.9],[79.6,90.6],[76.7,86.9],[71.6,13.0],[62.9,45.6],[57.1,35.5],[57.1,23.9],[125.9,13.0],[133.2,23.2],[134.6,35.5],[128.8,45.6],[120.1,13.0],[115.8,84.8]]},{"file":"t_slingshot_3.webp","cell":192,"ax":95.8,"ay":136.0,"ppu":87.667,"tips":[[112.3,94.0],[105.1,99.3],[95.8,101.3],[85.9,99.3],[79.9,96.0],[72.0,80.1],[71.3,64.9],[62.0,49.0],[57.4,36.4],[56.1,25.8],[93.8,9.9],[134.8,25.8],[134.8,38.4],[128.9,48.3],[119.6,64.9],[119.0,80.8]]},{"file":"t_slingshot_4.webp","cell":192,"ax":96.1,"ay":142.2,"ppu":77.986,"tips":[[111.4,104.8],[106.1,107.8],[94.9,110.1],[85.5,107.8],[80.2,104.8],[73.1,91.3],[71.9,73.0],[60.7,65.4],[47.8,57.7],[51.9,35.9],[77.8,21.2],[139.7,35.9],[144.4,57.1],[131.4,67.7],[119.6,73.0],[119.1,89.5]]},{"file":"t_slingshot_5.webp","cell":192,"ax":95.8,"ay":146.0,"ppu":72.021,"tips":[[112.1,107.2],[107.2,110.4],[93.6,113.1],[83.8,110.4],[77.8,106.1],[71.8,92.5],[70.8,76.7],[59.9,68.5],[47.4,60.4],[87.6,15.8],[95.2,15.8],[103.4,16.3],[144.7,60.4],[131.1,68.5],[120.3,76.1],[119.2,92.5]]}],"fit":1.894},"boxtower":{"stages":[{"file":"t_boxtower_1.webp","cell":192,"ax":95.7,"ay":127.8,"ppu":115.561,"tips":[[110.5,48.9],[103.5,58.5],[87.8,60.2],[86.9,58.5],[79.9,48.9],[71.2,32.3],[72.1,24.4],[71.2,27.1],[73.8,20.1],[80.8,14.8],[87.8,12.2],[109.6,14.8],[116.6,20.9],[119.2,27.1],[118.3,24.4],[119.2,31.4]]},{"file":"t_boxtower_2.webp","cell":192,"ax":94.9,"ay":132.9,"ppu":106.374,"tips":[[107.8,37.0],[103.0,44.2],[88.5,46.6],[86.9,44.2],[81.3,37.0],[72.4,20.1],[73.2,12.9],[72.4,15.3],[74.8,9.6],[81.3,4.0],[88.5,1.6],[107.8,4.0],[114.2,9.6],[116.6,15.3],[115.8,12.9],[116.6,20.1]]},{"file":"t_boxtower_3.webp","cell":192,"ax":95.2,"ay":141.0,"ppu":91.781,"tips":[[118.1,30.5],[115.3,42.3],[73.1,47.8],[73.1,41.6],[73.1,32.6],[70.3,15.9],[76.5,7.6],[69.6,32.6],[66.8,25.0],[68.2,16.6],[106.3,9.7],[121.6,16.6],[123.0,25.0],[120.2,32.6],[113.3,7.6],[117.4,22.2]]},{"file":"t_boxtower_4.webp","cell":192,"ax":95.5,"ay":143.3,"ppu":87.667,"tips":[[116.1,31.1],[115.4,39.7],[74.4,45.7],[74.4,39.7],[74.4,31.1],[71.7,15.2],[77.7,7.3],[71.7,30.5],[68.4,23.8],[69.7,15.9],[106.1,9.3],[120.7,15.9],[122.0,23.2],[119.4,31.1],[112.8,7.3],[118.7,15.2]]},{"file":"t_boxtower_5.webp","cell":192,"ax":95.5,"ay":149.6,"ppu":76.347,"tips":[[117.4,40.9],[117.4,50.7],[71.9,57.1],[72.4,50.2],[73.0,40.9],[72.4,25.9],[79.9,19.6],[72.4,47.3],[68.4,40.4],[68.4,32.3],[117.4,24.8],[122.0,32.3],[122.0,40.4],[118.0,47.9],[110.5,19.6],[118.0,25.9]]}],"fit":2.161},"mortar":{"stages":[{"file":"t_mortar_1.webp","cell":192,"ax":95.6,"ay":133.7,"ppu":123.415,"tips":[[130.1,74.6],[120.8,83.9],[89.1,90.4],[69.5,83.9],[60.2,74.6],[57.4,68.0],[56.5,52.2],[56.5,52.2],[72.3,25.2],[77.9,20.5],[86.3,16.8],[112.4,20.5],[118.0,26.1],[133.8,52.2],[133.8,53.1],[133.8,65.2]]},{"file":"t_mortar_2.webp","cell":192,"ax":95.3,"ay":137.9,"ppu":114.52,"tips":[[128.2,77.8],[119.5,85.6],[95.3,92.5],[70.2,85.6],[60.7,77.0],[57.2,68.3],[56.4,56.2],[59.0,46.7],[63.3,40.6],[65.9,31.1],[109.1,23.4],[125.6,32.0],[129.0,44.1],[133.4,55.4],[133.4,57.9],[131.6,70.9]]},{"file":"t_mortar_3.webp","cell":192,"ax":95.7,"ay":142.9,"ppu":103.769,"tips":[[128.6,80.7],[119.2,90.1],[94.1,96.4],[70.6,89.3],[62.8,81.5],[59.6,75.2],[58.8,60.3],[58.8,59.6],[56.5,58.0],[54.9,45.5],[91.0,29.8],[137.2,46.2],[133.3,56.4],[131.7,59.6],[131.7,60.3],[131.7,72.9]]},{"file":"t_mortar_4.webp","cell":192,"ax":96.0,"ay":147.0,"ppu":95.219,"tips":[[127.6,87.7],[119.7,95.6],[95.3,102.8],[71.5,95.6],[63.6,87.7],[60.0,78.4],[60.0,69.8],[60.0,67.6],[48.5,76.2],[39.9,62.6],[107.5,41.7],[149.2,61.1],[142.0,75.5],[129.8,63.3],[131.2,69.8],[131.2,78.4]]},{"file":"t_mortar_5.webp","cell":192,"ax":95.7,"ay":156.0,"ppu":76.118,"tips":[[122.1,104.6],[115.3,110.9],[95.1,116.7],[76.2,111.5],[68.1,103.5],[66.4,99.4],[65.2,89.7],[66.4,84.5],[48.6,102.3],[36.5,89.1],[92.8,65.0],[153.2,88.5],[142.3,102.3],[124.4,84.5],[125.6,89.7],[123.9,101.2]]}],"fit":2.534},"watergun":{"stages":[{"file":"t_watergun_1.webp","cell":192,"ax":96.0,"ay":143.9,"ppu":101.694,"tips":[[137.5,76.8],[113.7,100.6],[89.9,105.2],[78.4,101.4],[53.8,76.8],[41.5,62.2],[37.7,43.0],[41.5,27.6],[53.8,13.8],[73.0,3.8],[96.0,0.0],[118.3,3.8],[137.5,13.8],[149.8,27.6],[153.6,43.8],[149.8,63.0]]},{"file":"t_watergun_2.webp","cell":192,"ax":95.1,"ay":146.6,"ppu":95.938,"tips":[[140.0,74.6],[113.2,100.7],[94.4,105.8],[76.3,100.7],[49.5,74.6],[38.6,58.7],[37.1,39.1],[39.3,31.2],[49.5,16.7],[66.8,5.8],[88.6,0.7],[121.9,5.8],[140.0,17.4],[150.2,31.2],[152.3,39.8],[150.9,58.0]]},{"file":"t_watergun_3.webp","cell":192,"ax":95.7,"ay":148.9,"ppu":91.123,"tips":[[144.5,70.9],[113.6,100.5],[93.6,105.3],[77.1,100.5],[46.1,70.9],[37.9,55.7],[37.9,35.8],[37.9,35.1],[46.1,20.0],[62.7,7.6],[84.0,0.7],[128.0,7.6],[143.9,19.3],[152.8,35.1],[152.8,35.8],[152.8,55.7]]},{"file":"t_watergun_4.webp","cell":192,"ax":95.2,"ay":150.6,"ppu":87.667,"tips":[[124.4,101.3],[111.1,108.6],[94.6,110.6],[78.7,108.6],[64.8,101.3],[35.0,53.6],[37.0,33.1],[35.0,39.7],[42.3,23.2],[58.2,9.3],[78.0,2.0],[131.6,9.3],[147.5,23.2],[154.8,39.7],[152.8,33.1],[154.8,53.6]]},{"file":"t_watergun_5.webp","cell":192,"ax":95.4,"ay":154.7,"ppu":78.955,"tips":[[138.9,89.4],[110.3,112.7],[94.8,114.5],[79.9,112.7],[51.3,89.4],[39.4,73.3],[36.4,53.7],[39.4,42.3],[50.7,27.4],[67.4,17.3],[91.2,11.9],[122.8,17.3],[139.5,27.4],[150.9,42.3],[153.9,53.7],[150.9,73.3]]}],"fit":2.554},"chili":{"stages":[{"file":"t_chili_1.webp","cell":192,"ax":95.1,"ay":141.8,"ppu":102.929,"tips":[[121.5,78.5],[114.5,84.7],[92.0,90.2],[75.6,85.5],[68.6,79.3],[61.6,62.2],[59.3,45.9],[60.9,40.4],[67.9,31.1],[75.6,26.4],[88.1,21.8],[112.2,25.7],[123.8,34.2],[128.5,40.4],[130.0,46.6],[126.9,65.3]]},{"file":"t_chili_2.webp","cell":192,"ax":95.6,"ay":144.8,"ppu":96.667,"tips":[[121.2,74.5],[113.9,81.8],[94.2,86.9],[76.6,81.8],[70.1,75.9],[62.0,65.0],[58.4,42.3],[59.9,37.2],[66.4,27.7],[76.6,21.2],[91.2,17.5],[113.9,21.2],[124.8,28.5],[130.7,36.5],[132.1,42.3],[129.9,60.6]]},{"file":"t_chili_3.webp","cell":192,"ax":95.5,"ay":147.7,"ppu":90.798,"tips":[[124.3,70.6],[112.6,79.5],[94.8,84.3],[77.6,79.5],[64.6,68.6],[59.8,61.7],[57.1,39.1],[58.4,34.3],[64.6,25.4],[76.9,17.1],[92.7,13.7],[113.3,17.1],[125.6,25.4],[131.8,34.3],[133.2,39.8],[131.1,59.0]]},{"file":"t_chili_4.webp","cell":192,"ax":95.6,"ay":149.5,"ppu":87.067,"tips":[[125.9,69.7],[112.1,79.6],[93.0,82.8],[76.6,78.2],[64.7,69.7],[58.2,57.9],[56.2,38.8],[57.5,33.5],[64.1,23.7],[73.3,17.1],[91.7,11.8],[116.0,16.4],[127.2,24.3],[133.1,33.5],[134.4,38.8],[131.8,60.5]]},{"file":"t_chili_5.webp","cell":192,"ax":95.8,"ay":151.2,"ppu":83.63,"tips":[[126.7,69.5],[114.7,78.3],[94.5,82.7],[76.2,78.3],[64.2,69.5],[57.3,57.5],[55.4,37.9],[56.6,32.8],[62.9,22.7],[74.3,14.5],[90.1,10.1],[116.6,14.5],[128.0,22.7],[133.7,30.3],[135.6,37.9],[133.1,59.4]]}],"fit":2.443},"rockets":{"stages":[{"file":"t_rockets_1.webp","cell":192,"ax":95.6,"ay":136.4,"ppu":117.701,"tips":[[125.8,80.0],[116.9,88.0],[89.3,93.3],[73.3,88.0],[64.4,80.0],[48.4,43.6],[47.6,29.3],[47.6,29.3],[55.6,16.9],[68.9,7.1],[104.4,0.9],[122.2,7.1],[134.7,16.9],[142.7,29.3],[141.8,29.3],[141.8,43.6]]},{"file":"t_rockets_2.webp","cell":192,"ax":95.5,"ay":141.1,"ppu":107.726,"tips":[[124.8,83.8],[117.4,90.3],[93.8,96.8],[72.7,90.3],[67.0,85.4],[48.3,49.6],[46.7,35.0],[47.5,34.2],[59.7,14.6],[71.1,5.7],[86.5,0.8],[119.1,5.7],[129.6,14.6],[142.7,34.2],[142.7,35.0],[142.7,49.6]]},{"file":"t_rockets_3.webp","cell":192,"ax":95.5,"ay":143.7,"ppu":102.102,"tips":[[125.6,82.5],[117.8,90.2],[91.6,96.4],[73.9,91.0],[64.6,82.5],[46.1,44.7],[48.4,30.1],[46.1,40.1],[50.8,26.2],[64.6,10.0],[78.5,3.1],[125.6,10.0],[135.6,20.0],[144.8,40.1],[141.7,30.1],[144.1,44.7]]},{"file":"t_rockets_4.webp","cell":192,"ax":95.6,"ay":146.6,"ppu":95.938,"tips":[[125.3,86.9],[116.6,94.9],[88.4,100.0],[73.9,94.9],[65.2,86.9],[44.9,50.7],[47.1,35.5],[44.9,44.2],[58.6,18.8],[67.3,9.4],[79.7,2.9],[123.1,9.4],[131.8,18.8],[145.6,44.2],[143.4,35.5],[145.6,50.7]]},{"file":"t_rockets_5.webp","cell":192,"ax":96.1,"ay":156.0,"ppu":76.118,"tips":[[121.4,103.5],[114.5,110.4],[94.9,115.5],[77.1,110.4],[71.4,105.2],[52.4,70.7],[56.4,67.3],[52.4,73.0],[55.3,60.4],[67.3,42.5],[77.7,35.6],[124.3,43.1],[132.9,56.3],[139.2,73.0],[135.2,58.1],[139.2,70.7]]}],"fit":2.534},"fan":{"stages":[{"file":"t_fan_1.webp","cell":192,"ax":94.9,"ay":138.8,"ppu":112.493,"tips":[[112.7,51.8],[95.7,73.1],[92.3,73.1],[92.3,72.2],[76.2,51.8],[77.0,42.5],[79.6,31.4],[75.3,32.3],[75.3,18.7],[81.3,9.3],[89.8,5.1],[109.3,10.2],[114.4,19.5],[113.5,32.3],[109.3,31.4],[112.7,39.9]]},{"file":"t_fan_2.webp","cell":192,"ax":95.5,"ay":143.1,"ppu":103.347,"tips":[[117.3,50.0],[96.3,75.7],[93.1,75.7],[93.9,75.7],[75.2,53.1],[78.3,46.8],[81.4,35.1],[77.5,29.7],[74.4,21.9],[81.4,10.9],[91.6,6.2],[110.3,11.7],[115.0,21.1],[113.4,32.0],[108.8,34.3],[111.9,46.8]]},{"file":"t_fan_3.webp","cell":192,"ax":95.8,"ay":146.8,"ppu":95.577,"tips":[[114.6,57.0],[96.6,78.0],[95.1,78.7],[94.4,78.0],[76.4,57.0],[79.2,50.5],[82.9,36.8],[77.8,32.5],[74.9,23.1],[80.0,13.0],[95.1,7.2],[111.0,13.0],[114.6,21.7],[112.5,30.3],[108.1,36.8],[114.6,41.1]]},{"file":"t_fan_4.webp","cell":192,"ax":96.0,"ay":150.8,"ppu":87.067,"tips":[[125.5,57.2],[99.2,84.2],[94.0,85.5],[92.0,84.2],[65.7,57.2],[74.3,50.0],[84.1,45.4],[74.3,46.0],[66.4,38.1],[92.0,11.2],[95.3,10.5],[99.9,11.2],[125.5,38.1],[117.0,45.4],[107.1,46.0],[117.0,50.0]]},{"file":"t_fan_5.webp","cell":192,"ax":96.1,"ay":156.0,"ppu":76.118,"tips":[[124.3,67.3],[99.0,93.1],[95.5,94.3],[92.6,92.6],[67.3,67.3],[75.4,59.8],[85.7,56.3],[76.0,56.3],[67.9,49.4],[92.1,23.0],[95.5,23.6],[99.5,23.0],[123.7,49.4],[115.6,56.9],[105.9,56.3],[116.2,59.8]]}],"fit":2.534},"lens":{"stages":[{"file":"t_lens_1.webp","cell":192,"ax":95.2,"ay":151.8,"ppu":107.272,"tips":[[112.2,77.8],[104.9,84.3],[89.5,85.9],[83.0,83.4],[77.3,77.8],[54.6,41.3],[53.0,30.0],[54.6,24.3],[61.9,13.0],[74.1,4.9],[90.3,0.8],[117.0,5.7],[128.4,13.8],[134.8,23.5],[136.5,29.2],[134.8,41.3]]},{"file":"t_lens_2.webp","cell":192,"ax":95.2,"ay":154.9,"ppu":98.924,"tips":[[131.8,50.1],[104.2,82.9],[89.2,84.4],[83.3,81.4],[59.4,51.5],[53.4,40.3],[51.9,32.1],[54.1,23.2],[62.4,12.0],[72.1,6.0],[91.5,0.7],[117.6,6.0],[127.4,12.0],[135.6,23.2],[137.1,29.1],[136.3,40.3]]},{"file":"t_lens_3.webp","cell":192,"ax":95.8,"ay":156.7,"ppu":94.161,"tips":[[126.4,81.8],[87.3,104.5],[66.0,99.6],[51.8,88.2],[45.4,75.4],[44.6,59.0],[52.5,42.7],[56.0,24.9],[63.8,12.1],[73.8,5.7],[91.6,0.7],[117.2,5.7],[127.1,12.1],[134.2,22.0],[138.5,56.2],[135.7,70.4]]},{"file":"t_lens_4.webp","cell":192,"ax":95.2,"ay":158.1,"ppu":90.475,"tips":[[145.1,73.1],[138.3,86.8],[67.2,98.4],[52.9,87.5],[46.0,74.5],[44.7,56.7],[52.9,42.4],[55.6,23.9],[61.7,13.7],[74.0,4.8],[89.8,0.7],[111.6,2.7],[128.0,13.7],[134.2,23.9],[136.9,42.4],[145.1,56.7]]},{"file":"t_lens_5.webp","cell":192,"ax":95.8,"ay":160.4,"ppu":84.463,"tips":[[141.8,74.6],[135.4,86.8],[69.0,97.0],[55.7,86.8],[49.3,74.6],[48.0,58.0],[54.4,28.7],[55.7,23.6],[60.8,15.3],[75.4,4.5],[91.4,0.6],[116.9,5.1],[129.6,14.7],[135.4,23.6],[136.7,28.1],[143.0,58.0]]}],"fit":3.2}},"troops":{"fork":{"file":"u_fork.webp","ax":90.0,"ay":150.4,"h":147.4},"sling":{"file":"u_sling.webp","ax":90.0,"ay":150.4,"h":120.4},"giant":{"file":"u_giant.webp","ax":90.0,"ay":155.8,"h":136.8},"nurse":{"file":"u_nurse.webp","ax":90.0,"ay":163.6,"h":141.6},"digger":{"file":"u_digger.webp","ax":90.0,"ay":145.5,"h":121.5},"pot":{"file":"u_pot.webp","ax":90.0,"ay":152.0,"h":131.0},"chef":{"file":"u_chef.webp","ax":90.0,"ay":153.5,"h":123.5},"pig":{"file":"u_pig.webp","ax":90.0,"ay":155.7,"h":142.7},"bomber":{"file":"u_bomber.webp","ax":90.0,"ay":150.4,"h":110.4},"witch":{"file":"u_witch.webp","ax":90.0,"ay":155.1,"h":112.1},"dog":{"file":"u_dog.webp","ax":90.0,"ay":134.1,"h":104.1},"egret":{"file":"u_egret.webp","ax":90.0,"ay":150.9,"h":123.9},"cat_spatula":{"file":"u_cat_spatula.webp","ax":90.0,"ay":141.4,"h":107.4},"cat_pan":{"file":"u_cat_pan.webp","ax":90.0,"ay":144.1,"h":112.1},"cat_chili":{"file":"u_cat_chili.webp","ax":90.0,"ay":141.4,"h":105.4},"cat_bomb":{"file":"u_cat_bomb.webp","ax":90.0,"ay":141.4,"h":105.4},"cat_king":{"file":"u_cat_king.webp","ax":90.0,"ay":145.8,"h":125.8}},"walls":{"1":{"post":{"file":"w_1_post.webp","ax":6.0,"ay":86.5,"ppu":132.5,"w":55,"h":67},"linkx":{"file":"w_1_linkx.webp","ax":2.0,"ay":54.5,"ppu":132.5,"w":51,"h":51},"linky":{"file":"w_1_linky.webp","ax":2.0,"ay":86.5,"ppu":132.5,"w":51,"h":46}},"2":{"post":{"file":"w_2_post.webp","ax":10.0,"ay":94.5,"ppu":132.5,"w":59,"h":76},"linkx":{"file":"w_2_linkx.webp","ax":2.0,"ay":59.5,"ppu":132.5,"w":51,"h":66},"linky":{"file":"w_2_linky.webp","ax":2.0,"ay":94.5,"ppu":132.5,"w":51,"h":66}},"3":{"post":{"file":"w_3_post.webp","ax":12.0,"ay":105.5,"ppu":132.5,"w":64,"h":90},"linkx":{"file":"w_3_linkx.webp","ax":4.0,"ay":70.5,"ppu":132.5,"w":55,"h":85},"linky":{"file":"w_3_linky.webp","ax":5.0,"ay":105.5,"ppu":132.5,"w":57,"h":84}},"4":{"post":{"file":"w_4_post.webp","ax":14.0,"ay":106.5,"ppu":132.5,"w":63,"h":92},"linkx":{"file":"w_4_linkx.webp","ax":2.0,"ay":73.5,"ppu":132.5,"w":51,"h":82},"linky":{"file":"w_4_linky.webp","ax":2.0,"ay":106.5,"ppu":132.5,"w":51,"h":81}},"5":{"post":{"file":"w_5_post.webp","ax":21.0,"ay":96.5,"ppu":132.5,"w":81,"h":83},"linkx":{"file":"w_5_linkx.webp","ax":7.0,"ay":64.5,"ppu":132.5,"w":67,"h":73},"linky":{"file":"w_5_linky.webp","ax":7.0,"ay":96.5,"ppu":132.5,"w":67,"h":73}},"6":{"post":{"file":"w_6_post.webp","ax":49.0,"ay":119.5,"ppu":132.5,"w":108,"h":115},"linkx":{"file":"w_6_linkx.webp","ax":12.0,"ay":84.5,"ppu":132.5,"w":71,"h":104},"linky":{"file":"w_6_linky.webp","ax":12.0,"ay":119.5,"ppu":132.5,"w":71,"h":104}}},"troopLayout":{"cw":180,"ch":192,"dirs":8,"idle":[0,4],"walk":[4,8],"attack":[12,4],"death":[16,5]}};
// ---- src/01-core.js ----
// Duck War — core: canvas, isometric camera (matches the Blender game camera: yaw 45°, elevation 48.6°),
// touch/mouse input, image loading, save data. Everything else builds on these helpers.
var $ = function (id) { return document.getElementById(id); };
var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
var now = function () { return Date.now(); };
var TEST = !!(window.DuckContent && /test/.test(window.DuckContent.label || '')) || /[?&]test/.test(location.search);
var ISO = 0.75, H = Math.SQRT1_2, ZUP = 0.661;           // sin/cos of the 48.6° camera elevation
var MAP = 24;                                            // the base is MAP x MAP tiles

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
  cam.s = scale || clamp(Math.min(view.w / (MAP * 1.0), view.h / (MAP * 0.55)), 22, 90); cam.x = cam.y = 0;
  var c = toScreen(MAP / 2, MAP / 2); cam.x += view.w / 2 - c.x; cam.y += view.h / 2 - c.y;
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
    var s = clamp(gesture.s * dist2() / gesture.pinch, 14, 140), m = gesture.mid, r = rect();
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
  cam.s = clamp(cam.s * (e.deltaY < 0 ? 1.1 : 0.9), 14, 140); var a = toScreen(w.x, w.y);
  cam.x += e.clientX - r.left - a.x; cam.y += e.clientY - r.top - a.y; dirty = true;
}, { passive: false });
function rect() { return canvas.getBoundingClientRect(); }
function dist2() { var p = Array.from(pointers.values()); return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1; }
function mid2() { var p = Array.from(pointers.values()); return { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 }; }

// ---------- haptics, toast ----------
function buzz(kind) { try { if (window.DuckHaptics) window.DuckHaptics.tap(kind || 'light'); } catch (e) {} }
function toast(text) { var t = $('toast'); t.textContent = text; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(function () { t.classList.remove('show'); }, 2200); }
function fmt(n) { n = Math.floor(n); return n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M' : n >= 1e4 ? (n / 1e3).toFixed(n >= 1e5 ? 0 : 1).replace(/\.0$/, '') + 'K' : n.toLocaleString(); }
function clock(ms) { var s = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60); return h ? h + 'ชม. ' + m + 'น.' : m ? m + 'น. ' + (s % 60) + 'ว.' : s + 'ว.'; }

// ---------- save ----------
var SAVE_KEY = 'duckwar.save.v1';
function loadSave() { try { var d = JSON.parse(localStorage.getItem(SAVE_KEY)); if (d && d.v === 1) return d; } catch (e) {} return null; }
function writeSave() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(D)); } catch (e) {} }

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
  honeyjar:      { name: 'โหลน้ำผึ้ง',         size: 2, art: 'honeyjar',      hp: 500, res: 'veggie', cost: 300, time: 10, kind: 'store', store: 'honey', cap: 1500, max: [1, 1, 2, 2, 3, 3, 4, 4] },
  veggiejar:     { name: 'โหลน้ำผัก',          size: 2, art: 'veggiejar',     hp: 500, res: 'honey', cost: 300, time: 10, kind: 'store', store: 'veggie', cap: 1500, max: [1, 1, 2, 2, 3, 3, 4, 4] },
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
var U = {
  fork:   { name: 'เป็ดส้อม',        art: 'fork',   h: 0.95, space: 1, cost: 25,  res: 'veggie', time: 5,  hp: 45,  dmg: 9,  rate: 1,   range: 0.5, speed: 1.6, pref: 'any',      hit: 'stab' },
  sling:  { name: 'เป็ดหนังสติ๊ก',    art: 'sling',  h: 0.95, space: 1, cost: 50,  res: 'veggie', time: 6,  hp: 22,  dmg: 8,  rate: 1,   range: 3.5, speed: 1.5, pref: 'any',      hit: 'shot', air: false, shootsAir: true, unlock: 2 },
  giant:  { name: 'เป็ดยักษ์กระทะ',   art: 'giant',  h: 1.35, space: 5, cost: 250, res: 'veggie', time: 30, hp: 320, dmg: 12, rate: 2,   range: 0.6, speed: 0.75, pref: 'defense', hit: 'smash', unlock: 3 },
  digger: { name: 'เป็ดขุดดิน',       art: 'digger', h: 0.95, space: 1, cost: 40,  res: 'veggie', time: 7,  hp: 30,  dmg: 12, rate: 1,   range: 0.5, speed: 2.2, pref: 'resource', hit: 'stab', unlock: 4 },
  pot:    { name: 'เป็ดหม้อ',          art: 'pot',    h: 1.1,  space: 2, cost: 100, res: 'veggie', time: 12, hp: 120, dmg: 18, rate: 1.4, range: 0.5, speed: 1.1, pref: 'wall',     hit: 'smash', wallBonus: 10, unlock: 5 },
  nurse:  { name: 'เป็ดพยาบาล',       art: 'nurse',  h: 1.0,  space: 4, cost: 500, res: 'veggie', time: 40, hp: 150, dmg: 0,  heal: 18, rate: 1, range: 2.5, speed: 1.4, pref: 'heal', hit: 'heal', unlock: 6 },
  chef:   { name: 'เป็ดเชฟพริก',       art: 'chef',   h: 1.0,  space: 4, cost: 600, res: 'veggie', time: 40, hp: 75,  dmg: 50, rate: 1.5, range: 3, speed: 1.4, pref: 'any', hit: 'fire', splash: 1, unlock: 7 },
  pig:    { name: 'เป็ดขี่หมู',        art: 'pig',    h: 1.2,  space: 5, cost: 80,  res: 'syrup',  time: 45, hp: 280, dmg: 40, rate: 1,  range: 0.6, speed: 2.0, pref: 'defense', hit: 'smash', jump: true, unlock: 8 },
  dog:    { name: 'หมาดัลเมเชียน',     art: 'dog',    h: 1.45, space: 10, cost: 300, res: 'syrup', time: 90, hp: 1100, dmg: 70, rate: 1.2, range: 0.7, speed: 1.1, pref: 'any', hit: 'bite', unlock: 9 }
};
Object.keys(U).forEach(function (k) { U[k].key = k; });
function uHp(k, lv) { return grow(U[k].hp, lv || 1, 1.18); }
function uDmg(k, lv) { return grow(U[k].dmg, lv || 1, 1.18); }
var CATS = { cat_spatula: { art: 'cat_spatula', h: 1, hp: 120, dmg: 12, rate: 1, range: 0.6, speed: 1.5, hit: 'smash' },
             cat_pan: { art: 'cat_pan', h: 1.15, hp: 260, dmg: 16, rate: 1.3, range: 0.6, speed: 1.1, hit: 'smash' },
             cat_king: { art: 'cat_king', h: 1.35, hp: 900, dmg: 40, rate: 1.4, range: 0.7, speed: 1.0, hit: 'smash' } };
var RES = { honey: { name: 'น้ำผึ้ง', color: '#ffc93a' }, veggie: { name: 'น้ำผัก', color: '#77d957' }, syrup: { name: 'ไซรัป', color: '#e3425a' }, coin: { name: 'เหรียญเป็ด', color: '#ffb000' } };

// ---- src/03-home.js ----
// Duck War — the home base: resources, building/upgrading with builder ducks, training, offline progress.
var D = null;
function newGame() {
  var d = { v: 1, res: { honey: 1200, veggie: 1200, syrup: 0, coin: TEST ? 1000000 : 250 }, buildings: [], army: {}, queue: [], builders: 2, next: 1, t: now(), raid: 1, stars: 0, name: 'ฐานเป็ด' };
  function add(k, x, y, lv) { d.buildings.push({ id: d.next++, k: k, x: x, y: y, lv: lv || 1 }); }
  add('hq', 10, 10); add('honeypump', 6, 9); add('veggieblender', 15, 10); add('honeyjar', 7, 13); add('veggiejar', 14, 14);
  add('camp', 5, 15); add('barracks', 10, 15); add('slingshot', 11, 6);
  d.army = { fork: 8 };
  return d;
}
function hqLv() { var h = D.buildings.find(function (b) { return b.k === 'hq'; }); return h ? h.lv : 1; }
function capacity(r) {
  if (r === 'coin') return Infinity;
  var c = r === 'syrup' ? 0 : B.hq.store * Math.pow(1.4, hqLv() - 1);
  D.buildings.forEach(function (b) { var d = B[b.k]; if (d.kind === 'store' && d.store === r && !(b.up && b.lv === 0)) c += d.cap * Math.pow(1.6, b.lv - 1); });
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
  var t = now(), dt = Math.max(0, Math.min(t - D.t, 30 * 864e5)) / 3600000; D.t = t;
  ['honey', 'veggie', 'syrup'].forEach(function (r) {
    var add = 0; D.buildings.forEach(function (b) { var d = B[b.k]; if (d.kind === 'make' && d.make === r && !b.up) add += rate(b) * dt; });
    D.res[r] = Math.min(capacity(r), D.res[r] + add);
  });
  D.buildings.forEach(function (b) { if (b.up && b.up.until <= t) { b.lv = b.up.to; delete b.up; b.pop = now(); toast(B[b.k].name + ' เลเวล ' + b.lv + ' เสร็จแล้ว!'); buzz('success'); dirty = true; } });
  while (D.queue.length && D.queue[0].until <= t) {
    var q = D.queue.shift(); D.army[q.k] = (D.army[q.k] || 0) + 1; dirty = true;
    if (D.queue.length) D.queue[0].until = Math.max(D.queue[0].until, t);
  }
}
function canPay(r, n) { return D.res[r] >= n; }
function pay(r, n) { if (!canPay(r, n)) { toast(RES[r].name + 'ไม่พอ'); buzz('heavy'); return false; } D.res[r] -= n; return true; }
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
  writeSave(); buzz('medium'); return true;
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
  D.queue.push({ k: k, until: start + u.time * 1000 }); writeSave(); buzz('light');
}
function finishTraining() {
  if (!D.queue.length) return; var c = coinsFor(D.queue[D.queue.length - 1].until - now());
  if (!pay('coin', c)) return; D.queue.forEach(function (q) { q.until = now(); }); homeTick(); writeSave();
}
function moveBuilding(b, x, y) { if (!footprintFree(b.k, x, y, b.id)) return false; b.x = x; b.y = y; writeSave(); return true; }

// ---- src/04-battle.js ----
// Duck War — raids on cat bases: base generator, troop AI (targets, paths around buildings, breaking walls),
// turret aiming and shots, cat guards, stars and loot. Pure simulation: rendering lives in 05-render.js.
var R = null;   // the running raid
function rng(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function catBase(n) {
  var r = rng(n * 7919 + 13), hq = Math.min(10, 1 + Math.floor((n + 1) / 2)), list = [], id = 1;
  function lv(base) { return clamp(Math.round(base + (r() - .5) * 2), 1, MAX_LV); }
  function free(k, x, y) { var s = B[k].size; if (x < 2 || y < 2 || x + s > MAP - 2 || y + s > MAP - 2) return false; return !list.some(function (b) { var t = B[b.k].size; return x < b.x + t + (b.k === 'wall' || k === 'wall' ? 0 : 0) && b.x < x + s && y < b.y + t && b.y < y + s; }); }
  function put(k, x, y, l) { if (!free(k, x, y)) return false; list.push({ id: id++, k: k, x: x, y: y, lv: l || lv(hq) }); return true; }
  function scatter(k, l, rad) { for (var i = 0; i < 60; i++) { var a = r() * 6.28, d = rad[0] + r() * (rad[1] - rad[0]); if (put(k, Math.round(11 + Math.cos(a) * d), Math.round(11 + Math.sin(a) * d), l)) return; } }
  put('hq', 11, 11, hq);
  var def = ['slingshot', 'slingshot', 'boxtower', 'slingshot', 'mortar', 'boxtower', 'watergun', 'chili', 'mortar', 'boxtower', 'slingshot'];
  var nDef = Math.min(def.length, 1 + Math.floor(n * .8));
  for (var i = 0; i < nDef; i++) scatter(def[i], lv(hq - 1), [3, 5.5]);
  ['honeyjar', 'veggiejar'].forEach(function (k) { for (var j = 0; j < Math.min(3, 1 + Math.floor(n / 3)); j++) scatter(k, lv(hq - 1), [2.5, 5]); });
  if (hq >= 5) scatter('syrupjar', lv(hq - 2), [2, 4]);
  // wall ring around the core
  if (n >= 2) { var ring = n >= 6 ? 6 : 5, wl = clamp(Math.floor(n / 3) + 1, 1, MAX_LV);
    for (var t = -ring; t <= ring; t++) [[11 + t, 11 - ring], [11 + t, 11 + ring + 1], [11 - ring, 11 + t], [11 + ring + 1, 11 + t]].forEach(function (p) { put('wall', p[0] + 1, p[1], wl); }); }
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
  base.cats.forEach(function (k, i) { var c = CATS[k]; R.troops.push({ side: 'cat', kind: k, x: hq.x + 1.5 + Math.cos(i * 2) * 2.5, y: hq.y + 1.5 + Math.sin(i * 2) * 2.5, hp: c.hp, max: c.hp, cool: 0, home: { x: hq.x + 1.5, y: hq.y + 1.5 }, dir: 2 }); });
  R.pick = Object.keys(R.army).find(function (k) { return R.army[k] > 0; }) || null;
}

function rectDist(px, py, b) { var s = B[b.k].size, dx = Math.max(b.x - px, 0, px - (b.x + s)), dy = Math.max(b.y - py, 0, py - (b.y + s)); return Math.hypot(dx, dy); }
function center(b) { var s = B[b.k].size / 2; return { x: b.x + s, y: b.y + s }; }
function alive(list) { return list.filter(function (o) { return !o.dead; }); }
function canDeploy(x, y) {
  if (x < 0.3 || y < 0.3 || x > MAP - .3 || y > MAP - .3) return false;
  return !R.buildings.some(function (b) { return !b.dead && rectDist(x, y, b) < 1; });   // red zone: one tile around every building
}
function deploy(x, y) {
  var k = R.pick; if (!k || !(R.army[k] > 0) || R.over) return false;
  if (!canDeploy(x, y)) { R.redFlash = now(); toast('วางในเขตสีแดงไม่ได้'); return false; }
  var u = U[k]; R.army[k]--; R.deployed++; R.started = true;
  R.troops.push({ side: 'duck', kind: k, x: x, y: y, hp: uHp(k), max: uHp(k), cool: 0.2, dir: 2, born: now() });
  R.fx.push({ t: 'puff', x: x, y: y, life: .5, max: .5 });
  if (!(R.army[k] > 0)) R.pick = Object.keys(R.army).find(function (q) { return R.army[q] > 0; }) || null;
  buzz('light'); return true;
}

// ---------- path finding: Dijkstra on tiles; buildings block, walls are passable but cost a lot (troops break them) ----------
function grid() {
  var g = new Int16Array(MAP * MAP); R.buildings.forEach(function (b, i) { if (b.dead) return; var s = B[b.k].size; for (var x = b.x; x < b.x + s; x++) for (var y = b.y; y < b.y + s; y++) if (x >= 0 && y >= 0 && x < MAP && y < MAP) g[y * MAP + x] = i + 1; });
  return g;
}
function findPath(t, target, range) {
  var g = grid(), sx = clamp(Math.floor(t.x), 0, MAP - 1), sy = clamp(Math.floor(t.y), 0, MAP - 1), N = MAP * MAP;
  var cost = new Float32Array(N).fill(1e9), prev = new Int32Array(N).fill(-1), done = new Uint8Array(N), open = [sy * MAP + sx]; cost[open[0]] = 0;
  var goal = -1;
  while (open.length) {
    var bi = 0; for (var i = 1; i < open.length; i++) if (cost[open[i]] < cost[open[bi]]) bi = i;
    var c = open.splice(bi, 1)[0]; if (done[c]) continue; done[c] = 1;
    var cx = c % MAP, cy = (c / MAP) | 0;
    if (rectDist(cx + .5, cy + .5, target) <= range + .45) { goal = c; break; }
    for (var d = 0; d < 8; d++) {
      var nx = cx + [1, -1, 0, 0, 1, 1, -1, -1][d], ny = cy + [0, 0, 1, -1, 1, -1, 1, -1][d]; if (nx < 0 || ny < 0 || nx >= MAP || ny >= MAP) continue;
      var n = ny * MAP + nx, occ = g[n], step = d < 4 ? 1 : 1.414;
      if (occ) { var ob = R.buildings[occ - 1]; if (ob === target) continue; if (ob.k !== 'wall') continue; step += 6 + ob.hp / 60; }
      if (d >= 4 && (g[cy * MAP + nx] && R.buildings[g[cy * MAP + nx] - 1].k !== 'wall' || g[ny * MAP + cx] && R.buildings[g[ny * MAP + cx] - 1].k !== 'wall')) continue;
      if (cost[c] + step < cost[n]) { cost[n] = cost[c] + step; prev[n] = c; open.push(n); }
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
  if (u.pref === 'wall') { var w = R.buildings.filter(function (b) { return !b.dead && b.k === 'wall'; }); if (w.length) want = w; }
  var best = null, bd = 1e9; want.forEach(function (b) { var dd = rectDist(t.x, t.y, b); if (dd < bd) { bd = dd; best = b; } });
  return best;
}
function damage(target, amount, from) {
  if (target.dead) return;
  if (from && U[from.kind] && U[from.kind].wallBonus && target.k === 'wall') amount *= U[from.kind].wallBonus;
  target.hp -= amount; target.hitAt = now();
  if (target.k) { // building: loot and debris
    if (target.loot) ['honey', 'veggie', 'syrup'].forEach(function (r) { var v = target.loot[r] || 0, give = Math.min(v, v * amount / target.max * 1.0001); target.loot[r] -= give; R.taken[r] += give; });
    var c = center(target); for (var i = 0; i < 3; i++) R.fx.push({ t: 'chip', x: c.x + (Math.random() - .5), y: c.y + (Math.random() - .5), z: .6, vx: (Math.random() - .5) * 3, vy: (Math.random() - .5) * 3, vz: 2 + Math.random() * 2, life: .9, max: .9, color: B[target.k].kind === 'wall' ? '#b98552' : ['#c58a52', '#f2e7c9', '#9b6b3a'][i % 3] });
  }
  if (target.hp <= 0) {
    target.hp = 0; target.dead = true; target.deadAt = now();
    if (target.k) { var c2 = center(target); R.fx.push({ t: 'boom', x: c2.x, y: c2.y, life: .9, max: .9, size: B[target.k].size }); buzz(target.k === 'hq' ? 'heavy' : 'medium');
      if (target.loot) ['honey', 'veggie', 'syrup'].forEach(function (r) { R.taken[r] += target.loot[r] || 0; target.loot[r] = 0; }); }
    else R.fx.push({ t: 'puff', x: target.x, y: target.y, life: 1.2, max: 1.2 });
  }
}
function shoot(from, to, kind, dmg, splash, speed, sx, sy, sz) {
  var tx = to.k ? center(to).x : to.x, ty = to.k ? center(to).y : to.y, d = Math.hypot(tx - sx, ty - sy);
  R.shots.push({ kind: kind, x: sx, y: sy, z: sz || .8, fx: sx, fy: sy, fz: sz || .8, tx: tx, ty: ty, t: 0, dur: Math.max(.15, d / speed), target: to, dmg: dmg, splash: splash || 0, from: from, arc: kind === 'egg' ? 3 : kind === 'rock' ? .8 : .3 });
}
function troopTick(t, dt) {
  if (t.dead) return;
  t.cool -= dt; t.moving = false;
  if (t.side === 'cat') return catTick(t, dt);
  var u = U[t.kind];
  if (u.pref === 'heal') { // nurse: follow and heal the most hurt duck nearby
    var hurt = alive(R.troops).filter(function (o) { return o.side === 'duck' && o !== t && o.hp < o.max; }).sort(function (a, b) { return a.hp / a.max - b.hp / b.max; })[0];
    var follow = hurt || alive(R.troops).filter(function (o) { return o.side === 'duck' && o !== t; })[0];
    if (!follow) return; var dd = Math.hypot(follow.x - t.x, follow.y - t.y);
    if (dd > u.range * .8) return step(t, follow.x, follow.y, u.speed, dt);
    if (hurt && t.cool <= 0) { t.cool = u.rate; t.atk = now(); alive(R.troops).forEach(function (o) { if (o.side === 'duck' && Math.hypot(o.x - hurt.x, o.y - hurt.y) < 1.5) o.hp = Math.min(o.max, o.hp + u.heal); }); R.fx.push({ t: 'heal', x: hurt.x, y: hurt.y, life: .6, max: .6 }); }
    return;
  }
  // fight back against a cat guard close by
  var cat = alive(R.troops).filter(function (o) { return o.side === 'cat' && Math.hypot(o.x - t.x, o.y - t.y) < Math.max(1.4, u.range + .6); })[0];
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
  if (Math.hypot(wp.x - t.x, wp.y - t.y) < .12) { t.path.shift(); return; }
  step(t, wp.x, wp.y, u.speed, dt);
}
function step(t, x, y, speed, dt) {
  var dx = x - t.x, dy = y - t.y, d = Math.hypot(dx, dy); if (d < 1e-3) return;
  var m = Math.min(d, speed * dt); t.x += dx / d * m; t.y += dy / d * m; t.moving = true; t.face = Math.atan2(dy, dx); t.walk = (t.walk || 0) + m;
}
function attack(t, target, u) {
  if (t.cool > 0) return; t.cool = u.rate; t.atk = now();
  var dmg = t.side === 'cat' ? u.dmg : uDmg(t.kind);
  if (u.hit === 'shot' || u.hit === 'fire') { shoot(t, target, u.hit === 'fire' ? 'chili' : 'pebble', dmg, u.splash, 9, t.x, t.y, .7); return; }
  setTimeout(function () { if (R && !t.dead) { damage(target, dmg, t); var c = target.k ? center(target) : target; R.fx.push({ t: 'hit', x: (c.x + t.x) / 2, y: (c.y + t.y) / 2, life: .3, max: .3, kind: u.hit }); } }, 230);
}
function catTick(t, dt) {
  var c = CATS[t.kind], foe = null, fd = 4.5;
  alive(R.troops).forEach(function (o) { if (o.side === 'duck') { var d = Math.hypot(o.x - t.x, o.y - t.y); if (d < fd) { fd = d; foe = o; } } });
  if (foe) { t.face = Math.atan2(foe.y - t.y, foe.x - t.x); if (fd > c.range + .45) return step(t, foe.x, foe.y, c.speed, dt); return attack(t, foe, c); }
  if (!t.stroll || Math.hypot(t.stroll.x - t.x, t.stroll.y - t.y) < .1) t.stroll = { x: t.home.x + (Math.random() - .5) * 5, y: t.home.y + (Math.random() - .5) * 5 };
  step(t, t.stroll.x, t.stroll.y, c.speed * .35, dt);
}
function turretTick(b, dt) {
  var d = B[b.k]; if (d.kind !== 'defense' || b.dead) return; b.cool -= dt;
  var c = center(b), lv = b.lv, range = d.range, target = null, best = 1e9;
  alive(R.troops).forEach(function (o) { if (o.side !== 'duck') return; var air = !!U[o.kind].air; if (air ? !d.air : !d.ground) return;
    var dd = Math.hypot(o.x - c.x, o.y - c.y); if (dd <= range && dd >= (d.minRange || 0) && dd < best) { best = dd; target = o; } });
  if (!target) return;
  var want = Math.atan2(target.y - c.y, target.x - c.x), diff = Math.atan2(Math.sin(want - b.aim), Math.cos(want - b.aim));
  b.aim += clamp(diff, -6 * dt, 6 * dt);
  if (b.cool <= 0 && Math.abs(diff) < .35) {
    b.cool = d.rate; b.fire = now();
    shoot(b, target, d.shot, grow(d.dmg, lv, 1.17), d.splash, d.shot === 'egg' ? 6 : 12, c.x + Math.cos(b.aim) * .6, c.y + Math.sin(b.aim) * .6, 1.2);
  }
}
function shotTick(s, dt) {
  s.t += dt; var k = Math.min(1, s.t / s.dur);
  if (s.target && !s.target.dead && !s.target.k) { s.tx = s.target.x; s.ty = s.target.y; }
  s.x = s.fx + (s.tx - s.fx) * k; s.y = s.fy + (s.ty - s.fy) * k; s.z = s.fz * (1 - k) + Math.sin(k * Math.PI) * s.arc;
  if (k < 1) return false;
  if (s.splash) { R.troops.concat(R.buildings).forEach(function (o) { if (o.dead) return; var ox = o.k ? center(o).x : o.x, oy = o.k ? center(o).y : o.y;
      if ((s.from.k ? !o.k && o.side === 'duck' : o.k) && Math.hypot(ox - s.tx, oy - s.ty) <= s.splash) damage(o, s.dmg, s.from); });
    R.fx.push({ t: 'splat', x: s.tx, y: s.ty, life: .5, max: .5, kind: s.kind, size: s.splash }); }
  else if (s.target) { damage(s.target, s.dmg, s.from); R.fx.push({ t: 'hit', x: s.tx, y: s.ty, life: .25, max: .25, kind: s.kind }); }
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
  var live = alive(R.troops); for (var i = 0; i < live.length; i++) for (var j = i + 1; j < live.length; j++) { var a = live[i], b = live[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy); if (d > 0 && d < .45) { var p = (.45 - d) / 2 / d; a.x -= dx * p; a.y -= dy * p; b.x += dx * p; b.y += dy * p; } }
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
  if (b.dead) { var art = d.turret ? null : ART.buildings[d.art].rubble; if (art) sprite(art, c.x, c.y); else drawTurret(b, c, true); return; }
  var stage = stageOf(Math.max(1, b.lv));
  if (d.turret) drawTurret(b, c, false);
  else sprite(ART.buildings[d.art].stages[stage - 1], c.x, c.y, { squash: wobble(b), alpha: b.lv === 0 ? .55 : 1 });
  if (b.up) drawScaffold(b, c);
  if (b.max && b.hp < b.max * .5) smoke(c, b);
}
function drawTurret(b, c, dead) {
  var tu = ART.turrets[B[b.k].turret], st = tu.stages[stageOf(Math.max(1, b.lv)) - 1], im = img(st.file); if (!ready(im)) return;
  var p = toScreen(c.x, c.y), k = cam.s / st.ppu * (tu.fit || 1), cs = st.cell, w = wobble(b);
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
function smoke(c, b) {
  var t = now() / 1000; for (var i = 0; i < 3; i++) { var q = (t * .6 + i / 3 + b.id * .13) % 1, p = toScreen(c.x + Math.sin(i * 2 + t) * .2, c.y, 1 + q * 2.5);
    ctx.fillStyle = 'rgba(90,90,100,' + (.35 * (1 - q)) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, (6 + q * 14) * cam.s / 40, 0, 7); ctx.fill(); }
}
function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function hpBar(x, y, z, k, color) {
  var p = toScreen(x, y, z), w = 34; ctx.fillStyle = 'rgba(20,30,40,.7)'; ctx.fillRect(p.x - w / 2 - 1, p.y - 1, w + 2, 6); ctx.fillStyle = color; ctx.fillRect(p.x - w / 2, p.y, w * k, 4);
}

// ---------- troops ----------
function drawTroop(t) {
  var u = t.side === 'cat' ? CATS[t.kind] : U[t.kind], a = ART.troops[u.art], L = ART.troopLayout; if (!a) return;
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
  ctx.fillStyle = 'rgba(30,60,30,.28)'; ctx.beginPath(); ctx.ellipse(p.x, p.y, .32 * cam.s * u.h, .16 * cam.s * u.h, 0, 0, 7); ctx.fill();
  ctx.translate(p.x + ox, p.y + oy); ctx.scale(sx, sy);
  ctx.drawImage(im, col * L.cw, dir * L.ch, L.cw, L.ch, -a.ax * k, -a.ay * k, L.cw * k, L.ch * k);
  ctx.restore();
  if (!t.dead && t.hp < t.max) hpBar(t.x, t.y, u.h * 1.45, t.hp / t.max, t.side === 'cat' ? '#ff6b5a' : '#7be36a');
}

// ---------- shots and effects ----------
var SHOT = { rock: ['#8a7a6a', 6], pebble: ['#c9b38f', 3.5], egg: ['#fff6e0', 7], water: ['#6fd0ff', 5], chili: ['#ff3d1f', 5] };
function drawShot(s) {
  var p = toScreen(s.x, s.y, s.z), g = toScreen(s.x, s.y), st = SHOT[s.kind] || SHOT.pebble, r = st[1] * cam.s / 40;
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(g.x, g.y, r, r * .5, 0, 0, 7); ctx.fill();
  ctx.fillStyle = st[0]; ctx.strokeStyle = 'rgba(60,40,20,.6)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill(); ctx.stroke();
  if (s.kind === 'water') { ctx.fillStyle = 'rgba(160,230,255,.5)'; ctx.beginPath(); ctx.arc(p.x - r * .3, p.y - r * .3, r * .45, 0, 7); ctx.fill(); }
}
function drawFx(f, dt) {
  f.life -= dt; var q = 1 - f.life / f.max; if (f.life <= 0) return false; var s = cam.s / 40;
  if (f.t === 'chip') { f.vz -= 9 * dt; f.x += f.vx * dt; f.y += f.vy * dt; f.z = Math.max(0, f.z + f.vz * dt); if (f.z === 0 && f.vz < 0) { f.vz *= -.45; f.vx *= .6; f.vy *= .6; }
    var p = toScreen(f.x, f.y, f.z); ctx.fillStyle = f.color; ctx.globalAlpha = Math.min(1, f.life * 3); ctx.fillRect(p.x - 2.5 * s, p.y - 2.5 * s, 5 * s, 4 * s); ctx.globalAlpha = 1; return true; }
  var c = toScreen(f.x, f.y);
  if (f.t === 'boom' || f.t === 'puff') { var n = f.t === 'boom' ? 7 : 4, R0 = (f.t === 'boom' ? 18 * (f.size || 2) : 12) * s;
    for (var i = 0; i < n; i++) { var a = i / n * 6.28, rr = R0 * (.3 + q * .9); ctx.fillStyle = 'rgba(' + (f.t === 'boom' ? '235,225,210' : '245,245,250') + ',' + (.8 * (1 - q)) + ')';
      ctx.beginPath(); ctx.arc(c.x + Math.cos(a) * rr, c.y + Math.sin(a) * rr * .55 - q * 20 * s, (8 + q * 10) * s, 0, 7); ctx.fill(); } return true; }
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
  var s = $('sheet'); s.innerHTML = ''; var head = h('div', 'sheet-head', '<b>' + title + '</b>'); var x = h('button', 'x', '✕'); x.onclick = closeSheet; head.appendChild(x);
  s.appendChild(head); var b = h('div', 'sheet-body'); s.appendChild(b); body(b); s.classList.add('open');
}

// ---------- HUD ----------
function hud() {
  var top = $('res'); top.innerHTML = '';
  ['honey', 'veggie', 'syrup', 'coin'].forEach(function (r) {
    if (r === 'syrup' && hqLv() < 5 && !D.res.syrup) return;
    var cap = capacity(r), pill = h('div', 'pill', icon(r) + '<b>' + fmt(D.res[r]) + '</b>' + (cap !== Infinity ? '<small>/' + fmt(cap) + '</small>' : ''));
    if (cap !== Infinity) { var bar = h('span', 'fill'); bar.style.width = Math.min(100, D.res[r] / cap * 100) + '%'; bar.style.background = RES[r].color; pill.appendChild(bar); }
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
  if (d.kind === 'store') info.push('จุ ' + icon(d.store) + ' ' + fmt(d.cap * Math.pow(1.6, b.lv - 1)));
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
      var u = U[k], locked = (u.unlock || 1) > barracksLv(), card = h('button', 'card troop' + (locked ? ' off' : ''));
      card.innerHTML = '<span class="n">' + (D.army[k] || 0) + '</span><span class="portrait p-' + u.art + '"></span><b>' + u.name + '</b>' +
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
function enterRaid(n) { startRaid(n); screen = 'raid'; selectBuilding(null); centerCamera(); raidBar(); hud(); dirty = true; }
function raidBar() {
  var bar = $('troops'); bar.innerHTML = '';
  Object.keys(R.army).forEach(function (k) {
    if (!(R.army[k] > 0) && R.pick !== k) return;
    var c = h('button', 'tcard' + (R.pick === k ? ' on' : '') + (R.army[k] > 0 ? '' : ' off'), '<span class="cnt">x' + (R.army[k] || 0) + '</span><span class="portrait p-' + U[k].art + '"></span><small>' + U[k].name + '</small>');
    c.onclick = function () { if (R.army[k] > 0) { R.pick = k; raidBar(); } }; bar.appendChild(c);
  });
}
function raidHud() {
  if (!R) return; var s = $('raid-top');
  s.innerHTML = '<span class="stars">' + '★★★'.slice(0, R.stars || 0) + '<em>' + '★★★'.slice(R.stars || 0) + '</em></span><b>' + Math.floor((R.pct || 0) * 100) + '%</b>' +
    '<span>⏱ ' + clock(R.time * 1000) + '</span><span>' + icon('honey') + fmt(R.taken.honey) + ' ' + icon('veggie') + fmt(R.taken.veggie) + (R.lootTotal.syrup ? ' ' + icon('syrup') + fmt(R.taken.syrup) : '') + '</span>';
}
function showResult() {
  var r = R.result; openSheet(r.stars ? 'ชนะ!' : 'แพ้แล้ว', function (body) {
    body.appendChild(h('div', 'result-stars', '★★★'.slice(0, r.stars) + '<em>' + '★★★'.slice(r.stars) + '</em>'));
    body.appendChild(h('p', 'result', 'ทำลาย ' + Math.floor(r.pct * 100) + '% · ได้ ' + icon('honey') + fmt(r.got.honey) + ' ' + icon('veggie') + fmt(r.got.veggie) + (r.got.syrup ? ' ' + icon('syrup') + fmt(r.got.syrup) : '') + (r.coins ? ' ' + icon('coin') + r.coins : '')));
    var b = h('button', 'btn green big', 'กลับบ้าน'); b.onclick = goHome; body.appendChild(b);
  });
}
function goHome() { closeSheet(); screen = 'home'; R = null; centerCamera(); hud(); dirty = true; }

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
    var b = buildingAt(w, D.buildings); selectBuilding(b); if (b) { b.pop = now() - 450; buzz('light'); } dirty = true;
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
  if (screen === 'home') { homeTick(); if (Math.floor(t / 1000) !== Math.floor((t - dt * 1000) / 1000)) { hud(); if (selected) selectBuilding(selected); writeSave(); } }
  if (screen === 'raid' && R) {
    raidTick(dt); raidHud();
    if (stream && now() > stream.next && R.army[R.pick] > 0) { stream.next = now() + 110; if (deploy(stream.x + (Math.random() - .5) * .4, stream.y + (Math.random() - .5) * .4)) raidBar(); }
  }
  draw(dt);
  requestAnimationFrame(frame);
}
function draw(dt) {
  ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0); ctx.imageSmoothingQuality = 'high';
  drawGround();
  var sc = scene(), list = [];
  if (screen === 'raid' && R && !R.over && R.pick) { // red zone where ducks can't land
    var flash = R.redFlash && now() - R.redFlash < 700;
    sc.buildings.forEach(function (b) { if (!b.dead) tileDiamond(b.x - 1, b.y - 1, B[b.k].size + 2, flash ? 'rgba(255,60,60,.22)' : 'rgba(255,80,80,.10)', null); });
  }
  if (screen === 'home' && selected) tileDiamond(selected.x, selected.y, B[selected.k].size, 'rgba(255,255,255,.18)', 'rgba(255,255,255,.75)');
  var ghost = placing || moving;
  if (screen === 'home' && ghost) { var gk = placing ? placing.k : moving.b.k, ok = footprintFree(gk, ghost.x, ghost.y, moving && moving.b.id);
    tileDiamond(ghost.x, ghost.y, B[gk].size, ok ? 'rgba(120,255,140,.35)' : 'rgba(255,80,80,.35)', ok ? '#5fe07a' : '#ff5a5a'); }
  sc.buildings.forEach(function (b) { if (moving && moving.b === b) return; var s = B[b.k].size; list.push({ d: b.x + b.y + s, f: function () { drawBuilding(b, sc); } }); });
  if (ghost && screen === 'home') { var k2 = placing ? placing.k : moving.b.k, gb = { id: -1, k: k2, x: ghost.x, y: ghost.y, lv: placing ? 1 : moving.b.lv, aim: 2.36 }; list.push({ d: ghost.x + ghost.y + B[k2].size, f: function () { ctx.globalAlpha = .8; drawBuilding(gb, sc); ctx.globalAlpha = 1; } }); }
  if (screen === 'raid' && R) {
    R.troops.forEach(function (t) { list.push({ d: t.x + t.y + .2, f: function () { drawTroop(t); } }); });
  }
  list.sort(function (a, b) { return a.d - b.d; }).forEach(function (o) { o.f(); });
  if (screen === 'raid' && R) {
    R.buildings.forEach(function (b) { if (!b.dead && b.hp < b.max && b.k !== 'wall') { var c = center(b); hpBar(c.x, c.y, B[b.k].size * 1.3, b.hp / b.max, '#7be36a'); } });
    R.shots.forEach(drawShot); R.fx = R.fx.filter(function (f) { return drawFx(f, dt); });
  }
}
function boot() {
  D = loadSave() || newGame(); fit(); centerCamera(); homeTick(); hud();
  $('btn-build').onclick = buildMenu; $('btn-army').onclick = armyMenu; $('btn-attack').onclick = attackMenu;
  $('btn-ok').onclick = confirmPlace; $('btn-no').onclick = cancelPlace;
  $('btn-end').onclick = function () { if (R && !R.over) endRaid(); };
  window.duckBack = function () { if ($('sheet').classList.contains('open')) closeSheet(); else if (placing || moving) cancelPlace(); else if (selected) selectBuilding(null); };
  window.duckPause = writeSave;
  document.addEventListener('visibilitychange', function () { if (document.hidden) writeSave(); });
  window.duckReady = true;
  requestAnimationFrame(frame);
}
window.addEventListener('error', function (e) { window.duckError = String(e.message || e); });
boot();

window.PORTFOLIO_PROJECTS = {
  water: { title: '水体与海岸', category: '环境', mediaPath: 'media/prometheus/water', description: '海洋、海浪、瀑布与近岸浮沫效果。', sections: [
    {title: '海洋', items: [{file:'ocean',alt:'海岸与海洋整体效果'}]},
    {title: '海浪', items: [{file:'waves',video:true,ratio:'1001 / 502',alt:'海浪动态效果'}]},
    {title: '瀑布', items: [{file:'waterfall',video:true,ratio:'1712 / 720',alt:'瀑布动态效果'}]},
    {title: '近岸浮沫', items: [{file:'shore-foam',video:true,ratio:'1435 / 720',alt:'近岸浮沫动态效果'}]}
  ]},
  tod: {title:'TOD',category:'TOD',mediaPath:'media/prometheus/tod',description:'正午、傍晚与夜晚的天空效果，以及局部天气和 TOD 编辑器。',sections:[
    {title:'正午',items:[{file:'noon-01',alt:'正午天空效果一'},{file:'noon-02',alt:'正午天空效果二'}]},
    {title:'傍晚与夜晚',items:[{file:'sunset',alt:'傍晚天空',caption:'傍晚'},{file:'night',alt:'夜晚天空',caption:'夜晚'}]},
    {title:'局部天气',items:[{file:'local-weather',video:true,ratio:'700 / 351',alt:'局部天气变化'}]},
    {title:'TOD 编辑器',items:[{file:'editor-01',video:true,ratio:'1500 / 458',alt:'TOD 编辑器演示一'},{file:'editor-02',video:true,ratio:'1501 / 445',alt:'TOD 编辑器演示二'}]}
  ]},
  vegetation: {title:'草地与植被',category:'环境',mediaPath:'media/prometheus/vegetation',description:'草地风场、角色交互、植被晃动与 Dither 效果。',sections:[
    {title:'草地',items:[{file:'grass-overview',alt:'草地整体效果'}]},
    {title:'风场',items:[{file:'wind-field',video:true,ratio:'800 / 344',alt:'草地风场动态效果'}]},
    {title:'草地交互',pair:true,items:[{file:'grass-interaction-01',video:true,ratio:'546 / 409',alt:'草地交互演示一'},{file:'grass-interaction-02',video:true,ratio:'546 / 409',alt:'草地交互演示二'},{file:'grass-interaction-03',video:true,ratio:'800 / 460',alt:'草地交互演示三'},{file:'grass-interaction-04',video:true,ratio:'800 / 460',alt:'草地交互演示四'}]},
    {title:'植被交互',pair:true,items:[{file:'vegetation-interaction-01',video:true,ratio:'600 / 376',alt:'角色经过植被时的晃动',caption:'角色经过后，植被晃动并逐渐停止。'},{file:'vegetation-interaction-02',video:true,ratio:'600 / 325',alt:'植被交互演示二'}]},
    {title:'植被 Dither',items:[{file:'vegetation-dither',video:true,ratio:'851 / 635',alt:'植被 Dither 动态演示'}]}
  ]},
  ground: {title:'地表材质',category:'地表',mediaPath:'media/prometheus/ground',description:'水坑、高度融合与沙滩脚印。',sections:[
    {title:'水坑',items:[{file:'puddles-stone-path',alt:'石板路水坑效果'},{file:'puddles-scene',alt:'场景中的水坑效果'}]},
    {title:'高度融合',items:[{file:'height-blend-detail',alt:'地表高度融合细节'},{file:'height-blend-scene',alt:'地表高度融合场景'}]},
    {title:'沙滩脚印',items:[{file:'sand-footprints',video:true,ratio:'600 / 359',alt:'沙滩脚印动态效果'}]}
  ]},
  character: {title:'角色渲染',category:'NPR / PBR',mediaPath:'media/prometheus/character',description:'NPR 渲染管线与风格化 PBR 管线。PBR 动态展示为预研测试。',sections:[
    {title:'NPR 渲染管线',items:[{file:'npr-render',alt:'NPR 角色渲染效果'}]},
    {title:'渲染管线对比',items:[{file:'pipeline-comparison-day',alt:'同一场景下左侧NPR与右侧风格化PBR角色对比',caption:'左：NPR　右：风格化 PBR'},{file:'pipeline-comparison-evening',alt:'傍晚场景下左侧NPR与右侧风格化PBR角色对比',caption:'左：NPR　右：风格化 PBR'}]},
    {title:'风格化 PBR · 预研测试',items:[{file:'stylized-pbr-test',video:true,ratio:'701 / 575',alt:'风格化 PBR 预研测试动态效果'}]}
  ]},
  'planet-pcg': {title:'PCG 星球',category:'PCG',mediaPath:'media/voxel-planet/pcg',description:'星球整体与地表近景，展示球面上的地形、植被和场景分布。',sections:[
    {title:'星球整体',items:[{file:'planet-overview',alt:'PCG 星球整体与植被分布'}]},
    {title:'地表近景',items:[{file:'planet-surface',alt:'PCG 星球地形与植被近景'}]}
  ]},
  'planet-atmosphere': {title:'大气与黄昏',category:'大气 / 光照',mediaPath:'media/voxel-planet/atmosphere',description:'从星球外围到地表视角，展示大气层、光照与黄昏氛围。',sections:[
    {title:'星球大气',items:[{file:'atmosphere',alt:'星球外围的大气层和明暗交界'}]},
    {title:'黄昏氛围',items:[{file:'sunset',alt:'黄昏光照下的星球地表与角色'}]}
  ]},
  'planet-excavation': {title:'体素挖掘',category:'VOXEL',mediaPath:'media/voxel-planet/excavation',description:'星球地表的实时挖掘与地形变化演示。',sections:[
    {title:'地表挖掘',pair:true,items:[{file:'digging-01',video:true,ratio:'500 / 256',alt:'星球地表挖掘演示一'},{file:'digging-02',video:true,ratio:'600 / 324',alt:'星球地表挖掘演示二'}]}
  ]},
  'planet-movement': {title:'行走与避障',category:'移动 / 避障',mediaPath:'media/voxel-planet/movement',description:'角色在星球地表的行走，以及密集场景中的避障演示。',sections:[
    {title:'星球行走',items:[{file:'walking',video:true,ratio:'500 / 256',alt:'黄昏场景中角色在星球表面行走'}]},
    {title:'密集场景避障',items:[{file:'avoidance',video:true,ratio:'500 / 256',alt:'星球地表密集场景中的避障演示'}]}
  ]},
  'planet-interaction': {title:'群体受击',category:'交互',mediaPath:'media/voxel-planet/interaction',description:'星球场景中的群体受击与交互响应测试。',sections:[
    {title:'群体受击演示',pair:true,items:[{file:'crowd-hit',video:true,ratio:'550 / 282',alt:'星球场景中的群体受击演示'},{file:'hit-response',video:true,ratio:'550 / 282',alt:'星球场景中的受击响应测试'}]}
  ]},
  'landscape-network': {title:'体素挖掘与网络同步',category:'VOXEL / 网络同步',mediaPath:'media/voxel-landscape/network',description:'多个运行窗口中的体素地形挖掘与网络同步演示。',sections:[
    {title:'多窗口同步演示',items:[{file:'network-digging',video:true,ratio:'1400 / 726',alt:'多个窗口中同步显示体素地形挖掘结果'}]}
  ]},
  'landscape-excavation': {title:'草地挖洞',category:'地形 / 植被',mediaPath:'media/voxel-landscape/terrain',description:'草地场景中的实时挖洞，展示挖掘后的地表和洞口效果。',sections:[
    {title:'草地挖洞演示',items:[{file:'grass-excavation',video:true,ratio:'702 / 390',alt:'草地场景中挖洞与地表变化的动态演示'}]}
  ]}
};

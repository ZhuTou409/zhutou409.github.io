# zhutou409.github.io
技术美术个人作品集

## 素材目录

所有作品素材按 `media/项目/作品类型/` 存放。目录和文件名统一使用小写英文与连字符：

```text
media/
├── prometheus/
│   ├── character/    # 角色渲染
│   ├── water/        # 水体与海岸
│   ├── tod/          # TOD
│   ├── vegetation/   # 草地与植被
│   └── ground/       # 地表材质
├── voxel-planet/
│   ├── pcg/          # PCG 星球
│   ├── atmosphere/   # 大气与黄昏
│   ├── excavation/   # 体素挖掘
│   ├── movement/     # 行走与避障
│   └── interaction/  # 群体受击
└── voxel-landscape/
    ├── network/      # 体素挖掘与网络同步
    └── terrain/      # 草地挖洞
```

图片使用 `.webp`，视频使用 `.mp4`。视频与其封面图片使用相同的文件名，例如 `water/waves.mp4` 和 `water/waves.webp`。

VoxelPlanet 和 VoxelLandscape 的原始 GIF 保存在对应作品类型目录的 `sources/` 子目录中；页面使用转换后的 MP4 和 WebP 封面，不直接加载原始 GIF。原始文件保留完整内容，视频转换仅为兼容编码补齐了奇数宽高的边缘像素。

`projects.js` 中，`mediaPath` 指定作品类型目录，条目的 `file` 指定不带扩展名的文件名。首页卡片和轮播的素材路径在 `index.html` 中维护。新增项目时，在 `media/` 下创建独立项目目录，再按作品类型分类；详情条目使用唯一键，例如 `planet-excavation`。

## 项目与时间轴

首页按时间倒序排列，各项目保持独立的作品分块：

| 项目 | 时间 | 作品板块数 |
| --- | --- | --- |
| Prometheus | 2025.12–2026.09 | 5 |
| VoxelPlanet | 2025.01–2025.05 | 5 |
| VoxelLandscape | 2024.07–2025.01 | 2 |

`index.html` 中的 `.project-collections` 包含所有项目区块，右侧 `.timeline-entry` 的链接对应各区块的 `id`。点击时间轴可跳转项目，滚动时由 `app.js` 自动更新当前项目高亮。轮播页数按实际幻灯片数量计算。

## 视频播放

首页轮播、卡片预览和详情视频均在可见时自动静音、循环播放；离开可视区域、关闭详情或切到后台时暂停。保留暂停和详情视频进度控制。减少动态效果的系统偏好会停用自动轮播和转场，视频仍按上述规则播放。

## 本地预览

直接打开 `index.html`，或在此目录运行 `python -m http.server 8765 --bind 127.0.0.1`，然后访问 `http://127.0.0.1:8765`。

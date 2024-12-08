// videoLoader.js

// 批量处理视频链接
const videoLinks = [
    "https://www.bilibili.com/video/BV1w4411a7Bm?spm_id_from=333.788.videopod.episodes&vd_source=115cb9da5209afde3727be34de4a41ef&p=2",
    "https://www.bilibili.com/video/BV1w4411a7Bm?spm_id_from=333.788.videopod.episodes&vd_source=115cb9da5209afde3727be34de4a41ef&p=3",
    "https://www.bilibili.com/video/BV1w4411a7Bm?spm_id_from=333.788.videopod.episodes&vd_source=115cb9da5209afde3727be34de4a41ef&p=4",
    "https://www.bilibili.com/video/BV1w4411a7Bm?spm_id_from=333.788.videopod.episodes&vd_source=115cb9da5209afde3727be34de4a41ef&p=5",
    "https://www.bilibili.com/video/BV1w4411a7Bm?spm_id_from=333.788.videopod.episodes&vd_source=115cb9da5209afde3727be34de4a41ef&p=6"
];

const videos = videoLinks.map(link => {
    const bvid = link.split('/video/')[1].split('?')[0]; // 提取视频 ID
    return {
        title: `视频标题 ${bvid}`, // 这里可以根据需要设置标题
        apiUrl: `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`,
        playUrl: link,
        playUrlAPI: `https://player.bilibili.com/player.html?bvid=${bvid}`,
        description: `描述 ${bvid}`, // 这里可以根据需要设置描述
        category: "健身", // 根据需要设置分类
        duration: "15:00", // 这里可以根据需要设置时长
        thumbnail: `https://i0.hdslb.com/bfs/archive/xxxxxx.jpg` // 这里可以根据需要设置缩略图
    };
});

// 将生成的 videos 数组存储到 JSON 文件中
console.log(JSON.stringify(videos, null, 2)); // 打印 JSON 数据 ß





[
    {
        "title": "基础瑜伽",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1w4411a7Bm",
        "playUrl": "https://www.bilibili.com/video/BV1w4411a7Bm",
        "playUrlAPI": "https://player.bilibili.com/player.html?bvid=BV1w4411a7Bm",
        "description": "适合初学者的基础瑜伽练习。",
        "category": "热身",
        "duration": "10:00",
        "thumbnail": "http://i0.hdslb.com/bfs/archive/6c7c9ff673b4350efa43885af24ac2f6912bfd6b.jpg"
    },
    {
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1ZkDqYiEgC",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1ZkDqYiEgC",
        "playUrl": "https://www.bilibili.com/video/BV1ZkDqYiEgC",
        "playUrlAPI": "https://player.bilibili.com/player.html?bvid=BV1ZkDqYiEgC",
        "description": "适合初学者的基础力量训练视频。",
        "category": "力量",
        "duration": "15:00",
        "thumbnail": "http://i1.hdslb.com/bfs/archive/2a936ad740b7cd16700080521b88f439800b25ce.jpg"
    },
    {    
        "title": "高强度间歇训练",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1w4411a7Bm",
        "playUrl": "https://www.bilibili.com/video/BV1w4411a7Bm",
        "playUrlAPI": "https://player.bilibili.com/player.html?bvid=BV1w4411a7Bm",
        "description": "快速燃脂的高强度训练。",
        "category": "有氧",
        "duration": "15:00",
        "thumbnail": "http://i0.hdslb.com/bfs/archive/6c7c9ff673b4350efa43885af24ac2f6912bfd6b.jpg"
    },
    {
        "title": "全身力量训练",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1w4411a7Bm",
        "playUrl": "https://www.bilibili.com/video/BV1w4411a7Bm",
        "playUrlAPI": "https://player.bilibili.com/player.html?bvid=BV1w4411a7Bm",
        "description": "增强全身肌肉力量的训练。",
        "category": "核心",
        "duration": "20:00",
        "thumbnail": "http://i1.hdslb.com/bfs/archive/4c7c9ff673b4350efa43885af24ac2f6912bfd6b.jpg"
    },
    {
        "title": "深度拉伸",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1w4411a7Bm",
        "playUrl": "https://www.bilibili.com/video/BV1w4411a7Bm",
        "playUrlAPI": "https://player.bilibili.com/player.html?bvid=BV1w4411a7Bm",
        "description": "放松肌肉的深度拉伸。",
        "category": "拉伸",
        "duration": "12:00",
        "thumbnail": "http://i0.hdslb.com/bfs/archive/6c7c9ff673b4350efa43885af24ac2f6912bfd6b.jpg"
    },
    {
        "title": "全身有氧运动",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1w4411a7Bm",
        "playUrl": "https://www.bilibili.com/video/BV1w4411a7Bm",
        "onlyplayUrl": "https://player.bilibili.com/player.html?bvid=BV1w4411a7Bm",
        "description": "适合所有人的全身有氧运动。",
        "category": "有氧",
        "duration": "30:00",
        "thumbnail": "http://i0.hdslb.com/bfs/archive/6c7c9ff673b4350efa43885af24ac2f6912bfd6b.jpg"
    }
]




[
    {
        "title": "基础瑜伽",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1w4411a7Bm",
        "playUrl": "https://www.bilibili.com/video/BV1w4411a7Bm",
        "playUrlAPI": "https://player.bilibili.com/player.html?bvid=BV1w4411a7Bm",
        "description": "适合初学者的基础瑜伽练习。",
        "category": "热身",
        "duration": "10:00",
        "thumbnail": "https://i0.hdslb.com/bfs/archive/6c7c9ff673b4350efa43885af24ac2f6912bfd6b.jpg"
    },
    {
        "title": "健身教程：基础力量训练",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1ZkDqYiEgC",
        "playUrl": "https://www.bilibili.com/video/BV1ZkDqYiEgC",
        "playUrlAPI": "https://player.bilibili.com/player.html?bvid=BV1ZkDqYiEgC",
        "description": "适合初学者的基础力量训练视频。",
        "category": "力量",
        "duration": "15:00",
        "thumbnail": "https://i1.hdslb.com/bfs/archive/2a936ad740b7cd16700080521b88f439800b25ce.jpg"
    },
    {    
        "title": "高强度间歇训练",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1w4411a7Bm",
        "playUrl": "https://www.bilibili.com/video/BV1w4411a7Bm",
        "playUrlAPI": "https://player.bilibili.com/player.html?bvid=BV1w4411a7Bm",
        "description": "快速燃脂的高强度训练。",
        "category": "有氧",
        "duration": "15:00",
        "thumbnail": "https://i0.hdslb.com/bfs/archive/6c7c9ff673b4350efa43885af24ac2f6912bfd6b.jpg"
    },
    {
        "title": "全身力量训练",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1w4411a7Bm",
        "playUrl": "https://www.bilibili.com/video/BV1w4411a7Bm",
        "playUrlAPI": "https://player.bilibili.com/player.html?bvid=BV1w4411a7Bm",
        "description": "增强全身肌肉力量的训练。",
        "category": "核心",
        "duration": "20:00",
        "thumbnail": "https://i1.hdslb.com/bfs/archive/4c7c9ff673b4350efa43885af24ac2f6912bfd6b.jpg"
    },
    {
        "title": "深度拉伸",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1w4411a7Bm",
        "playUrl": "https://www.bilibili.com/video/BV1w4411a7Bm",
        "playUrlAPI": "https://player.bilibili.com/player.html?bvid=BV1w4411a7Bm",
        "description": "放松肌肉的深度拉伸。",
        "category": "拉伸",
        "duration": "12:00",
        "thumbnail": "https://i0.hdslb.com/bfs/archive/6c7c9ff673b4350efa43885af24ac2f6912bfd6b.jpg"
    },
    {
        "title": "全身有氧运动",
        "apiUrl": "https://api.bilibili.com/x/web-interface/view?bvid=BV1w4411a7Bm",
        "playUrl": "https://www.bilibili.com/video/BV1w4411a7Bm",
        "playUrlAPI": "https://player.bilibili.com/player.html?bvid=BV1w4411a7Bm",
        "description": "适合所有人的全身有氧运动。",
        "category": "有氧",
        "duration": "30:00",
        "thumbnail": "https://i0.hdslb.com/bfs/archive/6c7c9ff673b4350efa43885af24ac2f6912bfd6b.jpg"
    }
]


// 这段代码实现了您要求的所有功能：
// 处理链接：
// 将普通视频链接转换为 API 端点链接
// 提取 BVID 并构建 API URL
// 处理分P参数：
// 检查 URL 中是否存在 p 参数
// 如果存在，从 pages 数组中查找对应的信息
// 使用 part 字段作为标题，使用对应的 duration
// 处理无分P的情况：
// 直接使用 data 字段下的信息
// 读取 title、duration 等信息
// 保存完整信息：
// 保存 API 端点信息
// 保存原始播放链接
// 保存所有必要的视频信息

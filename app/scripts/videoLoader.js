// videoLoader.js

// 批量处理视频链接
const videoLinks = [
    "https://www.bilibili.com/video/BV1sA411Q7R3/?spm_id_from=333.337.search-card.all.click"
];

// 获取视频信息
async function getVideoInfo(videoUrl) {
    const bvid = videoUrl.split('/video/')[1].split('?')[0];
    const apiUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (!data || !data.data) {
            console.error('No data found for BVID:', bvid);
            return null;
        }

        // 获取 p 参数
        const url = new URL(videoUrl);
        const pageNumber = url.searchParams.get('p');
        
        let videoInfo = {
            apiUrl: apiUrl,  // 原始 API URL
            playUrl: videoUrl,  // 原始视频链接
            onlyplayUrl: `https://player.bilibili.com/player.html?bvid=${bvid}`,  // 只播放链接
            pic: data.data.pic,  // API 返回的完整图片 URL
            description: data.data.desc  // 视频描述
        };

        if (pageNumber) {
            // 如果有分P参数，从 pages 数组中查找对应信息
            const pageInfo = data.data.pages.find(page => page.page.toString() === pageNumber);
            if (pageInfo) {
                videoInfo.title = pageInfo.part;
                videoInfo.duration = formatDuration(pageInfo.duration);
                videoInfo.onlyplayUrl = `https://player.bilibili.com/player.html?bvid=${bvid}&p=${pageNumber}`;
            }
        } else {
            // 如果没有分P参数，使用 data 字段的信息
            videoInfo.title = data.data.title;
            videoInfo.duration = formatDuration(data.data.duration);
        }

        return videoInfo;
    } catch (error) {
        console.error('Error fetching video data:', error);
        return null;
    }
}

// 格式化时长为 mm:ss
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// 保存数据到 JSON 文件
async function saveToJson(videos) {
    try {
        // 将数据写入 videos.json 文件
        const jsonContent = JSON.stringify(videos, null, 2);
        
        // 使用 Blob 创建文件
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'videos.json';
        a.click();
        URL.revokeObjectURL(a.href);

        console.log('Successfully saved videos to JSON file');
    } catch (error) {
        console.error('Error saving to JSON:', error);
        throw error;
    }
}

// 批量处理视频链接
async function processVideoLinks(videoLinks) {
    const videos = await Promise.all(videoLinks.map(async link => {
        console.log('Processing video link:', link);
        const videoInfo = await getVideoInfo(link);
        return videoInfo;
    }));

    // 过滤掉 null 值
    const filteredVideos = videos.filter(video => video !== null);

    // 将处理后的数据写入 JSON 文件
    await saveToJson(filteredVideos);
    
    return filteredVideos;
}

// 处理视频链接并保存到 JSON 文件
processVideoLinks(videoLinks)
    .then(videos => {
        if (videos.length > 0) {
            console.log('Processed videos:', videos);
            saveToJson(videos); // 仅在有新数据时保存
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
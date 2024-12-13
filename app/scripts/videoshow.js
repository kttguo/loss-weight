// videoshow.js

let allVideos = []; // 用于存储所有视频数据

// 显示视频
function displayVideos(videos) {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = ''; // 清空之前的结果
    // 遍历视频并展示
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('col-md-4'); // 每个视频占据 4 列
        videoCard.innerHTML = `
            <div class="card h-100">
                <div class="video-placeholder" onclick="playVideo('${video.onlyplayUrl}')">
                    <img class="video-thumbnail" src="${video.pic}" alt="${video.title}" 
                         onerror="this.onerror=null; this.src='images/thumbnail.jpg'">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${video.title}</h5>
                    <p class="card-text">${video.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">${video.duration}</small>
                    </div>
                </div>
            </div>
        `;
        videoContainer.appendChild(videoCard);
    });
}

// 过滤视频
function filterVideos(category) {
    const filteredVideos = allVideos.filter(video => video.category === category);
    displayVideos(filteredVideos);
}

// 加载视频数据
async function loadVideos() {
    try {
        const response = await fetch('./data/videodata.json'); // 从本地文件加载数据
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allVideos = await response.json(); // 将所有视频数据存储在全局变量中
        // console.log("hello");
        console.log('Loaded videos:', allVideos); // 添加调试信息
        displayVideos(allVideos); // 显示所有视频
    } catch (error) {
        console.error('Error loading video data:', error);
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = `
            <div class="alert alert-danger">
                加载视频数据失败: ${error.message}
            </div>
        `;
    }
}

// 播放视频的函数
function playVideo(url) {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = ''; // 清空容器

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '400px'; // 设置高度
    videoContainer.appendChild(iframe); // 添加 iframe 播放视频
}

// 显示默认状态
function showDefaultState() {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = `
        <div class="text-center">
            <h3>请选择一个视频进行播放</h3>
            <img src="images/default-placeholder.jpg" alt="默认占位符" style="width: 100%; max-width: 600px;">
        </div>
    `;
}

// 在页面加载时加载视频
window.onload = () => {
    loadVideos();
    showDefaultState(); // 显示默认状态
};

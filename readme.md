# 减肥网站项目 README

## 项目目标
本项目旨在开发一个减肥网站，帮助用户管理他们的减肥计划，提供视频播放功能，并存储用户信息。网站将部署在 GitHub Pages 上，确保用户可以方便地访问。

## 功能说明

### 1. 主食、肉蛋奶摄取量
- **用途**: 计算用户每日应摄取的三大营养素（碳水化合物、蛋白质、脂肪）量。
- **实现方式**: 用户输入相关信息后，点击计算按钮，弹出表单进行计算，并将结果存储到本地存储中。

- **基础代谢率（BMR）和身体质量指数（BMI）计算**:
- **用途**: 根据用户的BMR和BMI，计算每日应摄取的三大营养素（碳水化合物、蛋白质、脂肪）以及具体食物的摄入量。
- **实现方式**: 
  1. 计算标准体重 = 身高（厘米） - 105。
  2. 根据活动量计算每日所需能量：
     - 轻体力劳动者: 每千克耗能 30 千卡。
     - 中体力劳动者: 每千克耗能 35 千卡。
     - 重体力劳动者: 每千克耗能 40 千卡。
  3. 每日所需能量 = 标准体重 × 每千克所需能量。
  4. 根据每日��需能量计算三大营养素的克数：
     - 碳水化合物: 占总能量的 55%。
     - 蛋白质: 占总能量的 15%。
     - 脂肪: 占总能量的 30%。
  5. 每克产生的能量：
     - 碳水化合物: 每克 4 千卡。
     - 蛋白质: 每克 4 千卡。
     - 脂肪: 每克 9 千卡。

### 2. 记录摄入的食物卡路里含量
- **用途**: 记录用户每日摄入的食物及其卡路里含量。
- **实现方式**: 用户输入食物名称和数量，系统查询食物营养库并返回结果，计算总热量以及碳水化合物、蛋白质和脂肪的摄入量。

#### 实现步骤
1. **建立食物营养库**: 创建一个 JSON 文件（如 `foodNutrition.json`），存储常见食物的营养成分数据，包括每种食物的卡路里、碳水化合物、蛋白质和脂肪含量。
2. **用户输入**: 在前端创建一个输入框，允许用户输入食物名称和数量。
3. **查询功能**: 使用 JavaScript 加载 `foodNutrition.json` 文件并根据用户输入的食物名称查询相应的营养成分。
4. **计算总量**: 根据用户输入的食物数量，计算出总热量和三大营养物质的摄入量。
5. **显示结果**: 在页面上显示计算结果，包括总热量和三大营养物质的摄入量。

### 3. 运动视频
- **用途**: 提供运动视频，帮助用户进行锻炼。
- **实现方式**: 按照运动类型分类展示视频，以卡片形式呈现，用户可以播放视频并输入自定义链接。

#### 实现方案
- 使用 JSON 存储视频链接并在页面上显示运动视频。通过加载 JSON 文件，提取视频链接并嵌入到页面中，用户可以直接观看相关运动视频。

#### 运动视频分类
- **热身**: 包含适合运动前的热身活动，帮助身体逐渐适应运动强度，减少受伤风险。
- **核心**: 专注于核心肌群的锻炼，增强腹部、背部和骨盆区域的力量和稳定性。
- **有氧**: 提高心肺功能的运动，通常包括较高强度的活动，适合燃脂和提高耐力。
- **力量**: 增强肌肉力量和耐力的训练，包括举重、哑铃练习等。
- **拉伸**: 运动后的拉伸活动，帮助放松肌肉，增加柔韧性，促进恢复。

#### 视频卡片应包含的信息
- **视频占位符**: 包裹视频缩略图和视频占位符，在这个区域内点击即可实现在视频播放器中播放视频。
- **视频缩略图**: 显示视频的缩略图，点击图片视频播放器即可播放视频。
- **视频播放器**: 嵌入Bilibili视频播放器，点击该区域就会播放视频
- **视频标题**: 简洁明了的标题，描述视频的内容。
- **描述**: 简短的描述，提供更多关于视频内容的信息。
- **播放按钮**: 一个明显的播放按钮，用户点击后可以直接播放视频。
- **分类标签** (可选): 显示视频所属的运动类型（如热身、有氧、力量训练等），帮助用户快速筛选。

#### 视频链接存储
- 将不超过 20 个运动视频的链接存储在 JSON 文件中，并将这些链接处理成两种模式：
  - **API 模式的链接**: 用于获取视频的元数。
  - **只播放视频模式的链接**: 直接指向视频的播放页面。

### 批量处理 Bilibili 视频链接的步骤

1. **准备视频链接**: 收集需要处理的多个 Bilibili 视频链接，确保每个链接都包含视频 ID。

2. **提取 BVID**: 从视频链接中提取 BVID。BVID 是视频的唯一标识符，您可以通过解析 URL 来获取它。

3. **构建 API 请求**: 使用提取的 BVID 构建 API 请求 URL，例如：
   ```
   https://api.bilibili.com/x/web-interface/view?bvid=BV1w4411a7Bm
   ```

4. **发送请求并处理响应**:
   - 使用 `fetch` 方法发送请求到 Bilibili API。
   - 从响应中提取所需的数据，包括 `pic`、`title`、`desc`、`duration` 和 `pages` 字段中的 `part`。

5. **保存数据到 JSON 文件**: 将提取到的视频信息（包括标题、描述、缩略图、时长和分类）写入 `videos.json` 文件中，以便后续使用。

6. **动态生成视频卡片**: 在网页上根据 `videos.json` 中的数据动态生成视频卡片，展示视频信息，用户可以直接播放视频。

### 示例代码

以下是一个示例代码，展示如何批量处理视频链接并提取所需信息：

```javascript
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
```


### 4. 私教功能（AI 生成运动视频）
- **用途**: 提供用户需要的运动视频，AI 教练可以隔着屏幕与用户交流，纠正用户动作并陪伴用户。
- **实现方式**:
  - **视频通话功能**: 使用 WebRTC 技术实现实时视频通话，允许用户与 AI 教练进行互动。
  - **AI 动作识别**: 使用计算机视觉和机器学习技术识别用户的动作，并提供实时反馈。
  - **用户界面设计**: 在用户界面中添加视频窗口，显示用户的实时视频和 AI 教练的反馈信息。
  - **后端支持**: 需要一个后端服务器来处理用户的注册、登录、视频流的信号交换等。

### 5. 社交功能
- **用途**: 提供用户交流的平台，参考豆瓣小组的功能。
- **实现方式**: 创建讨论区，用户可以发布和回复帖子，分享减肥经验。社交数据将存储在本地存储中。

### 6. 基础代谢率（BMR）和身体质量指数（BMI）计算
- **用途**: 根据用户的BMR和BMI，计算每日应摄取的三大营养素（碳水化合物、蛋白质、脂肪）以及具体食物的摄入量。
- **实现方式**: 
  1. 计算标准体重 = 身高（厘米） - 105。
  2. 根据活动量计算每日所需能量：
     - 轻体力劳动者: 每千克耗能 30 千卡。
     - 中体力劳动者: 每千克耗能 35 千卡。
     - 重体力劳动者: 每千克耗能 40 千卡。
  3. 每日所需能量 = 标准体重 × 每千克所需能量。
  4. 根据每日所需能量计算三大营养素的克数：
     - 碳水化合物: 占总能量的 55%。
     - 蛋白质: 占总能量的 15%。
     - 脂肪: 占总能量的 30%。
  5. 每克产生的能量：
     - 碳水化合物: 每克 4 千卡。
     - 蛋白质: 每克 4 千卡。
     - 脂肪: 每克 9 千卡。
  6. **运动量计算**: 
     - 用户选择活动水平（轻体力、中体力、重体力），根据选择的活动水平调整每日所需能量。

### 7. 每日真实摄入的卡路里含量计算
- **用途**: 计算用户每日实际摄入的卡路里及其营养成分。
- **实现方式**:
  1. 用户输入食物名称和数量。
  2. 系统查询食物营养库（`foodNutrition.json`）以获取相应的营养成分。
  3. 计算总卡路里、碳水化合物、蛋白质和脂肪的摄入量。
  4. 在页面上显示计算结果。

#### 示例代码

```javascript
async function loadFoodNutrition() {
    const response = await fetch('./scripts/foodNutrition.json');
    return await response.json();
}

async function calculateDailyIntake() {
    const foodNutrition = await loadFoodNutrition();
    const foodInput = document.getElementById('foodInput').value; // 用户输入的食物名称
    const foodQuantity = parseFloat(document.getElementById('foodQuantity').value); // 用户输入的食物数量

    const foodItem = foodNutrition.find(item => item.name === foodInput);

    if (foodItem) {
        const totalCalories = foodItem.calories * foodQuantity; // 计算总卡路里
        const totalCarbs = foodItem.carbs * foodQuantity; // 计算总碳水化合物
        const totalProtein = foodItem.protein * foodQuantity; // 计算总蛋白质
        const totalFat = foodItem.fat * foodQuantity; // 计算总脂肪

        document.getElementById('results').innerText = `
            总热量: ${totalCalories.toFixed(2)} 千卡
            碳水化合物: ${totalCarbs.toFixed(2)} 克
            蛋白质: ${totalProtein.toFixed(2)} 克
            脂肪: ${totalFat.toFixed(2)} 克
        `;
    } else {
        document.getElementById('results').innerText = '未找到该食物的营养信息。';
    }
}

// 绑定事件
document.getElementById('calculateButton').addEventListener('click', calculateDailyIntake);
```

## 界面说明

### 1. 首页
- **布局**: 分为四栏
  - **第一栏**: 显示主食、蛋白质类摄入量，包含计算按钮，弹出表单进行计算并存储结果。
  - **第二栏**: 显示今天摄入的卡路里，计算食物卡路里含量。
  - **第三栏**: 提供“去运动”按钮，跳转到运动页面，记录运动消耗的卡路里。
  - **第四栏**: 显示鼓励的话，计算能量缺口。

### 2. 运动视频列表页
- **功能**: 按照运动类型分类展示视频，以卡片形式呈现，用户可以播放视频并输入自定义链接。

### 3. 我的页面
- **功能**: 待定，后续根据用户反馈进行设计。

## 开发计划
1. **第一部分功能完成**: 目前已完成基础的营养计算和用户输入功能。
2. **后续优化**: 在完成第二部分和第三部分功能后，将回头对第一部分进行优化。
3. **功能实现**: 
   - 实现营养素计算功能。
   - 实现卡路里记录功能。
   - 实现运动视频播放功能。
   - 实现社交功能的基础框架。
   - 实现基础代谢率（BMR）和身体质量指数（BMI）计算功能。
4. **测试**: 进行功能测试和用户体验测试。
5. **部署**: 将项目推送到 GitHub，并在 GitHub Pages 上进行部署。

## 联系方式
如有任何问题或建议，请联系项目维护者。

## 新增功能说明

### 视频列表页面

1. **功能概述**：
   - 读取 `videos.json` 文件中的数据，加载视频信息，并将这些信息渲染到 `videoList.html` 页面中。
   - 解决因同源 CORS 导致的图像、视频资源加载问题。
   - 按照运动类型（热身、有氧、核心、力量、拉伸）对加载的视频进行分类。
   - 动态生成视频卡片，卡片结构包含视频占位符和视频相关的文本输入控件。

2. **视频卡片结构**：
   - **视频占位符**：用于包裹视频缩略图和视频播放器。点击该区域会触发 `playVideo` 函数，开始播放视频。
   - **文本控件**：显示视频标题，用户可以在输入框内输入自定义视频链接，替换原本的视频。提供播放视频和清空输入框的按钮。

3. **页面结构**：
   - **导航**：按照热身、有氧、核心、力量、拉伸等组成。
   - **视频分类**：用于组织视频内容。
   - **视频卡片**：展示每个视频的缩略图、标题和相关操作。

### 代码实现

- 使用 `fetch` API 加载 `videos.json` 文件。
- 使用 DOM 操作动态生成视频卡片。
- 处理 CORS 问题，确保图片和视频资源能够正常加载。

# TODO

1. 提取json中的steam url，转换为本地。
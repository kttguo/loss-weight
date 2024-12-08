// nutritionCalculator.js

// 计算基础代谢率（BMR）
function calculateBMR(weight, height, age, gender) {
    if (gender === 'male') {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
}

// 计算身体质量指数（BMI）
function calculateBMI(weight, height) {
    return weight / ((height / 100) ** 2);
}

// 计算每日所需能量
function calculateDailyCalories(height, activityLevel) {
    const standardWeight = height - 105; // 计算标准体重
    let activityMultiplier;

    switch (activityLevel) {
        case 'light':
            activityMultiplier = 30; // 每千克耗能30千卡
            break;
        case 'moderate':
            activityMultiplier = 35; // 每千克耗能35千卡
            break;
        case 'heavy':
            activityMultiplier = 40; // 每千克耗能40千卡
            break;
        default:
            activityMultiplier = 30; // 默认轻体力
    }

    return standardWeight * activityMultiplier; // 每日所需能量
}

// 计算每日��养素需求
function calculateNutrients(height, activityLevel) {
    const totalCalories = calculateDailyCalories(height, activityLevel); // 总卡路里
    const proteinCalories = totalCalories * 0.15;
    const carbCalories = totalCalories * 0.55;
    const fatCalories = totalCalories * 0.30;

    const proteinGrams = proteinCalories / 4; // 每克蛋白质4千卡
    const carbGrams = carbCalories / 4; // 每克碳水化合物4千卡
    const fatGrams = fatCalories / 9; // 每克脂肪9千卡

    return {
        proteinGrams,
        carbGrams,
        fatGrams,
        totalCalories // 返回总卡路里以便后续使用
    };
}

// 示例用法
function displayResults() {
    const weight = parseFloat(document.getElementById('weight').value); // kg
    const height = parseFloat(document.getElementById('height').value); // cm
    const age = parseInt(document.getElementById('age').value); // years
    const gender = document.querySelector('input[name="gender"]:checked').value; // male or female
    const activityLevel = document.getElementById('activityLevel').value; // activity level

    const bmr = calculateBMR(weight, height, age, gender);
    const bmi = calculateBMI(weight, height);
    const nutrients = calculateNutrients(height, activityLevel); // 使用身高计算每日所需能量

    // 显示结果
    document.getElementById('bmrResult').innerText = `BMR: ${bmr.toFixed(2)}`;
    document.getElementById('bmiResult').innerText = `BMI: ${bmi.toFixed(2)}`;
    document.getElementById('foodIntakeResult').innerText = `每日摄入建议: 碳水化合物来源: 米饭、块茎类、杂豆类; 蛋白质来源: 肉、鸡蛋、牛奶; 脂质来源: 肉、植物油`;
    document.getElementById('nutrientResults').innerText = `每日应摄取: 碳水化合物 ${nutrients.carbGrams.toFixed(2)}g, 蛋白质 ${nutrients.proteinGrams.toFixed(2)}g, 脂质 ${nutrients.fatGrams.toFixed(2)}g`;
    document.getElementById('totalCaloriesResult').innerText = `每日应摄取的总卡路里: ${nutrients.totalCalories.toFixed(2)}千卡`;
}

// 绑定事件
document.getElementById('calculateButton').addEventListener('click', () => {
    displayResults();
    document.querySelector('.calculator__container').style.display = 'none'; // 计算后隐藏表单
});

// 加载视频数据
async function loadVideos() {
    try {
        const response = await fetch('videos.json'); // 加载 JSON 文件
        const videos = await response.json();
        displayVideos(videos);
    } catch (error) {
        console.error('Error loading video data:', error);
    }
}

// 显示视频
function displayVideos(videos) {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = ''; // 清空之前的结果

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-item');
        videoElement.innerHTML = `
            <h5>${video.title}</h5>
            <iframe width="100%" height="315" src="${video.url}" frameborder="0" allowfullscreen></iframe>
            <p>${video.description}</p>
        `;
        videoContainer.appendChild(videoElement);
    });
}

// 绑定事件
document.getElementById('showFormButton').addEventListener('click', () => {
    const container = document.querySelector('.calculator__container');
    container.style.display = container.style.display === 'none' ? 'block' : 'none'; // 切换表单显示
});

// 在页面加载时加载视频
window.onload = loadVideos;

async function loadFoodNutrition() {
    try {
        const response = await fetch('./scripts/foodNutrition.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading food nutrition data:', error);
        return [];
    }
}

function calculateNutritionalValues(foodItems) {
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;

    foodItems.forEach(item => {
        totalCalories += item.calories;
        totalCarbs += item.carbs;
        totalProtein += item.protein;
        totalFat += item.fat;
    });

    return {
        totalCalories,
        totalCarbs,
        totalProtein,
        totalFat
    };
}

async function displayResults() {
    const foodNutrition = await loadFoodNutrition();
    const foodInput = document.getElementById('foodInput').value; // 用户输入的食物名称
    const foodItem = foodNutrition.find(item => item.name === foodInput);

    if (foodItem) {
        const results = calculateNutritionalValues([foodItem]);
        document.getElementById('results').innerText = `
            总热量: ${results.totalCalories} 千卡
            碳水化合物: ${results.totalCarbs} 克
            蛋白质: ${results.totalProtein} 克
            脂肪: ${results.totalFat} 克
        `;
    } else {
        document.getElementById('results').innerText = '未找到该食物的营养信息。';
    }
}

// 绑定事件
document.getElementById('calculateButton').addEventListener('click', displayResults); 
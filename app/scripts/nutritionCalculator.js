// nutritionCalculator.js

// 计算标准体重
function calculateStandardWeight(height) {
    return height - 105; // 身高（厘米） - 105
}

// 根据活动量计算每日所需能量
function calculateDailyCalories(weight, height, activityLevel) {
    const standardWeight = calculateStandardWeight(height);
    let caloriesPerKg;

    // 根据活动水平设置每千克耗能
    switch (activityLevel) {
        case 'light':
            caloriesPerKg = 30; // 轻体力劳动者
            break;
        case 'moderate':
            caloriesPerKg = 35; // 中体力劳动者
            break;
        case 'heavy':
            caloriesPerKg = 40; // 重体力劳动者
            break;
        default:
            throw new Error('活动水平未指定');
    }

    return standardWeight * caloriesPerKg; // 每日所需能量 = 标准体重 × 每千克所需能量
}

// 计算每日所需营养素
function calculateNutrients(weight, height, activityLevel) {
    const totalCalories = calculateDailyCalories(weight, height, activityLevel);
    const proteinCalories = totalCalories * 0.15; // 蛋白质占总能量的 15%
    const carbCalories = totalCalories * 0.55;    // 碳水化合物占总能量的 55%
    const fatCalories = totalCalories * 0.30;      // 脂肪占总能量的 30%

    const proteinGrams = proteinCalories / 4; // 每克蛋白质 4 千卡
    const carbGrams = carbCalories / 4;       // 每克碳水化合物 4 千卡
    const fatGrams = fatCalories / 9;          // 每克脂肪 9 千卡

    return {
        proteinGrams,
        carbGrams,
        fatGrams,
        totalCalories
    };
}

// 显示计算结果
function displayResults(weight, height, activityLevel) {
    const nutrients = calculateNutrients(weight, height, activityLevel);

    // 显示结果
    document.getElementById('totalCaloriesResult').innerText = `每日所需总卡路里：${nutrients.totalCalories.toFixed(2)}千卡`;
    document.getElementById('proteinResult').innerText = `蛋白质：${nutrients.proteinGrams.toFixed(2)}克`;
    document.getElementById('carbResult').innerText = `碳水化合物：${nutrients.carbGrams.toFixed(2)}克`;
    document.getElementById('fatResult').innerText = `脂肪：${nutrients.fatGrams.toFixed(2)}克`;
}

// 绑定事件
document.getElementById('calculateButton').addEventListener('click', () => {
    const weight = parseFloat(document.getElementById('weight').value); // kg
    const height = parseFloat(document.getElementById('height').value); // cm
    const activityLevel = document.getElementById('activityLevel').value; // activity level

    displayResults(weight, height, activityLevel);
}); 
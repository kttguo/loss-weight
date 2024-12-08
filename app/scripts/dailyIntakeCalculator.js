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
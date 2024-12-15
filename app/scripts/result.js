// app/scripts/exercise.js

// 存储用户输入的运动消耗卡路里
let caloriesBurned = 0;

// 绑定事件
document.addEventListener('DOMContentLoaded', () => {
    const addCaloriesButton = document.getElementById('addCaloriesButton');
    const caloriesBurnedInput = document.getElementById('caloriesBurnedInput');

    // 点击添加卡路里按钮时的事件处理
    addCaloriesButton.addEventListener('click', () => {
        const inputCalories = parseFloat(caloriesBurnedInput.value);

        // 验证输入
        if (isNaN(inputCalories) || inputCalories <= 0) {
            alert('请输入有效的卡路里消耗值！');
            return;
        }

        // 更新卡路里消耗
        caloriesBurned += inputCalories;

        // 清空输入框
        caloriesBurnedInput.value = '';

        // 显示当前消耗的卡路里
        alert(`当前总消耗的卡路里: ${caloriesBurned} 千卡`);
    });

    document.getElementById('calculatetodayTotalButton').addEventListener('click', calculateTotalIntake);
});

console.log(foodEntries); // 在添加食物后输出

async function calculateTotalIntake() {
    const foodData = await loadFoodData(); // 加载食物数据
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    for (const entry of foodEntries) {
        const food = foodData.find(item => item.foodName.includes(entry.name));
        if (food) {
            const quantity = entry.quantity;
            totalCalories += (parseFloat(food.calories) * quantity / 100);
            totalProtein += (parseFloat(food.protein) * quantity / 100);
            totalCarbs += (parseFloat(food.carbs) * quantity / 100);
            totalFat += (parseFloat(food.fat) * quantity / 100);
        } else {
            alert(`未找到名为 "${entry.name}" 的食物`);
        }
    }

    console.log('Total Calories:', totalCalories);
    console.log('Total Protein:', totalProtein);
    console.log('Total Carbs:', totalCarbs);
    console.log('Total Fat:', totalFat);

    // 更新 DOM 显示结果
    const dailyCaloriesResult = document.getElementById('dailyCaloriesResult');
    const dailyProteinResult = document.getElementById('dailyProteinResult');
    const dailyCarbResult = document.getElementById('dailyCarbResult');
    const dailyFatResult = document.getElementById('dailyFatResult');
    const nutritionResult = document.getElementById('nutritionResult');

    if (dailyCaloriesResult && dailyProteinResult && dailyCarbResult && dailyFatResult && nutritionResult) {
        dailyCaloriesResult.innerText = `每日卡路里: ${totalCalories.toFixed(2)} 千卡`;
        dailyProteinResult.innerText = `每日蛋白质: ${totalProtein.toFixed(2)} 克`;
        dailyCarbResult.innerText = `每日碳水化合物: ${totalCarbs.toFixed(2)} 克`;
        dailyFatResult.innerText = `每日脂肪: ${totalFat.toFixed(2)} 克`;
        nutritionResult.innerText = `营养结果: 卡路里 ${totalCalories.toFixed(2)} 千卡, 蛋白质 ${totalProtein.toFixed(2)} 克, 碳水化合物 ${totalCarbs.toFixed(2)} 克, 脂肪 ${totalFat.toFixed(2)} 克`;
    } else {
        console.error('某些结果元素未找到');
    }
}

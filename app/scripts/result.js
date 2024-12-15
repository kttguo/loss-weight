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
    const foodList = document.getElementById('foodList'); // 获取食物列表
    const rows = foodList.getElementsByTagName('tr'); // 获取所有行
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    // 遍历每一行以提取食物名称和数量
    for (const row of rows) {
        const cells = row.getElementsByTagName('td');
        if (cells.length > 0) {
            const foodName = cells[0].innerText; // 食物名称
            const quantity = parseFloat(cells[1].innerText); // 食物数量

            const foodData = await loadFoodData(); // 加载食物数据
            const food = foodData.find(item => item.foodName.includes(foodName));
            if (food) {
                totalCalories += (parseFloat(food.calories) * quantity / 100);
                totalProtein += (parseFloat(food.protein) * quantity / 100);
                totalCarbs += (parseFloat(food.carbs) * quantity / 100);
                totalFat += (parseFloat(food.fat) * quantity / 100);
            } else {
                alert(`未找到名为 "${foodName}" 的食物`);
            }
        }
    }

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

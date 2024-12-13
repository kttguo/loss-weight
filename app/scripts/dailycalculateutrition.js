// 加载食物数据
async function loadFoodData() {
    try {
        const response = await fetch('http://localhost:8080/app/data/fooddata.json');
        if (!response.ok) {
            throw new Error(`网络响应错误: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('加载食物数据失败:', error);
        return [];
    }
}


let foodEntries = []; // 存储用户输入的食物及其数量

// 实时查找食物
async function searchFood() {
    const foodNameInput = document.getElementById('foodNameInput');
    const foodName = foodNameInput.value.trim();

    if (foodName) {
        const foodData = await loadFoodData(); // 加载食物数据
        const matchedFood = foodData.filter(item => item.foodName.toLowerCase().includes(foodName.toLowerCase())); // 查找匹配的食物

        // 这里不再渲染查找结果到页面上
        // 如果需要，可以在控制台输出匹配的食物
        console.log('匹配的食物:', matchedFood);
    }
}

// 添加食物
function addFood() {
    const foodNameInput = document.getElementById('foodNameInput');
    const foodQuantityInput = document.getElementById('foodQuantityInput');
    const foodList = document.getElementById('foodList');

    const foodName = foodNameInput.value.trim();
    const foodQuantity = parseFloat(foodQuantityInput.value);

    if (foodName && !isNaN(foodQuantity) && foodQuantity > 0) {
        foodEntries.push({ name: foodName, quantity: foodQuantity });
        foodList.innerHTML += `<p>${foodName} - ${foodQuantity} 克</p>`;
        foodNameInput.value = ''; // 清空输入框
        foodQuantityInput.value = ''; // 清空输入框
    } else {
        alert('请输入有效的食物名称和数量');
    }
}

// 计算总摄入量
async function calculateTotalIntake() {
    const foodData = await loadFoodData(); // 加载食物数据
    const nutritionResult = document.getElementById('nutritionResult');
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

    nutritionResult.innerHTML = `
        <h3>总摄入量</h3>
        <p>卡路里: ${totalCalories.toFixed(2)} 千卡</p>
        <p>蛋白质: ${totalProtein.toFixed(2)} 克</p>
        <p>碳水化合物: ${totalCarbs.toFixed(2)} 克</p>
        <p>脂肪: ${totalFat.toFixed(2)} 克</p>
    `;
}

// 绑定事件
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addFoodButton').addEventListener('click', addFood);
    document.getElementById('calculateTotalButton').addEventListener('click', calculateTotalIntake);
    document.getElementById('foodNameInput').addEventListener('input', searchFood); // 绑定输入事件
});
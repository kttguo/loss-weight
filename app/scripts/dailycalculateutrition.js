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
let historyEntries = []; // 存储历史记录

// 实时查找食物
async function searchFood() {
    const foodNameInput = document.getElementById('foodNameInput');
    const suggestions = document.getElementById('suggestions');
    const foodName = foodNameInput.value.trim();

    if (foodName) {
        const foodData = await loadFoodData(); // 加载食物数据
        const matchedFood = foodData.filter(item => item.foodName.toLowerCase().includes(foodName.toLowerCase())); // 查找匹配的食物

        // 渲染下拉列表
        suggestions.innerHTML = matchedFood.map(food => `<div onclick="selectFood('${food.foodName}')">${food.foodName}</div>`).join('');
    } else {
        suggestions.innerHTML = ''; // 清空结果
    }
}

// 选择食物
function selectFood(foodName) {
    const foodNameInput = document.getElementById('foodNameInput');
    foodNameInput.value = foodName; // 设置输入框的值为选择的食物
    document.getElementById('suggestions').innerHTML = ''; // 清空下拉列表
}

// 添加食物
function addFood() {
    const foodNameInput = document.getElementById('foodNameInput');
    const foodQuantityInput = document.getElementById('foodQuantityInput');
    const foodList = document.getElementById('foodList');
    const searchResult = document.getElementById('searchResult');

    const foodName = foodNameInput.value.trim();
    const foodQuantity = parseFloat(foodQuantityInput.value);

    if (foodName && !isNaN(foodQuantity) && foodQuantity > 0) {
        foodEntries.push({ name: foodName, quantity: foodQuantity });
        foodList.innerHTML += `<tr><td>${foodName}</td><td>${foodQuantity} 克</td></tr>`;
        foodNameInput.value = ''; // 清空输入框
        foodQuantityInput.value = ''; // 清空输入框
        searchResult.innerHTML = ''; // 清空搜索结果
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
            
            // 记录详细信息
            historyEntries.push({
                name: entry.name,
                quantity: quantity,
                totalCalories,
                totalProtein,
                totalCarbs,
                totalFat
            });
        } else {
            alert(`未找到名为 "${entry.name}" 的食物`);
        }
    }

    // 更新历史记录展示
    updateHistory();

    nutritionResult.innerHTML = `
        <h3>总摄入量</h3>
        <p>卡路里: ${totalCalories.toFixed(2)} 千卡</p>
        <p>蛋白质: ${totalProtein.toFixed(2)} 克</p>
        <p>碳水化合物: ${totalCarbs.toFixed(2)} 克</p>
        <p>脂肪: ${totalFat.toFixed(2)} 克</p>
    `;
}

// 更新历史记录展示
function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = historyEntries.map(entry => `
        <div class="history-card">
            <h3>${entry.name}</h3>
            <p>克数: ${entry.quantity} 克</p>
            <p>卡路里: ${entry.totalCalories.toFixed(2)} 千卡</p>
            <p>碳水化合物: ${entry.totalCarbs.toFixed(2)} 克</p>
            <p>蛋白质: ${entry.totalProtein.toFixed(2)} 克</p>
            <p>脂肪: ${entry.totalFat.toFixed(2)} 克</p>
        </div>
    `).join('');
}

// 清除历史记录
function clearHistory() {
    historyEntries = [];
    updateHistory();
}

// 绑定事件
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addFoodButton').addEventListener('click', addFood);
    document.getElementById('calculateTotalButton').addEventListener('click', calculateTotalIntake);
    document.getElementById('foodNameInput').addEventListener('input', searchFood); // 绑定输入事件
});
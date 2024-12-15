let foodEntries = []; // 存储用户输入的食物及其数量

// 加载食物数据
async function loadFoodData() {
    try {
        const response = await fetch('../../app/data/fooddata.json'); // 确保路径正确
        if (!response.ok) {
            throw new Error(`网络响应错误: ${response.status}`);
        }
        return await response.json(); // 返回解析后的 JSON 数据
    } catch (error) {
        console.error('加载食物数据失败:', error);
        return []; // 返回空数组以防止后续错误
    }
}

// 实时查找食物
async function searchFood() {
    const foodNameInput = document.getElementById('foodNameInput');
    const searchResult = document.getElementById('searchResult');
    const foodName = foodNameInput.value.trim();

    if (foodName) {
        const foodData = await loadFoodData(); // 加载食物数据
        const matchedFood = foodData.filter(item => item.foodName.toLowerCase().includes(foodName.toLowerCase())); // 查找匹配的食物

        // 渲染下拉列表
        searchResult.innerHTML = matchedFood.map(food => `<div onclick="selectFood('${food.foodName}')">${food.foodName}</div>`).join('');
    } else {
        searchResult.innerHTML = ''; // 清空结果
    }
}

// 选择食物
function selectFood(foodName) {
    const foodNameInput = document.getElementById('foodNameInput');
    foodNameInput.value = foodName; // 设置输入框的值为选择的食物
    document.getElementById('searchResult').innerHTML = ''; // 清空下拉列表
}

// 添加食物
// async function addFood() {
//     const foodNameInput = document.getElementById('foodNameInput');
//     const foodQuantityInput = document.getElementById('foodQuantityInput');
//     const foodQuantitySelect = document.getElementById('foodQuantitySelect');
//     const foodList = document.getElementById('foodList');

//     const foodName = foodNameInput.value.trim();
//     let foodQuantity = parseFloat(foodQuantityInput.value) || 0; // 默认值为0
//     const selectedQuantity = parseFloat(foodQuantitySelect.value);

//     // 验证输入
//     if (foodQuantity >= 0) {
//         // 如果用户手动输入了数量，使用手动输入的值
//     } else if (selectedQuantity >= 0) {
//         // 如果用户选择了数量，使用选择的值
//         foodQuantity = selectedQuantity;
//     } else {
//         alert('请输入有效的食物数量');
//         return; // 退出函数
//     }

//     // 只有在食物数量大于0时才添加到 foodEntries 数组
//     if (foodQuantity > 0) {
//         foodEntries.push({ name: foodName, quantity: foodQuantity });
//         // 获取食物的营养信息
//         const foodData = await loadFoodData(); // 加载食物数据
//         const food = foodData.find(item => item.foodName.includes(foodName));
//         if (food) {
//             const calories = (parseFloat(food.calories) * foodQuantity / 100).toFixed(2);
//             const protein = (parseFloat(food.protein) * foodQuantity / 100).toFixed(2);
//             const carbs = (parseFloat(food.carbs) * foodQuantity / 100).toFixed(2);
//             const fat = (parseFloat(food.fat) * foodQuantity / 100).toFixed(2);

//             // 在 foodList 表格中展示添加的食物信息
//             foodList.innerHTML += `
//                 <tr>
//                     <td>${foodName}</td>
//                     <td>${foodQuantity} 克</td>
//                     <td>${calories} 千卡</td>
//                     <td>${protein} 克</td>
//                     <td>${carbs} 克</td>
//                     <td>${fat} 克</td>
//                 </tr>
//             `;
//         } else {
//             alert(`未找到名为 "${foodName}" 的食物`);
//         }
//     }

//     foodNameInput.value = ''; // 清空输入框
//     foodQuantityInput.value = ''; // 清空输入框
//     foodQuantitySelect.value = ''; // 清空选择框
// }

async function addFood() {
    const foodNameInput = document.getElementById('foodNameInput');
    const foodQuantityInput = document.getElementById('foodQuantityInput');
    const foodQuantitySelect = document.getElementById('foodQuantitySelect');
    const foodList = document.getElementById('foodList'); // 确保这个 ID 在 HTML 中存在
    
    const foodName = foodNameInput.value.trim();
    let foodQuantity = parseFloat(foodQuantityInput.value) ; // 默认值为0
    const selectedQuantity = parseFloat(foodQuantitySelect.value);

        // 验证输入
        if (foodQuantity >= 0) {
            // 如果用户手动输入了数量，使用手动输入的值
        } else if (selectedQuantity >= 0) {
            // 如果用户选择了数量，使用选择的值
            foodQuantity = selectedQuantity;
        } else {
            // 如果选择的克数为0，给出提示
            alert('请选择有效克数');
            return; // 退出函数
        }

            // 获取食物的营养信息
    const foodData = await loadFoodData(); // 加载食物数据
    const food = foodData.find(item => item.foodName.includes(foodName));

    if (food) {
        const calories = (parseFloat(food.calories) * foodQuantity / 100).toFixed(2);
        const protein = (parseFloat(food.protein) * foodQuantity / 100).toFixed(2);
        const carbs = (parseFloat(food.carbs) * foodQuantity / 100).toFixed(2);
        const fat = (parseFloat(food.fat) * foodQuantity / 100).toFixed(2);

        foodList.innerHTML += `
            <tr>
                <td>${foodName}</td>
                <td>${foodQuantity} 克</td>
                <td>${calories} 千卡</td>
                <td>${protein} 克</td>
                <td>${carbs} 克</td>
                <td>${fat} 克</td>
            </tr>
        `;
    } else {
        alert(`未找到名为 "${foodName}" 的食物`);
    }

    foodNameInput.value = ''; // 清空输入框
    foodQuantityInput.value = ''; // 清空输入框
    foodQuantitySelect.value = ''; // 清空选择框
}


// 计算总摄入量
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

    // 更新营养结果展示
    const nutritionResult = document.getElementById('nutritionResult');
    nutritionResult.innerHTML = `
        <h3>总摄入量</h3>
        <p>每日卡路里: ${totalCalories.toFixed(2)} 千卡</p>
        <p>每日蛋白质: ${totalProtein.toFixed(2)} 克</p>
        <p>每日碳水化合物: ${totalCarbs.toFixed(2)} 克</p>
        <p>每日脂肪: ${totalFat.toFixed(2)} 克</p>
    `;
    console.log('nutritionResult:', nutritionResult);
    // 更新每日摄入量展示
    // document.getElementById('nutritionResult').innerHTML = nutritionResult.innerHTML;
    document.getElementById('dailyCaloriesResult').innerText = `每日卡路里: ${totalCalories.toFixed(2)} 千卡`;
    document.getElementById('dailyProteinResult').innerText = `每日蛋白质: ${totalProtein.toFixed(2)} 克`;
    document.getElementById('dailyCarbResult').innerText = `每日碳水化合物: ${totalCarbs.toFixed(2)} 克`;
    document.getElementById('dailyFatResult').innerText = `每日脂肪: ${totalFat.toFixed(2)} 克`;
}

// 绑定事件
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addFoodButton').addEventListener('click', addFood);
    document.getElementById('calculatetodayTotalButton').addEventListener('click', calculateTotalIntake); // 修改为正确的 ID
    document.getElementById('foodNameInput').addEventListener('input', searchFood); // 绑定输入事件
});
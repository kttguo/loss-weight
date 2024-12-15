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

import { getTotalCalories, setTotalCalories } from './dailycalculateutrition.js';

setTotalCalories(100); // 修改 totalCalories 的值

const totalCalories = getTotalCalories(); // 获取 totalCalories 的值
console.log('用户摄入的卡路里:', totalCalories); // 输出的将是0，因为在导入时 totalCalories 的值是0

// 判断是否制造了热量缺口
const dailyCaloricNeed = 2000; // 假设的每日卡路里需求
if (totalCalories < dailyCaloricNeed) {
    console.log('用户制造了热量缺口');
} else {
    console.log('用户没有制造热量缺口');
}

document.addEventListener('caloriesUpdated', (event) => {
    const totalCalories = event.detail.totalCalories;
    console.log('用户摄入的卡路里:', totalCalories);
});

import { calculateTotalIntake } from './dailycalculateutrition.js';

async function checkCalories() {
    const totalCalories = await calculateTotalIntake();
    console.log('用户摄入的卡路里:', totalCalories);
}

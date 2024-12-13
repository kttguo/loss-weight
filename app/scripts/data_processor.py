import json

def extract_food_data(input_file, output_file):
    # 存储处理后的食物数据
    foods = []

    # 读取原始 JSON 文件
    with open(input_file, 'r', encoding='utf-8') as f:
        for line in f:
            # 解析每一行的 JSON 数据
            food_data = json.loads(line)
            food_info = food_data.get('info', {})
            
            # 提取需要的字段
            food_entry = {
                'foodName': food_data.get('name', ''),
                'calories': food_info.get('能量', '0').replace('千卡', '') or '0',
                'protein': food_info.get('蛋白质', '0').replace('克', '') or '0',
                'carbs': food_info.get('碳水化合物', '0').replace('克', '') or '0',
                'fat': food_info.get('脂肪', '0').replace('克', '') or '0',
                'type': food_data.get('type', '0'),
                'url': food_data.get('url', '0')
            }
            
            # 添加到食物列表
            foods.append(food_entry)
    
    # 将处理后的数据写入新的 JSON 文件
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(foods, f, ensure_ascii=False, indent=2)
    
    print(f"成功处理 {len(foods)} 条食物数据，并写入 {output_file}")

# 执行数据转换
extract_food_data('app/data/food-table.json', 'app/data/fooddata.json')

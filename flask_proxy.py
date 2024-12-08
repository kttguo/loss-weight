from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # 启用 CORS

@app.route('/api/bilibili', methods=['GET'])
def bilibili_proxy():
    bvid = request.args.get('bvid')
    api_url = f'https://api.bilibili.com/x/web-interface/view?bvid={bvid}'
    
    try:
        response = requests.get(api_url)
        response.raise_for_status()  # 检查请求是否成功
        return jsonify(response.json())  # 返回 JSON 数据
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)  # 启动 Flask 服务器
#!flask/bin/python
from flask import Flask, jsonify


app = Flask(__name__)


tasks = [
    {
        'id': 1,
        'name': u'Polygon',
        'description': u'Site selection app'

    },
    {
        'id': 3,
        'name': u'Polygon2.0',
        'description': u'intelligent Site selection app'

    }
]

@app.route('/data', methods=['GET'])
def index():
    return jsonify({'tasks': tasks})


if __name__ == '__main__':
    app.run(debug=True)

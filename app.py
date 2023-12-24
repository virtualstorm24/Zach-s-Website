from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)


# Load CSV file
df = pd.read_csv('9-11-Memorial-Presentation.csv')

@app.route('/')
def index():
    return render_template('projects.html')

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    query = data['occupation_query']
    result_df = df[df['Occupation'].str.contains(query, case=False)]
    results_json = result_df.to_json(orient='records')
    return jsonify(results_json)

if __name__ == '__main__':
    app.run(debug=True)

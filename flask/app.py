from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt
from io import BytesIO
import matplotlib
import numpy as np

app = Flask(__name__)
matplotlib.use('Agg')  # Use Agg backend (non-interactive) for Matplotlib
CORS(app)

visited_counts = []  # Initialize an empty list to store visited counts

#=============================[Start Graph comparing days Visited Urls]====================================#

@app.route('/api/visited-count', methods=['POST'])
def receive_visited_count():
    data = request.json
    page = data.get('page')
    count = data.get('count')

    if page is not None and count is not None:
        visited_counts.append({'page': page, 'count': count})
        return jsonify({'message': 'Visited count received successfully', 'visited_counts': visited_counts})
    else:
        return jsonify({'error': 'Invalid data provided'})

@app.route('/api/get-visited-counts', methods=['GET', 'OPTIONS'])
def get_visited_counts():
    df = pd.DataFrame(visited_counts)

    # Check if 'page' and 'count' columns exist in the DataFrame
    if 'page' not in df.columns or 'count' not in df.columns:
        return jsonify({'error': 'Invalid data structure'})

    # Create a bar chart
    plt.bar(df['page'], df['count'], facecolor='black')
    # Save the plot to a BytesIO object
    img = BytesIO()
    plt.savefig(img, format='png', dpi=300)
    img.seek(0)
    # Clear the plot to avoid saving it to the same image multiple times
    plt.clf()
    # Return the image as a file
    visited_counts.clear()
    return send_file(img, mimetype='image/png')

#=============================[End Graph comparing days Visited Urls]====================================#

busy_times_data = []  # Initialize an empty list to store busy times data

@app.route('/receive-busy-times', methods=['POST'])
def receive_busy_times():
    try:
        # Assuming the incoming data is in JSON format
        json_data = request.get_json()

        # Process the received JSON data
        busy_times_data.clear()
        for item in json_data:
            hours = item.get('hours')
            amount = item.get('amount')

            if hours is not None and amount is not None:
                busy_times_data.append({'hours': hours, 'amount': amount})
            else:
                return jsonify({'error': 'Invalid data provided'})

        return jsonify({'success': True, 'message': 'JSON data received successfully', 'busy_times_data': busy_times_data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


@app.route('/get-busy-times-graph', methods=['GET'])
def get_busy_times_graph():
    try:
        df = pd.DataFrame(busy_times_data)

        # Check if 'hours' and 'amount' columns exist in the DataFrame
        if 'hours' not in df.columns or 'amount' not in df.columns:
            return jsonify({'error': 'Invalid data structure'})

        # Create a line graph
        plt.plot(df['hours'], df['amount'], marker='o', linestyle='-', linewidth=2, color='black')

        # Save the plot to a BytesIO object
        img = BytesIO()
        plt.savefig(img, format='png', dpi=300)
        img.seek(0)

        # Clear the plot to avoid saving it to the same image multiple times
        plt.clf()

        # Return the image as a file
        return send_file(img, mimetype='image/png')
    except Exception as e:
        return jsonify({'error': f'Error generating graph: {str(e)}'})
#=============================[Start Graph comparing Most VISITED URLS]====================================#
visited_websites_data = []  # Initialize an empty list to store visited websites data

@app.route('/receive-visited-websites', methods=['POST'])
def receive_visited_websites():
    try:
        # Assuming the incoming data is in JSON format
        json_data = request.get_json()

        # Process the received JSON data
        visited_websites_data.clear()
        for item in json_data:
            url = item.get('url')
            count = item.get('count')

            if url is not None and count is not None:
                visited_websites_data.append({'url': url, 'count': count})
            else:
                return jsonify({'error': 'Invalid data provided'})

        return jsonify({'success': True, 'message': 'JSON data received successfully', 'visited_websites_data': visited_websites_data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/get-visited-websites-graph', methods=['GET'])
def get_visited_websites_graph():
    try:
        df = pd.DataFrame(visited_websites_data)

        # Check if 'url' and 'count' columns exist in the DataFrame
        if 'url' not in df.columns or 'count' not in df.columns:
            return jsonify({'error': 'Invalid data structure'})

        # Create a horizontal stem graph with descending order
        plt.stem(df['url'][::-1], df['count'][::-1], basefmt='black', linefmt='black', markerfmt='ko', orientation='horizontal')

        # Add x-axis title
        plt.xlabel('Number of times website was visited')

        # Save the plot to a BytesIO object
        img = BytesIO()
        plt.savefig(img, format='png', dpi=300, bbox_inches='tight')
        img.seek(0)

        # Clear the plot to avoid saving it to the same image multiple times
        plt.clf()



        # Return the image as a file
        return send_file(img, mimetype='image/png')
    except Exception as e:
        return jsonify({'error': f'Error generating graph: {str(e)}'})

# ========================================================================= #
# Week website count Graph 
weekly_count=[]
@app.route('/week-url-count', methods=['POST'])
def week_url_count():
    data = request.get_json()
    page = data.get('page')
    count = data.get('count')

    if page is not None and count is not None:
        weekly_count.append({'page': page, 'count': count})
        return jsonify({'weekly_count': weekly_count})

@app.route('/weekly-url-count-graph', methods=['GET', 'OPTIONS'])
def week_url_count_graph():
    df = pd.DataFrame(weekly_count)
    # Check if 'page' and 'count' columns exist in the DataFrame
    if 'page' not in df.columns or 'count' not in df.columns:
        return jsonify({'error': 'Invalid data structure'})
    # Create a bar chart
    plt.bar(df['page'], df['count'], facecolor='black')
    # Save the plot to a BytesIO object
    img = BytesIO()
    plt.savefig(img, format='png', dpi=300)
    img.seek(0)
    # Clear the plot to avoid saving it to the same image multiple times
    plt.clf()
    # Return the image as a file
    weekly_count.clear()
    return send_file(img, mimetype='image/png')


# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ #
average_times = []  # Initialize an empty list to store busy times data

@app.route('/week-hours-average', methods=['POST'])
def week_hours():
    # Assuming the incoming data is in JSON format
    json_data = request.get_json()
    # Process the received JSON data
    average_times.clear()
    for index,item in enumerate(json_data):
        if index<12:
            hours = str(index)+'am'
        elif index==12:
            hours=str(index)+'pm'
        else:
            hours =str(index-12)+'pm'
        print(hours)
        amount = float(item)

        if hours is not None and amount is not None:
            average_times.append({'hours': hours, 'amount': amount})
        else:
            return jsonify({'error': 'Invalid data provided'})

    return jsonify({'average_times': average_times})
@app.route('/week-hours-average-graph', methods=['GET'])
def week_hours_graph():
    df = pd.DataFrame(average_times)
    # Check if 'hours' and 'amount' columns exist in the DataFrame
    if 'hours' not in df.columns or 'amount' not in df.columns:
        return jsonify({'error': 'Invalid data structure'})
    fig, ax = plt.subplots()
    # Create a line graph
    plt.plot(df['hours'], df['amount'], marker='o', linestyle='-', linewidth=2, color='black')

    step = 3
    plt.xticks(np.arange(0, len(df.index), step), df['hours'][::step])
    # Save the plot to a BytesIO object
    img = BytesIO()
    plt.savefig(img, format='png', dpi=300)
    img.seek(0)
    # Clear the plot to avoid saving it to the same image multiple times
    plt.clf()
    # Return the image as a file
    return send_file(img, mimetype='image/png')


if __name__ == '__main__':
    app.run(port=5000)
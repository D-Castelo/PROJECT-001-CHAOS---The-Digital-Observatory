
from flask import Flask, render_template, jsonify  # Imports Flask tools for webpages and JSON responses.
from CHAOS.chaos import observe  # Imports CHAOS's existing observation function.

app = Flask(__name__)  # Creates the Flask application.


@app.route("/")  # Defines the main dashboard address.
def home():  # Handles requests to the homepage.
    return render_template("index.html")  # Sends the HTML dashboard to the browser.


@app.route("/api/observation")  # Creates an API endpoint for system observations.
def get_observation():  # Handles requests from the dashboard for system data.
    observation = observe()  # Collects a fresh observation using CHAOS.
    return jsonify(observation)  # Converts the Python dictionary into a JSON response.


if __name__ == "__main__":  # Runs the server only when this file is executed directly.
    app.run(debug=True)  # Starts the local development server.

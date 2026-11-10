
from flask import Flask, render_template, jsonify
from CHAOS.chaos import observe

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/observation")
def get_observation():
    observation = observe()
    return jsonify(observation)


if __name__ == "__main__":
    app.run(debug=True)

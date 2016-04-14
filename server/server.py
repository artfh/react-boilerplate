from flask import Flask,request
app = Flask(__name__)

@app.route("/")
def index():
    return "Hello World!"


@app.route("/api/post_form", methods=['POST'])
def post_form():
    print '---------'
    print request
    print request.files
    f = request.files

    return "ok"


if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, render_template, request
from yt_url_manager import YtUrlManager
from yt_call_manager import YTCallManager
from db_manager import DbManager
from ml_model import Model
import json

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/analize", methods=["POST"])
def analize():
    url = request.form.get("url")
    video = YtUrlManager(url)
    try:
        videoId = video.video_id()
        cache = DbManager(videoId)
        if cache.exists():
            data = cache.get()
        else:
            yt_call = YTCallManager(videoId)
            data = yt_call.comments()
            if data.ret_code == 200:
                data = data.data
                model = Model(data)
                data = model.predict()
                cache.set(data)
            else:
                raise Exception("couldn't get the comments for this video")

        return render_template("dashboard.html", data=json.dumps(data))
    
    except Exception as e:
        return render_template("error.html", error = e)



if __name__=="__main__":
    app.run(host="localhost",port="5000",debug=True)
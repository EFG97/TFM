import re

class YtUrlManager():
    def __init__(self, url):
        self.url = url

    def video_id(self):
        # this method should check if the url is a youtube video url
        # if is not valid, should raise an error. 
        # if it's valid, should get the video id with the regular expresion behind

        # Regular expresion for getting the id from the yt url: https://webapps.stackexchange.com/questions/54443/format-for-id-of-youtube-video
        regex = r'[0-9A-Za-z_-]{10}[048AEIMQUYcgkosw]'
        match = re.search(regex, self.url)
        if not match:
            raise Exception("Couldn't get the video id from the url")
        else:
            return(match.group())

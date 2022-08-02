import redis
from configs import host, port, seconds_to_expire
import json

class DbManager():
    def __init__(self, videoId):
        
        self.videoId = videoId
        self.__r = redis.Redis(host=host,port=port)
    
    def exists(self):
        exists = self.__r.exists(self.videoId)
        return exists

    def get(self):
        
        data = self.__r.get(self.videoId)
        data = json.loads(data)
        return data
    
    def set(self, data):
         
        data = json.dumps(data)
        self.__r.setex(self.videoId,seconds_to_expire,data)
        
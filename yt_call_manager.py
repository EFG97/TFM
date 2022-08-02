from configs import DEVELOPER_KEY
import os.path
from googleapiclient.discovery import build
from reponse_class import ResponseClass
from yt_url_manager import YtUrlManager

class YTCallManager:
    def __init__(self, videoId):
        self.__key =  DEVELOPER_KEY
        self.videoId = videoId
        
    def __get_all_comments(self):

        # Disable OAuthlib's HTTPS verification when running locally.
        # *DO NOT* leave this option enabled in production.
        os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

        api_service_name = "youtube"
        api_version = "v3"

        youtubeConnection = build(
            api_service_name, api_version, developerKey = self.__key)

        response_list = []

        response = self.__get_page_comments(youtubeConnection)
        i=1
        while "nextPageToken" in response and i<=19: # limited to 20 api calls
            nextPageToken = response["nextPageToken"]
            response_list.append(response)
            response = self.__get_page_comments(youtubeConnection,nextPageToken)
            i+=1
        else:
            response_list.append(response)

        return response_list
    
    def __get_page_comments(self, youtubeConnection, nextPageToken=None):
    
        if nextPageToken:
            request = youtubeConnection.commentThreads().list(
                part="snippet",#,replies",
                videoId=self.videoId, 
                maxResults=100,
                textFormat="plainText",
                order="relevance",
                pageToken = nextPageToken
            )

        else:
            request = youtubeConnection.commentThreads().list(
                part="snippet",#,replies",
                videoId=self.videoId, 
                maxResults=100,
                textFormat="plainText",
                order="relevance"
            )
        
        response = request.execute()
        return response

    def __format_comments(self, response_list):

        # Top Level comment and replies at same level in a dict
        comments = []
        comment_object = {}
        for page in response_list:
            for comment_thread in page["items"]:
                topLevelComment = comment_thread["snippet"]["topLevelComment"]
                '''
                comments[topLevelComment["id"]] = {
                    "textDisplay":topLevelComment["snippet"]["textDisplay"],
                    "updatedAt":topLevelComment["snippet"]["updatedAt"],
                    "likeCount":topLevelComment["snippet"]["likeCount"],
                }
                '''
                comment_object = {
                    "textDisplay":topLevelComment["snippet"]["textDisplay"],
                    "updatedAt":topLevelComment["snippet"]["updatedAt"],
                    "likeCount":topLevelComment["snippet"]["likeCount"],
                }

                comments.append(comment_object)

                '''
                if "replies" in comment_thread:
                    for reply in comment_thread["replies"]["comments"]:
                        comments[reply["id"]] = {
                            "textDisplay":reply["snippet"]["textDisplay"],
                            "updatedAt":reply["snippet"]["updatedAt"],
                            "likeCount":reply["snippet"]["likeCount"],
                        }
                '''
        return comments

    def comments(self):
        responseObject = ResponseClass()
        try:
            comments = self.__get_all_comments()
            comments = self.__format_comments(comments)

        except Exception as e:
            responseObject.ret_code=400
            responseObject.error_message=e
        
        else:
            responseObject.ret_code=200
            responseObject.data=comments
        
        finally:
            return(responseObject)

if __name__=="__main__":
    url = YtUrlManager("https://www.youtube.com/watch?v=NIWwJbo-9_8")
    videoId = url.video_id()
    videoComments = YTCallManager(videoId)
    comentarios = videoComments.comments()
    print(comentarios.ret_code)
    print(comentarios.error_message)
    print(comentarios.data)
    
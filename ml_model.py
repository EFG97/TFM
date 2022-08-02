from configs import model_name
import pickle

class Model:
    def __init__(self, data):
        self.__model = pickle.load(open(model_name,"rb"))
        self.data = data

    def predict(self):
        for comment in self.data:
            comment["prediction"] = self.__model.polarity_scores(comment["textDisplay"])
        return self.data

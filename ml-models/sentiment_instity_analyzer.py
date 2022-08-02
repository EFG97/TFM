import nltk
nltk.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer
import pickle

sia  = SentimentIntensityAnalyzer()
name = "models/sia.sav"
pickle.dump(sia, open(name,"wb"))
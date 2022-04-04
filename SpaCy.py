import spacy
from spacy import displacy
import sys
import json
import time


spacy.prefer_gpu()
nlp = spacy.load('en_core_web_trf')

isReady = input()
print("ready")
sys.stdout.flush()
# time.sleep(0.1)

while True:
    c = input()
    
    Message = c.rstrip()
    Query = json.loads(Message)
    Data = Query["query"]
    doc = nlp(Data)
    result = {"tag": Query["tag"], "results": doc.to_json()}
    # convert result from single qoute to double qoute
    result = json.dumps(result)
    print(result)
    # Flush all the print statements from console
    # sys.stdout.write(result)
    sys.stdout.flush()
    time.sleep(0.1)

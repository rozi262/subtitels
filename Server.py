import Files as fm

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from waitress import serve
from User import User, getUser
from Convertor import srtAdder

app = Flask(__name__)
cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

#general methods
def sendRespone(text, data2="",data3=""): #convert text to json dataform to send
    response = jsonify({"data":text,"data2":data2,"data3":data3})

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def findUser() -> User:
    ipA = request.environ.get("REMOTE_ADDR")
    ip = ""
    for c in ipA:
        if(c.isnumeric()): ip += c
    return getUser(ip)

@app.route("/server_test/") #test connection to the server
def serverTest():
    return sendRespone("server connection test")
    

@app.route("/send_srt", methods=['POST'])
def sendStr():
    user = findUser()
    file = request.files.get("file")
    user.get_srt_from_audio(file)
    return sendRespone("resived the file: [" + file.name + "]")

@app.route("/get_srt", methods=['GET'])
def getStr():
    user = findUser()
    messege,progress, done = user.get_srt_from_audio_report()
    #print("ask got [" + str(done) +"] with messege [" + messege + "]")
    if(done):
        return sendRespone(messege,"T",progress)
    return sendRespone(messege,"F",progress)



    
    
    
    
    

if(__name__ == "__main__"): #start the server
    print("start server")
    serve(app,host="localhost",port=8000)


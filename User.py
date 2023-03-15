import Files as fm

from Convertor import srtAdder

class User():
    def __init__(self, ip):
        self.ip = ip
        self.srt_adder = None
        
    #the srt methods
    def get_srt_from_audio(self, file):
        path = fm.STORGE_FOLDER + "file" + str(self.ip) +"." +  fm.get_content_type(file.content_type)
        file.save(path)
        self.srt_adder = srtAdder(path)
    
    def get_srt_from_audio_report(self):    #return thre varibales messege||text - if the program is done the value will be the srl else the value will be the last line converted, progress - progress report, done - boolean that say if the program finished or not
        messege = self.srt_adder.getMessege()
        progress,text = self.srt_adder.getProgress()
        done = self.srt_adder.isDone()
        return (messege if done else text),progress,done
    
    def get_str_from_audio_path(self):
        if(not self.srt_adder.isDone()): 
            print("error ask for srl file when the server is still loading")
            return ""
        messege = self.srt_adder.getMessege()
        self.srt_adder = None
        return messege

        

    def __str__(self) -> str:
        return "user [" + str(self.ip) + "]"

class Sign_User(User):
    def __init__(self, ip):
        super.__init__(ip)

global ARR
ARR = {}

def getUser(ip) -> User:
    res = ARR.get(ip)
    if(not res is None): return res
    user = User(ip)
    ARR[ip] = user
    return user


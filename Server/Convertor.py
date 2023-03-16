import whisper
import ffmpeg

from threading import Thread

def get_subtitels(path,model="base", file_path=True, arr:list = None):
    print("run with model [" + model + "]")
    def covert_wisper_time(time):
        hours = int(time // 3600)
        minutes = int((time // 60) % 60)
        seconds = int(time % 60)
        mils = int((time % 1) * 1000)
        return str(hours) + ":" + str(minutes) + ":" + str(seconds) + "," + str(mils)
        
        
    yield "listening"
    model = whisper.load_model(model)

    try: #run the model with
        result = model.transcribe(path,verbose=False,arr=arr)
    except:
        result = model.transcribe(path,verbose=False)


    yield "converting to srt"

    sugs = result.get("segments")
    content = ""
    for i,v in enumerate(sugs):
            content += "\n" + str(i + 1) + "\n" + covert_wisper_time(v.get("start")) + " --> " + covert_wisper_time(v.get("end")) + "\n" + v.get("text") + "\n"
    if(not file_path): 
        yield content
        return 

    with open("subs.srt","w") as f:
        f.write(content)
        f.close()
    yield "subs.srt"
    return "subs.srt"

def add_subtitels(path,model="base"):
    subs = get_subtitels(path,model)
    video = ffmpeg.input(path)
    audio = video.audio
    ffmpeg.concat(video.filter("subtitles", subs), audio, v=1, a=1).output("res.mp4").run()


class srtAdder:#mange by thread the subtitels adding
    
    def __init__(self, path, quality="base"):
        self.path = path
        self.quality = quality
        self.messege = "not started"
        self.last_text = ""
        self.report_arr = []
        self.report_arr.append([0,"prestart"])

        self.thread = Thread(target=self.getter,args=[])
        self.thread.start()

    def getter(self):
        print("start")
        for v in get_subtitels(self.path,model=self.quality,file_path=False,arr=self.report_arr):
            #print("get value " + str(v))
            self.messege = v

    def getProgress(self):
        if(len(self.report_arr) == 0): return "start","prestart"
        last = self.report_arr[-1]
        return last[0],last[1]

    def getMessege(self) ->str:
        return self.messege

    def isDone(self) -> bool:
        return not self.thread.is_alive()

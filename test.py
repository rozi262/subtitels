import time

def t():
    time.sleep(1)
    yield "y1"
    time.sleep(2)
    yield "res"
    return "res"

for v in t():
    print(v)
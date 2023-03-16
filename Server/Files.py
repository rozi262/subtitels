
STORGE_FOLDER = "F:\\storge\\servers\\sub_titels\\"

def get_file_type(path) -> str:
    str = ""
    for i in range(len(path) - 1,0,-1):
        if(path[i] == '.'): break
        if(path[i] == "\\"): return ""
        str += path[i]
    return str[::-1]

def get_content_type(path) -> str:
    return path[get_last_slash(path) + 1:]

def get_last_slash(path) -> int:
    for i in range(len(path) - 1,-1,-1):
        if(path[i] == "\\" or path[i] == '/'): return i
    return -1
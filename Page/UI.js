//just test the server connection
//SERVER_GET("server_test","page",()=>{})

const MARGIN = 30;
const TOP_HEIGHT = 100
const SIDE_WIDTH = 300

const DROP_AREA = document.getElementById("drop_area");
DROP_AREA.style.top = (TOP_HEIGHT + MARGIN) + "px";
DROP_AREA.style.left = MARGIN + "px";

const DROP_OBJECT = document.getElementById("drop_object")

const PROGRESS_AREA = document.getElementById("progress_area")
PROGRESS_AREA.style.top = (TOP_HEIGHT + MARGIN) + "px";
PROGRESS_AREA.style.width = (SIDE_WIDTH - MARGIN) + "px";

const PROGRESS_DIV = document.getElementById("progress_label_div");
const PRESENTES_LABEL = document.getElementById("presentes_label");

const QUALITY_SELECTOR_LABEL = document.getElementById("quality_selector_label");
QUALITY_SELECTOR_LABEL.style.top = "0px"

const QUALITY_SELECTOR = document.getElementById("quality_selector")
QUALITY_SELECTOR.value = "large";
QUALITY_SELECTOR.style.top = (MARGIN * 2) + "px"

const USER = new User();

function reload()
{
    PAGE_HEIGHT = document.documentElement.clientHeight - 70;
    PAGE_WIDTH = document.documentElement.clientWidth - 10;

    DROP_AREA.style.width = (PAGE_WIDTH - SIDE_WIDTH - MARGIN * 2) + "px"
    DROP_AREA.style.height = (PAGE_HEIGHT - TOP_HEIGHT - MARGIN * 2) + "px"
    
    PROGRESS_AREA.style.left = (PAGE_WIDTH - SIDE_WIDTH ) + "px"
    PROGRESS_AREA.style.height = DROP_AREA.style.height;

    QUALITY_SELECTOR_LABEL.style.left = PROGRESS_AREA.style.left;
    QUALITY_SELECTOR.style.left = PROGRESS_AREA.style.left;

    console.log((PAGE_WIDTH - SIDE_WIDTH - MARGIN * 2))
}
reload()



//progress bar methods
let locY = 0;
const LINE_MARGIN = 20;
const Lines = [];
class Line
{
    constructor(text)
    {
        this.y = LINE_MARGIN + ((Lines.length == 0)?0:(Lines[Lines.length - 1].y + Lines[Lines.length - 1].height));
        this.element = document.createElement("label");
        this.element.classList.add("ProgressLabel");
        this.element.textContent = text;
        this.element.style.width =  PROGRESS_DIV.style.width;
        
        PROGRESS_DIV.append(this.element)

        this.height = this.element.offsetHeight;
        this.element.style.height = this.height + "px";
        this.updateLoction()
    }
    updateLoction()
    {
        if(this.y + this.height < locY || this.y > locY + PROGRESS_DIV.offsetHeight)
        {
            this.element.style.visibility = "hidden";
            return;
        }
        this.element.style.visibility = "visible";
        this.element.style.top = (this.y - locY) + "px";
    }
}
class ProgressLabel
{
    constructor()
    {
        this.scrolling = false;
        this.startTime = Date.now()
    }
    add_to_progressbar(text)
    {
        if(Lines.length != 0 && Lines[Lines.length - 1].element.textContent == text) return;
        Lines[Lines.length] = new Line(text);
        if(!this.scrolling)  this.scroll(500);
    }
    scroll(amount)
    {
        const max_y = Lines.length == 0?0:(Math.max(0,Lines[Lines.length - 1].y + Lines[Lines.length - 1].height - PROGRESS_DIV.offsetHeight));
        locY = Math.max(Math.min(locY + amount,max_y),0);
        this.scrolling = locY != max_y;
        for(let i = 0; i < Lines.length; i++)
            Lines[i].updateLoction();
    }

    set_prorgess_val(presentes)
    {
        
        const time_pass = Date.now() - this.startTime;
        const progress1 = presentes / 100;
        const time_left = parseInt(((time_pass / progress1) - time_pass) / 100) / 10;

        PRESENTES_LABEL.textContent = parseInt(presentes) + "%" + ", left: " + time_left + " secands";
    }

}
PROGRESS_BAR = new ProgressLabel();
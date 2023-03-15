

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

const USER = new User();

function reload()
{
    PAGE_HEIGHT = document.documentElement.clientHeight - 70;
    PAGE_WIDTH = document.documentElement.clientWidth - 10;

    DROP_AREA.style.width = (PAGE_WIDTH - SIDE_WIDTH - MARGIN * 2) + "px"
    DROP_AREA.style.height = (PAGE_HEIGHT - TOP_HEIGHT - MARGIN * 2) + "px"
    
    PROGRESS_AREA.style.left = (PAGE_WIDTH - SIDE_WIDTH ) + "px"
    PROGRESS_AREA.style.height = DROP_AREA.style.height;

    console.log((PAGE_WIDTH - SIDE_WIDTH - MARGIN * 2))
}
reload()



//progress bar methods
let locY = 0;
const DIV_HEIGHT = PROGRESS_DIV.offsetHeight;
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
        if(this.y + this.height < locY || this.y > locY + DIV_HEIGHT)
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
    }
    add_to_progressbar(text)
    {
        if(Lines.length != 0 && Lines[Lines.length - 1].element.textContent == text) return;
        Lines[Lines.length] = new Line(text);
        if(!this.scrolling)  this.scroll(500);
    }
    /*remove_last_line()
    {
        const text = PROGRESS_LABEL.textContent.substring(0,PROGRESS_LABEL.textContent.length - this.lastLine.length - 1);
        PROGRESS_LABEL.textContent = text;
        let build = ""
        for(let i = text.length - 1; i >= 0; i--)
        {
            const a = text.charAt(i);
            if(a == '\n') break
            else build += a;
        }
        this.lastLine = build.split("").reverse().join("");
    }*/
    scroll(amount)
    {
        const max_y = Lines.length == 0?0:(Math.max(0,Lines[Lines.length - 1].y + Lines[Lines.length - 1].height - DIV_HEIGHT));
        locY = Math.max(Math.min(locY + amount,max_y),0);
        this.scrolling = locY != max_y;
        for(let i = 0; i < Lines.length; i++)
            Lines[i].updateLoction();
    }

    set_prorgess_val(presentes)
    {
        PRESENTES_LABEL.textContent = parseInt(presentes) + "%";
    }

}
PROGRESS_BAR = new ProgressLabel();
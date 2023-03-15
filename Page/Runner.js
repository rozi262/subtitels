
function downloadFile(name, text)//download file that contain "text" as download it with the name ""
{
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download',name);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


function DropEvent(event)
{
    console.log(event.target.files)
    USER.upload_file(event.target.files[0], res=>
        {
            PROGRESS_BAR.add_to_progressbar(res)
            const check_for_update = (messege,done,progress) => 
            {
                if(done == 'T')//the file is the stl file
                {
                    downloadFile("subtitels.srt",messege)
                    PRESENTES_LABEL.textContent = "done"
                }
                else
                {
                    PROGRESS_BAR.set_prorgess_val(progress);
                    PROGRESS_BAR.add_to_progressbar(messege);
                    setTimeout(()=>{USER.get_file(check_for_update)},1000);
                }
            };
            USER.get_file(check_for_update)
        });
    dragLeaveEvent(event)
}

function dragEnterEvent(event)
{
    DROP_AREA.style.backgroundColor = "#00ff00"
    console.log("draw start")
}
function dragLeaveEvent(event)
{
    DROP_AREA.style.backgroundColor = "#ffe4c4"
    console.log("draw done")
}

DROP_OBJECT.addEventListener("change",ev => DropEvent(ev));
DROP_OBJECT.addEventListener("dragenter",ev => dragEnterEvent(ev));
DROP_OBJECT.addEventListener("dragleave",ev => dragLeaveEvent(ev));

addEventListener("resize",()=>{reload(); PROGRESS_BAR.scroll(0);})
addEventListener("wheel",(event)=>
{
    PROGRESS_BAR.scroll(parseInt(event.deltaY / 8));
});
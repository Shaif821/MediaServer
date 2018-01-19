
function postit()
{
  var note=document.createElement('div');
  note.className="postit";
  note.draggable="true";
  note.style.left = Math.floor(400*Math.random())+"px";
  note.style.top  = Math.floor(600*Math.random())+"px";

  var removeButton=document.createElement('a');
  removeButton.innerHTML = "X";
  note.appendChild(removeButton);

  var noteText=document.createElement('div');
  noteText.className="postit-text";
  noteText.innerHTML="ClickHereToEdit";
  noteText.contentEditable="true";
  note.appendChild(noteText);

  note.addEventListener("mousedown",  function(event){postit_mousedown(this,event)}, false);
  note.addEventListener("mousemove",  function(event){postit_mousemove(event)}, false);
  note.addEventListener("mouseup",    function(event){postit_mouseup  (event)}, false);

  removeButton.addEventListener("click",      function(event){removePostit(this.parentNode);}, false);

  
  document.onmousemove=function(event){postit_mousemove(event);};
  document.getElementsByTagName('body')[0].appendChild(note);
}




function removePostit(postit)
{
  postit.parentNode.removeChild(postit);
}





function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
 
      xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
      yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}



var mouseDownX=0;
var mouseDownY=0;

var downClientX = 0;
var downClientY = 0;
var currentDraggedPostit = null;

function postit_mousedown(postit, event)
{
  currentDraggedPostit = postit;
  mouseDownX = parseInt(event.pageX);
  mouseDownY = parseInt(event.pageY);

  var position = getPosition(postit);
  
  downClientX = position.x;
  downClientY = position.y;

console.log("position.x=["+position.x+"]");
console.log("position.y=["+position.y+"]");
  
}
function postit_mousemove(event)
{
  if (currentDraggedPostit)
  {
    var deltaX = parseInt(event.pageX)-mouseDownX;
    var deltaY = parseInt(event.pageY)-mouseDownY;
    var newX = downClientX + deltaX;
    var newY = downClientY + deltaY;
   
    currentDraggedPostit.style.left = ""+newX+"px";
    currentDraggedPostit.style.top = ""+newY+"px";
  }
}

function postit_mouseup(event)
{
  currentDraggedPostit = null;
}

window.onload=function()
{
	imgLocation("container","box");
	var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},]};
	window.onscroll=function(){
		if(checkFlag())
		{
			var cparent=document.getElementById("container");
			for(var i=0;i<imgData.data.length;i++)
			{
				var ccontent = document.createElement("div");
				ccontent.className="box";
				cparent.appendChild(ccontent);
				var boxing = document.createElement("div");
				boxing.className="box_img";
				ccontent.appendChild(boxing);
				var img=document.createElement("img");
				img.src="images/"+imgData.data[i].src;
				boxing.appendChild(img);
			}
			imgLocation("container","box");
		}
	}
}

function checkFlag(){
	var cparent = document.getElementById("container");
	var ccontent = getChildElement(cparent,"box");
	var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
	if(lastContentHeight<scrollTop+pageHeight)
	{
		return true;
	}

}

function imgLocation(parent,content)
{//将parent下的content全部取出
	var cparent=document.getElementById(parent);
	var ccontent=getChildElement(cparent,content);
	var imgwidth=ccontent[0].offsetWidth;
	//每一行的数量
	var num=Math.floor(document.documentElement.clientWidth/imgwidth);
	cparent.style.cssText="width:"+imgwidth*num+"px;margin:0 auto";
	//得到所有盒子的高度
	var BoxHeightArr=[];
	for(var i=0;i<ccontent.length;i++)
	{
		if(i<num)
		{
			BoxHeightArr[i]=ccontent[i].offsetHeight;
			//console.log(BoxHeightArr[i]);
		}
		else
		{
			var minHeight=Math.min.apply(null,BoxHeightArr);
			var minIndex=getminHeightLocation(BoxHeightArr,minHeight);
			//console.log(minHeight);
			ccontent[i].style.position="absolute";
			ccontent[i].style.top=minHeight+"px";
			ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
			BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
		}
	}
}



function getminHeightLocation(BoxHeightArr,minHeight){
	for(var i in BoxHeightArr)
	{
		if(BoxHeightArr[i]==minHeight)
		{
			return i;
		}
	}
}
function getChildElement(parent,content)
{
	var contentArr=[];

	var allcontent=parent.getElementsByTagName("*");
	for(var i=0;i<allcontent.length;i++)
	{
		if(allcontent[i].className==content)
		{
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}
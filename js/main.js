var cans=document.getElementById("canvas");
var cxt=cans.getContext("2d");
var imgs=document.getElementById("imgs");
var boom=document.getElementById("boom");
var arr=34;//英雄;

function point(x,y){
	this.x=x;
	this.y=y;
}
var k=0;//初始化关卡;
var herotank=new herotanks(150,450,4);

var num=3;//初始化坦克数量;
var emerytanks=new Array();
var emerybullets=new Array();
for(var i=0;i<num;i++)
{
	var emerytank=new emerytankb((i+1)*100,0,4);
	emerytanks[i]=emerytank;
	emerytanks[i].timer= setInterval(emerytanks[i].run,50);
	emerybullets.push(new bullet(emerytanks[i].x+14,emerytanks[i].y+28,emerytanks[i].dirction,emerytanks[i],"emetank"));
	emerybullets[i].timer=setInterval(emerybullets[i].run,50);
}

//定义英雄子弹
var herobullets=new Array();
var herobullet=null;


function next(){
	k++;
	herotank.alive=false;
	herotank=new herotanks(150,450,4); 
	for(var i=0;i<emerybullets.length;i++){
	emerybullets[i].alive=false;
	clearInterval(emerybullets[i].timer);
}
	emerytanks=[];
	emerybullets=[];
	for(var q=0;q<num;q++){							
	var emerytank=new emerytankb((q+1)*150,0,4);
	emerytanks[q]=emerytank;
	emerytanks[q].timer= setInterval(emerytanks[q].run,50);
	emerybullets.push(new bullet(emerytanks[q].x+13,emerytanks[q].y+28,emerytanks[q].dirction,emerytanks[q],"emetank"));
	emerybullets[q].timer=setInterval(emerybullets[q].run,50);
}
	flashmap();
	
}
function drawmap(leavel){
	for(var i=0;i<leavel.length;i++){
		for(var j=0;j<leavel[i].length;j++){
			switch(leavel[i][j]){
				case 1:
					cxt.drawImage(imgs,0,96,16,16,j*16,i*16,16,16);
					break;
				case 2:
					cxt.drawImage(imgs,16,96,16,16,j*16,i*16,16,16);
					break;
				case 3:
					cxt.drawImage(imgs,256,0,32,32,j*16,i*16,32,32);
					break;
				case 4:
					cxt.drawImage(imgs,16,96,16,16,j*16,i*16,16,16);
					break;
				case 5:
					cxt.drawImage(imgs,0,96,16,16,j*16,i*16,16,16);
					break;
				case 6:
					cxt.drawImage(imgs,32,96,16,16,j*16,i*16,16,16);
					break;
			}
		}
	}
	if(herotank.alive){
		cxt.drawImage(imgs,arr,66,28,28,herotank.x,herotank.y,28,28);
	}
	for(var z=0;z<emerytanks.length;z++){
		cxt.drawImage(imgs,emerytanks[z].brr,66,28,28,emerytanks[z].x,emerytanks[z].y,28,28);
	}
}

drawmap(leavels[k]);

var left=false;
var tops=false;
var right=false;
var bottom=false;
var zidan=false;
document.body.onkeydown=function(event){
	var sec=event.keyCode;
	switch(sec){
		case 87:
			tops=true;
			break;
		case 68:
			right=true;
			break;
		case 83:
			bottom=true;
			break;
		case 65:
			left=true;
			break;
		case 74:
			zidan=true;
			break;
	}
}
document.body.onkeyup=function(event){
	var sec=event.keyCode;
	switch(sec){
		case 87:
			tops=false;
			break;
		case 68:
			right=false;
			break;
		case 83:
			bottom=false;
			break;
		case 65:
			left=false;
			break;
		case 74:
			zidan=false;
			break;
	}
}
setInterval(function(){
	var p1;
	if(tops){
		arr=34;
		p1=new point(herotank.x,herotank.y-herotank.speed);
		herotank.dirction=1;
		if(move(p1,emerytanks)){
			herotank.x=p1.x;
			herotank.y=p1.y;
		}
	}
	else if(right){
		arr=64;
		p1=new point(herotank.x+herotank.speed,herotank.y);
		herotank.dirction=2;
		if(move(p1,emerytanks)){
			herotank.x=p1.x;
			herotank.y=p1.y;
		}
	}
	else if(bottom){
		arr=2;
		p1=new point(herotank.x,herotank.y+herotank.speed);
		herotank.dirction=3;
		if(move(p1,emerytanks)){
			herotank.x=p1.x;
			herotank.y=p1.y;
		}
	}
	else if(left){
		arr=98;
		p1=new point(herotank.x-herotank.speed,herotank.y);
		herotank.dirction=4;
		if(move(p1,emerytanks)){
			herotank.x=p1.x;
			herotank.y=p1.y;
		}
	}
	else if(zidan){
		herotank.shotemery();
	}
},50)
function flashmap(){
	cxt.clearRect(0,0,480,480);
	drawmap(leavels[k]);
	drawherobullet(herobullets);
	drawemerybullet(emerybullets);
}
var cuanzi=false;
function move(p1,obj,type)
{
	if(p1.x<0 || p1.x>cans.width-28)return false;
	if(p1.y<0|| p1.y>cans.height-28)return false;
	if(obj==emerytanks)
	{
			for(var m=0;m<emerytanks.length;m++){
			if(p1.x>=emerytanks[m].x && p1.x<=emerytanks[m].x+28 && p1.y>=emerytanks[m].y && p1.y<=emerytanks[m].y+28
			||p1.x+28>=emerytanks[m].x && p1.x+28<=emerytanks[m].x+28 && p1.y>=emerytanks[m].y && p1.y<=emerytanks[m].y+28
			||p1.x>=emerytanks[m].x && p1.x<=emerytanks[m].x+28 && p1.y+28>=emerytanks[m].y && p1.y+28<=emerytanks[m].y+28
			||p1.x+28>=emerytanks[m].x && p1.x+28<=emerytanks[m].x+28 && p1.y+28>=emerytanks[m].y && p1.y+28<=emerytanks[m].y+28)
			return false;
		}
	}
	if(obj==herotank){
		if(p1.x>=herotank.x && p1.x<=herotank.x+28 && p1.y>=herotank.y && p1.y<=herotank.y+28
		||p1.x+28>=herotank.x && p1.x+28<=herotank.x+28 && p1.y>=herotank.y && p1.y<=herotank.y+28
		||p1.x>=herotank.x && p1.x<=herotank.x+28 && p1.y+28>=herotank.y && p1.y+28<=herotank.y+28
		||p1.x+28>=herotank.x && p1.x+28<=herotank.x+28 && p1.y+28>=herotank.y && p1.y+28<=herotank.y+28)
		return false;
		for(var s=0;s<emerytanks.length;s++){
			if(emerytanks[s]!=type){
				if(p1.x>=emerytanks[s].x && p1.x<=emerytanks[s].x+28 && p1.y>=emerytanks[s].y && p1.y<=emerytanks[s].y+28
				||p1.x+28>=emerytanks[s].x && p1.x+28<=emerytanks[s].x+28 && p1.y>=emerytanks[s].y && p1.y<=emerytanks[s].y+28
				||p1.x>=emerytanks[s].x && p1.x<=emerytanks[s].x+28 && p1.y+28>=emerytanks[s].y && p1.y+28<=emerytanks[s].y+28
				||p1.x+28>=emerytanks[s].x && p1.x+28<=emerytanks[s].x+28 && p1.y+28>=emerytanks[s].y && p1.y+28<=emerytanks[s].y+28)
				return false;
			}
			
		}
	}
	for(var i=0;i<leavels[k].length;i++){
		for(var j=0;j<leavels[k][i].length;j++){
			switch(leavels[k][i][j]){
				case 1:
				case 2:
				case 4:
				case 5:
					if(p1.x>=j*16 &&p1.x<=(j+1)*16 && p1.y>=i*16 && p1.y<=(i+1)*16
					|| p1.x>=j*16 &&p1.x<=(j+1)*16 && p1.y+28>=i*16 && p1.y+28<=(i+1)*16
					|| p1.x+28>=j*16 &&p1.x+28<=(j+1)*16 && p1.y>=i*16 && p1.y<=(i+1)*16
					|| p1.x+28>=j*16 &&p1.x+28<=(j+1)*16 && p1.y+28>=i*16 && p1.y+28<=(i+1)*16
					|| p1.x<=j*16 && p1.x+28>=(j+1)*16 && p1.y>=i*16 && p1.y<=(i+1)*16
					|| p1.x<=j*16 && p1.x+28>=(j+1)*16 && p1.y+28>=i*16 && p1.y+28<=(i+1)*16
					||p1.x>=j*16 && p1.x<=(j+1)*16 && p1.y<=i*16 && p1.y+28>=(i+1)*16
					|| p1.x+28>=j*16 && p1.x+28<=(j+1)*16 && p1.y<=i*16 && p1.y+28>=(i+1)*16
					){
						return false;
					}
					break;
				case 3:					
					if(p1.x>=j*16 &&p1.x<=(j+2)*16 && p1.y>=i*16 && p1.y<=(i+2)*16
					|| p1.x>=j*16 &&p1.x<=(j+2)*16 && p1.y+28>=i*16 && p1.y+28<=(i+2)*16
					|| p1.x+28>=j*16 &&p1.x+28<=(j+2)*16 && p1.y>=i*16 && p1.y<=(i+2)*16
					|| p1.x+28>=j*16 &&p1.x+28<=(j+2)*16 && p1.y+28>=i*16 && p1.y+28<=(i+2)*1){
						return false;
					}
					break;
			}
		}
	}
	if(flag){
			if(herotank.x>=product.x && herotank.x<=product.x+26 && herotank.y>=product.y && herotank.y<=product.y+26
			||herotank.x+28>=product.x && herotank.x+28<=product.x+26 && herotank.y>=product.y && herotank.y<=product.y+26
			||herotank.x>=product.x && herotank.x<=product.x+26 && herotank.y+28>=product.y && herotank.y+28<=product.y+26
			||herotank.x+28>=product.x && herotank.x+28<=product.x+26 && herotank.y+28>=product.y && herotank.y+28<=product.y+26
			||herotank.x<=product.x && herotank.x>=product.x+26 && herotank.y>=product.y && herotank.y<=product.y+26
			||herotank.x+28<=product.x && herotank.x+28>=product.x+26 && herotank.y+28>=product.y && herotank.y+28<=product.y+26
			||herotank.x>=product.x && herotank.x<=product.x+26 && herotank.y<=product.y && herotank.y+28>=product.y+26
			||herotank.x+28>=product.x && herotank.x+28<=product.x+26 && herotank.y>=product.y && herotank.y+28<=product.y+26
			){
				switch(n){
					case 0:
						$("#pic").style.display="none";
						var _li=document.createElement("li");
						_li.className="lis";
						$("#uls").appendChild(_li);
						flag=false;
						break;
					case 1:
						$("#pic").style.display="none";
						for(var i=0;i<emerytanks.length;i++){
							clearInterval(emerytanks[i].timer);		
						}
						setTimeout(function(){
								for(var j=0;j<emerytanks.length;j++){
									emerytanks[j].timer=setInterval(emerytanks[j].run,50);
								}
						},5000);
						flag=false;
						break;
					case 2:
						$("#pic").style.display="none";
						for(var i=0;i<leavels[k].length;i++){
							for(var j=0;j<leavels[k].length;j++){
								if(leavels[k][i][j]==5){
									leavels[k][i][j]=4;
								}
							}
						}
						flag=false;
						setTimeout(function(){
							for(var i=0;i<leavels[k].length;i++){
							for(var j=0;j<leavels[k].length;j++){
								if(leavels[k][i][j]==4){
									leavels[k][i][j]=5;
								}
							}
						}
						},5000);
						break;
					case 3:
						$("#pic").style.display="none";
						flag=false;
						for(var i=0;i<emerybullets.length;i++){
							emerybullets[i].alive=false;
							clearInterval(emerybullets[i].timer);
						}
						emerytanks=[];
						emerybullets=[];
						setTimeout(function(){
							for(var q=0;q<num;q++){							
								var emerytank=new emerytankb((q+1)*150,0,4);
								emerytanks[q]=emerytank;
								emerytanks[q].timer= setInterval(emerytanks[q].run,50);
								emerybullets.push(new bullet(emerytanks[q].x+13,emerytanks[q].y+28,emerytanks[q].dirction,emerytanks[q],"emetank"));
								emerybullets[q].timer=setInterval(emerybullets[q].run,50);
							}
						},2000)						
						break;
					case 4:
						$("#pic").style.display="none";
						cuanzi=true;
						setTimeout(function(){
							cuanzi=false;
						},8000)
						flag=false;
						break;
						
				}
			}
		}
	return true;
}


var xinxi=document.getElementById("xinxi");
	xinxi.onclick=function(){
		animate($("#jieshao"),{"opacity":1},3000)
	}
	$("#strat").onclick=function(){
		setInterval(flashmap,30);
		$("#info").innerHTML="";
		$("#info").style["border-radius"]="50%";
		setTimeout(food,3000);
		animate($("#info"),{"height":0,"width":0,"left":850,"top":280},1000);
	}

for(var i=0;i<6;i++){
	var _li=document.createElement("li");
	_li.className="lis";
	$("#uls").appendChild(_li);
}

var crr=[258,288,318,348,408];
var n;
var flag=false;
var product=null;
function food(){
	flag=true;
	var x=Math.floor(Math.random()*(cans.width-26));
	var y=Math.floor(Math.random()*(cans.height-26));
	n=Math.floor(Math.random()*crr.length);
	product=new point(x,y);
	$("#pic").style.display="block";
	$("#pic").style.left=x+cans.offsetLeft+"px";
	$("#pic").style.top=y+cans.offsetTop+"px";
	$("#pic").style.backgroundPositionX=-crr[n]+"px";
	setTimeout(function(){
		flag=false;
		$("#pic").style.display="none";
	},8000)
	setTimeout(food,15000);
}


function gameover(){
	
}

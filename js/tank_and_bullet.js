function tank(x,y,speed)
{
	this.x=x;
	this.y=y;
	this.speed=speed;	
}


function bullet(x,y,dirction,zhixiang,type)
{
	this.x=x;
	this.y=y;
	this.dirction=dirction;
	this.speed=5;
	this.alive=true;
	this.timer=null;
	this.zhixiang=zhixiang;
	this.type=type;
	var _this=this;
	this.run=function()
	{  
		if(_this.type=="emetank"){
			if(_this.x>=herotank.x && _this.x+2<=herotank.x+28 && _this.y>=herotank.y && _this.y+2<=herotank.y+28){
				_this.alive=false;
				_this.zhixiang.bulletalive=false;
				clearInterval(_this.timer);
				herotank.alive=false;	
				if($(".lis").length==0){
					console.log("比赛结束");
				}else{
					setTimeout(function(){
					herotank=new herotanks(150,450,4);
					cxt.drawImage(imgs,arr,66,28,28,herotank.x,herotank.y,28,28);
					herotank.alive=true;
					$("#uls").removeChild($("#uls").lastChild);
					},1000)
				}
				
				
				
			}
		}
		if(_this.type=="hetank")
		{   
			for(var m=0;m<emerytanks.length;m++){
				if(_this.x>=emerytanks[m].x && _this.x<=emerytanks[m].x+28 && _this.y>=emerytanks[m].y && _this.y<=emerytanks[m].y+28){
					_this.alive=false;
					clearInterval(_this.timer);
					clearInterval(emerytanks[m].timer);
					emerytanks.splice(m,1);
					setTimeout(function(){
						var emerytank=new emerytankb(0,0,4);
						emerytank.timer=setInterval(emerytank.run,50);
						emerytanks.push(emerytank);
						emerybullets.push(new bullet(emerytank.x+13,emerytank.y+28,emerytank.dirction,emerytank,"emetank"));
					    emerybullets[emerybullets.length-1].timer=setInterval(emerybullets[emerybullets.length-1].run,50);
					},2000)					
				}
			}
		}
		for(var i=0;i<leavels[k].length;i++){
		for(var j=0;j<leavels[k][i].length;j++){
			switch(leavels[k][i][j]){
				case 5:
				case 1:
					if(_this.x>j*16 && _this.x<(j+1)*16 && _this.y>i*16 && _this.y<(i+1)*16){
						console.log(2);
						leavels[k][i][j]=0;
						_this.alive=false;
						if(_this.type=="emetank"){
							_this.zhixiang.bulletalive=false;
						}
						clearInterval(_this.timer);
					}
					break;
				case 2:
				case 4:
					if(_this.x>=j*16 && _this.x<=(j+1)*16 && _this.y>=i*16 && _this.y<=(i+1)*16){
						_this.alive=false;
						if(_this.type=="emetank"){
							_this.zhixiang.bulletalive=false;
						}
						if(_this.type=="hetank"){
							if(cuanzi){
								leavels[k][i][j]=0;
							}
						}
						clearInterval(_this.timer);
					}
					break;
				case 3:
					if(_this.x>=j*16 && _this.x<=(j+2)*16 && _this.y>=i*16 && _this.y<=(i+2)*16){
						leavels[k][i][j]=0;
						_this.alive=false;
						if(_this.type=="emetank"){
							_this.zhixiang.bulletalive=false;
						}
						console.log("你输了");
						clearInterval(_this.timer);
					}
					break;
				}
			}
		}	
		switch(_this.dirction){
			case 1:
				_this.y-=_this.speed;
				break;
			case 2:
				_this.x+=_this.speed;
				break;
			case 3:
				_this.y+=_this.speed;
				break;
			case 4:
				_this.x-=_this.speed;
				break;
		}
		if(_this.x <=0 || _this.x>=cans.width ||_this.y<=0 || _this.y>=cans.height){
	        _this.alive = false;
	        if(_this.type=='emetank'){
	            _this.zhixiang.bulletalive = false;
	        }
	       clearInterval(_this.timer);
	    }
	}
}

function drawherobullet(hebullets)
{
	for(var i=0;i<hebullets.length;i++){
		var hebullet=hebullets[i];
		if(herotank.alive && hebullet.alive){
			cxt.fillStyle='#FEF26E';
			cxt.fillRect(hebullet.x,hebullet.y,2,2);
		}
	}
}
function drawemerybullet(embullets)
{
	for(var i=0;i<embullets.length;i++){
		var embullet=embullets[i];
		if( embullet.alive){
			cxt.fillStyle='red';
			cxt.fillRect(embullet.x,embullet.y,2,2);
		}
	}
}


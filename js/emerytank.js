function emerytankb(x,y,speed)
{
	this.eme=tank;
	this.eme(x,y,speed);
	this.alive=true;
	this.bulletalive=true;
	this.timer=null;
	this.speed=2;
	this.dirction=3;
	this.count=0;
	this.brr=130;
	var _this=this;
	this.run=function(){
		var p2;
		if(_this.count>=90){
			_this.dirction=Math.ceil(Math.random()*4);
			_this.count=0;
		}
		_this.count++;
		switch(_this.dirction){
			case 1:
				_this.brr=162;
				p2=new point(_this.x,_this.y-_this.speed);
				break;
			case 2:
				_this.brr=194;
				p2=new point(_this.x+_this.speed,_this.y);
				
				break;
			case 3:
				_this.brr=130;
				p2=new point(_this.x,_this.y+_this.speed);
				break;
			case 4:
				_this.brr=226;
				p2=new point(_this.x-_this.speed,_this.y);
				break;
		}
		if(move(p2,herotank,_this)){
		_this.x=p2.x;
		_this.y=p2.y;
		}else{
			_this.count=90;
		}
		if(_this.alive && !_this.bulletalive)
		{  
			switch(_this.dirction){
			case 1:
				emerybullets.push(new bullet(_this.x+13,_this.y,_this.dirction,_this,"emetank"));
				break;
			case 2:
				emerybullets.push(new bullet(_this.x+28,_this.y+13,_this.dirction,_this,"emetank"));
				break;
			case 3:
				emerybullets.push(new bullet(_this.x+13,_this.y+28,_this.dirction,_this,"emetank"));
				break;
			case 4:
				emerybullets.push(new bullet(_this.x,_this.y+13,_this.dirction,_this,"emetank"));
				break;
			}
			emerybullets[emerybullets.length-1].timer=setInterval(emerybullets[emerybullets.length-1].run,50);
			_this.bulletalive=true;
		}
		
		
	}
}

function herotanks(x,y,speed)
{
	this.hero=tank;
	this.hero(x,y,speed);
	this.alive=true;
	this.dirction=1;
	this.shotemery=function(){
		switch(this.dirction){
			case 1:
				herobullet=new bullet(this.x+13,this.y,this.dirction,this,"hetank");
				break;
			case 2:
				herobullet=new bullet(this.x+28,this.y+13,this.dirction,this,"hetank");
				break;
			case 3:
				herobullet=new bullet(this.x+13,this.y+28,this.dirction,this,"hetank");
				break;
			case 4:
				herobullet=new bullet(this.x,this.y+13,this.dirction,this,"hetank");
				break;
		}	
		herobullets.push(herobullet);
		herobullets[herobullets.length-1].timer=setInterval(herobullets[herobullets.length-1].run,50);
	}
	
}

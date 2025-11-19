export class Enemy {
  constructor(x,y,map){ this.x=x; this.y=y; this.map=map; this.tile=map.tile; this.color='#f00'; this.dir=1; }
  update(){
    // simple patrol: move left-right if possible
    let nx = this.x + this.dir;
    if (this.map.isWalkable(nx,this.y)) { this.x = nx; }
    else this.dir *= -1;
  }
  draw(ctx){ ctx.fillStyle=this.color; ctx.fillRect(this.x*this.tile+6,this.y*this.tile+6,this.tile-12,this.tile-12); }
}

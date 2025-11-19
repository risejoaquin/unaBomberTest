export class Player {
  constructor(x,y,map){
    this.x = x; this.y = y; this.map = map; this.tile = map.tile;
    this.color = '#0f0';
    this._setup();
  }
  _setup(){
    window.addEventListener('keydown', e=>{
      if (e.key==='ArrowUp') this.tryMove(0,-1);
      if (e.key==='ArrowDown') this.tryMove(0,1);
      if (e.key==='ArrowLeft') this.tryMove(-1,0);
      if (e.key==='ArrowRight') this.tryMove(1,0);
      if (e.key===' ') this.plantBomb();
    });
  }
  tryMove(dx,dy){
    const nx = this.x+dx, ny=this.y+dy;
    if (this.map.isWalkable(nx,ny)) { this.x = nx; this.y = ny; }
  }
  plantBomb(){
    // simple placeholder
    console.log('Bomb planted at', this.x, this.y);
  }
  update(){}
  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x*this.tile+4,this.y*this.tile+4,this.tile-8,this.tile-8);
  }
}

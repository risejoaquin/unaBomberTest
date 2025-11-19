export class MapManager {
  constructor(cols=16, rows=12) {
    this.cols = cols; this.rows = rows;
    this.tile = 32;
    this.grid = [];
    for (let y=0;y<rows;y++){
      this.grid[y]=[];
      for (let x=0;x<cols;x++){
        this.grid[y][x] = { type: (x%2===1 && y%2===1) ? 'wall' : (Math.random()<0.1 ? 'crate' : 'floor') };
      }
    }
  }
  update(){}
  draw(ctx){
    for (let y=0;y<this.rows;y++){
      for (let x=0;x<this.cols;x++){
        const t = this.grid[y][x];
        if (t.type==='wall'){ ctx.fillStyle='#444'; ctx.fillRect(x*this.tile,y*this.tile,this.tile,this.tile); }
        else if (t.type==='crate'){ ctx.fillStyle='#6b3'; ctx.fillRect(x*this.tile+4,y*this.tile+4,this.tile-8,this.tile-8); }
        else { ctx.fillStyle='#111'; ctx.fillRect(x*this.tile,y*this.tile,this.tile,this.tile); }
      }
    }
  }
  isWalkable(x,y){ if (x<0||y<0||x>=this.cols||y>=this.rows) return false; const t=this.grid[y][x]; return t.type==='floor'; }
}

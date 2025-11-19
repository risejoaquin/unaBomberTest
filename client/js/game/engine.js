import { MapManager } from './map.js';
import { Player } from './player.js';
import { Enemy } from './enemy.js';

export class Engine {
  constructor(canvas, mode='battle', onEnd=()=>{}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.mode = mode;
    this.map = new MapManager(16, 12);
    this.player = new Player(1,1, this.map);
    this.enemies = [ new Enemy(5,5,this.map) ];
    this.running = false;
    this.score = 0;
    this.onEnd = onEnd;
    this._tick = this._tick.bind(this);
  }
  start() { this.running = true; requestAnimationFrame(this._tick); }
  stop() { this.running = false; }
  _tick() {
    if (!this.running) return;
    this.map.update();
    this.player.update();
    for (const e of this.enemies) e.update();
    this._render();
    requestAnimationFrame(this._tick);
  }
  _render() {
    const ctx = this.ctx;
    ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.map.draw(ctx);
    this.player.draw(ctx);
    for (const e of this.enemies) e.draw(ctx);
  }
}

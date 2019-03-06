'use strict';class BackBuffer{constructor(a,b,c){c=c||!1,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d",{alpha:c}),this.setSize(a,b)}set width(a){this.canvas.width=a}get width(){return this.canvas.width}set height(a){this.canvas.height=a}get height(){return this.canvas.height}setSize(a,b){return this.canvas.width=a,this.canvas.height=b,this}clear(){this.ctx.clearRect(0,0,this.width,this.height)}}class Engine extends BackBuffer{constructor(a){a=a||{},super(window.innerWidth,window.innerHeight),document.body.appendChild(this.canvas),this.backgroundColor=a.backgroundColor||null,window.onresize=()=>this.updateSize(),this.updateSize()}updateSize(){this.width=window.innerWidth,this.height=window.innerHeight}render(){let a=+new Date,b=a-this.lastTime;this.lastTime=a,this.clear(),this.update(b),this.draw(),requestAnimationFrame(()=>this.render())}async load(){}draw(){}update(){}async start(){await this.load(),this.lastTime=+new Date,this.render()}clear(){this.backgroundColor?(this.ctx.fillStyle=this.backgroundColor.toString(),this.ctx.fillRect(0,0,this.width,this.height)):super.clear()}}class Color{constructor(c,d,e,b){this.r=c||0,this.g=d||0,this.b=e||0,this.a=b||1}static get Black(){return new Color}static get White(){return new Color(255,255,255)}static get Red(){return new Color(255)}static get Green(){return new Color(0,255)}static get Blue(){return new Color(0,0,255)}toString(){return`rgba(${this.r},${this.g},${this.b},${this.a})`}}function ready(a){document.addEventListener("DOMContentLoaded",a)}class Viewer extends Engine{constructor(){super({backgroundColor:new Color(50,50,80)}),this.density=""}draw(){}}ready(()=>{window.view=new Viewer,window.view.start()});
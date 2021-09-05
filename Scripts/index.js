const canvas=document.querySelector("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
const c=canvas.getContext('2d');

const color_palate=['#A7D5F2','#590202','#8C0303','#5C5664','#024059','#0D0D0D','white'];

const n=3000;
const velocity=5;
const max_radius=80;
const init_min_radius=1;
const init_max_radius=5;
const init_radius=init_max_radius;

const mouse={
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
})

window.addEventListener('resize',function(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
})

function Circle(x,y,dx,dy,radius,minRadius)
{
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius=minRadius;
    this.color=color_palate[Math.floor(Math.random()*color_palate.length)];
    this.draw=function(){
        c.beginPath();
        c.strokeStyle=this.color;
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.stroke();
        c.fillStyle=this.color;
        c.fill();
    }
    this.update=function(){
        if(this.x+this.radius>=window.innerWidth || this.x-this.radius<=0)
            this.dx=-this.dx;
        if(this.y+this.radius>=window.innerHeight || this.y-this.radius<=0)
            this.dy=-this.dy;
        this.x+=this.dx;
        this.y+=this.dy;

        //interactivity
        if(mouse.x-this.x<=50 && mouse.x-this.x>=-50 && mouse.y-this.y<=50 && mouse.y-this.y>=-50 && this.radius<=max_radius)
            this.radius++;
        else if(this.radius>this.minRadius)
            this.radius--;

        this.draw();
    }
}

let circleArray=[];

for(let i=0;i<n;i++)
{
    const minRadius=Math.random()*(init_max_radius-init_min_radius)+init_min_radius;
    const x=Math.random()*(window.innerWidth-init_radius*2)+init_radius;
    const y=Math.random()*(window.innerHeight-init_radius*2)+init_radius;
    const dx=(Math.random()-0.5)*velocity;
    const dy=(Math.random()-0.5)*velocity;
    circleArray.push(new Circle(x,y,dx,dy,init_radius,minRadius));
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,innerHeight);
    for(let i=0;i<circleArray.length;i++)
        circleArray[i].update();
}
animate();
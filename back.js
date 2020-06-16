function init(){
    canvas=document.getElementById('mycanvas');
    player_img=new Image;
    gemm_image=new Image;
    box_image=new Image;
    box_image2 =new Image;
    player_img.src ='Assets/superhero.png'
    gemm_image.src ='Assets/gemm.png'
    box_image.src ='Assets/v1.png';
    box_image2.src ='Assets/v2.png';
    H=canvas.height = 360;
    W=canvas.width = 900;
    game_over =false;
    pen =canvas.getContext('2d');
    canvas.addEventListener('touchstart',function(){
                            player.m=true;
                            });
    
    canvas.addEventListener('touchend',function(){
                            player.m=false;
                            });
    
    canvas.addEventListener('mousedown',function(){
                            player.m=true;
                            });
    pen =canvas.getContext('2d');
    canvas.addEventListener('mouseup',function(){
                            player.m=false;
                            });
    
    player={
        x:20,
        y:Math.round(H/2),
        h:50,
        score:100,
        m:false,
        w:50,
        speed:10,
    }
    gemm={
        x:800   ,
        y:Math.round(H/2),
        h:50,
        w:50,
    };
    
    class box{
        constructor(){
        this.x=100;
        this.y=10;
        this.w=50;
        this.h=50;
        this.cen=100;
        this.speed2=7;
        this.speed=7;
        }
    }
    dis=[]
    for(i=0;i<3;i++){
        dis.push(new box());
        //dis[i].h=dis[i].w=20;
        if(i !== 0 ){
            dis[i].cen=dis[i-1].cen+300;
            dis[i].speed=dis[i-1].speed*2;
            dis[i].speed2=dis[i-1].speed2*2;
        }
        
        dis[i].x=dis[i].cen;
        //pen.fillRect(dis[i].x,dis[i].y,dis[i].h,dis[i].w)
        
            console.log(dis[i].cen);
    }
    dis[2].speed=dis[2].speed2=16;
}
init();
function draw(){
    pen.clearRect(0,0,W,H);
    pen.font = "bold 16px Arial";
    pen.fillText('Score= '+player.score,10,20);
    for(i=0;i<3;i++){
        if(i<=1)
        pen.drawImage(box_image ,dis[i].x,dis[i].y,dis[i].h,dis[i].w);
        else
            pen.drawImage(box_image2 ,dis[i].x,dis[i].y,dis[i].h,dis[i].w);
    }
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    pen.drawImage(gemm_image, gemm.x,gemm.y,gemm.w,gemm.h);
}
function update(){
    for(i=0;i<3;i++)
    if(Math.abs(dis[i].x-player.x)<=player.w-10 && Math.abs(dis[i].y-player.y)<=player.w-10){
        player.score-=10;
        player.score=Math.max(0,player.score);
        }
    if(player.score <=0 ){
        alert('You Lost '+player.score);
        game_over=true;
        return;
    }
    if(player.m==true && game_over === false){
        player.x+=player.speed;
    }
    if(player.x>=gemm.x){
        game_over=true;
    }
    if(game_over === true){
        alert('You won '+player.score);
        canvas.removeEventListener('mousedown',function(xx){console.log("down removed")});
        canvas.removeEventListener('mouseup',function(xx){console.log("up removed")});
        clearInterval(f);
        return;
    }
    for(i=0;i<3;i++){
        if(dis[i].y+dis[i].w>=canvas.height||dis[i].y<=0){
            dis[i].speed*=-1;
            }
        if(dis[i].x>= (dis[i].cen+20) || dis[i].x<=(dis[i].cen-20))
            dis[i].speed2*=-1;
        dis[i].y+=dis[i].speed;
        dis[i].x+=dis[i].speed2;
    }
}
f=function gameloop(){
    if(game_over===true){
        clearInterval(f);
        return;
    }
    update();
    draw();
    console.log("IN gameloop")
}
setInterval(f,10);
if(game_over===true){
    clearInterval(f);
}
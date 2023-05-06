let handle1, handle2;
let handles = [];
let xMin, xMax, yMin, yMax = []
let slider;
let facePt = 5;
let eyePt = 5;
let step = 0.01;
let pointCt = 0;
let leftEye, rightEye;
let leftGoggle 
let rightGoggle
let vHair = []
let hairC;
let ps = []
let vns = []
let hairstyle = 0 
let shadowPos = []
let pg;
let leftC, rightC;


let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR297digAQzBVZ3MJkIi2tiEJboBPboFRBxSL3D6uKMmivKWSyYd1cyCkgyZNLIBV5j3Sh3FkRevrdn/pub?gid=0&single=true&output=csv";
let table;
function preload() {
  table = loadTable(url, 'csv', 'header');

}
function setup() {
  
  leftC = [random(0,20),random(176,196),random(0, 191)]
  rightC = [random(0,200),random(176,196),random(171, 191)]
  slider = createSlider(3, 10, 3);
  noFill();
  angleMode(DEGREES);
  createCanvas(400, 400);
  createMyButton(width,height);
  //face outline
  updatePoints()

  background(255)
  for(let i = 0; i < handles.length-1; i ++){
    drawBezier(handles[i].returnHead(), handles[i+1].returnTail())
  }
  pg = createGraphics(400, 400);
}

function draw(){
  pointCt = 0;

  background(255, 190, 11)
  
  push()
  fill(217, 169, 41)//shadow
  noStroke()
  rect(0,200,400,200)
  pop()
  
  fill(leftC)//glass
  
  leftLookAt()
  rightLookAt()
  pg = createGraphics(400, 400);
  pg.rotate(-0.1)
  pg.fill(145, 110, 17)
  pg.noStroke();
  pg.beginShape();
  vertex(handles[0].x1, handles[0].y1);
  for(let i = 0; i < facePt; i++){
    bezierVertex(handles[i].x2, handles[i].y2, 
               handles[i+1].x3, handles[i+1].y3, 
               handles[i+1].x1, handles[i+1].y1);

  }
  pg.endShape();
  
  image(pg, -10, 180, 400, 200);
  push()
  fill(240, 237, 211) // Face Color Here
  noStroke()
  beginShape();
  //pg.beginShape();
  vertex(handles[0].x1, handles[0].y1);
  for(let i = 0; i < facePt; i++){
    bezierVertex(handles[i].x2, handles[i].y2, 
               handles[i+1].x3, handles[i+1].y3, 
               handles[i+1].x1, handles[i+1].y1);

  }
  //pg.endShape();
  endShape();
  
  
  drawShadow()
  pop()
  circle(handles[5].x1, handles[5].y1, leftGoggle)
  fill(rightC)
  circle(handles[10].x1, handles[10].y1, rightGoggle)
  
  for(let i = 0; i < handles.length-1; i ++){
    drawBezier(handles[i].returnHead(), handles[i+1].returnTail())
  }
  drawHair()
  drawMouth();
  
  
}
//-------------------------------- Important =============================================
function updatePoints(){
  hairC = color(random(180,220),random(180,220),random(180,220))
  strokeWeight(0)
  leftGoggle = random(50,80)
  rightGoggle = random(50, 80)
  
  handles = []
  iniFaceOutlineHd()
  iniLeftEyeHd();
  iniRightEyeHd();
  iniNose()
  iniMouth()
  handle4 = new handle(handles[0].x1 + random(15), handles[0].y1 - random(15),
                       handles[4].zeroAngle, handles[4].distance);
  handles[4] = handle4;
  
  
      
    
}
//1111111111111111111111111111111 Face =============================================
function iniFaceOutlineHd(){
  for(let i = 0; i < facePt; i ++){
    iniHandle1(i);
  }
}

function iniHandle1(i){
  x1 = random(checkTableInt(i,1), checkTableInt(i,2))
  y1 = random(checkTableInt(i,3), checkTableInt(i,4))

  handle1 = new handle(x1, y1, checkTableInt(i,0), 50)
  handles.push(handle1);
}
//2222222222222222222222222222222 Eyes =============================================
function iniLeftEyeHd(){
  let yMin, yMax;
  yMin = lerp(handles[3].y1, handles[1].y1,0.35);
  yMax = lerp(handles[3].y1, handles[1].y1, 0.45);
  let xMin = lerp(handles[0].x1, handles[2].x1, 0.3);
  let xMax = lerp(handles[0].x1, handles[2].x1, 0.2);

  let center = createVector(random(xMin, xMax), random(yMin, yMax));
  leftEye = center;
  for(let i = 0; i < eyePt; i ++){
    
    handle1 = new handle(center.x, 
                         center.y+ pow(-1,i) * i * 10, 
                         checkTableInt(i +facePt,0), 
                         15+(i*5))
    handles.push(handle1);
  }
  handle1 = new handle(center.x + 30, center.y, 
                         checkTableInt(eyePt + facePt,0), 25)
    handles.push(handle1);

  
}

function iniRightEyeHd(){
  let yMin, yMax;
  yMin = lerp(handles[3].y1, handles[1].y1,0.35);
  yMax = lerp(handles[3].y1, handles[1].y1, 0.45);
  let xMin = lerp(handles[0].x1, handles[2].x1, 0.7);
  let xMax = lerp(handles[0].x1, handles[2].x1, 0.8);

  let center = createVector(random(xMin, xMax), random(yMin, yMax));
  rightEye = center;
  for(let i = 0; i < eyePt-1; i ++){
    handle1 = new handle(center.x, 
                         center.y+ pow(-1,i) * i * 10, 
                         checkTableInt(i +1 +eyePt+facePt,0), 
                         15+(i*5))
    handles.push(handle1);
  }
  handle1 = new handle(lerp(center.x , handles[5].x1,0.5), 
                       center.y, 
                       checkTableInt(eyePt + eyePt + facePt,0), 
                       25)
    handles.push(handle1);
}

//3333333333333333333333333333333 Nose =============================================

function iniNose(){
  let handle1 = handles[facePt+ eyePt *2];
  let x = handle1.x1 + random(0,40);
  let y = handle1.y1 + random(60,75)
  let handle2 = new handle(x, y,
                           90 + random(-5,65), 
                           random(60,80) )
  x = (handle2.x1 + handle2.x2)/2
  y = handle2.y2 + 10;
  let handle3 = new handle(x, y,
                           180 + random(-5,65), 
                           random(35,55) )
  handles.push(handle2)
  handles.push(handle3)

}

//4444444444444444444444444444444 Hair =============================================

function drawHair(){//everyframe
  
  vHair = []
  ps = []
  vns =[]
  

  
  getHairPos(handles[2].returnHead(), handles[3].returnTail(), 0.5)
  getHairPos(handles[3].returnHead(), handles[4].returnTail(), 0)
  let last = createVector(ps[ps.length-1].x, ps[ps.length-1].y);
  let first = createVector(ps[0].x, ps[0].y)
  push()
  
  strokeWeight(6)
  for(let i= 0; i < ps.length; i++){
    
    if(i> 0 && i < ps.length-1){

      ps[i].add((vns[i].rotate(100+30 * abs(sin(millis())))).
                mult( noise(  i/20+hairstyle) *100));

    }
    
    
    vHair.push(ps[i]);

  }

  pop()

  push()
  fill(hairC)
  beginShape()
  for(let i = 0; i < vHair.length; i++){
    vertex(vHair[i].x, vHair[i].y)
  }
  
  bezierVertex(lerp(vHair[vHair.length-1].x, vHair[0].x, 0.25), 
               lerp(vHair[vHair.length-1].y, vHair[0].y, 0.25)+15,
               lerp(vHair[vHair.length-1].x, vHair[0].x, 0.75), 
               lerp(vHair[vHair.length-1].y, vHair[0].y, 0.75)+15,
               vHair[0].x, vHair[0].y);
  
  endShape()
  pop()
  
}

function getHairPos(h1, h2, start){

  strokeWeight(2)
  x1 = h1[0]
  y1 = h1[1]
  x2 = h1[2]
  y2 = h1[3]
  x3 = h2[0]
  y3 = h2[1]
  x4 = h2[2]
  y4 = h2[3]
  let x21,y21,x22,y22,x23,y23,x31,y31,x32,y32,x41,y41
  

  for(let t = start; t < start+0.5; t+= step){
    x21 = lerp(x1, x2, t)
    x22 = lerp(x2, x3, t)
    x23 = lerp(x3, x4, t)
    y21 = lerp(y1, y2, t)
    y22 = lerp(y2, y3, t)
    y23 = lerp(y3, y4, t)
    
    x31 = lerp(x21, x22, t)
    x32 = lerp(x22, x23, t)
    y31 = lerp(y21, y22, t)
    y32 = lerp(y22, y23, t)
      
    x41 = lerp(x31, x32, t)
    y41 = lerp(y31, y32, t)
    
    let v = createVector(x32-x31, y32-y31);
    v.normalize();
    let vn = createVector(-v.y, v.x);
    vns.push(v);
    let p = createVector(x41, y41);
    ps.push(p);
  }
}
//4444444444444444444444444444444 Hair ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//5555555555555555555555555555555 Mouth ================================================
function iniMouth(){
  let handle1, handle2;
  handle1 = handles[handles.length -1]
  let x = handle1.x1;
  handle1 = handles[handles.length -2]
  let y = handle1.y1 +55;
  
  handle2 = new handle(x, y,
                           270 + random(-5,65), 
                           random(35,55) )
  handles.push(handle2)
  handle2.x1 -= 50
  handles.push(handle2)
}

function drawMouth(){
  let handle1, handle2
  handle1 = handles[handles.length -1]
  handle2 = handles[handles.length -2]
  
  push()
  fill(255, 0, 110)
  beginShape()
  
  vertex(handle1.x1, handle1.y1)
  
  
  bezierVertex(handle1.x2, handle1.y2,
               handle2.x3, handle2.y3,
               handle2.x1, handle2.y1);
  
  endShape()
  pop()
}

//666666666666666666666666666666666666 Other Stuff ===========================================

function drawShadow(){//everyFrame
  shadowPos = []
  drawShape(handles[1].returnHead(), handles[2].returnTail(), 0.2, 1)
  drawShape(handles[2].returnHead(), handles[3].returnTail(), 0, 1)
  
  push()
  strokeWeight(0)
  fill(191, 184, 145,150)
  beginShape()
  for(let i = 0; i < shadowPos.length; i++){
    vertex(shadowPos[i].x, shadowPos[i].y)
  }
  
  bezierVertex(max(shadowPos[shadowPos.length-1].x, shadowPos[0].x)+100, 
               lerp(shadowPos[shadowPos.length-1].y, shadowPos[0].y, 0.25),
               max(shadowPos[shadowPos.length-1].x, shadowPos[0].x)+80, 
               lerp(shadowPos[shadowPos.length-1].y, shadowPos[0].y, 0.75),
               shadowPos[0].x, shadowPos[0].y);
  
  
  //point(max(shadowPos[shadowPos.length-1].x, shadowPos[0].x)+55, 
               //lerp(shadowPos[shadowPos.length-1].y, shadowPos[0].y, 0.25))
//   point(lerp(shadowPos[shadowPos.length-1].x, shadowPos[0].x, 0.75)+55, 
//                lerp(shadowPos[shadowPos.length-1].y, shadowPos[0].y, 0.75))
  
//   point(shadowPos[0].x, shadowPos[0].y)
  
  endShape()
  pop()

}

function drawShape(h1, h2, start, end){
  strokeWeight(2)
  x1 = h1[0]
  y1 = h1[1]
  x2 = h1[2]
  y2 = h1[3]
  x3 = h2[0]
  y3 = h2[1]
  x4 = h2[2]
  y4 = h2[3]
  let x21,y21,x22,y22,x23,y23,x31,y31,x32,y32,x41,y41
  

  for(let t = start; t < end; t+= step){
    x21 = lerp(x1, x2, t)
    x22 = lerp(x2, x3, t)
    x23 = lerp(x3, x4, t)
    y21 = lerp(y1, y2, t)
    y22 = lerp(y2, y3, t)
    y23 = lerp(y3, y4, t)
    
    x31 = lerp(x21, x22, t)
    x32 = lerp(x22, x23, t)
    y31 = lerp(y21, y22, t)
    y32 = lerp(y22, y23, t)
      
    x41 = lerp(x31, x32, t)
    y41 = lerp(y31, y32, t)
    
    let p = createVector(x41, y41);
    shadowPos.push(p);
  }
}

//777777777777777777777777777777777777777 DrawCurve =============================================
function drawBezier(h1, h2){

  strokeWeight(2)
  x1 = h1[0]
  y1 = h1[1]
  x2 = h1[2]
  y2 = h1[3]
  x3 = h2[0]
  y3 = h2[1]
  x4 = h2[2]
  y4 = h2[3]
  let x21,y21,x22,y22,x23,y23,x31,y31,x32,y32,x41,y41
  

  for(let t = 0; t < 1; t+= step){
    x21 = lerp(x1, x2, t)
    x22 = lerp(x2, x3, t)
    x23 = lerp(x3, x4, t)
    y21 = lerp(y1, y2, t)
    y22 = lerp(y2, y3, t)
    y23 = lerp(y3, y4, t)
    
    x31 = lerp(x21, x22, t)
    x32 = lerp(x22, x23, t)
    y31 = lerp(y21, y22, t)
    y32 = lerp(y22, y23, t)
      
    x41 = lerp(x31, x32, t)
    y41 = lerp(y31, y32, t)
    let v = createVector(x32-x31, y32-y31);
    
    v.normalize();
    let vn = createVector(-v.y, v.x);
    let p = createVector(x41, y41);
    
    strokeWeight(slider.value()/2 + noise(-millis()/120 +  pointCt/8) *4);
    p.add(vn.mult(slider.value() + noise(millis()/150 +  pointCt/8) *4));
    point(p.x,p.y);

    pointCt++;
  }
}
//88888888888888888888888888888888888888 Eye Movement =======================================
function leftLookAt(){
  let er = 15
  let x= map(mouseX, leftEye.x-200, leftEye.x+200, leftEye.x - er, leftEye.x + er )
  let y= map(mouseY, leftEye.y-200, leftEye.y+200, leftEye.y - er, leftEye.y + er )
  
  x = max(min(leftEye.x + er, x), leftEye.x - er)
  y = max(min(leftEye.y + er, y), leftEye.y - er)
  let center = createVector(x,y)
  handles[5].x1 = x;
  handles[5].y1 = y;
  let v = createVector(x-leftEye.x,y-leftEye.y);
  for(let i = 0; i < eyePt; i ++){
    
    handles[facePt + i].x1 = x;
    handles[facePt + i].y1 = y+ pow(-1,i) * i  * 10 ;

  }
  handles[5].updatePos(v);
}

function rightLookAt(){
  let er = 15
  let x= map(mouseX, rightEye.x-200, rightEye.x+200, rightEye.x - er, rightEye.x + er )
  let y= map(mouseY, rightEye.y-200, rightEye.y+200, rightEye.y - er, rightEye.y + er )
  
  x = max(min(rightEye.x + er, x), rightEye.x - er)
  y = max(min(rightEye.y + er, y), rightEye.y - er)
  let center = createVector(x,y)
  handles[10].x1 = x;
  handles[10].y1 = y;
  let v = createVector(x-rightEye.x,y-rightEye.y);
  for(let i = 0; i < eyePt-1; i ++){
    
    handles[facePt + eyePt +1+ i].x1 = x;
    handles[facePt + eyePt +1 +i].y1 = y+ pow(-1,i) * i  * 10;

  }
  handles[10].updatePos(v);
}

function checkTableInt(x,y){
  
  return int(table.getString(x,y));
}

//------------------------------- Class =============================================
class handle{
  constructor(x1, y1, angle, distance){
    this.x1 = x1;
    this.y1 = y1;
    this.zeroAngle = angle;
    this.angle = angle + random(-10, 10);
    this.distance = distance;
    this.x2 = x1+sin(this.angle) * this.distance;
    this.y2 = y1+cos(this.angle) * this.distance;
    this.x3 = x1-this.x2+x1;
    this.y3 = y1-this.y2+y1;
    

  }
  
  returnHead(){
    return[this.x1,this.y1,this.x2,this.y2];
  }
  
  returnTail(){
    return[this.x3,this.y3,this.x1,this.y1];

  }
  
  updatePos(v){
    this.x2 = this.x1+v.x*1.5;
    this.y2 = this.y1+v.y*1.5;
    this.x3 = this.x1-this.x2+this.x1;
    this.y3 = this.y1-this.y2+this.y1;
    // strokeWeight(8)
    // point(this.x1, this.y1)
    // point(this.x2, this.y2)
    // point(this.x3, this.y3)
  }
  
  drawPt(index){
    if(index == 1){
      point(this.x1, this.y1);
    }else if(index == 2){
      point(this.x2, this.y2);
    }else if(index == 3){
      point(this.x3, this.y3);
    }
  }
}

// 9999999999999999999999999999999999999999 Nothing =====================================
function mousePressed() {
  if(mouseX<400 && mouseY <400)
  reFresh()
}

function reFresh(){
  // saveCanvas('myCanvas', 'jpg');
  updatePoints()
  hairstyle++
  leftC = [random(0,200),random(176,196),random(0, 191)]
  rightC = [random(0,200),random(0,196),random(171, 191)]
}

function createMyButton(width, height){
  button2 = createButton('Refresh');
  button2.position(200, height);
  button2.size(200, 30);
  button2.style("font-size", "12px");
  button2.mousePressed(reFresh);
}
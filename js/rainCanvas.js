
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');


canvas.width = document.body.scrollWidth;
canvas.height = document.body.scrollHeight+25;

addEventListener("resize", () => {
    canvas.width = document.body.scrollWidth;
    canvas.height = Math.max( document.body.scrollHeight, innerHeight);
})


let x = 0, y = 0, l = 0, dx = 0, dy = 0;


function rainDrop(x, y, l, dx, dy) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.dx = dx;
    this.dy = dy;


    this.draw = () => {

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.l * this.dx, this.y + this.l * this.dy);
        // ctx.strokeStyle="blue";
        ctx.strokeStyle = 'rgba(174,194,224,0.5)';
        ctx.stroke();

    }

    this.update = () => {
        if (this.x + this.dx > canvas.width) {
            this.x = Math.random() * canvas.width;
            this.xSpeed = -this.dx;
        }

        if (this.y + this.dy > canvas.height) {
            this.y = -20;
        }

        this.x += this.dx;
        this.y += this.dy;


        this.draw();

    }
}



let rainArray = [];


function createRainDrop() {
    rainArray = [];
    for (let i = 0; i < 1000; i++) {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
        l = Math.random();
        dx = -4 + Math.random() * 4 + 2,
            dy = Math.random() * 10 + 10;

        rainArray.push(new rainDrop(x, y, l, dx, dy));
    }

}





// function animate(){
//      requestAnimationFrame(animate);
//      ctx.clearRect(0, 0, canvas.width, canvas.height);

//     for(let i=0;i<rainArray.length;i++)
//     {
//         // console.log(rainArray[i]);
//         rainArray[i].update();
//     }

//     createRainDrop();
//     // animate();

// }

createRainDrop();
// animate();






setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 1000; i++) {
        rainArray[i].update();
    }

}, 30);


const btnsboard = document.querySelectorAll('[btnboard]');
const target = document.getElementById('tar');
const clicks = document.getElementById('cli');
let clickTotal = 1;

//a class to define each button so it can change its state and its neighbors
class Button {
    constructor(btn) {
        this.btn = btn;
        this.state = false; //button is off
        this.neighbors = []; //surrounding buttons
    }

    get thisButton() {
        return this.btn;
    }

    get thisNeighbors () {
        return this.neighbors;
    }

    addNeighbor(abtn) {
        this.neighbors.push(abtn);
    }

    changeState() {
        if(this.state){
            //stuff
            this.btn.style.backgroundColor = "lightgray";
            this.state = false
        }
        else{
            //stuff
            this.btn.style.backgroundColor = "green";
            this.state = true
        }
    }

    changeStateNeighbors() {
        this.changeState();
        this.neighbors.forEach(function(neig){
            neig.changeState();
        });
    }
}

let allButtons =  [];
//create the buttons
btnsboard.forEach(function(singlebtn){
    allButtons.push(new Button(singlebtn));
});

//let each button know its neighbors
for(let i = 0; i < allButtons.length; i++){
    if(i - 5 >= 0) // top
    {
        allButtons[i].addNeighbor(allButtons[i-5]);
    }
    
    if(i - 1 >= 0 && (i % 5 != 0)) // left
    {
        allButtons[i].addNeighbor(allButtons[i-1]);
    }

    if(i + 1 < allButtons.length && i != 4 && i != 9 && i != 14 && i != 19) // right
    {
        allButtons[i].addNeighbor(allButtons[i+1]);
    }

    if(i + 5 < allButtons.length) // bottom
    {
        allButtons[i].addNeighbor(allButtons[i+5]);
    }
}

//give the buttons function to change its state and the neighbors when clicked
btnsboard.forEach(function(singlebtn){
    singlebtn.addEventListener('click', function(){
        for(const element of allButtons)
        {
            if(element.thisButton == singlebtn)
            {
                element.changeStateNeighbors();
            }
        }
        clicks.innerHTML = "Clicks: " + clickTotal;
        clickTotal++;
    });
});

//get num of clicks to make in range then get random place on board to click
let numofclicks = Math.floor(Math.random() * (13 - 5) + 5);
let rannums = [];

let lastnum = -1;
for(let i = 0; i < numofclicks; i++)
{
    let num = -1;
    while(true)
    {
        num = Math.floor(Math.random() * (24 - 0) + 0); //(max - min) + min
        if(num != lastnum)
        {
            lastnum = num;
            break;
        }
    }

    rannums.push(num);
}

//print array of clicks made
console.log(rannums);

rannums.forEach(function(index){ //set up board
    allButtons[index].changeStateNeighbors();
})

target.innerHTML = "Target: " + numofclicks;

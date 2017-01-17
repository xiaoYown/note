interface Shape {
    name: string;
    width: number;
    height: number;
    color?: string;
}
 
function area(shape : Shape) {
    var area = shape.width * shape.height;
    return "I'm " + shape.name + " with area " + area + " cm squared";
}
 
console.log( area( {name: "rectangle", width: 30, height: 15} ) );
console.log( area( {name: "square", width: 30, height: 30, color: "blue"} ) );

var shape = {
    name: "rectangle",
    popup: function() {
 
        console.log('This inside popup(): ' + this.name);
 
        // setTimeout( () => {
        //     console.log('This inside setTimeout(): ' + this.name);
        //     console.log("I'm a " + this.name + "!");
        // }, 1000);
 
    }
};
 
shape.popup();

class Shape {
	name: string;
	width: number;
	height: number;
    area: number;
    color: string;

    constructor ( name: string, width: number, height: number ) {
        this.area = width * height;
        this.color = "pink";
    };
    shoutout() {
        return "I'm " + this.color + " " + this.name +  " with an area of " + this.area + " cm squared.";
    }
}
var square = new Shape("square", 30, 30);
console.log( square.shoutout() );

class Shape3D extends Shape {
 
    volume: number;
 
    constructor ( public name: string, width: number, height: number, length: number ) {
        super( name, width, height );
        this.volume = length * this.area;
    };
 
    shoutout() {
        return "I'm " + this.name +  " with a volume of " + this.volume + " cm cube.";
    }
 
    superShout() {
        return super.shoutout();
    }
}
 
var cube = new Shape3D("cube", 30, 30, 30);
console.log( cube.shoutout() );
console.log( cube.superShout() );

function fn(template, name, age){
	console.log(template)
    console.log(name);
    console.log(age);
}
var name = 'xiaoYown';
var getAge = function () {
    return 24;
}
fn`hello my name is ${name}, I'm ${getAge()}`

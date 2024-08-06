class Car{ 
    // property 
    #brand;
    #model;
    speed;
    isTrunkOpen;

    // constructor 
    constructor(brand, model){ 
        this.#brand = brand; 
        this.#model = model;
        this.speed = 0 ;
        this.isTrunkOpen = false;   
    }

    displayInfo(){
        if(this.speed > 200){ 
            return console.log("You can't go higher than 200");
        }else if(this.speed < 0 ) { 
            return console.log("You can't go negative speed");
        }
        return console.log(`${this.#brand } ${this.#model}, Speed: ${this.speed} km/h, Trunk is ${!this.isTrunkOpen?`close`:`open`}`)
    }

    go(){
        if(!this.isTrunkOpen){
            return this.speed += 50;   
        }
        return console.log('Trunk is open, close it first');   
    }

    brake(){ 
        this.speed -= 5;
    }

    openTrunk(){
        if(this.speed > 0  && this.speed <=200){ 
            console.log('Can not open trunk while car is moving, brake first until it stops');
            return this.isTrunkOpen = false ; 
        }
        return this.isTrunkOpen = true ; 
    }

    closeTrunk(){
        this.isTrunkOpen = false; 
    }

}

class RaceCar extends Car{
    acceleration;
    constructor(brand, model , acceleration){
        super(brand,model);
        this.acceleration = acceleration;
    } 
    go(){ 
        this.speed += this.acceleration ; 
    }

    openTrunk(){ 
        return console.log(`Race car doen't have a trunk`);
    }
    closeTrunk(){ 
        return console.log(`Race car doen't have a trunk`);
    }
}

let car1 = new Car('Toyota', 'Corolla'); 
let car2 = new Car('Tesla', 'Model 3');

car1.displayInfo();
car1.openTrunk(); 
car1.go();
car1.closeTrunk();
car1.go();
car1.openTrunk();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.openTrunk();
car1.closeTrunk();
car1.go();
car1.displayInfo();

let car3 = new RaceCar('McLaren', 'F1', 20);
console.log(car3)
car3.closeTrunk();
car3.go(); 
car3.go(); 
car3.brake();
car3.brake();
car3.brake();
car3.brake();
car3.brake();
car3.brake();
car3.brake();
car3.brake();
car3.openTrunk();
car3.displayInfo();
car2.go();
car2.go();
car2.displayInfo();

class Clothing{ 
    brand; 
    designer; 
    constructor(brand, designer){ 
        this.brand = brand ; 
        this.designer = designer ; 
    }

    generalInfo(){ 
        return `General clothing categories`;
    }

    isWaterRepellant(){
        return `this is not water repellent clothing`;
    }


}

class RainCoat extends Clothing{ 
    layer;
    constructor(brand, designer, layer){
        super(brand,designer);
        this.layer = layer ;
    }

    generalInfo(){ 
        return `${this.brand} is water repellant and it is designed by ${this.designer} and has ${this.layer>1?`${this.layer} layers`:`${this.layer} layer`}`;
    }

    isWaterRepellant(){
        return `this jacket is water repellent`;
    }
}

let tShirt = new Clothing('H&M', 'Eric');
let windBreaker = new RainCoat('Northface', 'Juno', 2)

console.log(tShirt.isWaterRepellant());
console.log(windBreaker.generalInfo())
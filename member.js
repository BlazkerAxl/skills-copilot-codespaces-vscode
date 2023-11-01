function skillsMember(){ 
    this.name = "John";
    this.age = 25;
    this.skills = ["js","css","html"];
    this.address = {
        city: "Bangalore",
        pincode: 560000
    };
    this.getFullName = function(){
        return this.name + " " + this.age;
    }
}
    
    
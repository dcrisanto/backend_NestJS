const myName = 'Dorelly';
const myAge = 33;
const suma = (a: number, b: number) => {
  return a + b;
};
suma(2, 4);

class Person {
  //name;
  //private age;
  // atributos y asignación
  constructor(public name: string, private age: number) {
    //this.name =name;
    //this.age = age;
  }

  getSummary() {
    return `My name is ${this.name}, con ${this.age} años`;
  }
}

// Instancia de la clase
const dorelly = new Person('Dorelly', 33);

console.log(dorelly);

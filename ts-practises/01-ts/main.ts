// Interface describe data
interface Person {
     name: string;
     age: number;
}

// Type Guard
function isValidPerson(p: Person): boolean{
     return p.name.length>0 && p.age>0;
}

// Async function with Promise
async function checkPerson(person: Person): Promise<string>{
     if(!isValidPerson(person)){
          throw new Error("Invalid Person");
     }

     if(person.age >=18){
          return `${person.name} is an adult.`;
     }

     return `${person.name} is a minor.`;

}

// Example usage
const nameInput = document.getElementById("name") as HTMLInputElement;
const ageInput = document.getElementById("age") as HTMLInputElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const result = document.getElementById("result") as HTMLParagraphElement;

// Event Listener
submitBtn.addEventListener("click", async()=>{
     try{
          const person: Person ={
               name : nameInput.value,
               age: Number(ageInput.value)
          };

          const message = await checkPerson(person);
          result.textContent = message;

     }
     catch(error){
          if(error instanceof Error){
               result.textContent = error.message;
          }
     }
});
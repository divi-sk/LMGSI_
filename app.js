const btn = document.getElementById("btn");


btn.addEventListener("click", async () => {


  const text = document.getElementById("input").value;


  // Fem una petició HTTP al servidor (Express)
  // fetch() envia una request al backend
  const res = await fetch("/convert", {
    // Tipus de petició
    // POST = enviem dades al servidor
    method: "POST",
    // Capçaleres HTTP
    // Indiquem que estem enviant dades en format JSON
    headers: {
      "Content-Type": "application/json"
    },


    // Cos de la petició (les dades que enviem)
    // Convertim l’objecte JS a text JSON
    body: JSON.stringify({ data: text })
  });


  // El servidor respon amb JSON
  // Convertim la resposta a objecte JavaScript
  const json = await res.json();
 
  // Mostrem el resultat a la textarea de sortida
  document.getElementById("output").value = json.result;
});


//Boton2 que pasa de Json a XML
const btn2 = document.getElementById("btn2");


btn2.addEventListener("click", async () => {
  const text = document.getElementById("input2").value;


  const res = await fetch("/JsonToXML", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });


  const json = await res.json();
  document.getElementById("output2").value = json.result;
});




//Boton3 que es pasar de XML a Json
const btn3 = document.getElementById("btn3");


btn3.addEventListener("click", async () => {


  const text = document.getElementById("input3").value;


  const res = await fetch("/XMLtoJson", {


    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  document.getElementById("output3").value = json.result;
});



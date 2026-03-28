const btn = document.getElementById("btn");

btn.addEventListener("click", async () => {
  const text = document.getElementById("input").value;

  const res = await fetch("/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });

  const json = await res.json();
  document.getElementById("output").value = json.result;
});

// Botó JSON -> XML (ara utilitza el nou endpoint amb xml-js)
const btn2 = document.getElementById("btn2");

btn2.addEventListener("click", async () => {
  const text = document.getElementById("input2").value;

  const res = await fetch("/jsonToXmlV2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });

  const json = await res.json();
  document.getElementById("output2").value = json.result;
});

// Botó XML -> JSON (ara utilitza el nou endpoint amb xml-js)
const btn3 = document.getElementById("btn3");

btn3.addEventListener("click", async () => {
  const text = document.getElementById("input3").value;

  const res = await fetch("/xmlToJsonV2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: text })
  });

  const json = await res.json();
  document.getElementById("output3").value = json.result;
});
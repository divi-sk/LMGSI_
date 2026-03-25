const express = require("express");


const app = express();
const PORT = 3000;


app.use(express.json());


app.use(express.static("public"));


app.post("/convert", (req, res) => {
  const { data } = req.body;


  const result = data.toUpperCase(); // prova simple


  res.json({ result });
});


app.post("/JsonToXML", (req, res) => {
  const { data } = req.body;
  let resultado = "";


  let texto = data;
  let textoLimpio = eliminarChar(texto, '{');
  textoLimpio = eliminarChar(textoLimpio, '}');
  textoLimpio = eliminarChar(textoLimpio, ',');


  let lineas = textoLimpio.split("\n");


  for (let i = 0; i < lineas.length; i++) {
    let lineaActual = lineas[i].trim();
    if (lineaActual !== "") {
      let partes = lineaActual.split(":");
      if (partes.length >= 2) {
        let clave = eliminarChar(partes[0].trim(), '"');
        let valor = eliminarChar(partes[1].trim(), '"');
        resultado += "<" + clave + ">" + valor + "</" + clave + ">\n";
      }
    }
  }


  res.json({ result: resultado });
});


function eliminarChar(textoRecibido, charABorrar) {
  let respuesta = "";
  for (let i = 0; i < textoRecibido.length; i++) {
    let c = textoRecibido[i];
    if (c !== charABorrar) {
      respuesta += c;
    }
  }
  return respuesta;
}


app.post("/XMLtoJson", (req, res) => {
  const { data } = req.body;
  let xml = data;

  let rootStart = xml.indexOf("<");
  let rootEnd = xml.indexOf(">", rootStart);
  if (rootStart === -1 || rootEnd === -1) {
    console.error("XML mal formado o sin nodo raíz.");
    res.json({ result: "{}" });
    return;
  }
  let rootClosingTag = "</" + xml.substring(rootStart + 1, rootEnd) + ">";
  let rootCloseIdx = xml.lastIndexOf(rootClosingTag);


  if (rootCloseIdx === -1) {
    console.error("XML mal formado o sin nodo raíz.");
    res.json({ result: "{}" });
    return;
  }


  let innerXml = xml.substring(rootEnd + 1, rootCloseIdx);


  let menorQue = [];
  let mayorQue = [];


  for (let i = 0; i < innerXml.length; i++) {
    if (innerXml[i] == "<") {
      menorQue.push(i);
    }
    if (innerXml[i] == ">") {
      mayorQue.push(i);
    }
  }
  let json = "{";
  for (let i = 0; i < menorQue.length; i += 2) {
    if (i + 1 >= menorQue.length || i >= mayorQue.length) {
      break;
    }
    // i es el índice de apertura de la etiqueta, i+1 es el de apertura de cierre
    let key = innerXml.substring(menorQue[i] + 1, mayorQue[i]);
    let value = innerXml.substring(mayorQue[i] + 1, menorQue[i + 1]);
    json += `"${key}":"${value}"`;
    if (i + 2 < menorQue.length) {
      json += ",";
    }
  }
  json += "}";
  console.log(json);


  const result = json; // prova simple


  res.json({ result });
});


app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
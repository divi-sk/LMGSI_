const express = require("express");
const convert = require("xml-js"); // Llibreria per a conversions

const app = express();
const PORT = 3000;

// permet rebre JSON
app.use(express.json());

// servir fitxers estàtics (HTML, JS, CSS)
app.use(express.static("public"));

// --- NOUS ENDPOINTS AMB xml-js ---

// Converteix JSON a XML
app.post("/jsonToXmlV2", (req, res) => {
  try {
    const { data } = req.body;
    const jsonObj = JSON.parse(data); // El frontend envia un string JSON
    const xmlResult = convert.json2xml(jsonObj, { compact: true, spaces: 4 });
    res.json({ result: xmlResult });
  } catch (error) {
    res.status(400).json({ result: "Error: JSON invàlid" });
  }
});

// Converteix XML a JSON
app.post("/xmlToJsonV2", (req, res) => {
  try {
    const { data } = req.body;
    const jsonResult = convert.xml2json(data, { compact: true, spaces: 4 });
    res.json({ result: jsonResult });
  } catch (error) {
    res.status(400).json({ result: "Error: XML invàlid" });
  }
});

// --- ENDPOINTS ORIGINALS (conservats) ---

// endpoint d'exemple
app.post("/convert", (req, res) => {
  const { data } = req.body;
  const result = data.toUpperCase(); // prova simple
  res.json({ result });
});

// Botó de passar de JSON a XML (versió manual original)
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

// Botó de passar de XML a JSON (versió manual original)
app.post("/XMLtoJson", (req, res) => {
  const { data } = req.body;
  let xml = data;
  // tot el codi dins de funció
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
    let key = innerXml.substring(menorQue[i] + 1, mayorQue[i]);
    let value = innerXml.substring(mayorQue[i] + 1, menorQue[i + 1]);
    json += `"${key}":"${value}"`;
    if (i + 2 < menorQue.length) {
      json += ",";
    }
  }
  json += "}";
  console.log(json);

  const result = json;
  res.json({ result });
});

// Funció auxiliar original
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

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});
document.getElementById('show-image').addEventListener('click', async () => {
  const name = document.getElementById('pokemon-name').value.trim();
  if (!name) {
    alert('Introdueix un nom de Pokémon');
    return;
  }
  try {
    const response = await fetch(`/pokemon/${name}/image`);
    const data = await response.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    const imgContainer = document.getElementById('image-container');
    imgContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = data.imageUrl;
    img.alt = name;
    imgContainer.appendChild(img);
  } catch (error) {
    alert('Error en obtenir la imatge');
  }
});

document.getElementById('show-abilities').addEventListener('click', async () => {
  const name = document.getElementById('pokemon-name').value.trim();
  if (!name) {
    alert('Introdueix un nom de Pokémon');
    return;
  }
  try {
    const response = await fetch(`/pokemon/${name}/abilities`);
    const data = await response.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    const abilitiesList = document.getElementById('abilities-list');
    abilitiesList.innerHTML = '';
    data.abilities.forEach(ability => {
      const li = document.createElement('li');
      li.textContent = ability;
      abilitiesList.appendChild(li);
    });
  } catch (error) {
    alert('Error en obtenir les habilitats');
  }
});

document.getElementById('show-xml').addEventListener('click', async () => {
  const name = document.getElementById('pokemon-name').value.trim();
  if (!name) {
    alert('Introdueix un nom de Pokémon');
    return;
  }
  try {
    const response = await fetch(`/pokemon/${name}/xml`);
    if (!response.ok) {
      throw new Error('Pokémon no trobat');
    }
    const xmlText = await response.text();
    document.getElementById('xml-output').textContent = xmlText;
  } catch (error) {
    alert('Error en obtenir el XML');
  }
});
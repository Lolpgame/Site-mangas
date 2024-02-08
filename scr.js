// Exemplo de dados salvos localmente (pode ser substituído por um servidor ou outro meio de armazenamento)
let savedImageData = JSON.parse(localStorage.getItem('imageData')) || [];

const gallery = document.getElementById('gallery');
const editText = document.getElementById('editText');
const addImageBtn = document.getElementById('addImageBtn');
const editBtn = document.getElementById('editBtn');

let selectedImageIndex = -1; // Índice da imagem selecionada para edição

// Função para exibir imagens na galeria
function displayImages() {
  savedImageData.forEach((data, index) => {
    const imgContainer = createImageContainer(data.src, data.text, index);
    gallery.appendChild(imgContainer);
  });
}

// Função para exibir texto editável ao clicar na imagem
function displayText(text, index) {
  editText.innerText = text;
  selectedImageIndex = index;
}

// Função para criar um contêiner de imagem
function createImageContainer(src, text, index) {
  const imgContainer = document.createElement('div');
  imgContainer.classList.add('image-container');

  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Imagem Adicionada';
  img.addEventListener('click', function() {
    displayText(text, index);
  });

  const textBox = document.createElement('div');
  textBox.classList.add('text-box');
  imgContainer.appendChild(img);
  imgContainer.appendChild(textBox);

  return imgContainer;
}

// Inicializar o carregamento da galeria
displayImages();

// Adicionar imagem ao clicar no botão
addImageBtn.addEventListener('click', function() {
  const imageUrl = prompt("Insira o URL da imagem:");

  if (imageUrl) {
    const text = prompt("Insira um texto personalizável:");

    // Salvar dados localmente
    savedImageData.push({ src: imageUrl, text });
    localStorage.setItem('imageData', JSON.stringify(savedImageData));

    // Adicionar à galeria
    const imgContainer = createImageContainer(imageUrl, text, savedImageData.length - 1);
    gallery.appendChild(imgContainer);
  }
});

// Botão de editar texto
editBtn.addEventListener('click', function() {
  if (selectedImageIndex !== -1) {
    const newText = prompt("Edite o texto:");
    
    if (newText !== null) { // Verifica se o usuário pressionou "Cancelar"
      savedImageData[selectedImageIndex].text = newText;
      localStorage.setItem('imageData', JSON.stringify(savedImageData));
      editText.innerText = newText;
    }
  } else {
    alert("Selecione uma imagem antes de editar o texto.");
  }
});
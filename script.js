// Exemplo de dados salvos localmente (pode ser substituído por um servidor ou outro meio de armazenamento)
let savedImageData = JSON.parse(localStorage.getItem('imageData')) || [];

const gallery = document.getElementById('gallery');
const editText = document.getElementById('editText');
const addImageBtn = document.getElementById('addImageBtn');
const editBtn = document.getElementById('editBtn');
const redirectBtn = document.getElementById('redirectBtn');

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
    const currentText = savedImageData[selectedImageIndex].text;
    const newText = prompt("Edite o texto:", currentText || "");

    if (newText !== null) { // Verifica se o usuário pressionou "Cancelar"
      savedImageData[selectedImageIndex].text = newText;
      localStorage.setItem('imageData', JSON.stringify(savedImageData));
      editText.innerText = newText;
    }
  } else {
    alert("Selecione uma imagem antes de editar o texto.");
  }
});


// Botão de redirecionamento
redirectBtn.addEventListener('click', function() {
  if (selectedImageIndex !== -1) {
    const selectedImageData = savedImageData[selectedImageIndex];
    
    if (selectedImageData && selectedImageData.text) {
      const redirectUrl = selectedImageData.text;
      window.open(redirectUrl, '_blank');
    } else {
      alert("O texto associado à imagem não está definido.");
    }
  } else {
    alert("Selecione uma imagem antes de clicar em 'Redirecionar'.");
  }
});

// Adicione o seguinte código para criar um botão de exclusão e lidar com a exclusão
const deleteBtn = document.getElementById('deleteBtn');

deleteBtn.addEventListener('click', function() {
  if (selectedImageIndex !== -1) {
    // Pergunta ao usuário se tem certeza
    const confirmation = confirm("Tem certeza que deseja excluir esta imagem?");

    if (confirmation) {
      const confirmation2 = confirm("Tem certeza mesmo que deseja excluir esta imagem?");
      if (confirmation2) {
        // Remove a imagem dos dados locais
        savedImageData.splice(selectedImageIndex, 1);
        // Atualiza os dados locais
        localStorage.setItem('imageData', JSON.stringify(savedImageData));

        // Limpa a galeria e reexibe as imagens atualizadas
        clearGallery();
        displayImages();

        // Limpa o texto editável
        editText.innerText = "";
        // Redefine o índice da imagem selecionada
        selectedImageIndex = -1;
      }
    } else {
      alert("Selecione uma imagem antes de excluir.");
    }
  }
});

const editImageBtn = document.getElementById('editImageBtn');

// Botão de editar imagem
editImageBtn.addEventListener('click', function() {
  if (selectedImageIndex !== -1) {
    const newImageUrl = prompt("Insira o novo URL da imagem:");

    if (newImageUrl !== null) { // Verifica se o usuário pressionou "Cancelar"
      savedImageData[selectedImageIndex].src = newImageUrl;
      localStorage.setItem('imageData', JSON.stringify(savedImageData));
      // Atualiza a imagem na galeria
      const imgContainers = document.querySelectorAll('.image-container');
      imgContainers[selectedImageIndex].querySelector('img').src = newImageUrl;
    }
  } else {
    alert("Selecione uma imagem antes de editar.");
  }
});

// Adicione a função para limpar a galeria
function clearGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ""; // Remove todos os elementos filhos da galeria
}
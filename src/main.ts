import './style.css' 

interface Card {
  id: number,
  icone: string,
  cor: string,
  titulo: string,
  descricao: string,
  tecnologias: string[],
  link: string,
}

const app = document.querySelector<HTMLDivElement>('#app')!

async function carregarCards(){
  //1 Pega os intens na api
  const response = await fetch('http://localhost:5173/cards.json')
  //Tipa a resposta (interface Card) e transforma em json
  const cards : Card[] = await response.json()
  
  //3 Injeta cõdigo HTML dentro da div app
  app.innerHTML = `
  <header>
    <h1>Projetos Open Source</h1>
  </header>
  <input type="text" id="barra-pesquisa" class="pesquisa" placeholder="Buscar projeto...">

    <div id='cards' class='card-galeria'></div>

`
  //4 Aponta a const cardsContainer para a div cards
  const cardsContainer = document.querySelector<HTMLDivElement>('#cards')!
  
  //5 Faz um for Each na resposta da API(2)
  cards.forEach(card =>{
    //6 Cria um Elemento Div
    const cardDiv = document.createElement('div')
    
    cardDiv.classList.add('card')

    //7 Adiciona conteudo dentro da div criada
    cardDiv.innerHTML = `
      <div class="card-imagem" style="background-color: ${card.cor};"><img src="/${card.icone}"></div>
      <div class="titulo"><h3>${card.titulo}</h3></div>
      <div class="card-texto">${card.descricao}</div>
      <div class="linguagens-card"></div>
      <div class="botao-projeto">
        <a href="#" class="ver-projeto">Ver Projeto</a>
      </div>
      `

    const linguagensContainer = cardDiv.querySelector('.linguagens-card')!;
    card.tecnologias.forEach(linguagem => {
      const p = document.createElement('p');
      p.className = 'linguagem'; 
      p.textContent = linguagem;
      linguagensContainer.appendChild(p);
    })

    //8 Coloca a div criada (cardDiv) dentro da div Cards
    cardsContainer.appendChild(cardDiv)
  })

}

carregarCards()


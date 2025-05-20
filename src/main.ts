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
    <h1>Projetos Open Source:</h1>
    <div id='cards' class= 'cards'></div>
  `
  //4 Aponta a const cardsContainer para a div cards
  const cardsContainer = document.querySelector<HTMLDivElement>('#cards')!
  
  //5 Faz um for Each na resposta da API(2)
  cards.forEach(card =>{
    //6 Cria um Elemento Div
    const cardDiv = document.createElement('div')
    
    //7 Adiciona conteudo dentro da div criada
    cardDiv.innerHTML = `
      <div>${card.titulo}</div>
      <div>${card.descricao}</div>
      <div>${card.tecnologias}</div>
      <div>Ver Projeto</div>
      `
    //8 Coloca a div criada (cardDiv) dentro da div Cards
    cardsContainer.appendChild(cardDiv)
  })

}

carregarCards()

app.innerHTML = "<h1>Olá Mundo da Web</h1>"
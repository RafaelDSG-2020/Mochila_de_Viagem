const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => 
{
    cria_Elemento(elemento);
    //console.log(elemento);    
});



form.addEventListener("submit", (evento) => 
{
    evento.preventDefault();
    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];

    const existe = itens.find(elemento => elemento.nome === nome.value);
   // console.log(existe);

    const itemAtual = 
    {
        "nome" : nome.value,
        "quantidade" : quantidade.value,
    }

    if(existe)
    {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);
        
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }
    else
    {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id +1 : 0;

        cria_Elemento(itemAtual);

        itens.push(itemAtual);

    }

    
    localStorage.setItem("itens",JSON.stringify(itens));  

    nome.value = "";
    quantidade.value = "";
    
})

function cria_Elemento(Item)
{
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = Item.quantidade;
    numeroItem.dataset.id = Item.id;
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += Item.nome;

    novoItem.appendChild(Botao_Deleta(Item.id));

   // const lista = document.getElementById("lista");

    lista.appendChild(novoItem);
    
}

function atualizaElemento(item)
{
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function Botao_Deleta(id)
{
    const elemento_Botao = document.createElement("button");

    elemento_Botao.innerText = "X";

    elemento_Botao.addEventListener("click",function()
    {
        deleta_Elemento(this.parentNode, id);
        console.log(this.parentNode.innerText)
    })

    return elemento_Botao;
}

function deleta_Elemento(tag , id)
{
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id) , 1);

    localStorage.setItem("itens",JSON.stringify(itens));  
}
//COLOCAR TRATAMENTOS
let nome = prompt("Por qual nome gostaria de ser chamado(a)?");
let mensagens = []; //TAMANHO MAXIMO?
let ultimaMsg = undefined;

function logar(){
    let promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", {name: nome});
    
    promise
    .then(function() {
        buscarMsg();
    })
    .catch(function (erro){
        alert("Nome em uso, pfv escolha outro");
        console.log("Status code: " + erro.response.status); // Ex: 404
	    console.log("Mensagem de erro: " + erro.response.data); // Ex: Not Found
        nome = prompt("Por qual nome gostaria de ser chamado(a)?");
        logar(); //window.location.reload()
    });
}


function buscarMsg() {
    let promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise
    .then(function (resposta) {
        let mensagem = document.querySelector(".container");
        mensagem.innerHTML = "";
            for(let i = 0; i < resposta.data.length; i++){
                mensagens[i] = (resposta.data[i]);
                let mensagem = document.querySelector(".container"); // ALTERAR O INNERHTML PARA NO MAX 50MSG NA TELA (TAMANHO MAXIMO MENSAGENS?)
                // console.log(mensagens[i]);
                
                if(mensagens[i].type === "message"){
                    let mensagem = document.querySelector(".container"); // ALTERAR O INNERHTML PARA NO MAX 50MSG NA TELA (TAMANHO MAXIMO MENSAGENS?)
                    mensagem.innerHTML += ` 
                    <div class="mensagem todos"> 
                        <p>(${mensagens[i].time})<strong> ${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}</p>
                    `
                }
                if(mensagens[i].type === "status") {
                    let mensagem = document.querySelector(".container"); // ALTERAR O INNERHTML PARA NO MAX 50MSG NA TELA (TA MULTIPLICANDO DESNECESSARIAMENTE AS MSGS (MSG VELHA + (MENSAGEM VELHA = NOVA))))
                    mensagem.innerHTML += `
                    <div class="mensagem status">
                        <p>(${mensagens[i].time})<strong> ${mensagens[i].from}</strong> ${mensagens[i].text}</p>
                    `
                }
            }
        
    })
}

function enviarMsg() {
    let input = document.querySelector("input");
    console.log(input.value);
    let promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", {
        from: nome,
	    to: "Todos",
	    text: input.value,
	    type: "message"
    }); //TEM ALGUM UNDEFINED BROTANDO QUANDO CHAMA ESSA FUNC
    promise
    .then(function (resposta) {
        console.log(resposta); //chamar buscarMsg --- msg nao sao em tempo real?? 
    })
}

logar();

setInterval(function() {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", { name: nome })
    .then()
    .catch();
}, 5000);

setInterval(function() {
    buscarMsg();
    const last = document.querySelector('.container');
    const elementoQueQueroQueApareca = last.lastChild
    console.log(elementoQueQueroQueApareca);
    elementoQueQueroQueApareca.scrollIntoView();
}, 3000);
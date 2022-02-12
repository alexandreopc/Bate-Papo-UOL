let nome = prompt("Por qual nome gostaria de ser chamado(a)?");
function logar(){
    let promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", {name: nome})
    
    promise
    .then(function() {

    })
    .catch(function (erro){
        alert("Nome em uso, pfv escolha outro");
        console.log("Status code: " + erro.response.status); // Ex: 404
	    console.log("Mensagem de erro: " + erro.response.data); // Ex: Not Found
        nome = prompt("Por qual nome gostaria de ser chamado(a)?");
        logar();
    });
}
setInterval(function() {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", { name: nome })
    .then()
    .catch(console.log(nome))
}, 5000);

logar();


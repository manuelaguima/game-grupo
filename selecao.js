function funcionado() {
    var radios = document.getElementsByName("char");
    for (let i = 0; i < radios.length; i++) {
        if(radios[i].checked){
            localStorage.setItem("personagemSelecionado", radios[i].value);
            
        }
    }
}
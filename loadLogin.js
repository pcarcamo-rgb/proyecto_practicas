function verifyLogin  () {

    if(window.sessionStorage.getItem('user')){
        const user = JSON.parse(window.sessionStorage.getItem('user'))
        const accessButton = document.getElementById("accesButton");
        const linkAccess = document.getElementById('linkAccess')
        const linkUser = document.getElementById('linkUser')
        const userButton = document.getElementById('userButton')
        const partOfUsContainer = document.getElementById('partOfUsContainer')
        const calculadora = document.getElementById('calculadora')


        linkAccess.style.display = 'none'
        accessButton.style.display = 'none'
        linkUser.style.display = 'block'
        linkUser.href = `/pagusuario/usuario.html?id=${user[0].idUsuario}`;
        userButton.style.display = 'block'
        userButton.innerText = user[0].usernameUsuario
        
        if (partOfUsContainer) {
            partOfUsContainer.style.display = 'none'; calculadora.style.display = 'flex';
        }
       
        

    }
}
const formulario = document.getElementById('formRegistro');
const accessButton = document.getElementById('accessButton')
const userButton = document.getElementById('userButton')

formulario.addEventListener('submit',(event) =>{
    event.preventDefault()
    
    const formData = new FormData(formulario)
    console.table(Object.fromEntries(formData))

    const user = {
        user:{
        usernameUsuario: formData.get('usuario'),
        apellidoUsuario: formData.get('apellido'),
        nombreUsuario: formData.get('nombre'),
        emailUsuario: formData.get('mail'),
        telefonoUsuario:formData.get('numero'),
        passwordUsuario: formData.get('contraseña')}
    }

    fetch('https://gregarious-raindrop-0fb73e.netlify.app/registUser', {
        method:"POST",
        body:JSON.stringify(user),
        headers:{"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(({info}) => {
        if(info.status === "OK"){
            alert(info.message);
           sendEmail(formData.get('mail'), info.userId);
        }
    })
    .catch(error =>{
        throw (error)
    })
})

const sendEmail = (email,userId) => {
    fetch('https://gregarious-raindrop-0fb73e.netlify.app/sendEmail',{
        method:"POST",
        body:JSON.stringify({
            email: email,
            userId:userId
        }),
        headers:{"Content-type": "application/json; charset=UTF-8"}
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "OK"){
            alert('Verifique su Mail')
        }
    })
    .catch(error =>{
        throw(error)
    })
}


const login = () =>{
    const userLogin = document.getElementById('usuarioLogin').value
    const passLogin = document.getElementById('passwordLogin').value
    
    if(userLogin && passLogin){
        fetch('https://gregarious-raindrop-0fb73e.netlify.app/loginUser',{
            method: "POST",
            body:JSON.stringify({
                usernameUsuario: userLogin,
                passwordUsuario: passLogin
            }),
            headers:{'Content-type': 'application/json; charset=UTF-8'}
        })
        .then(res => {
            if(res.status === 200){
                return res.json()
            }else{
                throw new Error('Error interno al intentar iniciar sesion'+ res.status + " "+ res.statusText)
            }
        })
        .then(data => {
            console.table(data)
            console.log(data.status)
            alert('Logeado correctaemente')
            accessButton.style.display = 'none'
            userButton.style.display = 'block'
            userButton.innerText = userLogin
            window.location = '../index.html'
            window.sessionStorage.setItem('username',userLogin)


            
        })
        .catch(error => {
            throw (error)
        })
    }
}


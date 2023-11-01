const formulario = document.getElementById('formRegistro');

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
}



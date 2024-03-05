const formulario = document.getElementById('formRegistro');
const errorModal = document.getElementById('errorModal')

function verificarObjetoNoVacio(obj) {
    for (const key in obj) {
        if (obj[key] === "") {
            throw new Error(`El valor de ${key} está vacío`);
        }
    }
}

formulario.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(formulario)

    const user = {
        user: {
            usernameUsuario: formData.get('usuario'),
            apellidoUsuario: formData.get('apellido'),
            nombreUsuario: formData.get('nombre'),
            emailUsuario: formData.get('mail'),
            telefonoUsuario: formData.get('numero'),
            passwordUsuario: formData.get('contraseña')
        }
    }

    for (const key in user.user) {
        if (user.user[key].trim() === "") {
            alert(`Debe completar todos los datos para poder registrarse`);
            return;
        }
    }

    const validation = verifyData(user);

    if(validation.isValid){
        fetch('https://gregarious-raindrop-0fb73e.netlify.app/registUser', {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(res => res.json())
        .then(resp => {
            if (resp.status === 'ERROR') {
                errorMessage(resp.message);
                throw new Error('Error en el servidor');
            }
            return resp;
        })
        .then(response => {
            const info = response.info;
            if (info.status === "OK") {
                alert(info.message);
                sendEmail(formData.get('mail'), info.userId);
            }

        })
        .catch(error => {
            console.error('Hubo un error:', error.message);
            return;
        });
    }else{
        errorMessage(validation.errorMessage);
    }

    


})

const sendEmail = (email, userId) => {
    fetch('https://gregarious-raindrop-0fb73e.netlify.app/sendVerifyEmail', {
        method: "POST",
        body: JSON.stringify({
            email: email,
            userId: userId
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === "OK") {
                alert('Verifique su Mail')
            }
        })
        .catch(error => {
            throw (error)
        })
}


const login = () => {
    const userLogin = document.getElementById('usuarioLogin').value
    const passLogin = document.getElementById('passwordLogin').value

    if (userLogin && passLogin) {
        fetch('https://gregarious-raindrop-0fb73e.netlify.app/loginUser', {
            method: "POST",
            body: JSON.stringify({
                usernameUsuario: userLogin,
                passwordUsuario: passLogin
            }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw new Error('Al iniciar sesion, Usuario o Contraseña incorrectos.')
                }
            })
            .then((data) => {

                alert('Logeado correctaemente')

                window.location = '../index.html'

                window.sessionStorage.setItem('user', JSON.stringify(data.user), data.token)

            })
            .catch(error => {
                errorMessage(error)
                throw (error)
            })
    }
}

const errorMessage = (messageError) => {
    console.log(messageError)

    const content = document.getElementById('errorModalContent')

    content.innerHTML = messageError;
    errorModal.showModal()
}

const closeModal = () => {
    errorModal.close()
}

const verifyData = ( data ) => {
    
    const {user} = data;
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const patronNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const patronContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!patronNombreApellido.test(user.apellidoUsuario) || !patronNombreApellido.test(user.nombreUsuario)) {
        return { isValid: false, errorMessage: "El nombre o el apellido no son válidos." };
    }

    if(!patronCorreo.test(user.emailUsuario)) return { isValid: false, errorMessage: "El correo electrónico no es válido." };
    
    if (user.telefonoUsuario.length < 9) {
        return { isValid: false, errorMessage: "El número de teléfono debe tener al menos 10 dígitos." };
    }
    
    if (!patronContrasena.test(user.passwordUsuario)) {
        return { isValid: false, errorMessage: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número." };
    }
    return { isValid: true };
}

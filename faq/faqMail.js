const formulario = document.getElementById('faqForm');

formulario.addEventListener('submit', ( event ) => {
    event.preventDefault();
    
    const formData = new FormData(formulario)

    const data = {
        mail : formData.get('mail'),
        nombre: formData.get('nombre'),
        faq: formData.get('faq')
    }

    const validation = verifyData(data)

    if(validation.isValid){
            fetch('https://gregarious-raindrop-0fb73e.netlify.app/sendEmail', {
        method:"POST",
        body:JSON.stringify({
            mail : formData.get('mail'),
            nombre : formData.get('nombre'),
            faq : formData.get('faq')
        }),
        headers:{"Content-type": "application/json; charset=UTF-8"}
        }).then(res => {
            if(res.status === 200){
                alert('Correo enviado con exito! Tu pregunta sera respondida a la brevedad.')
                formulario.reset();
            }
        })
    }else{
        alert(validation.errorMessage)
    }
})

const verifyData = ( data ) => {
    
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const patronNombre= /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    if (!patronNombre.test(data.nombre)) {
        return { isValid: false, errorMessage: "El nombre no es valido!." };
    }

    if(!patronCorreo.test(data.mail)) return { isValid: false, errorMessage: "El correo electrónico no es válido." };
    
    return { isValid: true };
}

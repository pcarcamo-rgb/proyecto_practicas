const formulario = document.getElementById('faqForm');

formulario.addEventListener('submit', ( event ) => {
    event.preventDefault();
    
    const formData = new FormData(formulario)
    console.log('Formulario enviado');
    
   const info = 
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
})
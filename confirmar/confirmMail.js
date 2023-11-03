const urlParams = new URLSearchParams(window.location.search);
        
const nombre = urlParams.get('idUser');

function confirmMail (idUser){
    fetch('https://gregarious-raindrop-0fb73e.netlify.app/verifyEmail?userId='+idUser,{
        method:"PUT",
    })
}
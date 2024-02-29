function confirmMail (){
    const urlParams = new URLSearchParams(window.location.search);   
    const userId = urlParams.get('userId')
        console.log(userId)
    console.table(urlParams)
    fetch(`https://gregarious-raindrop-0fb73e.netlify.app/verifyEmail?userId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Respuesta:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        })};
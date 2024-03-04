document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const user = JSON.parse(window.sessionStorage.getItem('user')); // Parsea el JSON guardado en sessionStorage
    if(user){
        loadInfo(user[0]); // Pasamos el objeto completo del usuario
    }else{
        fetch()
    }
})



const loadInfo = ( user ) => {
    document.getElementById('name').value = user.nombreUsuario;
    document.getElementById('lastName').value = user.apellidoUsuario;
    document.getElementById('telefono').value = user.telefonoUsuario;
    document.getElementById('user').value = user.usernameUsuario;
    document.getElementById('mail').value = user.emailUsuario;
}


const saveButton = document.getElementById('saveButton');
const userForm = document.getElementById('userInfoForm');
userForm.addEventListener('change', (e) => {
   saveButton.disabled = false;
})


const deleteButton = document.getElementById('deleteButton');
const deleteModal = document.getElementById('closeUser')
deleteButton.addEventListener('click', () =>  {
   deleteModal.showModal();
})


const btnCancelarModal = document.getElementById('btnCancelarModal')
btnCancelarModal.addEventListener('click', () => {
    deleteModal.close();
})


const closeSession = () => {
    sessionStorage.removeItem('user');
    window.location = '../login/login.html'
}
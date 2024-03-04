document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (id) {
        fetch(`https://gregarious-raindrop-0fb73e.netlify.app/userById/${id}`)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error(`Error al obtener usuario (${resp.status})`);
                }
            })
            .then(user => loadInfo(user[0]))
            .catch(error => console.error(error));
    } else {
        console.error('No se proporcionó un ID en la URL');
    }
});




const loadInfo = (user) => {
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


saveButton.addEventListener('click', () => {
    const formData = new FormData(document.getElementById('userInfoForm'))
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');


    const user = {
        user: {
            usernameUsuario: formData.get('user'),
            apellidoUsuario: formData.get('lastName'),
            nombreUsuario: formData.get('name'),
            emailUsuario: formData.get('mail'),
            telefonoUsuario: formData.get('telefono'),
            idUsuario: id
        }
    }

    fetch('https://gregarious-raindrop-0fb73e.netlify.app/updateUser', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then(res => res.json())
        .then(resp => {
            if (resp) location.reload()
        }).catch(e => { console.error(e) });
})


const deleteButton = document.getElementById('deleteButton');
const deleteModal = document.getElementById('closeUser')
deleteButton.addEventListener('click', () => {
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

const deleteUser = document.getElementById('btnDarDeBajaModal')
deleteUser.addEventListener('click', () => {
    const deleteInfoCheck = document.getElementById('borrarInfo');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (deleteInfoCheck.checked) {
        fetch(`https://gregarious-raindrop-0fb73e.netlify.app/user/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Usuario eliminado exitosamente');

                } else {
                    console.error('Error al eliminar usuario:', response.status);

                }
            })
            .catch(error => {
                console.error('Error de red:', error);

            });
    } else {
        fetch(`https://gregarious-raindrop-0fb73e.netlify.app/user/${id}`, {
            method: 'PATCH'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Usuario dado de baja exitosamente');

                } else {
                    console.error('Error al eliminar usuario:', response.status);

                }
            })
            .catch(error => {
                console.error('Error de red:', error);

            });
    }
})
const accessButton = document.getElementById('accessButton')
const userButton = document.getElementById('userButton')

function verifyLogin  () {
    if(window.sessionStorage.getItem('username')){
        const user =JSON.parse(window.sessionStorage.getItem('user'))
        console.table(user)
        accessButton.style.display = 'none'
        userButton.style.display = 'block'
        userButton.setAttribute('href', 'https://www.google.com/')
        const button = userButton.children
        button[0].textContent = 
    }
}
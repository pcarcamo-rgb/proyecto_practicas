//modals
const mdlnombre = document.querySelector("#mdlnombre");
const mldnickname = document.querySelector("#mldnickname");
const mdlmail = document.querySelector("#mdlmail");
const mdlcontrasena = document.querySelector("#mdlcontrasena");

//botones para abrir modals
const btnnombre = document.querySelector("#btnnombre");
const btnnickname = document.querySelector("#btnnickname");
const btnmail = document.querySelector("#btnmail");
const btncontraseña = document.querySelector("#btncontraseña");

//botones para cerrar modals
const btncancelarnombre = document.querySelector("#btncancelarnombre");
const btncancelarnickname = document.querySelector("#btncancelarnickname");
const btncancelarmail = document.querySelector("#btncancelarmail");
const btncancelarcontrasena = document.querySelector("#btncancelarcontrasena");

//botones para guardar cambios


//funciones para abrir modals
btnnombre.addEventListener("click", ()=>{
    mdlnombre.showModal();
});

btnnickname.addEventListener("click", ()=>{
    mldnickname.showModal();
});

btnmail.addEventListener("click", ()=>{
    mdlmail.showModal();
});

btncontraseña.addEventListener("click", ()=>{
    mdlcontrasena.showModal();
});

//funciomes para cerrar models
btncancelarnombre.addEventListener("click", ()=>{
    mdlnombre.close();
});

btncancelarnickname.addEventListener("click", ()=>{
    mldnickname.close();
});

btncancelarmail.addEventListener("click", ()=>{
    mdlmail.close();
});

btncancelarcontrasena.addEventListener("click", ()=>{
    mdlcontrasena.close();
});
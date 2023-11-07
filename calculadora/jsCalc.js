function agregarNumero(numero) {
  const entrada = document.getElementById('out').value;
  if (entrada === '$') {
    document.getElementById('out').value = `$${numero}`;
  } else {
    document.getElementById('out').value += numero;
  }
}

function borrarUltimoDigito() {
  const entrada = document.getElementById('out').value;
  if (entrada.length > 1) {
    document.getElementById('out').value = entrada.slice(0, -1);
  } else {
    document.getElementById('out').value = '$';
  }
}

function reiniciarCalculadora() {
  document.getElementById('out').value = '$';
}

function calcularComision() {
  const entrada = document.getElementById('out').value;
  if (entrada !== '$') {
    const numero = parseFloat(entrada.slice(1)); 
    if (!isNaN(numero)) {
      const comision = (numero * 0.10).toFixed(2);
      document.getElementById('out').value = `La comisión es de $${comision}`;
    } else {
      alert('Por favor, ingresa un número válido antes de calcular.');
    }
  } else {
    alert('Por favor, ingresa un número antes de calcular.');
  }
}
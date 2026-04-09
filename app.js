const botonesAgregar = document.querySelectorAll('.btn-agregar');
const listaCarrito = document.querySelector('#lista-carrito');
const badge = document.querySelector('#badge');
const badgeDesktop = document.querySelector('.badge-desktop');
let cantidadItems = 0;
let totalAcumulado = 0;
const total = document.querySelector('#total');
const btnTodas = document.querySelectorAll('.btn-todas');
const btnClasica = document.querySelectorAll('.btn-clasica');
const btnPicante = document.querySelectorAll('.btn-picante');
const btnLimon = document.querySelectorAll('.btn-limon');
const btnPollo = document.querySelectorAll('.btn-pollo');
const productos = document.querySelectorAll('[class*="cate-"]');
const btnVaciar = document.querySelector('#btn-vaciar');
btnVaciar.addEventListener('click', limpiarCarrito);
const mensaje = document.querySelector('#msg-vacio');


function showAlert({ type, message }) {
    Swal.fire({
        toast: true,
        position: 'top',
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true
    });
}

btnTodas.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        productos.forEach(p => {
            p.style.display = 'block';
        });
    });
});

btnClasica.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        productos.forEach(p => {
            if (p.classList.contains('cate-clasica')) {
                p.style.display = 'block';
            } else {
                p.style.display = 'none';
            }
        });
    });
});

btnPicante.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        productos.forEach(p => {
            if (p.classList.contains('cate-picante')) {
                p.style.display = 'block';
            } else {
                p.style.display = 'none';
            }
        });
    });
});

btnLimon.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        productos.forEach(p => {
            if (p.classList.contains('cate-limon')) {
                p.style.display = 'block';
            } else {
                p.style.display = 'none';
            }
        });
    });
});

btnPollo.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        productos.forEach(p => {
            if (p.classList.contains('cate-pollo')) {
                p.style.display = 'block';
            } else {
                p.style.display = 'none';
            }
        });
    });
});

botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {

        const nombre = boton.dataset.nombre;
        const precio = boton.dataset.precio;

        agregarAlCarrito(nombre, precio);
    });
});

function agregarAlCarrito(nombre, precio) {

    mensaje.style.display = 'none';

    const li = document.createElement('li');

    li.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-center'
    );

        li.innerHTML = `
            <span>${nombre}</span>
            <div class="d-flex align-items-center gap-2">
                <span class="badge bg-success fw-bold">
                    $${Number(precio).toLocaleString('es-CO')}
                </span>
                <button class="btn btn-sm btn-danger btn-eliminar">✕</button>
            </div>
        `;

    listaCarrito.appendChild(li);

    const btnEliminar = li.querySelector('.btn-eliminar');

    btnEliminar.addEventListener('click', () => {
        eliminarItem(li, precio);
    });

    // contador items
    cantidadItems++;

    // 🔥 SUMAR TOTAL
    totalAcumulado += Number(precio);

    // actualizar UI
    total.textContent = '$' + totalAcumulado.toLocaleString('es-CO');

    badge.textContent = cantidadItems;

    if (badgeDesktop) {
        badgeDesktop.textContent = cantidadItems;
    }

    showAlert({
        type: 'success',
        message: `${nombre} agregado 🛒`
    });
}

function eliminarItem(li, precio) {

    li.remove();

    cantidadItems--;

    totalAcumulado -= Number(precio);

    total.textContent = '$' + totalAcumulado.toLocaleString('es-CO');

    badge.textContent = cantidadItems;

    if (badgeDesktop) {
        badgeDesktop.textContent = cantidadItems;
    }

    if (cantidadItems === 0) {
        document.querySelector('#msg-vacio').style.display = 'block';
    }

    showAlert({
        type: 'info',
        message: 'Papita eliminada 🫡'
    });
}

function limpiarCarrito() {

    Swal.fire({
        title: '¿Ya no quieres Papitas 🥹?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, ya no quiero Papitas 😒',
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        if (result.isConfirmed) {

            // eliminar todos los productos excepto el mensaje
            const items = listaCarrito.querySelectorAll('li:not(#msg-vacio)');
            items.forEach(li => li.remove());

            // resetear contador
            cantidadItems = 0;

            // actualizar badge
            badge.textContent = 0;
            if (badgeDesktop) {
                badgeDesktop.textContent = 0;
            }

            // mostrar mensaje vacío
            mensaje.style.display = 'block';

            // alerta final
            showAlert({
                type: 'success',
                message: 'Las Papitas se fueron 🫡'
            });

            totalAcumulado = 0;
            total.textContent = '$0';            
        }
    });
}

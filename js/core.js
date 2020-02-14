/**
 *
 * Funcionalidad del menú
 * */

/**
 * Función para determinar cuando el navegador ya cargó los recursos (HTML, CSS,...)
 * Esta función tiene soporte para navegadores múltiples
 * IE6+
 * Firefox 3.6+
 * Chrome
 * Safari 5.1+
 * Opera 11.6+
 * Android
 * Etc
 */
let domReady = function (callback) {
    let ready = false;

    let detach = function () {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    };
    let completed = function () {
        if (!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
            ready = true;
            detach();
            callback();
        }
    };

    if (document.readyState === "complete") {
        callback();
    } else if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    } else {
        document.attachEvent("onreadystatechange", completed);
        window.attachEvent("onload", completed);

        let top = false;

        try {
            top = window.frameElement == null && document.documentElement;
        } catch (e) {
        }

        if (top && top.doScroll) {
            (function scrollCheck() {
                if (ready) return;

                try {
                    top.doScroll("left");
                } catch (e) {
                    return setTimeout(scrollCheck, 50);
                }

                ready = true;
                detach();
                callback();
            })();
        }
    }
};


//Llamada a la función de arriba, el argumento es una función anónima que contiene el código para manipular el menú de navegación
domReady(function () {
    //seleccionamos la barra de navegación
    let nav = document.querySelector(".h-navigation");
    //seleccionamos el elemento que abre/cierra el menu
    let menu_btn = nav.querySelector("[data-menu-trigger]");
    //seleccionamos el elemento que es invisible (el ul que esta oculto)
    let hidden_element = nav.querySelector("ul.right");
    //al dar click en el boton abrir o cerrar el menú
    menu_btn.addEventListener("click", function (evt) {
        evt.preventDefault(); //Si el botón es un enlace evitar el comportamiento predeterminado (redirigir al enlace)
        evt.stopPropagation(); //Detener la propagación del evento
        //verificar si el elemento es visible, esto se puede hacer verificando si el elemento tiene la clase 'visible'
        if (hidden_element.classList.contains("visible")) {
            //el elemento es visible, entonces hay que esconderlo
            hidden_element.classList.remove("visible");
        }else {
            //el elemento no es visible, entonces hay que mostrarlo
            hidden_element.classList.add("visible");
        }
    });
});
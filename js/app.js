;(function() {

	window.addEventListener("load", cargaPagina);

	var texto = document.getElementById("mensaje");
	var boton = document.getElementById("enviar");
	var contador = 1;

	function cargaPagina() {
		boton.addEventListener("click", agregarMensaje);
		texto.addEventListener("keyup", validarMensaje);
	}

	function agregarMensaje(evento) {
		evento.preventDefault();

		if (existeContenido(texto.value)) {
			var mensajes = document.getElementById("mensajes");

			var divHorizontal = crearElemento("div", ["card", "horizontal"]);

			var divTarjeta = crearElemento("div", ["card-stacked"]);

			var divContenido = crearElemento("div", ["card-content"]);

			var checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.id = "check" + contador;
			checkbox.addEventListener("click", tacharTexto);

			var etiqueta = document.createElement("label");
			etiqueta.setAttribute("for", "check" + contador);
			etiqueta.textContent = texto.value;

			var icono = crearElemento("i", ["material-icons", "right"]);
			icono.textContent = "delete";
			icono.addEventListener("click", eliminarMensaje);

			divContenido.appendChild(checkbox);
			divContenido.appendChild(etiqueta);
			divContenido.appendChild(icono);

			divTarjeta.appendChild(divContenido);

			divHorizontal.appendChild(divTarjeta);

			mensajes.appendChild(divHorizontal);
			
			texto.value = "";
			boton.disabled = true;
			contador++;
		} else {
			alert("Ingresa contenido");
		}	
	}

	function tacharTexto() {
		this.nextSibling.classList.toggle("tachado");
	}

	function eliminarMensaje() {
		var divHorizontal = padres(this, 3);
		eliminar(divHorizontal);
	}

	function validarMensaje() {
		var mensaje = texto.value.trim();
		if (mensaje.length == 0) {
			boton.disabled = true;
		} else {
			boton.disabled = false;
		}
	}

	function existeContenido(mensaje) {
		mensaje = mensaje.trim();
		if (mensaje.length == 0) {
			return false;
		} else {
			return true;
		}
	}

	function padres(elemento, numero) {
		while(numero > 0) {
			elemento = elemento.parentElement;
			numero--;
		}
		return elemento;
	}

	function eliminar(elemento) {
		elemento.parentElement.removeChild(elemento);
	}

	function crearElemento(etiqueta, clases = []) {
		var elemento = document.createElement(etiqueta);
		var l = clases.length;
		if(l > 0) {
			for(var i = 0; i < l; i++) {
				elemento.classList.add(clases[i]);
			}
		}
		return elemento;
	}

})();




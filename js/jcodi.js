// MENÚ HAMBURGUESA
var hamburguesa = document.getElementById("hamburguesa");//agafem l'element que te la id de hamburguesa en el html per poder-lo controlar des del js
var menu = document.querySelector("header ul"); //agafem l'element del html per a poder-lo controlar des del js

if (hamburguesa && menu) { //fem un if per certificar que aquest dos elements exixteixen, llavors
    hamburguesa.addEventListener("click", () => { // Afegeix un esdeveniment de clic a la icona hamburguesa
        menu.classList.toggle("actiu"); // Afegeix la classe "actiu" si no hi és, o la treu si ja hi és
    });
}

// POP UP VISITA (primer cop que entres a la web)

// agafem l'element del popup del HTML perquè el puguem controlar amb JS
var popup = document.getElementById("popup");

if (popup) {
    // comprovem si el popup existeix, perquè no doni error si estem en una altra pàgina

    // sessionStorage serveix per guardar dades només mentre el navegador està obert
    // aquí l'utilitzem per saber si l'usuari ja ha vist el popup en aquesta sessió
    if (!sessionStorage.getItem("poppop")) {

        // si encara no l'ha vist, el mostrem amb display flex per centrar-lo
        popup.style.display = "flex";

        // guardem una marca perquè no torni a sortir fins que es tanqui el navegador
        sessionStorage.setItem("poppop", "si");
    }
}

// funció que s'executa quan l'usuari clica el botó de tancar popup
function tancopop() {

    // tornem a agafar el popup per assegurar-nos que existeix
    var popup = document.getElementById("popup");

    if (popup) {
        // l'amaguem canviant display a none
        popup.style.display = "none";
    }
}

// VALIDACIÓ FORMULARI DE REGISTRE

// agafem el formulari de registre per poder detectar quan s'envia
var formulari = document.getElementById("formulari");

if (formulari) {
    // només executem això si realment estem a la pàgina de registre

    // escoltem quan l'usuari envia el formulari (submit) això es fa perquè no es recarregui la pàgina automàticament i així podem validar tots els camps abans d'enviar res
    formulari.addEventListener("submit", function(event) {

        // evitem que la pàgina es recarregui perquè així podem validar abans d'enviar
        event.preventDefault();

        // agafem els camps del formulari que volem validar
        var correu = document.getElementById("correu");
        var contrasenya = document.getElementById("contrasenya");
        var confirmar = document.getElementById("confirmar");

        // comprovem que tots els camps existeixen abans de treballar amb ells
        if (correu && contrasenya && confirmar) {

            // abans de tornar a validar el formulari
            // eliminem els errors anteriors per evitar que es quedin marcats
            correu.classList.remove("error");
            contrasenya.classList.remove("error");
            confirmar.classList.remove("error");

            // variable que ens serveix per saber si tot el formulari és correcte
            let correcte = true;

            // expressió regular per comprovar que el correu tingui format correcte
            // exemple: algo@algo.com
            var correuvalid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // comprovem si el correu compleix el format
            if (!correuvalid.test(correu.value)) {

                // si no és correcte, afegim classe error per marcar-lo en vermell
                correu.classList.add("error");

                // indiquem que el formulari ja no és vàlid
                correcte = false;
            }

            var errorContrasenya = document.getElementById("error-contrasenya");
            // comprovem que les contrasenyes coincideixin i que no estiguin buides
            if (contrasenya.value !== confirmar.value || contrasenya.value === "") {

                // si hi ha error, marquem els dos camps perquè l'usuari ho vegi clar
                contrasenya.classList.add("error");
                confirmar.classList.add("error");

                errorContrasenya.textContent = "Les contrasenyes no coincideixen."; //indiquem quin es el missatge que volem que es mostri a través del textContent, d'aquesta forma mostra per pantalla quin es l'error.
                // indiquem que el formulari no és correcte
                correcte = false;
            }else{ // si les contrasenyes concideixen llavors no mostrem cap missatge d'error
                errorContrasenya.textContent = "";
            }

            // si no s'ha detectat cap error, podem donar el missatge d'èxit
            if (correcte) {

                alert("Formulari enviat correctament!");
            }
        }
    });
}


// ===============================
// VALIDACIÓ FORMULARI DE CONTACTE
// ===============================

// agafem el formulari de contacte (només existeix en la pàgina de contacte)
var formulariContacte = document.getElementById("formulariContacte");

if (formulariContacte) {

    formulariContacte.addEventListener("submit", function(event) {

        // evitem recàrrega per poder validar abans d'enviar
        event.preventDefault();

        // agafem els camps del formulari de contacte
        var correuContacte = document.getElementById("correuContacte");
        var assumpte = document.getElementById("assumpte");
        var missatge = document.getElementById("missatge");
        var nom = document.getElementById("nom");

        // variable que controla si tot és correcte o no
        let correcte = true;

        // netegem errors anteriors per començar validació neta
        if (correuContacte) correuContacte.classList.remove("error");
        if (assumpte) assumpte.classList.remove("error");
        if (missatge) missatge.classList.remove("error");
        if (nom) nom.classList.remove("error");

        // regex per validar el format del correu electrònic
        var correuvalid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // comprovem només el correu (aquí podríem afegir més validacions si volguéssim)
        if (correuContacte && !correuvalid.test(correuContacte.value)) {

            // si el correu no és correcte, el marquem en vermell
            correuContacte.classList.add("error");

            // indiquem error global
            correcte = false;
        }

        // si tot està bé, mostrem missatge final d'enviament correcte
        if (correcte) {

            alert("Missatge enviat correctament!");

            // aquí també es podria connectar amb un backend en el futur
        }
    });
}

// agafem del html tots els elements de la galeria necesaris
var imatges = document.querySelectorAll('.imatge-clic img');
var modal = document.getElementById('modal-galeria');
var imgatgezoom = document.getElementById('imgatge-zoom');
var creueta = document.getElementById('creueta');

// Comprovem que tots els elements existeixen abans d'executar el codi
if (modal && imgatgezoom && creueta && imatges.length > 0) {
    // Recorrem totes les imatges de la galeria
    imatges.forEach(img => {
        img.addEventListener('click', () => { // Afegim un esdeveniment de clic a cada imatge, s'aquetsa manera cda imatge es podra clicar
            modal.style.display = 'flex'; //indiquem que el modal es visible, canviat el seu style desde js amb display
            imgatgezoom.src = img.src; // Assignem al modal la mateixa imatge que s'ha clicat
        });
    });

    // Quan l'usuari clica la creueta, es tanca el modal
    creueta.addEventListener('click', () => {
        modal.style.display = 'none'; //canviem l'estil del modal i fem que no sigui visble
    });
}
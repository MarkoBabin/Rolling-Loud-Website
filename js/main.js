var artisti = []; //headline artists
var nizSlikaSponzori = []; //sponzori slike
var polovi = []; //polovi

$(document).ready(function () {
    $('#moreTextAuthor').css("display", "none");
    $('#toggleAuthorButton').click(function (e) {
        e.preventDefault();
        if ($('#moreTextAuthor').is(':visible')) {
            $('#moreTextAuthor').slideUp();
            $(this).val('Show More');
        } else {
            $('#moreTextAuthor').slideDown();
            $(this).val('Show Less');
        }
    });
    //vanilla box za shop iteme
    $('.shopSlike a').vanillabox();

    //timer
    $(".timerP").countdown("2019/03/20", function (event) {
        $(this).text(
            event.strftime('%Dd %Hh:%Mm:%Ss')
        );
    });


    //ajax za headline artiste
    $.ajax({
        url: "data/artists.json",
        type: "json",
        method: "GET",
        success: function (artists) {
            for (var i = 0; i < artists.length; i++) {
                artisti.push(artists[i]);
            }
        },
        error: function () {
            console.log("There has been an error while loading headline artists!");
        }
    });

    //ajax za spozore
    $.ajax({
        url: "data/sponsors.json",
        type: "json",
        method: "GET",
        success: function (sponsors) {
            for (var i = 0; i < sponsors.length; i++) {
                nizSlikaSponzori.push(sponsors[i]);
            }
        },
        error: function () {
            console.log("There has been an error while loading merchandise for shop!");
        }
    });
    //ajax za polove
    $.ajax({
        url: "data/polovi.json",
        type: "json",
        method: "GET",
        success: function (pol) {
            for (var i = 0; i < pol.length; i++) {
                polovi.push(pol[i]);
            }
        },
        error: function () {
            console.log("There has been an error while loading sexes!");
        }
    });





});

window.onload = function () {
    var modalBox = document.getElementById("myModalLogin");
    var modalBtnOpenLogin = document.getElementById("modalLoginOpen");
    var modalBtnClose = document.getElementsByClassName("close")[0];

    //LOGIN DIALOGUE
    //otvaranje modal box-a login dijaloga
    modalBtnOpenLogin.addEventListener("click", function () {

        modalBox.style.display = "block";
    });
    //zatvaranje modal box-a login dijaloga
    modalBtnClose.addEventListener("click", function () {
        modalBox.style.display = "none";
    });
    //klik bilo gde sem tog bloka zatvara modal login dijaloga
    window.addEventListener("click", function (event) {
        if (event.target == modalBox) {
            modalBox.style.display = "none";
        }
    });

    //REGISTER DIALOGUE
    var modalBtnCloseRegister = document.getElementsByClassName("close")[1];
    var modalBoxRegister = document.getElementById("myModalRegister");
    var modalBtnOpenRegister = document.getElementById("modalRegisterOpen");
    //otvaranje modal box-a register dijaloga
    modalBtnOpenRegister.addEventListener("click", function () {
        modalBoxRegister.style.display = "block";
        document.getElementById("firstName").focus();
    });
    //zatvaranje modal box-a register dijaloga
    modalBtnCloseRegister.addEventListener("click", function () {
        modalBoxRegister.style.display = "none";
    });
    //klik bilo gde sem tog bloka zatvara modal register dijaloga
    window.addEventListener("click", function (event) {
        if (event.target == modalBoxRegister) {
            modalBoxRegister.style.display = "none";
        }
    });

    //dinamicko ispisivanje radio button-a

    var ispisRbSex = "";
    polovi.forEach(function (polovi) {
        ispisRbSex += `
        <div class="rbSex">
            <input type=${polovi.type} name=${polovi.name} id=${polovi.id}><span class=${polovi.class}>${polovi.pol}<span></br>
        </div>
        `
    });
    document.getElementById("rbSexRegister").innerHTML = ispisRbSex;



    //dinamicko ispisivanje dropdown liste
    //dropdown lista godine
    var ddlGodine = [];
    for (let i = 2010; i > 1950; i--) {
        ddlGodine.push(i);
    }
    var ispisGodine;
    ispisGodine = "<select>";
    ispisGodine += "<option value=0>Izaberite...</option>"
    for (let i = 0; i < ddlGodine.length; i++) {
        ispisGodine += "<option value ='" + ddlGodine[i] + "'>" + ddlGodine[i] + "</option>";
    }
    ispisGodine += "</select>";
    document.getElementById("ddlYear").innerHTML = ispisGodine;

    //dropdown lista meseca
    var ddlMeseci = [];
    for (let i = 12; i > 0; i--) {
        ddlMeseci.push(i);
    }
    var ispisMeseci;
    ispisMeseci = "<select>";
    ispisMeseci += "<option value=0>Izaberite...</option>"
    for (let i = 0; i < ddlMeseci.length; i++) {
        ispisMeseci += "<option value ='" + ddlMeseci[i] + "'>" + ddlMeseci[i] + "</option>";
    }
    ispisMeseci += "</select>";
    document.getElementById("ddlMonth").innerHTML = ispisMeseci;

    //dropdown lista dana
    var ddlDani = [];
    for (let i = 31; i > 0; i--) {
        ddlDani.push(i);
    }
    ispisDani = "<select>";
    ispisDani += "<option value=0>Izaberite...</option>"
    for (let i = 0; i < ddlDani.length; i++) {
        ispisDani += "<option value ='" + ddlDani[i] + "'>" + ddlDani[i] + "</option>";
    }
    ispisDani += "</select>";
    document.getElementById("ddlDay").innerHTML = ispisDani;

    //sale countdown
    var countDownDate = new Date("Jan 5, 2019 15:37:25").getTime();
    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementsByClassName("timerP1").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
        if (distance < 0) {
            clearInterval(x);
            document.getElementsByClassName("timerP1").innerHTML = "EXPIRED";
        }
    }, 1000);

    //dinamicko ispisivanje artista
    var ispisArtista = "";
    var artistiDiv = document.getElementById("artists");
    artisti.forEach(function (arti) {
        ispisArtista += `
        <div class="spec">
            <img src="${arti.putanjaSlike}" alt="${arti.altSlike}" />
            <h3 class="text">${arti.nazivArtista}</h3>
            <ul>
                <li>TIME: ${arti.time}</li>
                <li>STAGE: ${arti.stage}</li>
                <li>DJ: ${arti.dj}</li>
            </ul>
            <div class="kupiP">
                <a href="#">Buy Ticket</a>
            </div>
        </div>`
    });
    artistiDiv.innerHTML = ispisArtista;
  
    //dinamicko ispisivanje sponzora

    var ispisSponzora = "";
    nizSlikaSponzori.forEach(function (sponsor) {
        ispisSponzora += `
        <div class="delovi brend1">
            <img  src=${sponsor.putanjaSlikeSponzori} alt=${sponsor.altSlikeSponzori} />
        </div>
        `
    });
    document.getElementById("sponsors").innerHTML = ispisSponzora;
}

//Regularni izrazi
document.getElementById("submitBtnModalRegister").addEventListener("click", function () {


    //values forme
    var ime = document.getElementById("firstName").value.trim();
    var prezime = document.getElementById("lastName").value.trim();
    var email = document.getElementById("email").value.trim();
    var confirmEmail = document.getElementById("confirmEmail").value.trim();
    var passwordRegister = document.getElementById("passwordRegister").value.trim();
    var confirmPasswordRegister = document.getElementById("confirmPasswordRegister").value.trim();

    //Errori za formu
    var imeError = document.getElementById("firstNameError");
    var prezimeError = document.getElementById("lastNameError");
    var emailError = document.getElementById("emailError");
    var confirmEmailError = document.getElementById("cofirmEmailError");
    var passwordRegisterError = document.getElementById("passwordRegisterError");
    var confirmPasswordRegisterError = document.getElementById("confirmPasswordError");

    //Regularni izrazi za formu
    var imeRegEx = /^[A-Z][a-z]{2,15}$/;
    var PrezimeRegEx = /^[A-Z][a-z]{3,15}$/;
    var emailRegEx = /^[\w\d\.%+-]+@[\w\d\.-]+\.[\w]{2,3}$/;
    var confirmEmailRegEx = /^[\w\d\.%+-]+@[\w\d\.-]+\.[\w]{2,3}$/;
    var passwordRegisterRegEx = /^([0-9]|[A-z])+$/;
    var confirmPasswordRegisterRegEx = /^([0-9]|[A-z])+$/;

    //validacija unetih podataka u formi
    //ime
    if (ime == "") {
        imeError.innerHTML = "This field is required!"
        document.getElementById("firstName").style.border = "2px solid red";
    }
    else if (!imeRegEx.test(ime)) {
        imeError.innerHTML = "Please enter name in valid format!";
        document.getElementById("firstName").style.border = "2px solid red";
    }
    else {
        imeError.innerHTML = "";
        document.getElementById("firstName").style.border = "2px solid green";
    }
    //prezime
    if (prezime == "") {
        prezimeError.innerHTML = "This field is required!";
        document.getElementById("lastName").style.border = "2px solid red";
    }
    else if (!PrezimeRegEx.test(prezime)) {
        prezimeError.innerHTML = "Please enter last name in valid format!";
        document.getElementById("lastName").style.border = "2px solid red";
    }
    else {
        prezimeError.innerHTML = "";
        document.getElementById("lastName").style.border = "2px solid green";
    }

    //confirm email 
    if (confirmEmail == "") {
        confirmEmailError.innerHTML = "This field is required!"
        document.getElementById("confirmEmail").style.border = "2px solid red";
    }
    else if (email != confirmEmail) {
        confirmEmailError.innerHTML = "E-mail addresses must match!"
        document.getElementById("confirmEmail").style.border = "2px solid red";
    }
    else {
        confirmEmailError.innerHTML = "";
        document.getElementById("confirmEmail").style.border = "2px solid green";
    }
    //email

    if (email == "") {
        emailError.innerHTML = "This field is required!"
        document.getElementById("email").style.border = "2px solid red";
        document.getElementById("confirmEmail").disabled = true;

        if (document.getElementById("confirmEmail").disabled == true) {
            document.getElementById("confirmEmail").style.opacity = "0.5";
            confirmEmailError.innerHTML = "You must enter your email!";
        }

    }
    else if (!emailRegEx.test(email)) {
        emailError.innerHTML = "Please enter E-mail in valid format!"
        document.getElementById("email").style.border = "2px solid red";
        document.getElementById("confirmEmail").disabled = true;

        if (document.getElementById("confirmEmail").disabled == true) {
            document.getElementById("confirmEmail").style.opacity = "0.5";
            confirmEmailError.innerHTML = "E-mail address must me in correct format!";
        }

    }
    else {
        emailError.innerHTML = "";
        document.getElementById("email").style.border = "2px solid green";
        document.getElementById("confirmEmail").disabled = false;
        document.getElementById("confirmEmail").style.opacity = "1";
    }

    //password Register
    if (passwordRegister == "") {
        passwordRegisterError.innerHTML = "This field is required!"
        document.getElementById("passwordRegister").style.border = "2px solid red";
    }
    else {
        passwordRegisterError.innerHTML = "";
        document.getElementById("passwordRegister").style.border = "2px solid green";
    }
    //confirm  password register
    if (confirmPasswordRegister == "") {
        confirmPasswordRegisterError.innerHTML = "This field is required!"
        document.getElementById("confirmPasswordRegister").style.border = "2px solid red";
    }
    else if (passwordRegister != confirmPasswordRegister) {
        confirmPasswordRegisterError.innerHTML = "Passwords must match!";
        document.getElementById("confirmPasswordRegister").style.border = "2px solid red";
    }
    else {
        confirmPasswordRegisterError.innerHTML = "";
        document.getElementById("confirmPasswordRegister").style.border = "2px solid green";
    }

    //ispitivanje da li su popunjeni radio buttoni
    var radioBtnsSex = document.getElementsByName("sex");
    var odabraniRadioBtnSex = false;
    for (var i = 0; i < radioBtnsSex.length; i++) {
        if (radioBtnsSex[i].checked) {
            odabraniRadioBtnSex = true;
            document.getElementById("rbSexError").innerHTML = "";
            break;
        }
        else {
            document.getElementById("rbSexError").innerHTML = "You must choose sex!";
        }
    }
});

document.getElementById("submitBtnModalLogin").addEventListener("click", function () {
    //polja login forme
    var emailLogin = document.getElementById("emailLogin");
    var passwordLogin = document.getElementById("passwordLogin");
    //vrednosti iz polja login forme
    var emailLoginValue = document.getElementById("emailLogin").value.trim();
    var passwordLoginValue = document.getElementById("passwordLogin").value.trim();

    //errori za polja login forme 
    var emailLoginError = document.getElementById("emailErrorLogin");
    var passwordLoginError = document.getElementById("passwordErrorLogin");

    //regularni izrazi za polja login forme
    var emailLoginRegEx = /^[\w\d\.%+-]+@[\w\d\.-]+\.[\w]{2,3}$/;
    var password = /^([0-9]|[A-z])+$/;

    //email login
    if (emailLoginValue == "") {
        emailLogin.style.border = "2px solid red";
        emailLoginError.innerHTML = "This field must be filled!"
    }
    else {
        emailLogin.style.border = "2px solid green";
        emailLoginError.innerHTML = "";
    }
    //password login
    if (passwordLoginValue == "") {
        passwordLogin.style.border = "2px solid red";
        passwordLoginError.innerHTML = "This field must be filled!"
    }
    else {
        passwordLogin.style.border = "2px solid green";
        passwordLoginError.innerHTML = "";
    }
});

























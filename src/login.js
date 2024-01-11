window.onload = function (e) {

    var btnEntrar = document.getElementById("btnEntrar");

    var txtEmail = document.getElementById("txtEmail");

    var txtSenha = document.getElementById("txtSenha");

    txtEmail.focus();

    btnEntrar.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        var senha = txtSenha.value;

        if (email == "") {
            exibirMensagemErro("E-mail obrigatório.")
        }

        else if (senha == "") {
            exibirMensagemErro("Senha obrigatória.")
        }

        else {
            realizarLogin(email, senha);

        }
    }
        function exibirMensagemErro(mensagem) {

            var spnErro = document.getElementById("spnErro");

            spnErro.innerText = mensagem;

            spnErro.style.display = "block";

            setTimeout(function () {
                spnErro.style.display = "none";
            }, 5000);
        }

        function realizarLogin(email, senha) {

            var data = JSON.stringify({
                "email": email,
                "senha": senha
            });
                        
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {

                    var Result = JSON.parse(this.responseText);

                    if (Result.sucesso) {
                        localStorage.setItem("usuarioGuid", Result.usuarioGuid);

                        window.location.href = 'home.html';
                    }

                    else {
                        exibirMensagemErro(Result.mensagem);
                    }
                }
            });

            xhr.open("POST", "https://localhost:44388/api/usuario/login");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);
        }
    
} 
// importando components do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";

//Importação do navigate pra transitar entre páginas
import { useNavigate } from "react-router-dom";

// Importando o hook useForm do react-hook-form
import { useForm } from "react-hook-form";

// Importando o hook useVerificaLogin
import { useVerificaLogin } from "../hooks/useUsuario";

// Importando o icone de login
import { BsBoxArrowInRight } from "react-icons/bs";

// Importa o hook de usar um contexto
import { useContext } from "react";
// Importa o contexto de usuário
import { AuthContext } from "../contexts/UserContext";

const Login = () => {
  // Usa as variaveis do contexto de usuário
  const { logout } = useContext(AuthContext);

  // Usuando funções do react-hook-form
  // O register é usado para criar o objeto de registro, com os campos ditos abaico no código
  // O handlesubmit é usado para tratar do envio do fomulario, caso de erro ou sucesso
  // O formState é usado para monitorar o estado do formulário, como erros e sucesso
  // O errors é usado para monitorar os erros do formulário, como campos obrigatórios e validações 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Criando o navigate
  const navigate = useNavigate();

  // Usando a funcao VerificaLogin do hook de verificacao
  const { verificaLogin } = useVerificaLogin();

  // funcao pra caso de sucesso na validacao do formulario
  // data é o objeto com os campos do formulário
  const onSubmit = (data) => {
    console.log("Dados:", data);

    // envia data para o hook de verificacao de login e guarda a reposta na variavel res
    const res = verificaLogin(data);

    // caso a resposta seja de sucesso, redireciona para a pagina home
    if (res === "Login efetuado com sucesso") {
      alert("Login efetuado com sucesso");
      navigate("/home");
    } 
    
    // caso a resposta seja de erro, mostra a mensagem retornada para o alerta
    else {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem(res);
    }
  };

  //Caso tenha erro no formulario, mostra mensagens de erro nos campos 
  const onError = (errors) => {
    console.log("Erros:", errors);
  };

  // Assim que entrar nessa página, o localStorage é resetado
  useEffect(() => {
    //Resetar localstorage
    logout()
  }, []);

  //Variáveis para o alerta
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  return (
    <div>
      <Container
        style={{ height: "100vh" }}
        className="justify-content-center align-content-center"
      >
        {/* Icone de login */}
        <BsBoxArrowInRight
          style={{
            fontSize: "300px",
            color: "green",
            margin: "auto",
            width: "100%",
          }}
        />
        <Form
          style={{ width: "75%", margin: "auto", textAlign: "center" }}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          {/* Caixinha de email */}
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-5"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...register("email", {
                required: "O email é obrigatório",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Email inválido",
                },
                validate: (value) => value.includes("@") || "Email inválido",
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </FloatingLabel>

          {/* Caixinha de senha */}
          <FloatingLabel
            controlId="floatingPassword"
            label="Senha"
            className="mb-5"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("senha", {
                required: "A senha é obrigatória",
              })}
            />
            {errors.senha && <p className="error">{errors.senha.message}</p>}
          </FloatingLabel>

          {/* Botao pra enviar o formulário */}
          <Button variant="primary" type="submit" className="mb-5" size="lg">
            Login
          </Button>

          {/* Alerta caso haja erro */}
          <Alert
            variant={alertVariant}
            className={alertClass}
            style={{
              position: "absolute",
              width: "30%",
              left: "35%",
              top: "85%",
            }}
          >
            {alertMensagem}
          </Alert>
        </Form>
      </Container>
    </div>
  );
};

export default Login;

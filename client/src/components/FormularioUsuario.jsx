// importando components do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Importando o hook useForm do react-hook-form
import { useForm } from "react-hook-form";

//Importação do navigate pra transitar entre páginas
//Importação do useParams para pegar o id fornecido na url
import { useNavigate, useParams } from "react-router-dom";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";

// Importando o hook useInserirusuario
import {
  useInserirUsuario,
  useBuscarUsuarioPorId,
  useAtualizaUsuario,
} from "../hooks/useUsuario";

const FormularioUsuario = (props) => {
  // IMPORTAÇÃO E USO DO HOOK FORM
  // O register é usado para criar o objeto de registro, com os campos ditos abaico no código
  // O handlesubmit é usado para tratar do envio do fomulario, caso de erro ou sucesso
  // O formState é usado para monitorar o estado do formulário, como erros e sucesso
  // O errors é usado para monitorar os erros do formulário, como campos obrigatórios e validações
  // o watch é usado para monitorar os campos do formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // IMPORTAÇÃO DOS HOOKS PARA INSERIR, E ATUALIZAR
  // Usando a funcao de inserir usuario vinda do hook
  const { inserirUsuario } = useInserirUsuario();
  // Usando a funcao de buscar usuario por id e de atualizar o usuario
  const { buscarUsuarioPorId } = useBuscarUsuarioPorId();
  const { atualizaUsuario } = useAtualizaUsuario();

  // Guardando o id do usuario vindo da url
  const { id } = useParams();
  console.log(id);

  // Criando o navigate
  const navigate = useNavigate();

  //Link usuario sem imagem
  const linkImagem =
    "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png";

  const [previewImagem, setPreviewImagem] = useState(linkImagem); // imagem padrão

  // Atualiza o preview quando seleciona uma imagem
  const handleImagemChange = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      const previewURL = URL.createObjectURL(arquivo);
      setPreviewImagem(previewURL);
    } else {
      setPreviewImagem(linkImagem); // volta para imagem padrão se não tiver arquivo
    }
  };
  // Caso o campo de imagem recebe um novo valor, atualiza a imagem de acordo com o campo
  const imagemAtual = watch("imagemUrl");

  //CASO O FORMULÁRIO SEJA DE EDIÇÃO, BUSCAR O usuario PELO ID
  if (props.page === "editar") {
    // Variavel que controla se o usuario já foi carregado
    const [carregado, setCarregado] = useState(false);

    // Effect pra buscar o usuario assim que o componente for montado
    useEffect(() => {
      async function fetchUsuario() {
        try {
          const usuario = await buscarUsuarioPorId(id);
          // mudei aqui
          console.log(usuario[0]);

          // Se houver usuario, reseta o formulário com os dados do usuario
          if (usuario && !carregado) {
            reset({
              // mudei aqui
              nome: usuario[0].nome_usu,
              email: usuario[0].email_usu,
              tipo: usuario[0].tipo_usu,
              senha:usuario[0].senha_usu,
            });

            // Atualiza o preview da imagem
            setPreviewImagem(
              usuario[0].imagem_usu
                ? `http://localhost:5000/imagens/${usuario[0].imagem_usu}`
                : linkImagem
            );
            // Evita chamadas múltiplas de reset
            setCarregado(true);
          }
        } catch (erro) {
          console.error("Erro ao buscar usuario:", erro);
          // Se o erro for de usuario não encontrado, redireciona para a página inicial
          if (erro.message.includes("Unexpected")) {
            alert("usuario não encontrado!");
            navigate("/home");
          }
        }
      }
      fetchUsuario();
    }, []);
  }

  // FUNCOES QUE LIDAM COM O SUCESSO E ERRO DO FORMULÁRIO
  // funcao pra caso de sucesso na validacao do formulario
  // data é o objeto com os campos do formulário
  const onSubmit = (data) => {
    //alterei
    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("email", data.email);
    formData.append("senha", data.senha);
    formData.append("tipo", data.tipo);

    if (data.imagem && data.imagem[0]) {
      formData.append("imagem", data.imagem[0]);
    }
    if (props.page === "cadastro") {
      // Envia o objeto data para o hook inserir o usuario
      inserirUsuario(formData);
      alert("usuario cadastrado com sucesso!");
    } else {
      // Envia o objeto data para o hook inserir o usuario, junto com o id
      atualizaUsuario(formData, id);
      alert("usuario atualizado com sucesso!");
    }
    navigate("/home");
  };

  //Caso tenha erro no formulario, mostra mensagens de erro nos campos
  const onError = (errors) => {
    console.log("Erros:", errors);
  };

  return (
    <div className="text-center">
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          <Col xs={6}>
            {/* Caixinha de nome */}
            <FloatingLabel
              controlId="floatingInputNome"
              label="Nome"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o nome do usuario"
                {...register("nome", {
                  required: "O nome é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O nome deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "O nome deve ter ate 20 caracteres",
                  },
                })}
              />
              {errors.nome && <p className="error">{errors.nome.message}</p>}
            </FloatingLabel>
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
            {/* Select de tipo */}
            <FloatingLabel
              controlId="floatingSelectTipo"
              label="Tipo de usuário"
              className="mb-5"
            >
              <Form.Select
                {...register("tipo", {
                  validate: (value) =>
                    value != "nenhum" || "Escolha uma categoria ",
                })}
              >
                <option value="nenhum" defaultValue={"nenhum"}>
                  Escolha um tipo
                </option>
                <option value="Administrador"> Administrador </option>
                <option value="Gerente"> Gerente </option>
                <option value="Funcionario"> Funcionário </option>
              </Form.Select>
              {errors.tipo && <p className="error">{errors.tipo.message}</p>}
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
            {/* Caixinha de confirmar senha */}
            <FloatingLabel
              controlId="floatingConfirmarSenha"
              label="Confirmar Senha"
              className="mb-5"
            >
              <Form.Control
                type="password"
                placeholder="Confirmar Senha"
                {...register("confirmarSenha", {
                  required: "A confirmação de senha é obrigatória",
                  validate: (value) =>
                    value === watch("senha") || "As senhas não conferem",
                })}
              />
              {errors.confirmarSenha && (
                <p className="error">{errors.confirmarSenha.message}</p>
              )}
            </FloatingLabel>
          </Col>
          <Col xs={6}>
            <Form.Group controlId="formFileLg" className="mb-5">
              {/* Input de imagem */}
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Control
                  type="file"
                  size="lg"
                  accept="image/*"
                  {...register("imagem", {
                    validate: {
                      required: (value) =>
                        value.length > 0 || "A imagem é obrigatória",
                      maxSize: (value) =>
                        value[0]?.size < 60000000 ||
                        "A imagem deve ter no máximo 60MB",
                      acceptedFormats: (value) =>
                        ["image/jpeg", "image/png"].includes(value[0]?.type) ||
                        "Formato de imagem inválido. Use JPEG ou PNG.",
                    },
                  })}
                  onChange={(e) => {
                    handleImagemChange(e);
                    // Atualiza também o react-hook-form
                    // se quiser garantir que o hook capture a mudança
                  }}
                />
              </Form.Group>

              {/* Preview da imagem */}
              <Image
                src={previewImagem}
                rounded
                width={450}
                height={400}
                alt="Preview da imagem"
              />

              {/* Erro */}
              {errors.imagem && (
                <p className="error">{errors.imagem.message}</p>
              )}
            </Form.Group>
          </Col>
        </Row>
        {/* Botão para enviar o formulário de cadastro de usuario */}
        <Button variant="primary" size="lg" type="submit">
          {props.page === "editar" ? "Atualizar" : "Cadastrar"}
        </Button>
      </Form>
    </div>
  );
};

export default FormularioUsuario;

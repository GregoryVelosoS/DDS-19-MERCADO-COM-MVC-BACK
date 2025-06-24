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

// Importando o hook useInserirProduto
import {
  useInserirUsuario,
  useBuscarUsuarioPorId,
  useAtualizaUsuario,
} from "../hooks/useUsuario";

const FormularioUsuario = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const { inserirUsuario } = useInserirUsuario();

  const { buscarUsuarioPorId } = useBuscarUsuarioPorId();
  const { atualizaUsuario } = useAtualizaUsuario();

  const { id } = useParams();

  // Criando o navigate
  const navigate = useNavigate();

  //Link produto sem imagem
  const linkImagem =
    "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png";

  const [previewImage, setPreviewImagem] = useState(linkImagem);

  const handleImagemMudanca = (e) => {
    const arquivo = e.target.files[0];

    if (arquivo) {
      const previewUrl = URL.createObjectURL(arquivo);
      setPreviewImagem(previewUrl);
    } else {
      setPreviewImagem(linkImagem);
    }
  };

  if (props.page === "editar") {
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
      async function fetchUsuario() {
        try {
          const usuario = await buscarUsuarioPorId(id);

          if (usuario && !carregado) {
            reset({
              nome: usuario[0].nome_usu,
              email: usuario[0].email_usu,
              tipo: usuario[0].tipo_usu,
              senha: usuario[0].senha_usu,
            });
            // Carrega o preview, se houver imagem no banco
            setPreviewImagem(
              usuario[0].imagem_usu
                ? `http://localhost:5000/imagens/${usuario[0].imagem_usu}`
                : linkImagem
            );
            setCarregado(true);
          }
        } catch (erro) {
          console.error("Erro ao buscar usuario:", erro);

          if (erro.message.includes("Unexpected")) {
            alert("Usuario não encontrado!");
            navigate("/home");
          }
        }
      }
      fetchUsuario();
    }, []);
  }

  const onSubmit = (data) => {
    console.log("Dados:", data);

    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("email", data.email);
    formData.append("senha", data.senha);
    formData.append("tipo", data.tipo);

    if (data.imagem && data.imagem[0]) {
      formData.append("imagem".data.imagem[0]);
    }

    if (props.page === "cadastro") {
      inserirUsuario(formData);
      alert("Usuario cadastrado com sucesso!");
    } else {
      atualizaUsuario(formData, id);
      alert("Usuario atualizado com sucesso!");
    }
    navigate("/home");
  };

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
                placeholder="Digite o nome do produto"
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
            {/* Select de tipo */}
            <FloatingLabel
              controlId="floatingSelectTipo"
              label="Tipo de Usuario"
              className="mb-5"
            >
              <Form.Select
                {...register("tipo", {
                  validate: (value) => value != "nenhum" || "Escolha uma tipo ",
                })}
              >
                <option value="nenhum"> Escolha uma categoria </option>
                <option value="Administrador"> Administrador </option>
                <option value="Gerente"> Gerente </option>
                <option value="Funcionario"> Funcionario </option>
              </Form.Select>
              {errors.tipo && <p className="error">{errors.tipo.message}</p>}
            </FloatingLabel>
          </Col>
          <Col xs={6}>
            <Form.Group controlId="formFileLg" className="mb-5">
              {/* Caixinha de imagem */}
              <Form.Group controlId="formFileLg2" className="mb-3">
                <Form.Control
                  type="file"
                  size="lg"
                  accept="image/*"
                  {...register("imagem", {
                    validate: {
                      required: (value) =>
                        value.length > 0 || "A imagem é obrigatória",
                      maxSize: (value) =>
                        value[0].size < 60000000 ||
                        "A imagem só pode ter 60MB no máximo",
                      acceptFormats: (value) =>
                        ["image/jpeg", "image/png"].includes(value[0]?.type) ||
                        "Formato de imagem inválido, apenas PNG ou JPEG são aceitos",
                    },
                  })}
                  onChange={(e) => {
                    handleImagemMudanca(e);
                  }}
                ></Form.Control>
              </Form.Group>

              <Image
                src={previewImage}
                rounded
                width={450}
                height={450}
              ></Image>
              {errors.imagem && (
                <p className="error"> {errors.imagem.message} </p>
              )}
            </Form.Group>
          </Col>
        </Row>
        {/* Botão para enviar o formulário de cadastro de produto */}
        <Button variant="primary" size="lg" type="submit">
          {props.page === "editar" ? "Atualizar" : "Cadastrar"}
        </Button>
      </Form>
    </div>
  );
};

export default FormularioUsuario;

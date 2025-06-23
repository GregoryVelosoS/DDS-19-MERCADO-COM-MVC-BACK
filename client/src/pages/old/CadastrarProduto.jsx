// importando components do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Importa o hook de usar um contexto
import { useContext } from "react";
// Importa o contexto de usuário
import { AuthContext } from "../contexts/UserContext";

// Importando o hook useForm do react-hook-form
import { useForm } from "react-hook-form";

//Importação do navigate pra transitar entre páginas
import { useNavigate, Navigate } from "react-router-dom";

// Importando o hook useInserirProduto
import { useInserirProduto, useListaCategorias } from "../hooks/useApi";
import Formulario from "../components/Formulario";

const CadastrarProduto = () => {
  // variavel que armazena o nome do usuario, que veio do contexto
  const { usuarioNome } = useContext(AuthContext);
  // Verifica se o usuario é visitante, se sim redireciona ele para a tela de login
  if (usuarioNome === "Visitante") return <Navigate to="/" />;

  // Usuando funções do react-hook-form
  // O register é usado para criar o objeto de registro, com os campos ditos abaico no código
  // O handlesubmit é usado para tratar do envio do fomulario, caso de erro ou sucesso
  // O formState é usado para monitorar o estado do formulário, como erros e sucesso
  // O errors é usado para monitorar os erros do formulário, como campos obrigatórios e validações
  // o watch é usado para monitorar os campos do formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Criando o navigate
  const navigate = useNavigate();

  // Usando a funcao de inserir produto vinda do hook
  const { inserirProduto } = useInserirProduto();

  // funcao pra caso de sucesso na validacao do formulario
  // data é o objeto com os campos do formulário
  const onSubmit = (data) => {
    console.log("Dados:", data);

    // Envia o objeto data para o hook inserir o produto
    inserirProduto(data);
    alert("Produto cadastrado com sucesso!");
    navigate("/home");
  };

  //Caso tenha erro no formulario, mostra mensagens de erro nos campos
  const onError = (errors) => {
    console.log("Erros:", errors);
  };

  //Lista com categorias
  const categorias = useListaCategorias();

  //Link produto sem imagem
  const linkImagem =
    "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png";

  // Caso o campo de imagem recebe um novo valor, atualiza a imagem de acordo com o campo
  const imagemAtual = watch("imagemUrl");

  return (
    <div style={{ height: "93vh" }}>
      <Container>
        <h1>Cadastrar Produto</h1>     
        <div className="text-center">
          <Form
            className="mt-3 w-full"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
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
                  {errors.nome && (
                    <p className="error">{errors.nome.message}</p>
                  )}
                </FloatingLabel>
                {/* Caixinha de descrição */}
                <FloatingLabel
                  controlId="floatingInputDescricao"
                  label="Descrição"
                  className="mb-5"
                >
                  <Form.Control
                    type="text"
                    placeholder="Digite a descrição do produto"
                    {...register("descricao", {
                      required: "A descrição é obrigatória",
                      minLength: {
                        value: 2,
                        message: "A descrição deve ter pelo menos 2 caracteres",
                      },
                      maxLength: {
                        value: 180,
                        message: "A descrição deve ter ate 180 caracteres",
                      },
                    })}
                  />
                  {errors.descricao && (
                    <p className="error">{errors.descricao.message}</p>
                  )}
                </FloatingLabel>
                {/* Select de categorias */}
                <FloatingLabel
                  controlId="floatingSelectTipo"
                  label="Tipo de produto"
                  className="mb-5"
                >
                  <Form.Select
                    {...register("categoria", {
                      validate: (value) =>
                        !value.includes("nenhum") || "Escolha um tipo",
                    })}
                  >
                    <option value="nenhum">Escolha um tipo</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.nome}>
                        {cat.nome}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.tipo && (
                    <p className="error">{errors.tipo.message}</p>
                  )}
                </FloatingLabel>
                {/* Caixinha de preço */}
                <FloatingLabel
                  controlId="floatingInputPreco"
                  label="Preço"
                  className="mb-5"
                >
                  <Form.Control
                    type="number"
                    step="0.1"
                    placeholder="Digite o preco"
                    {...register("preco", {
                      required: "O preco é obrigatório",
                      min: {
                        value: 0.1,
                        message: "O preço deve ser maior que 0",
                      },
                    })}
                  />
                  {errors.preco && (
                    <p className="error">{errors.preco.message}</p>
                  )}
                </FloatingLabel>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="formFileLg" className="mb-5">
                  {/* Caixinha de imagem */}
                  <FloatingLabel
                    controlId="floatingInputImagem"
                    label="Envie o link da imagem do produto"
                    className="mb-5"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Envie o link da imagem do produto"
                      {...register("imagemUrl", {
                        required: "A imagem é obrigatória",
                        pattern: {
                          value: /^(http|https):\/\/[^ "]+$/,
                          message: "Insira um link válido",
                        },
                      })}
                    />
                    {errors.imagemUrl && (
                      <p className="error">{errors.imagemUrl.message}</p>
                    )}
                  </FloatingLabel>
                  <Image
                    src={imagemAtual == "" ? linkImagem : imagemAtual}
                    rounded
                    width={300}
                    height={300}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Botão para enviar o formulário de cadastro de produto */}
            <Button variant="primary" size="lg" type="submit">
              Cadastrar
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default CadastrarProduto;

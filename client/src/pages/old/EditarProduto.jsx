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
//Importação do useParams para pegar o id fornecido na url
import { Navigate, useParams, useNavigate } from "react-router-dom";

// Importando o hook de buscar o prdouto pelo id e de atualizar o produto
import {
  useBuscarProdutoPorId,
  useAtualizaProduto,
  useListaCategorias,
} from "../hooks/useApi";

const EditarProduto = () => {
  // variavel que armazena o nome do usuario, que veio do contexto
  const { usuarioNome } = useContext(AuthContext);
  // Verifica se o usuario é visitante, se sim redireciona ele para a tela de login
  if (usuarioNome === "Visitante") return <Navigate to="/" />;

  // Criando o navigate
  const navigate = useNavigate();

  // Guardando o id do produto vindo da url
  const { id } = useParams();

  // Usando a funcao de buscar produto por id e de atualizar o produto
  const { buscarProdutoPorId } = useBuscarProdutoPorId();
  const { atualizaProduto } = useAtualizaProduto();

  // Usuando funções do react-hook-form
  // O register é usado para criar o objeto de registro, com os campos ditos abaico no código
  // O handlesubmit é usado para tratar do envio do fomulario, caso de erro ou sucesso
  // O formState é usado para monitorar o estado do formulário, como erros e sucesso
  // O errors é usado para monitorar os erros do formulário, como campos obrigatórios e validações
  // o watch é usado para monitorar os campos do formulario
  // O reset é usado para resetar o formulario com os dados do produto buscado
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  //Lista com categorias
  const categorias = useListaCategorias();

  //Link produto sem imagem
  const linkImagem =
    "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png";

  // Caso o campo de imagem recebe um novo valor, atualiza a imagem de acordo com o campo
  const imagemAtual = watch("imagemUrl");

  // Variavel que controla se o produto já foi carregado
  const [carregado, setCarregado] = useState(false);

  // Effect pra buscar o produto assim que o componente for montado
  useEffect(() => {
    async function fetchProduto() {
      try {
        const produto = await buscarProdutoPorId(id);
        // Se houver produto, reseta o formulário com os dados do produto
        if (produto && !carregado) {
          reset({
            nome: produto.nome,
            descricao: produto.descricao,
            categoria: produto.categoria,
            preco: produto.preco,
            imagemUrl: produto.imagemUrl,
          });
          // Evita chamadas múltiplas de reset
          setCarregado(true);
        }
      } catch (erro) {
        console.error("Erro ao buscar produto:", erro);
        // Se o erro for de produto não encontrado, redireciona para a página inicial
        if (erro.message.includes("Unexpected")) {
          alert("Produto não encontrado!");
          navigate("/home");
        }
      }
    }
    fetchProduto();
  }, []);

  // funcao pra caso de sucesso na validacao do formulario
  // data é o objeto com os campos do formulário
  const onSubmit = (data) => {
    console.log("Enviando dados:", data);
    // Envia o objeto data para o hook inserir o produto, junto com o id
    atualizaProduto(data, id);
    alert("Produto atualizado com sucesso!");
    navigate("/home");
  };

  //Caso tenha erro no formulario, mostra mensagens de erro nos campos
  const onError = (errors) => {
    console.log("Erros:", errors);
  };

  return (
    <Container>
      <h1>Editar Produto</h1>
      <div className="text-center">
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="mt-3 w-full"
        >
          <Row>
            <Col xs={6}>
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
                    minLength: { value: 2, message: "Mínimo de 2 caracteres" },
                    maxLength: {
                      value: 20,
                      message: "Máximo de 20 caracteres",
                    },
                  })}
                />
                {errors.nome && <p className="error">{errors.nome.message}</p>}
              </FloatingLabel>

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
                    minLength: { value: 2, message: "Mínimo de 2 caracteres" },
                    maxLength: {
                      value: 180,
                      message: "Máximo de 180 caracteres",
                    },
                  })}
                />
                {errors.descricao && (
                  <p className="error">{errors.descricao.message}</p>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingSelectTipo"
                label="Tipo de produto"
                className="mb-5"
              >
                <Form.Select
                  {...register("categoria", {
                    validate: (value) =>
                      !value.includes("nenhum") || "Escolha um tipo válido",
                  })}
                >
                  <option value="nenhum">Escolha um tipo</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.nome}>
                      {cat.nome}
                    </option>
                  ))}
                </Form.Select>
                {errors.tipo && <p className="error">{errors.tipo.message}</p>}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInputPreco"
                label="Preço"
                className="mb-5"
              >
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Digite o preço"
                  {...register("preco", {
                    required: "O preço é obrigatório",
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
                <FloatingLabel
                  controlId="floatingInputImagem"
                  label="Link da imagem"
                  className="mb-5"
                >
                  <Form.Control
                    type="text"
                    placeholder="Link da imagem"
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
                  src={!imagemAtual ? linkImagem : imagemAtual}
                  rounded
                  width={300}
                  height={300}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" size="lg" type="submit">
            Atualizar Produto
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default EditarProduto;

// importando components do bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// importa o hook de deletar produto do arquivo useApi
import { useDeletaProduto } from "../hooks/useApi";

const CardProduto = (props) => {
  // importanto a funcao de deletar produto
  const { deletarProduto } = useDeletaProduto();

  // Funcao para requisitar a exclusao do produto
  const handleDelete = async () => {
    // Deletando produto utilizando o hook de deletar produto
    // passando o id do produto específico
    const deletado = await deletarProduto(props.id);
    console.log(deletado);
    // mudei aqui
    alert(`Produto deletado com sucesso!`);
    
    window.location.reload(); // Atualiza a página após a exclusão
  };

  return (
    <div>
      <Card style={{ width: "15rem", height: "30rem" }}>
        {/* Imagem do Card */}
        <Card.Img
          variant="top"
          // se a imagem for diferene de null, mostra a imagem do produto, se nao mostra uma imagem padrão
          src={
            props.imagemUrl != "null"
              ? props.imagemUrl
              : "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png"
          }
          height="200px"
        />

        <Card.Body>
          {/* Título do card com nome do produto */}
          <Card.Title>{props.nome}</Card.Title>
          {/* Subtitulo no card com preco do produto */}
          <Card.Subtitle className="mb-2 text-muted">
            Preço: {props.preco}
          </Card.Subtitle>
          <Card.Text>
            <b> Descrição: </b> <br></br> {props.descricao}
          </Card.Text>
          <Card.Text>
            <b> Categoria: </b> <br></br> {props.categoria}
          </Card.Text>

          {/* Botão que leva a pagina de editar, com o id específico do produto*/}
          <Card.Link href={`/editarproduto/${props.id}`}>
            <Button variant="warning">Editar</Button>
          </Card.Link>

          {/* Botão de excluir produto que chama a funcao handleDelete */}
          <Card.Link>
            <Button variant="danger" type="button" onClick={handleDelete}>
              Excluir
            </Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProduto;

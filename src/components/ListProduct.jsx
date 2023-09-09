import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";

export const ListProduct = () => {
  const [quant, setQuantity] = useState(1)
  const navigate = useNavigate();

  const CompleteSell = (value, quant, title, description, ) => {
    let total = value * quant;
    // console.log(valor);
    // window.location.href = `/CheckoutPagamentos.html?value=${valor}`;
    navigate(`/pagamento`, { state: { title, value, quant, description, total } });
  }

  const handleChangeQuant = (e) => {
    setQuantity(e.target.value)
  }

  const products = [
    {
      title: "Placa de vídeo Geforce RTX3060",
      description: "Placa de vídeo RTX3060 que rodas todos os jogos atuais com tranquilidade.",
      value: 2000,
      imgURL: "https://images.unsplash.com/photo-1674741250252-edb6a227c166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    },
    {
      title: "Processador Ryzen 5",
      description: "Processador Ryzen 5 5500H para poder abrir qualquer arquivo e software.",
      value: 1500,
      imgURL: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    },
    {
      title: "Memória ram 16gb",
      description: "Memória ram 16gb com frequencia de 3200mhz da marca adata.",
      value: 450,
      imgURL: "https://images.unsplash.com/photo-1542978709-19c95dc3bc7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    },
    {
      title: "Gabinete de computador Corsair",
      description: "Gabinete Moderno para você comprar sem medo.",
      value: 300,
      imgURL: "https://plus.unsplash.com/premium_photo-1671439429636-6d8d66247143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2057&q=80"
    }
  ]

  return (
    <>
      <div>
        <Container>
          <Row className="justify-content-md-center">
            {products.map((product, index) => (
              <Col key={index}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={product.imgURL} alt={product.title} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                    <Card.Subtitle>Valor: R${product.value},00</Card.Subtitle>
                    Quantidade:
                    <Form.Select size="sm" className="mb-3" onChange={handleChangeQuant}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                    </Form.Select>
                    <Button variant="success" onClick={() => CompleteSell(product.value, quant)}>Comprar Agora</Button>
                  </Card.Body>
                </Card>
            </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  )
}
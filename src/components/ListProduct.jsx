import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

export const ListProduct = () => {
  const [quant, setQuantity] = useState(1)
  const [products, setProducts] = useState([])
  const navigate = useNavigate();

  const CompleteSell = (value, quant, title, description, imgURL) => {
    let total = value * quant;
    navigate(`/pagamento`, { state: { title, value, quant: parseInt(quant), description, total, imgURL } });
  }
  const handleChangeQuant = (e) => {
    setQuantity(e.target.value)
  }
  useEffect(() => {
    fetch("http://127.0.0.1:5000/products")
    .then((resp) => resp.json())
    .then(data => setProducts(data))
  }, [])

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
                    <Button variant="success" onClick={() => CompleteSell(product.value, quant, product.title, product.description, product.imgURL)}>Comprar Agora</Button>
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
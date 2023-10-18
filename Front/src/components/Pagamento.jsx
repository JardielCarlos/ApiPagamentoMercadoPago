import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from 'react-icons/io5';
import './card.css'

export const Pagamento = () => {
  const [preferenceId, setPreferenceId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { title, value, quant, description, total, imgURL } = location.state;

  initMercadoPago('TEST-be2994ca-82f0-4ef3-9764-1cbe6aeb3468');
  useEffect(() => {
    const createPreference = async () => {
      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer TEST-5722286431788223-090517-a5f93069f7d1cbe10ee06eef73dceeb3-624922489"
        },
        body: JSON.stringify({
          items: [
            {
              title: title,
              description: description,
              picture_url: imgURL,
              category_id: "electronics",
              quantity: quant,
              currency_id: "BRL",
              unit_price: value
            }
          ]
        }),
      });
  
      const data = await response.json();
      setPreferenceId(data.id)
    };
    createPreference();
  }, [description, imgURL, quant, title, value])

  if (!preferenceId) {
    return (
      <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center he">
        <Spinner animation="border" variant="success" size="lg"/>
      </div>
    );
  }

  const initialization = {
    amount: total,
    preferenceId: preferenceId,
  };

  const customization = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      // mercadoPago: "all",
    },
  };
  const onSubmit = async (
    { selectedPaymentMethod, formData }
  ) => {
  // callback chamado ao clicar no botão de submissão dos dados
  return new Promise((resolve, reject) => {
    fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer TEST-5722286431788223-090517-a5f93069f7d1cbe10ee06eef73dceeb3-624922489"
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // receber o resultado do pagamento
        navigate(`/pagamento/statusPagamento`, { state: { id: data.id } });
        resolve();
      })
      .catch((error) => {
        // lidar com a resposta de erro ao tentar criar o pagamento
        reject();
      });
  });
 };
 const onError = async (error) => {
  // callback chamado para todos os casos de erro do Brick
  console.log(error);
 };
 const onReady = async () => {
  /*
    Callback chamado quando o Brick estiver pronto.
    Aqui você pode ocultar loadings do seu site, por exemplo.
  */
 };

  const voltar = () => {
    navigate('/');
  };

 
  return (
    <>
      <IoArrowBackSharp style={{cursor: "pointer", marginBottom: '-1rem', zIndex: 1, position: 'relative', left: "2rem"}} size={30} onClick={voltar}/>
      <Row className="mx-5">
      <Col>
        <Payment
          initialization={initialization}
          customization={customization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />
      </Col>
      <Col className="d-flex justify-content-center mt-5">
        <Card className="card-custom w-50 mx-5">
          <Card.Header as="h5" className="header-custom">Resumo do Pedido</Card.Header>
          <Card.Img variant="top" src={imgURL} className="img-custom" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item className="list-item-custom"><strong>Quantidade: </strong>{quant}</ListGroup.Item>
            <ListGroup.Item><strong>Valor Unitário</strong> R$:{value},00</ListGroup.Item>
            <ListGroup.Item className="list-item-custom"><strong>Total </strong> R$:{total},00
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    </>
  )
}
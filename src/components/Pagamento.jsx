import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Pagamento = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const location = useLocation();
  const { title, value, quant, description, total } = location.state;

  initMercadoPago('TEST-be2994ca-82f0-4ef3-9764-1cbe6aeb3468');
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
            quantity: quant,
            currency_id: "BRL",
            unit_price: value
          }
        ]
      })
    });
    const data = await response.json();
    console.log(data.id);
    return data.id;
  };

  const initialization = {
    amount: total,
    preferenceId: createPreference()
    // preferenceId: "<PREFERENCE_ID>",
  };
  const customization = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
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
        // receber o resultado do pagamento
        console.log(data);
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
 
  return (
    <div>
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </div>
  )
}
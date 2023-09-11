import { StatusScreen, initMercadoPago } from "@mercadopago/sdk-react";
import { useLocation } from "react-router-dom";

export const StatusPagamento = () => {
  initMercadoPago('TEST-be2994ca-82f0-4ef3-9764-1cbe6aeb3468');
  const location = useLocation();
  const { id } = location.state;
  
  const initialization = {
    paymentId: id, // id do pagamento a ser mostrado
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
    <>
      <StatusScreen
        initialization={initialization}
        onReady={onReady}
        onError={onError}
      />
    </>
  )
}
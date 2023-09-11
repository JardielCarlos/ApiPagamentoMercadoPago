import { Routes, Route } from "react-router-dom";
import { ListProduct } from "../components/ListProduct";
import { Pagamento } from "../components/Pagamento";
import { StatusPagamento } from "../components/StatusPagamento";

export const MainRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<ListProduct />} />
      <Route path="/pagamento" element={<Pagamento />} />
      <Route path="/pagamento/statusPagamento" element={<StatusPagamento />} />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  )
}
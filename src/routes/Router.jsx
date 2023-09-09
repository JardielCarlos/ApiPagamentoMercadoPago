import { Routes, Route, Navigate } from "react-router-dom";
import { ListProduct } from "../components/ListProduct";
import { Pagamento } from "../components/Pagamento";

export const MainRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<ListProduct />} />
      <Route path="/pagamento" element={<Pagamento />} />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  )
}
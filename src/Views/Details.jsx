import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();

  // eslint-disable-next-line react/no-unescaped-entities
  return <p className="pt-10 text-white">Pagina dettaglio dell'id: {id}</p>;
}

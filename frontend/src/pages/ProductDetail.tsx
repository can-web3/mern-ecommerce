import { useContext, useEffect, useState } from "react"
import ProductContext from "../contexts/ProductContext"
import { useParams } from "react-router-dom"
import Loading from "../components/Loading"
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Seo from "../components/Seo";

export default function ProductDetail() {
  const { slug } = useParams()
  const { product, getProductBySlug } = useContext(ProductContext)
  const [loading, setLoading] = useState(true)

  const cleanDescription = DOMPurify.sanitize(product?.description);

  useEffect(() => {
    (async () => {
      setLoading(true)
      await getProductBySlug(slug)
      setLoading(false)
    })()
  }, [slug])

  if(!product || loading)
    return <Loading />

  return (
    <main className="container mx-auto">
      <Seo title={product.title} />
      
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="float-left w-full lg:w-1/4 mr-4 mb-4"
        />

        <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
        <p className="font-semibold text-sky-600 text-xl mb-4">{product.price} ₺</p>

        <button className="btn btn-primary mb-4 flex items-center">
          <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
          Sepete Ekle
        </button>

         <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: cleanDescription }}
        />

        <div className="clear-left" />
      </div>
    </main>

  )
}

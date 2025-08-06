import { useContext, useEffect } from "react"
import AuthContext from "../contexts/AuthContext"
import ProductContext from "../contexts/ProductContext"
import { Link } from "react-router-dom"
import Products from "../components/Products"
import CategoryContext from "../contexts/CategoryContext"
import Seo from "../components/Seo"

export default function Home() {
  const { auth } = useContext(AuthContext)
  const { products, getProducts } = useContext(ProductContext)
  const { categories, getCategories } = useContext(CategoryContext)

  useEffect(() => {
    getProducts()
    getCategories()
  }, [])

  return (
    <div>
      <Seo title="Anasayfa" />

      <div className="container flex gap-4">
        <Link to='/urunler' className="btn btn-primary">Hepsi</Link>
        { categories.map(category => (
          <Link to={`/kategori/${category.slug}`} className="btn btn-outline-primary">
            {category.name}
          </Link>
        )) }
      </div>

      {/* products */}
      <section className="container">
        <Products products={products} />
      </section>
    </div>
  )
}

import { useContext, useEffect, useState } from "react"
import ProductContext from "../contexts/ProductContext"
import { Link, useParams } from "react-router-dom"
import Loading from "../components/Loading"
import Seo from "../components/Seo"
import CategoryContext from "../contexts/CategoryContext"
import Products from "../components/Products"

export default function CategoryProductsPage() {
    const { slug } = useParams()
    const { products, getProductsByCategorySlug } = useContext(ProductContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            setLoading(true)
            await getProductsByCategorySlug(slug)
            await getCategories()
            setLoading(true)
        })()
    }, [slug])

    if(!categories && !products && loading)
        return <Loading />

    return (
        <main>
            <Seo title="Ürünler" />
            
            <div className="container flex gap-4">
                <Link to='/urunler' className="btn btn-outline-primary">Hepsi</Link>
                { categories.map(category => (
                <Link to={`/kategori/${category.slug}`} className={`${category.slug === slug ? 'btn btn-primary' : 'btn btn-outline-primary'}`}>
                    {category.name}
                </Link>
                )) }
            </div>

            <div className="container">
                <Products products={products} />
            </div>
        </main>
    )
}

import { useContext, useEffect } from "react";
import Products from "../components/Products";
import ProductContext from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import CategoryContext from "../contexts/CategoryContext";
import Seo from "../components/Seo";

export default function ProductsPage() {
    const { products, getProducts } = useContext(ProductContext)
    const { categories, getCategories } = useContext(CategoryContext)

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    return (
        <main>
            <Seo title="Ürünler" />

            <div className="container flex gap-4">
                <Link to='/urunler' className="btn btn-primary">Hepsi</Link>
                { categories.map(category => (
                <Link to={`/kategori/${category.slug}`} className="btn btn-outline-primary">
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

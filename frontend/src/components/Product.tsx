import { Link } from "react-router-dom";

export default function Product({
    product
}) {
    // const { auth, toggleFavorite } = useContext(AuthContext)
    // const isFav = auth?.favorites.includes(product?._id)

    return (
        <Link to={`/urun/${product.slug}`} className="group hover:bg-gray-200 p-2 transition-all ease-in">
            <div className="overflow-hidden">
            <img src={product.image} className="w-full transition-all ease-in group-hover:scale-120" alt="" />
            </div>
            <h2 className="line-clamp-2">{product.title}</h2>
            <p className="font-semibold text-sky-600 text-lg">{product.price} ₺</p>
        </Link>
    )
}

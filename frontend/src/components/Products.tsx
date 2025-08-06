import Product from "./Product"

export default function Products({ products }) {
  if (!products || products.length === 0) return (
    <div className="bg-amber-200 p-2">
      Ürün bulunamadı
    </div>
  )

  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  )
}

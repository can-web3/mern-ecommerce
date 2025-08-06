import { useReducer, useState } from "react"
import { toast } from "react-toastify"
import BlogContext from "../contexts/ProductContext"
import type { CategoryInterface } from "../types/CategoryInterface"
import { slugify } from "../utils/slugify"
import axiosAdmin from "../axios/axiosAdmin"
import ProductReducer from "../reducers/ProductReducer"
import axiosGuest from "../axios/axiosGuest"

export default function ProductState({
  children,
}: {
  children: React.ReactNode
}) {
  const initialState = {
    products: [],
    product: null
  }
  const [loading, setLoading] = useState(false)
  const [state, dispatch] = useReducer(ProductReducer, initialState)

  const getProducts = async () => {
    try {
      const { data: { products } } = await axiosGuest.get('/admin/products')

      dispatch({
        type: "GET_PRODUCTS",
        products: products
      })
    } catch (err) {
      console.log('err', err)
    }
  }

  const getProductById = async (id: string): Promise<boolean> => {
    try {
      const { data: { product } } = await axiosAdmin.get(`/admin/products/${id}`)
      console.log('product', product)
      dispatch({
        type: "GET_PRODUCT",
        product: product
      })
  
      return true
    } catch (err) {
      console.log('err', err)
      return false
    }

  }

  const editProductById = async (id, values) => {
    try {
      const res = await axiosAdmin.patch(`/products/${id}`, { ...values }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      console.log('res', res)

      toast.success("Blog düzenlendi")
      return true

    } catch (err) {
      console.error("editProductById error:", err)
      return false
    }
  }

  const deleteProductById = async id => {
    try {
      await axiosAdmin.delete(`/products/${id}`)
      toast.success("Blog silindi")
      return true
    } catch (err: any) {
      return false
    }
  }

  const getProductBySlug = async (slug: string): Promise<boolean> => {
    try{
      const { data: { product } } = await axiosGuest.get(`/admin/products/getProductBySlug/${slug}`)
      dispatch({
        type: 'GET_PRODUCT',
        product: product
      })
    }catch(err){
      console.log('err', err)
    }
  }

  const getProductsByCategorySlug = async (slug: string): Promise<boolean> => {
    try {
      setLoading(true)
      const { data: { products } } = await axiosGuest.get(`/admin/products/getProductsByCategorySlug/${slug}`)
      dispatch({ type: "GET_PRODUCTS", products })

      return true
    } catch (err: any) {
      console.log('err', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <BlogContext.Provider
      value={{
        products: state.products,
        product: state.product,
        loading: state.loading,
        getProducts,
        getProductById,
        editProductById,
        deleteProductById,
        getProductBySlug,
        getProductsByCategorySlug,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

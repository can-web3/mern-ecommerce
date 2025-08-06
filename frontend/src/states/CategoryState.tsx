import { useReducer } from "react"
import CategoryReducer from "../reducers/CategoryReducer"
import { toast } from "react-toastify"
import CategoryContext from "../contexts/CategoryContext"
import type { CategoryInterface } from "../types/CategoryInterface"
import { slugify } from "../utils/slugify"
import axiosAdmin from "../axios/axiosAdmin"
import axiosGuest from "../axios/axiosGuest"

export default function CategoryState({
  children,
}: {
  children: React.ReactNode
}) {
  const initialState = {
    categories: [],
    category: null
  }
  const [state, dispatch] = useReducer(CategoryReducer, initialState)

  const getCategories = async () => {
    try {
      const { data: { categories } } = await axiosGuest.get('/admin/categories')
      dispatch({ type: "GET_CATEGORIES", categories: categories })
    } catch (err) {
      console.log('err', err)
    }
  }

  const getCategoryById = async id => {
      try{
        const { data } = await axiosAdmin.get(`/categories/${id}`)
        dispatch({
          type: 'GET_CATEGORY',
          category: data
        })
        return true
      }catch(err){
        console.log('err', err)
        return false
      }

  }

  const editCategoryById = async (id, values) => {
    try {
      const res = await axiosAdmin.patch(`/categories/${id}`, { ...values })
      console.log('res', res)
      toast.success("Kategori düzenlendi")
      return true
    } catch (err: any) {
      console.log('err', err)
      return false
    }
  }

  const deleteCategoryById = async id => {
    try {
      console.log('id', id)
      const res = await axiosAdmin.delete(`/categories/${id}`)
      console.log('res', res)
      toast.success("Kategori silindi")
      return true
    } catch (err: any) {
      console.log('err', err)
      return false
    }
  }

  const getCategoryBySlug = async (slug: string): Promise<boolean> => {
    const q = query(
      collection(db, 'categories'),
      where('slug', '==', slug)
    )
    const snap = await getDocs(q)

    if (snap.empty) {
      toast.error('Böyle bir kategori bulunamadı')
      return false
    }

    const docSnap = snap.docs[0]
    const data = docSnap.data() as Omit<CategoryInterface, 'id'>

    dispatch({
      type: 'GET_CATEGORY',
      category: {
        id: docSnap.id,
        name: data.name,
        slug: data.slug,      
        createdAt: data.createdAt
      }
    })

    return true
  }

  return (
    <CategoryContext.Provider
      value={{
        categories: state.categories,
        category: state.category,
        getCategories,
        getCategoryById,
        editCategoryById,
        deleteCategoryById,
        getCategoryBySlug,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

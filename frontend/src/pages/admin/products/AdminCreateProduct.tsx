import { useFormik } from "formik";
import AdminSectionHeader from "../../../components/AdminSectionHeader";
import FormInput from "../../../components/FormInput";
import BtnPrimary from "../../../components/BtnPrimary";
import { useNavigate } from "react-router-dom";
import { productValidation } from "../../../validations/admin/ProductValidation";
import { useContext, useEffect } from "react";
import CategoryContext from "../../../contexts/CategoryContext";
import Select from "../../../components/Select";
import TextEditor from "../../../components/TextEditor";
import ProductContext from "../../../contexts/ProductContext";
import axiosAdmin from "../../../axios/axiosAdmin";
import { toast } from "react-toastify";


export default function AdminCreateProduct() {
    const navigate = useNavigate()
    const { createBlog } = useContext(ProductContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { values, errors, isSubmitting, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues: {
            image: null as File | null,
            title: '',
            price: '',
            category: '',
            description: '',
        },
        validationSchema: productValidation(false),
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values, { setErrors }) => {
          try {
            const res = await axiosAdmin.post('/products', { ...values }, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })

            toast.success('Ürün eklendi')
            navigate('/admin/urunler')
          } catch (err) {
            const { status } = err
            if(status === 422){
              setErrors(err.response.data.errors)
            }
            console.log('err', err)
          }
          // if(await createBlog(values))
          //     navigate('/admin/bloglar')
        }
    })

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <main>
            <AdminSectionHeader 
                title='Ürün Ekle'
            />

            <div className="bg-white p-4 mt-4 border border-gray-200">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
                    {/* image */}
                    <FormInput
                        type="file"
                        title="Resim"
                        name="image"
                        onChange={(e) => {
                            const file = (e.currentTarget.files && e.currentTarget.files[0]) || null
                            setFieldValue("image", file)
                        }}
                        error={errors.image}
                    />

                    {/* title */}
                    <FormInput 
                        title='Başlık'
                        name="title"
                        onChange={handleChange}
                        value={values.title}
                        error={errors.title}
                    />

                    {/* price */}
                    <FormInput 
                        type="number"
                        title='Fiyat'
                        name="price"
                        onChange={handleChange}
                        value={values.price}
                        error={errors.price}
                    />

                    {/* category */}
                    <Select
                        title="Kategori"
                        name="category"
                        data={categories}
                        optionValueKey="_id"
                        optionLabelKey="name"
                        value={values.category}
                        onChange={handleChange}
                    />

                    {/* description */}
                    <TextEditor 
                        title='İçerik'
                        name="description"
                        onChange={handleChange('description')}
                        value={values.description}
                        error={errors.description}
                    />


                    <BtnPrimary 
                        isSubmitting={isSubmitting}
                    />
                </form>
            </div>
        </main>
    )
}

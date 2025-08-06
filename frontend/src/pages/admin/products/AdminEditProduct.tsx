import { useFormik } from "formik";
import AdminSectionHeader from "../../../components/AdminSectionHeader";
import FormInput from "../../../components/FormInput";
import BtnPrimary from "../../../components/BtnPrimary";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import CategoryContext from "../../../contexts/CategoryContext";
import Select from "../../../components/Select";
import TextEditor from "../../../components/TextEditor";
import ProductContext from "../../../contexts/ProductContext";
import { productValidation } from "../../../validations/admin/ProductValidation";


export default function AdminEditProduct() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { product, editProductById, getProductById } = useContext(ProductContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { values, errors, isSubmitting, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues: {
            image: null as File | null,
            title: product?.title || '',
            price: Number(product?.price) || 0,
            category: product?.category?._id || '',
            description: product?.description || '',
        },
        enableReinitialize: true,
        validationSchema: productValidation(true),
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            if(await editProductById(id, values))
                navigate('/admin/urunler')
        }
    })

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getProductById(id)
    }, [id])

    return (
        <main>
            <AdminSectionHeader 
                title='Blog Düzenle'
            />

            <div className="bg-white p-4 mt-4 border border-gray-200">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
                    {/* show image */}
                    <div className="w-40">
                        <img src={product?.image} alt="" />
                    </div>

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
                        required={false}
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

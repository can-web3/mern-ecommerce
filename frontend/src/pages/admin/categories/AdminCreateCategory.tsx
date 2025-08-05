import { useFormik } from "formik";
import AdminSectionHeader from "../../../components/AdminSectionHeader";
import FormInput from "../../../components/FormInput";
import BtnPrimary from "../../../components/BtnPrimary";
import { categoryValidation } from "../../../validations/admin/CategoryValidation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosAdmin from "../../../axios/axiosAdmin";

export default function AdminCreateCategory() {
    const navigate = useNavigate()
    const { values, errors, isSubmitting, handleSubmit, handleChange } = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: categoryValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values, { setErrors }) => {
            try {
                const { status } = await axiosAdmin.post('/categories', { ...values })
                if(status === 201){
                    toast.success("Kategori eklendi")
                    navigate('/admin/kategoriler')
                }
            } catch (err: any) {
                console.log('err', err)
                setErrors(err.response.data.errors)
                return false
            }
        }
    })

    return (
        <main>
            <AdminSectionHeader 
                title='Kategori Ekle'
            />

            <div className="bg-white p-4 mt-4 border border-gray-200">
                <form onSubmit={handleSubmit}>
                    {/* name */}
                    <FormInput 
                        title='Adı'
                        name="name"
                        onChange={handleChange('name')}
                        value={values.name}
                        error={errors.name}
                    />

                    <BtnPrimary 
                        isSubmitting={isSubmitting}
                    />
                </form>
            </div>
        </main>
    )
}

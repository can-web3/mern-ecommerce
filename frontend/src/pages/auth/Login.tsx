import { useFormik } from "formik";
import FormInput from "../../components/FormInput";
import BtnPrimary from "../../components/BtnPrimary";
import Logo from "../../components/Logo";
import { loginValidation } from "../../validations/auth/LoginValidation";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import axiosGuest from "../../axios/axiosGuest";
import { toast } from "react-toastify";

export default function Login() {
    const navigate = useNavigate()
    const { getAuth } = useContext(AuthContext)

    const { values, errors, isSubmitting, handleSubmit, handleChange } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            try {
              const res = await axiosGuest.post('/users/login', { ...values })
              localStorage.setItem('accessToken', JSON.stringify(res.data.token))
              await getAuth()
              toast.success('Giriş yapıldı')
              navigate('/')
            } catch (err) {
              const { status } = err.response
              if(status === 422){
                toast.error('E-posta veya parola hatalı')
              }else{
                toast.error('Bilinmeyen hata')
              }
            }
        }
    })

    return (
        <div className="container my-5">
            <div className="max-w-[640px] mx-auto border border-orange-600 px-4 py-6">
                <Logo className="mx-auto mb-6" />
                <h1 className="text-center text-xl font-semibold mb-2">Giriş Yap</h1>
                <p className="text-center text-gray-600 font-medium text-sm">Giriş yapmak için lütfen aşağıdaki formu doldurunuz</p>

                {/* users info */}
                <div className="my-4 bg-amber-200 p-2">
                    <h2 className="text-sm font-semibold">Admin Girişi Bilgileri:</h2>
                    <p className="text-sm">E-posta: admin@gmail.com</p>
                    <p className="text-sm">Parola: admin1</p>
                    <hr />
                    <h2 className="text-sm font-semibold">Kullanıcı Girişi Bilgileri:</h2>
                    <p className="text-sm">E-posta: user1@gmail.com</p>
                    <p className="text-sm">Parola: qweqwe</p>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="form">
                    {/* email */}
                    <FormInput
                        type="email" 
                        title="E-posta"
                        name="email"
                        onChange={handleChange('email')}
                        value={values.email}
                        error={errors.email}
                    />

                    {/* password */}
                    <FormInput
                        type="password" 
                        title="Parola"
                        name="password"
                        onChange={handleChange('password')}
                        value={values.password}
                        error={errors.password}
                    />

                    <BtnPrimary 
                        isSubmitting={isSubmitting}
                    />
                </form>
            </div>
        </div>
    )
}

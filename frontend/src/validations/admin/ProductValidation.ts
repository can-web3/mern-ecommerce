import * as Yup from 'yup'

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export const productValidation = (isEdit = false) => 
  Yup.object({
    image: isEdit
      ? Yup.mixed().nullable()
      : Yup.mixed()
          .required('Resim zorunlu')
          .test(
            'fileFormat',
            'Sadece JPG, PNG, GIF veya WEBP formatı desteklenir',
            (file) => file != null && SUPPORTED_FORMATS.includes((file as File).type)
          ),
    title: Yup.string()
      .min(3, 'Başlık en az 3 karakter olmalı')
      .required('Başlık zorunlu'),
    category: Yup.string()
      .required('Kategori zorunlu'),
    description: Yup.string()
      .min(6, 'Açıklama en az 6 karakter olmalı')
      .required('Açıklama zorunlu'),
})

import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.tsx'
import UserState from './states/UserState.tsx'
import AuthState from './states/AuthState.tsx'
import { ToastContainer } from 'react-toastify'
import CategoryState from './states/CategoryState.tsx'
import ProductState from './states/ProductState.tsx'

createRoot(document.getElementById('root')!).render(
  <ProductState>
    <CategoryState>
      <AuthState>
        <UserState>
          <RouterProvider router={router} />
          <ToastContainer />
        </UserState>
      </AuthState>
    </CategoryState>
  </ProductState>
)

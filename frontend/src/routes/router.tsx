import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import GuestMiddleware from "../middlewares/GuestMiddleware";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AdminCategories from "../pages/admin/categories/AdminCategories";
import AdminCreateCategory from "../pages/admin/categories/AdminCreateCategory";
import AdminEditCategory from "../pages/admin/categories/AdminEditCategory";
import AdminProducts from "../pages/admin/products/AdminProducts";
import AdminCreateProduct from "../pages/admin/products/AdminCreateProduct";
import AdminEditProduct from "../pages/admin/products/AdminEditProduct";
import ProductDetail from "../pages/ProductDetail";
import ProductsPage from "../pages/ProductsPage";
import CategoryProductsPage from "../pages/CategoryProductsPage";

const router = createBrowserRouter([
    {
        path: '',
        element: <AppLayout />,
        children: [
            { path: '', element: <Home /> },
            { path: 'urun/:slug', element: <ProductDetail /> },
            { path: 'urunler', element: <ProductsPage /> },
            { path: 'kategori/:slug', element: <CategoryProductsPage /> },

            // guest middleware
            { 
                path: '',
                element: <GuestMiddleware />,
                children: [
                    { path: 'kayit-ol', element: <Register /> },
                    { path: 'giris-yap', element: <Login /> },
                ]
            },

        ]
    },
    {
        path: 'admin',
        element: <AdminLayout />,
        children: [
            { path: '', element: <Dashboard /> },

            { path: 'kategoriler', element: <AdminCategories /> },
            { path: 'kategoriler/ekle', element: <AdminCreateCategory /> },
            { path: 'kategoriler/:id/duzenle', element: <AdminEditCategory /> },

            { path: 'urunler', element: <AdminProducts /> },
            { path: 'urunler/ekle', element: <AdminCreateProduct /> },
            { path: 'urunler/:id/duzenle', element: <AdminEditProduct /> },
        ]
    }
])

export default router
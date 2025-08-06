import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import AdminSectionHeader from "../../../components/AdminSectionHeader"
import DataTable from "react-data-table-component"
import ProductContext from "../../../contexts/ProductContext"
import moment from "moment"

export default function AdminProducts() {
  const { products, getProducts, deleteProductById } = useContext(ProductContext)

  useEffect(() => {
    getProducts()
  }, [])

  const handleDelete = async (id, title) => {
    if(confirm(`${title} ürününü silmek istiyor musunuz?`)){
      if(await deleteProductById(id)){
        await getProducts()
      }
    }
  }

  const columns = [
    {
      name: "Resim",
      selector: (row) => <img className="w-40" src={row.image} />,
      sortable: true,
      width: "120px",
    },
    {
      name: "Başlık",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Fiyat",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.category?.name,
      sortable: true,
      width: "140px",
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
      width: "140px",
    },
    {
      name: "İşlemler",
      cell: (row) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Link
            to={`${row._id}/duzenle`}
            className="btn-warning py-1 px-2 text-sm"
          >
            Düzenle
          </Link>
          <button
            onClick={() => handleDelete(row._id, row.title)}
            className="btn-danger py-1 px-2 text-sm"
          >
            Kaldır
          </button>
        </div>
      ),
      right: true,
      minWidth: "140px",
    },
  ]

  return (
    <main>
      <AdminSectionHeader title="Ürünler" isOpenCreate={true} />
      <div className="bg-white p-4 mt-4 border border-gray-200 overflow-x-auto">
        <DataTable
          columns={columns}
          data={products}
          pagination
          highlightOnHover
          striped
          customStyles={{
            rows: {
              style: { minHeight: "56px" }
            },
            cells: {
              style: { padding: "8px 16px" }
            }
          }}
        />
      </div>
    </main>
  )
}

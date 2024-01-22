import { Button, Popconfirm, Space, Spin, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

function AdminProductPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (key) => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${key}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        message.success("Ürün silindi");
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(categories);

  const columns = [
    {
      title: "Ürün Resmi",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="avatar"
          width="70"
          style={{
            borderRadius: "10px",
          }}
        />
      ),
    },
    {
      title: "Ürün Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      // toFixed(2) => virgülden sonra 2 basamak göster
      render: (text) => (
        <span
          style={{
            fontWeight: "bold",
          }}
        >
          {text.toFixed(2)}$
        </span>
      ),
    },
    {
      title: "İndirim",
      dataIndex: "discount",
      key: "discount",
      // toFixed(2) => virgülden sonra 2 basamak göster
      render: (text) => (
        <span
          style={{
            fontWeight: "semi-bold",
            color: "red",
            fontSize: "12px",
          }}
        >
          {text}%
        </span>
      ),
    },
    {
      title: "Ürün Kategorisi",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "İşlemler",
      dataIndex: "key",
      key: "key",
      render: (key) => (
        <Space size={"middle"}>
          <Popconfirm
            title="Ürünü silmek istediğinize emin misiniz?"
            onConfirm={() => handleDelete(key)}
            okText="Evet"
            cancelText="Hayır"
          >
            <DeleteOutlined
              style={{
                color: "purple",
                fontSize: "20px",
              }}
            />
          </Popconfirm>
          <Button
            type="primary"
            onClick={() => {
              navigate(`/admin/products/update/${key}`, { replace: true });
            }}
          >
            Düzenle
          </Button>
        </Space>
      ),
    },
  ];

  const data = products.map((product) => {
    return {
      key: product._id,
      image: product.img[0],
      name: product.name,
      price: product.price.current,
      discount: product.price.discount,
      // kategorilerin içindeki id ler ile ürün id si eşleşirse o kategorinin adını yazdır
      category: categories.find((category) => category._id === product.category)
        ?.name,
    };
  });

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <Spin
      tip="Loading..."
      spinning={loading}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Table columns={columns} dataSource={data} />
    </Spin>
  );
}

export default AdminProductPage;

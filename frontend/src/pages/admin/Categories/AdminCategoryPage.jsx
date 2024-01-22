import { Button, Popconfirm, Space, Table, message } from "antd";
import { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function AdminCategoryPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getCategories = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(categories);

  const handleDelete = async (key) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/${key}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Kategori silindi");
        getCategories();
      } else {
        message.error("Kategori silinemedi");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Kategori Resmi",
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
      title: "Kategori Adı",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      // delete butonu
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size={"middle"}>
          <Popconfirm
            title="Kategoriyi silmek istediğinize emin misiniz?"
            onConfirm={() => handleDelete(record.key)}
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
            onClick={()=> {
                navigate(`/admin/categories/update/${record.key}`, {replace: true})
            }}
            >Düzenle</Button>
        </Space>
      ),
    },
  ];

  const data = categories.map((category) => {
    return {
      key: category._id,
      name: category.name,
      image: category.img,
    };
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
}

export default AdminCategoryPage;

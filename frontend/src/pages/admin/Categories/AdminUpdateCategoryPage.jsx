import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AdminUpdateCategoryPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  console.log(id);

  // ürün bilgilerini getirme
  const fetchCategory = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/categories/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
          });
        }

        setLoading(false);
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  // ürün bilgilerini güncelleme
  const onFinish = async (values) => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/categories/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          message.success("Kategori güncellendi");
          setLoading(false);
        } else {
          message.error("Kategori güncellenemedi");
        }
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Spin
      tip="Loading..."
      spinning={loading}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
        form={form}
        // loading spinner
        spinning={<Spin tip="Loading..." spinning={loading} />}
      >
        <Form.Item
          label="Kategori Adı"
          name="name"
          rules={[{ required: true, message: "Kategori adı giriniz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori Resmi"
          name="img"
          rules={[{ required: true, message: "Kategori resmi giriniz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onSubmit={fetchCategory}>
            Kaydet
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default AdminUpdateCategoryPage;

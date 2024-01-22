import { Button, Form, Input, Spin, message } from "antd";
import { useState } from "react";

function AdminCreateCategoryPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          message.success("Kategori eklendi");
          setLoading(false);
        } else {
          message.error("Kategori eklenemedi");
        }
        form.resetFields();
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <Form.Item
          label="Kategori Adı"
          name="name"
          rules={[
            {
              required: true,
              message: "Kategori adı giriniz",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kategori Resmi"
          name="img"
          rules={[
            {
              required: true,
              message: "Kategori resmi giriniz",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Kaydet
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default AdminCreateCategoryPage;

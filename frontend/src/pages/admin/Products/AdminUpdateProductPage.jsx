import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";

function AdminUpdateProductPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const { id } = useParams();

  // ürün bilgilerini getirme
  const fetchProduct = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        if (data) {
          form.setFieldsValue({
            name: data.name,
            current: data.price.current,
            discount: data.price.discount,
            description: data.description,
            img: data.img.join("\n"),
            color: data.color.join("\n"),
            size: data.size.join("\n"),
            category: data.category,
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
    const img = values.img.split("\n").map((img) => img.trim());
    const color = values.color.split("\n").map((color) => color.trim());
    const size = values.size.split("\n").map((size) => size.trim());
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            price: {
              current: values.current,
              discount: values.discount,
            },
            color,
            size,
            img,
          }),
        });
        if (response.ok) {
          message.success("Ürün güncellendi");
          setLoading(false);
        } else {
          message.error("Ürün güncellenemedi");
        }
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  // kategorileri getirme
  const fetchCategories = async () => {
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

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  return (
    <Spin
      spinning={loading}
      tip="Loading..."
      style={{
        position: "absolute",
        top: "80%",
        left: "40%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Ürün İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen Ürün adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ürün Kategorisi"
          name="category"
          rules={[
            {
              required: true,
              message: "Lütfen 1 kategori seçin!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Fiyat"
          name="current"
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatını girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="İndirim Oranı"
          name="discount"
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün indirim oranı girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün açıklaması girin!",
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            style={{
              backgroundColor: "white",
            }}
          />
        </Form.Item>
        <Form.Item
          label="Ürün Görselleri (Linkler)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 4 ürün görsel linki girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir görsel linkini yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Ürün Renkleri (RGB Kodları)"
          name="color"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün rengi girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir RGB kodunu yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Ürün Bedenleri"
          name="size"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün beden ölçüsü girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir beden ölçüsünü yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Spin>
  );
}

export default AdminUpdateProductPage;

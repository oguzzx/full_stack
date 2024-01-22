import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AdminCreateProductPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

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

  const onFinish = async (values) => {
    console.log(values);
    const img = values.img.split(",").map((item) => item.trim());
    const color = values.colors.split("\n").map((item) => item.trim());
    const size = values.sizes.split("\n").map((item) => item.trim());
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/products`, {
          method: "POST",
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
          message.success("Ürün eklendi");
          setLoading(false);
        } else {
          message.error("Ürün eklenemedi");
        }
        form.resetFields();
      }, 1300);
    } catch (error) {
      console.log("Ürün güncelleme hatası:", error);
    }
  };


  // console.log(categories);

  useEffect(() => {
    getCategories();
  }, [apiUrl]);

  return (
    <Spin
      spinning={loading}
      tip="Yükleniyor..."
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-60%, -10%)",
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
          label="Ürün Açıklaması Oranı"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün açıklaması girin!",
            },
          ]}
        >
          <ReactQuill
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
          name="colors"
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
          name="sizes"
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
            {categories.map((category) => {
              return (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
}

export default AdminCreateProductPage;

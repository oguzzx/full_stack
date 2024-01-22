import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AdminUpdateCouponPage() {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchCoupon = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/coupons/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            code: data.code,
            discountPercent: data.discountPercent,
          });
        }
        setLoading(false);
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/coupons/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          message.success("Kupon güncellendi");
          setLoading(false);
        } else {
          message.error("Kupon güncellenemedi");
        }
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, []);

  return (
    <Spin spinning={loading} tip="Yükleniyor...">
      <Form
        form={form}
        name="update-coupon-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Kupon Kodu"
          name="code"
          rules={[{ required: true, message: "Lütfen kupon kodunu giriniz!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="İndirim Oranı"
          name="discountPercent"
          rules={[
            { required: true, message: "Lütfen indirim oranını giriniz!" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default AdminUpdateCouponPage;

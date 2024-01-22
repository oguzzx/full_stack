import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useState } from "react";

function AdminCreateCouponPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/coupons`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
          }),
        });
        if (response.ok) {
          message.success("Kupon eklendi");
          setLoading(false);
        } else {
          message.error("Kupon eklenemedi");
        }
        form.resetFields();
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Spin spinning={loading} tip="Yükleniyor...">
      <Form
        form={form}
        name="create-coupon-form"
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
          <Button type="primary" htmlType="submit" disabled={loading}>
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

export default AdminCreateCouponPage;

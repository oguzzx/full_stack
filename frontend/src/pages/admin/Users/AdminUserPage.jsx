import { useEffect, useState } from "react";
import { Popconfirm, Table, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function AdminUserPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await fetch(`${apiUrl}/api/auth`);
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(users);

  const handleDelete = async (key) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/${key}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Kullanıcı silindi");
        getUsers();
      } else {
        message.error("Kullanıcı silinemedi");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => (
        <img
          src={text}
          alt="avatar"
          width="50"
          style={{
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      // delete butonu
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Kullanıcıyı silmek istediğinize emin misiniz?"
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
      ),
    },
  ];

  const data = users.map((user) => {
    return {
      key: user._id,
      username: user.username,
      email: user.email,
      role:
        user.role === "admin" ? (
          <span style={{ color: "green" }}>admin</span>
        ) : (
          <span style={{ color: "red" }}>user</span>
        ),
      avatar: user.avatar,
    };
  });

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
}

export default AdminUserPage;

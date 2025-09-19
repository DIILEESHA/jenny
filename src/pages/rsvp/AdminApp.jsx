// src/admin/AdminApp.jsx
import React, { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Typography, Card } from "antd";
import { LockOutlined } from "@ant-design/icons";
import AdminDashboard from "./AdminDashboard";

const { Content } = Layout;
const { Title } = Typography;

const DUMMY_PASSWORD = "Jenny25"; 

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // persist login for session
    const stored = sessionStorage.getItem("rsvp_admin_authed");
    if (stored === "true") setLoggedIn(true);
  }, []);

  const onFinish = ({ password }) => {
    if (password === DUMMY_PASSWORD) {
      sessionStorage.setItem("rsvp_admin_authed", "true");
      setLoggedIn(true);
    } else {
      alert("Incorrect password.");
    }
  };

  if (!loggedIn) {
    return (
      <Layout style={{ minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Content style={{ maxWidth: 480, width: "100%" }}>
          <Card>
            <Title level={3} style={{ textAlign: "center", marginBottom: 8 }}>
              RSVP Admin Login
            </Title>
            <Form name="admin_login" onFinish={onFinish} layout="vertical">
              <Form.Item
                name="password"
                label="Admin password"
                rules={[{ required: true, message: "Enter the admin password" }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Sign in
                </Button>
              </Form.Item>
              <div style={{ fontSize: 12, color: "#666", textAlign: "center" }}>
              </div>
            </Form>
          </Card>
        </Content>
      </Layout>
    );
  }

  return <AdminDashboard onSignOut={() => { sessionStorage.removeItem("rsvp_admin_authed"); setLoggedIn(false); }} />;
}

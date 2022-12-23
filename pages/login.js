 
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import useScreenSize from "../hooks/useScreenSize";
import { setToken } from "../helpers";
import { useRouter } from "next/router";
import { getStrapiURL } from "../lib/api";

const Login = () => {
  const { isDesktopView } = useScreenSize();
  const router = useRouter();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(getStrapiURL('/api/auth/local/'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome back ${data.user.username}!`);

       router.replace('/');
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Row align="middle">
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card title="Login">
            {error ? (
              <Alert
                className="alert_error"
                message={error}
                type="error"
                closable
                afterClose={() => setError("")}
              />
            ) : null}
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="Email address" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_submit_btn"
                >
                  Login {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>
            </Form>
            <Link style={{marginBottom:'10px',display:'inline-block'}} href="/forgot-password">
              Forgot password ?
            </Link>
            <Typography.Paragraph className="form_help_text">
              New to Electronic? <Link href="/register">Sign Up</Link>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Login;
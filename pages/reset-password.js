 
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
  import useScreenSize from "../hooks/useScreenSize";
  import { useRouter } from "next/router";
  import { getStrapiURL } from "../lib/api";
  import axios from 'axios';
  
  const ResetPassword = () => {
    const { isDesktopView } = useScreenSize();
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(false);
  
    const [error, setError] = useState("");
  
    const onFinish = async (values) => {
      
      setIsLoading(true);
      axios
  .post(getStrapiURL('/api/auth/reset-password'), {
   code: 'privateCode', // code contained in the reset link of step 3.
    password: 'userNewPassword',
    passwordConfirmation: 'userNewPassword',
  })
  .then(response => {
    message.success("Your user's password has been reset !",4);
  })
  .catch(error => {
    console.log('An error occurred:', error);
    message.error(error.response.data.error.message,3);
  });
    };
  
    return (
      <Fragment>
        <Row align="middle">
          <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
            <Card title="Add New Password">
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
                  label="Password"
                  name="password"
                  rules={[{ 
                    required: true,
                    message: "Password is required!",
                    type: "string",
                  
                }]}
                >
                  <Input.Password placeholder="password" />
                </Form.Item>

          <Form.Item
                  label="Confrim Password"
                  name="confirm"
                  rules={[{ 
                    required: true,
                    message: "Confirm password is required!",
                    type: "string",
                  
                }]}
                >
                  <Input.Password placeholder="confirm password" />
                </Form.Item>
        
        <Button
          className="profile_save_btn"
          htmlType="submit"
          type="primary"
          size="large"
        >
         
         send email
        </Button>
              
              </Form>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  };
  
  export default ResetPassword;
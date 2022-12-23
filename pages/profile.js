   
import React from "react";
import { Button, Card, Col, Form, Input, message, Row, Spin,Alert } from "antd";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { getToken } from "../helpers";
import { useRouter } from "next/router";
import { getStrapiURL } from "../lib/api";
import axios from "axios";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, isLoading, setUser } = useAuthContext();
  const router = useRouter();

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(getStrapiURL(`/api/users/${user.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // set the auth token to the user's jwt
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      setUser(responseData);
      message.success("Data saved successfully!");
    } catch (error) {
      console.error(error);
      
      message.error("Error While Updating the Profile!");
    } finally {
      setLoading(false);
    }
  };
 


  const handleChangePassword = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        getStrapiURL(`/api/auth/change-password`),
        {
          currentPassword: data.currentpassword,
          password:  data.password,
          passwordConfirmation: data.confirm,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
     
      message.success("Password updated successfully!");
      setError("");
    } catch (error) {
      console.error('axios error:',error.response);
      setError(error?.response.data.error.message);
      message.error("Error While Updating the Password!");
    } finally {
      setLoading(false);
    }
  };


  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Card className="profile_page_card">
         
        <h2 style={{marginBottom:'40px'}}>
            Update Your Info
        </h2>
        
      <Form
        layout="vertical"
        initialValues={{
          username: user?.username,
          email: user?.email,
          twitter_username: user?.twitter_username,
          linkedin_username: user?.linkedin_username,
          github_username: user?.github_username,
          avatar_url: user?.avatar_url,
          website_url: user?.website_url,
          about: user?.about,
        }}
        onFinish={handleProfileUpdate}
      >
        <Row gutter={[16, 16]}>
          <Col md={8} lg={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Username is required!",
                  type: "string",
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
          <Col md={8} lg={8} sm={24} xs={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required!",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          
        </Row>
        <Button
          className="profile_save_btn"
          htmlType="submit"
          type="primary"
          size="large"
        >
          {loading ? (
            <>
              <Spin size="small" /> Saving
            </>
          ) : (
            "Save"
          )}
        </Button>
      </Form>
      

    
      <h2 style={{marginTop:'40px',marginBottom:'30px'}}>
            Update Your Password
        </h2>

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
        layout="vertical"
        onFinish={handleChangePassword}
      >
        
          <Col md={8} lg={8} sm={24} xs={24}>
            <Form.Item
              label="Curent Password"
              name="currentpassword"
              rules={[
                {
                  required: true,
                  message: "Current password is required!",
                  type: "string",
                },
              ]}
            >
              <Input placeholder="current password" />
            </Form.Item>
          </Col>
          <Col md={8} lg={8} sm={24} xs={24}>
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
          </Col>
          
      
        <Button
          className="profile_save_btn"
          htmlType="submit"
          type="primary"
          size="large"
        >
          {loading ? (
            <>
              <Spin size="small" /> Saving
            </>
          ) : (
            "Save"
          )}
        </Button>
      </Form>
    </Card>
  );
};

export default Profile;
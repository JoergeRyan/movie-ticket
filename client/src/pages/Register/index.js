import React, { useEffect } from "react";
import { Form, message,Input } from "antd";
import * as Icons from "@ant-design/icons";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <center><h1 className="text-xl mb-1">REGISTER</h1></center>
       
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
        <div className="input">
              <Form.Item
                  label = ""
                  name = "name"
                  rules = {[{required:true, message:" "}]}  
              >
                <div className="name">
                <Input
                  placeholder= "Input Name" 
                  prefix={<Icons.UserOutlined />}
                  type="text"
                  />
                  </div>
                  
              </Form.Item>
              </div>
              <div className="input">
              <Form.Item
                  label = ""
                  name = "email"
                  rules = {[{required:true, message:" "}]}  
              > 
              <div className="email">
                <Input
                  placeholder= "Email Address" 
                  prefix={<Icons.MailOutlined/>}
                  type="text"
                  />
                  </div>
              
              </Form.Item>
              </div>
              <div className="input">
              <Form.Item
                  label = ""
                  name = "password"
                  rules = {[{required:true, message:" "}]}  
              >
                <div className="password">
                <Input
                  placeholder= "Password" 
                  prefix={<Icons.KeyOutlined/>}
                  type="password"
                  />
                  </div>
              </Form.Item>
              </div>

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="REGISTER" type="submit" />
            <Link to="/login" className="text-primary">
              {" "}
              Already have an account? Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;

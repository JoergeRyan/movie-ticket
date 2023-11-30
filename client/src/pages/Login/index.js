import React, { useEffect } from "react";
import { Form, message,Input} from "antd";
import * as Icons from "@ant-design/icons";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await LoginUser(values);
      dispatch(HideLoading())
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading())
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
        <center><h1 className="text-xl mb-1">LOGIN</h1></center>
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
        <div className="input">
        <Form.Item
                  label = ""
                  name = "username"
                  rules = {[{required:true, message:" "}]}  
              >
                <div className="username">
                <Input
                  placeholder= "Username" 
                  prefix={<Icons.UserOutlined />}
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
        <div className ="pass">
          <Input
            placeholder="Password"
            prefix={<Icons.KeyOutlined/>}
            type="password"
            />
        </div>
        </Form.Item>
      </div>

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="LOGIN" type="submit" />
            <Link to="/register" className="text-primary">
              {" "}
              Don't have an account? Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword:"",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_API_URL}/change-password?_method=PUT`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old_password: "password",
            password: formData.newPassword,
            password_confirmation: formData.confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Handle the response as needed

      // Redirect to the login page or perform any other actions after success
      navigate("/login");
    } catch (error) {
      console.error("Error changing password:", error);
      // Handle error scenarios
    }
    navigate("/login");
  };

  return (
    <main className="root-layout">
      <img
        className="absolute top-0 right-0 w-32 h-32"
        src="/circle.svg"
        alt="circle.svg"
      />

      <Link to={"/"}>
        <img className="logo" src="/logo.png" alt="" />
      </Link>

      <form className="card" onSubmit={handleSubmit}>
        <div className="card-title">
          <h1>Reset your password</h1>
        </div>
        <div className="flex flex-col gap-6 p-9">
          <div className="card-input">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              name="oldPassword"
              onChange={handleChange}
              type="password"
              placeholder="Enter your old password"
              autoComplete="oldPassword"
            />
          </div>
        <div className="flex flex-col gap-6 p-9">
          <div className="card-input">
            <label htmlFor="newPassword">New Password</label>
            <input
              name="newPassword"
              onChange={handleChange}
              type="password"
              placeholder="Enter your new password"
              autoComplete="newPassword"
            />
          </div>
          <div className="card-input">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              placeholder="***********"
              autoComplete="confirmPassword"
            />
          </div>

          <div className="flex justify-center w-full">
            <button className="card-button">Confirm</button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default ResetPassword;

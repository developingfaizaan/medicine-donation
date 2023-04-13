import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Input, Button, Error } from "../components";
import { useAuth } from "../context/auth";
import { useTranslate } from "../context/translate";
import { formImg } from "../assets";

// TODO: Add Validation
const Login = () => {
  const { language } = useTranslate();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({email: "", password: ""});
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  return (
    <main className="flex">
      <section className="w-full max-w-2xl m-auto px-5 md:px-12 sm:px-32 py-20">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-12">{language.LoginIntoYourAccount}</h1>
        {error && <Error message={error} />}

        <form onSubmit={handleSubmit}>
          <Input label={language.Email} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label={language.Password} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button type="submit">{language.LoginIntoYourAccount}</Button>
        </form>

        <p className="text-center my-7">
          {language.DontHaveAnAccount}
          <Link to="/signup" className="text-blue-400 font-medium">&nbsp;{language.CreateAnAccount}</Link>
        </p>
      </section>

      <img src={formImg} className="hidden lg:block" alt="bg" />
    </main>
  );
};

export default Login;

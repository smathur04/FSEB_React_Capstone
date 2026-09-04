import { useLoading } from "../LoadingContext";
import Input from "../components/Input";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import { useState } from "react";
import userService from "../utils/userService";
import { useNavigate } from "react-router-dom"; 

type SignState = {
    email: string;
    password: string;
}

const styles = {
  image: {
    width: "180px",
    height: "90px",
    alignSelf: "center" as const,
  },
};

const RegisterPage = () => {
    const { setIsLoading } = useLoading();
    const [attempted, setAttempted] = useState(false);
    const [form, setForm] = useState<SignState>({ email: "", password: "" });
    const navigate = useNavigate();

    function handleCreateAccount(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setAttempted(true);

        userService.signup({
            email: form.email,
            password: form.password,
        })
        .then(() => {
            navigate("/dashboard"); 
            setAttempted(false);
        })
        .catch((err) => {
            console.log(err, "this is error");
        })
        .finally(() => {
            setIsLoading(false);
            
        });
    }

    return (
        <div className="page">

            <img style={styles.image} src={logo} alt="Logo" />

            <div className="page__content">
                <div className="page-card page-card--md">
                    <div className="page-card__header">
                        <h1>Create an Account</h1>
                    </div>

                    <form id="create-account-form" onSubmit={handleCreateAccount} className="page-card__stack">
                        <Input label="Email" placeholder="" type="email" attempted = {attempted}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        errorMessages={["Please use a valid email address as your username."]} />
                        
                        <Input label="Password" placeholder="" type="password" attempted = {attempted}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        errorMessages={["Please add a password with at least 8 characters"]} />
                    </form>

                    <div className="page-card__actions">
                        <Button type="submit" form="create-account-form" variant="primary">Create Account</Button>
                        <Button type="button" onClick={() => navigate("/login")} variant="secondary">Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
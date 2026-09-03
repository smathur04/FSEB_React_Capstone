import { useLoading } from "../LoadingContext";
import Input from "../components/Input";
import Button from "../components/Button";
import logo from "../assets/logo.png";

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

const LandPage = () => {
    const { setIsLoading } = useLoading();

    let rel: boolean = false;

    function handleLogin() {
        setIsLoading(true);
        rel = true;
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }
    return (
        <div className="page">

        <img style={styles.image} src={logo} alt="Logo" />

        <div className="page__content">
            <div className="page-card page-card--sm">
            <div className="page-card__header">
                <h1>Welcome Back!</h1>
                <p>Log in to your account to continue</p>
            </div>

            <div className="page-card__stack">
                <Input label="Email" placeholder="Email" type="email" attempted = {rel}
                errorMessages={["Please use a valid email address as your username"]} />
                <Input label="Password" placeholder="*************" type="password" attempted = {rel}
                errorMessages={["Please add a password with at least 8 characters"]} />
            </div>

            <div className="page-card__actions">
                <Button onClick={() => {handleLogin()}} variant="primary">Login</Button>
                <Button variant="secondary">Create an Account</Button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default LandPage
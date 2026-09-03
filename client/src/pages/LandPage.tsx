import { useLoading } from "../LoadingContext";

type SignState = {
    email: string;
    password: string;
}

const LandPage = () => {
    const { setIsLoading } = useLoading();
    return (
        <div>
            <h1>Welcome Back!</h1>
            <body>Log in to your account to continue</body>
            <div>There will be a form here and functionless forgot password</div>
            <button className="btn btn-primary" onClick={() => setIsLoading(true)}>Log In</button>
            <button className="btn btn-secondary" onClick={() => setIsLoading(true)}>Create an Account</button>


        </div>
    )
}

export default LandPage
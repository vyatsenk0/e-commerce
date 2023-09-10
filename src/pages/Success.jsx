import { useLocation } from "react-router-dom";

const Success = () => {
    const location = useLocation()
    
    return (
        <div style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
        <h1 style={{
                height: "100vh",
                display: "flex",
                color: "black"
            }}>Payment successful!</h1>
        </div>
    )
}

export default Success;
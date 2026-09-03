import logo from "../assets/logo.png";

const styles = {
  loader: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--color-yellow-cream)",
  },
  image: {
    width: "180px",
    height: "90px",
    objectFit: "contain" as const,
  },
};

export default function FullScreenLoader() {
  return (
    <div style={styles.loader}>
      <img src={logo} alt="Loading..." style={styles.image} />
    </div>
  );
}
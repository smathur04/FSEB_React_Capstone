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
    background: "#FBEABF",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
};

export default function FullScreenLoader() {
  return (
    <div style={styles.loader}>
      <img src="../assets/react.svg" alt="Loading..." style={styles.image} />
    </div>
  );
}
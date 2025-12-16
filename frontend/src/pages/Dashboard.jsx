import { Container, Typography, Button } from "@mui/material";

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3">Çiftçi Dashboard 🌾</Typography>
      <Typography sx={{ mt: 2 }}>
        Hoş geldin, sistem çalışıyor.
      </Typography>

      <Button
        variant="outlined"
        color="error"
        sx={{ mt: 3 }}
        onClick={logout}
      >
        Çıkış Yap
      </Button>
    </Container>
  );
}

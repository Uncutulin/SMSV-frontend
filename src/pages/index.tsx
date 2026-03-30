import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    // El middleware se encarga de proteger la ruta.
    // Si llegamos hasta aquí, redirigimos al dashboard.
    navigate('/cartera-vigente');
  }, [navigate]);
  return null;
}

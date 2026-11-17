import { useCallback, useEffect, useState } from "react";
import { listarMisReservas } from "../api/reservasApi";

export function useCharlasReservadas(logeado) {
  const [charlasReservadas, setCharlasReservadas] = useState(new Set());

  const recargarReservadas = useCallback(async () => {
    if (!logeado) {
      setCharlasReservadas(new Set());
      return;
    }

    try {
      const reservas = await listarMisReservas();
      setCharlasReservadas(new Set(reservas.map((reserva) => Number(reserva.charla_id))));
    } catch {
      setCharlasReservadas(new Set());
    }
  }, [logeado]);

  useEffect(() => {
    recargarReservadas();
  }, [recargarReservadas]);

  return { charlasReservadas, recargarReservadas };
}

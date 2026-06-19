import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TripContext = createContext(null);
const STORAGE_KEY = 'talabyahe_trip_data';

export function TripProvider({ children }) {
  const [conductor, setConductor] = useState(null);
  const [activeTrip, setActiveTrip] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketCounter, setTicketCounter] = useState(1004);
  const [isOffline] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.activeTrip) setActiveTrip(data.activeTrip);
      if (data.tickets) setTickets(data.tickets);
      if (data.ticketCounter) setTicketCounter(data.ticketCounter);
    });
  }, []);

  useEffect(() => {
    if (!conductor) return;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ activeTrip, tickets, ticketCounter }),
    );
  }, [activeTrip, tickets, ticketCounter, conductor]);

  const startTrip = (trip) => {
    setActiveTrip(trip);
    setTickets([]);
  };

  const issueTicket = ({ from, to, fare, baseFare, discountApplied }) => {
    const id = `TKT-${ticketCounter}`;
    const ticket = {
      id,
      from,
      to,
      fare,
      baseFare: baseFare ?? fare,
      discountApplied: !!discountApplied,
      discountPercent: discountApplied ? 20 : 0,
      time: new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
      conductor: conductor?.name,
    };
    setTickets((prev) => [ticket, ...prev]);
    setTicketCounter((c) => c + 1);
    return ticket;
  };

  const endTrip = () => {
    setActiveTrip(null);
    setTickets([]);
  };

  const logout = async () => {
    setConductor(null);
    setActiveTrip(null);
    setTickets([]);
    setTicketCounter(1004);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const totalEarnings = useMemo(() => tickets.reduce((sum, t) => sum + t.fare, 0), [tickets]);

  return (
    <TripContext.Provider
      value={{
        conductor,
        setConductor,
        activeTrip,
        startTrip,
        tickets,
        issueTicket,
        endTrip,
        logout,
        totalEarnings,
        isOffline,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip must be used within TripProvider');
  return ctx;
}

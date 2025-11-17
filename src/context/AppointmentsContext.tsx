import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

type AppointmentType = any; 

interface AppointmentsState {
  upcoming: AppointmentType[];
  cancelled: AppointmentType[];
  complete: AppointmentType[];
}

interface AppointmentsContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  appointments: AppointmentsState;
  setAppointments: Dispatch<SetStateAction<AppointmentsState>>;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export const AppointmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentsState>({
    upcoming: [],
    cancelled: [],
    complete: []
  });

  return (
    <AppointmentsContext.Provider value={{ loading, setLoading, appointments, setAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentsProvider');
  }
  return context;
};

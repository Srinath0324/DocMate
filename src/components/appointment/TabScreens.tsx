import React from 'react';
import AppointmentListScreen from './AppointmentListScreen';
import { Appointment } from '../../types/appointment';

interface TabScreenProps {
  appointments: Appointment[];
  onCancelAppointment: (appointmentId: string | number) => void;
}

export const UpcomingAppointments: React.FC<TabScreenProps> = ({ appointments, onCancelAppointment }) => {
  const upcomingAppointments = appointments.filter(
    appointment => appointment.appointmentStatus === 'Pending' || appointment.appointmentStatus === 'Confirmed'
  );

  return (
    <AppointmentListScreen 
      appointments={upcomingAppointments} 
      onCancelAppointment={onCancelAppointment}
    />
  );
};

export const CanceledAppointments: React.FC<TabScreenProps> = ({ appointments, onCancelAppointment }) => {
  const canceledAppointments = appointments.filter(
    appointment => appointment.appointmentStatus === 'Cancelled'
  );

  return (
    <AppointmentListScreen 
      appointments={canceledAppointments} 
      onCancelAppointment={onCancelAppointment}
    />
  );
};

export const CompletedAppointments: React.FC<TabScreenProps> = ({ appointments, onCancelAppointment }) => {
  const completedAppointments = appointments.filter(
    appointment => appointment.appointmentStatus === 'Complete'
  );

  return (
    <AppointmentListScreen 
      appointments={completedAppointments} 
      onCancelAppointment={onCancelAppointment}
      showReviewOption={true}
    />
  );
};

import Theme from "../theme/Theme";

export const AsyncKeyLiterals = {
  userID: 'userId',
  userRole: 'userRole',
  loginToken: 'loginToken',
  fcmtoken: 'fcmtoken',
  tokenExpiration: 'tokenExpiration',
};



export const mainSections = [
  {
    id: '1',
    title: 'Doctors',
    subtitle: 'Find the best doctors near you',
    imageUrl: Theme.IMAGES.home1,
    route: 'DoctorList',
  },
  {
    id: '2',
    title: 'Specialist',
    subtitle: 'Expert in specific fields',
    imageUrl: Theme.IMAGES.home2,
    route: 'DoctorList'
  },
  {
    id: '3',
    title: 'Surgeon',
    subtitle: 'Top surgical specialists',
    imageUrl: Theme.IMAGES.home3,
    route: 'DoctorList'
  },
  {
    id: '4',
    title: 'Doctor By Disease',
    subtitle: 'Find doctors for specific conditions',
    imageUrl: Theme.IMAGES.home4,
    route: 'DoctorList'
  },

];

export const facilitySections = [
  {
    id: '5',
    title: 'The Best Lab Near You',
    subtitle: 'Quality diagnostic labs',
    route: 'CommanList',
    icon: 'flask-outline'
  },
  {
    id: '6',
    title: 'The Best Hospital Near You',
    subtitle: 'Leading healthcare centers',
    route: 'CommanList',
    icon: 'medkit-outline'
  },
  {
    id: '7',
    title: 'The Best Clinic Near You',
    subtitle: 'Specialized medical clinics',
    route: 'CommanList',
    icon: 'medical-outline'
  }
];

export const mockAppointments = [
  {
    appoinmentId: 1,
    patientName: 'John Doe',
    age: 35,
    gender: 'Male',
    phoneNo: '+1234567890',
    disease: 'Hypertension',
    appointmentStatus: 'Pending',
    day: 'Monday',
    onlyDate: '15 Jan 2024',
    onlyTime: '10:00 AM',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    doctorField: 'Cardiology',
    fee: '$150',
    experience: '8 years',
    image: 'https://via.placeholder.com/70',
    isReviewed: false,
    isPaid: false,
  },
  {
    appoinmentId: 2,
    patientName: 'Jane Smith',
    age: 28,
    gender: 'Female',
    phoneNo: '+1234567891',
    disease: 'Diabetes',
    appointmentStatus: 'Confirmed',
    day: 'Tuesday',
    onlyDate: '16 Jan 2024',
    onlyTime: '2:00 PM',
    doctorId: 2,
    doctorName: 'Dr. Michael Brown',
    doctorField: 'Endocrinology',
    fee: '$200',
    experience: '12 years',
    image: 'https://via.placeholder.com/70',
    isReviewed: false,
    isPaid: true,
  },
  // ...other appointments kept for brevity
];

export const mockUser = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  profileImage: 'https://via.placeholder.com/60',
  specialization: 'Cardiologist',
};

export const mockHomeAppointments = [
  {
    id: '1',
    patientName: 'John Doe',
    date: '2024-01-15',
    time: '10:00 AM',
    type: 'onsite',
    status: 'upcoming',
    reason: 'Regular checkup',
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    date: '2024-01-15',
    time: '11:30 AM',
    type: 'online',
    status: 'upcoming',
    reason: 'Follow-up consultation',
  },
  {
    id: '3',
    patientName: 'Mike Wilson',
    date: '2024-01-16',
    time: '9:00 AM',
    type: 'onsite',
    status: 'upcoming',
    reason: 'Chest pain evaluation',
  },
];

export const mockSites = [
  {
    id: '1',
    name: 'City Medical Center',
    image: 'https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg',
    address: '123 Healthcare Blvd, Medical District',
    timeDuration: '24/7 Emergency Care',
    doctorContact: '+1 (555) 123-4567',
    doctorField: 'Cardiology',
    doctorType: 'Specialist',
    aboutDoctor: 'Dr. Johnson is a renowned cardiologist with 15+ years of experience in treating heart conditions.',
    specialization: 'Interventional Cardiology',
    fees: '$150 - $300',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    availableTime: '9:00 AM - 6:00 PM',
  },
  {
    id: '2',
    name: 'Green Valley Clinic',
    image: 'https://media.istockphoto.com/id/489041732/photo/modern-hospital-building.jpg?s=612x612&w=is&k=20&c=6miLZZB8hwaBAMfC-TpKfwJXyrJSAClx17Yd_LpGG68=',
    address: '456 Wellness Ave, Downtown',
    timeDuration: '8:00 AM - 10:00 PM',
    doctorContact: '+1 (555) 987-6543',
    doctorField: 'General Medicine',
    doctorType: 'General Practitioner',
    aboutDoctor: 'Dr. Smith provides comprehensive primary care with a focus on preventive medicine.',
    specialization: 'Family Medicine',
    fees: '$80 - $120',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableTime: '8:00 AM - 8:00 PM',
  },
];
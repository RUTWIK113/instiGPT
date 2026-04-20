import { InstituteData } from '../types';

export const instituteData: InstituteData = {
  name: "NexGen Institute of Technology (NIT)",
  courses: [
    {
      id: 'c1',
      code: 'CS101',
      name: 'Introduction to Computer Science',
      professor: 'Dr. Alice Smith',
      syllabus: ['Data Structures', 'Algorithms', 'Big O Notation', 'Sorting'],
      timetable: 'Mon 09:00 - 10:30 (LH-101)',
      credits: 4,
    },
    {
      id: 'c2',
      code: 'MA202',
      name: 'Linear Algebra & Calculus',
      professor: 'Dr. Bob Johnson',
      syllabus: ['Matrices', 'Eigenvalues', 'Integration', 'Differentiation'],
      timetable: 'Tue 11:00 - 12:30 (LH-202)',
      credits: 3,
    },
    {
      id: 'c3',
      code: 'PH103',
      name: 'Engineering Physics',
      professor: 'Dr. Carol White',
      syllabus: ['Quantum Mechanics', 'Optics', 'Electromagnetism'],
      timetable: 'Wed 14:00 - 15:30 (Physics Lab)',
      credits: 4,
    }
  ],
  deadlines: [
    {
      id: 'd1',
      title: 'CS101 Quiz 1',
      courseId: 'c1',
      dueDate: '2026-04-20T10:00:00Z',
      type: 'quiz',
    },
    {
      id: 'd2',
      title: 'MA202 Assignment 2',
      courseId: 'c2',
      dueDate: '2026-04-22T23:59:59Z',
      type: 'assignment',
    },
    {
      id: 'd3',
      title: 'Physics Lab Report',
      courseId: 'c3',
      dueDate: '2026-04-18T17:00:00Z',
      type: 'project',
    }
  ],
  events: [
    {
      id: 'e1',
      title: 'CodeSprint Hackathon',
      description: 'Annual 24-hour hackathon for all departments.',
      date: '2026-04-25T09:00:00Z',
      location: 'Auditorium',
      category: 'technical',
    },
    {
      id: 'e2',
      title: 'Night of Lights',
      description: 'Cultural evening with dance and music.',
      date: '2026-04-28T18:30:00Z',
      location: 'Open Air Theater',
      category: 'cultural',
    }
  ],
  messMenu: [
    {
      day: 'Monday',
      breakfast: 'Poha, Jalebi, Tea',
      lunch: 'Rajma Chawal, Roti, Salad',
      snacks: 'Samosa, Coffee',
      dinner: 'Soya Chaap, Naan, Gulab Jamun'
    },
    {
      day: 'Tuesday',
      breakfast: 'Dosa, Idli, Chutney',
      lunch: 'Chole Bhature, Lassi',
      snacks: 'Biscuits, Milk',
      dinner: 'Paneer Butter Masala, Roti, Kheer'
    },
    {
      day: 'Wednesday',
      breakfast: 'Paratha, Curd, Pickle',
      lunch: 'Veg Biryani, Raita',
      snacks: 'Pakoda, Tea',
      dinner: 'Chicken Curry/Mix Veg, Rice, Roti'
    }
  ],
  facilities: [
    {
      name: 'Central Library',
      location: 'Block A, Floor 2',
      timings: '08:00 - 22:00',
      contact: 'ext-404'
    },
    {
      name: 'Student Health Center',
      location: 'Near Hostel C',
      timings: '24/7',
      contact: 'ext-911'
    },
    {
      name: 'Gymnasium',
      location: 'Sports Complex',
      timings: '06:00 - 09:00, 16:00 - 21:00'
    }
  ]
};

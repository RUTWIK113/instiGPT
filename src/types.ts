export interface Course {
  id: string;
  code: string;
  name: string;
  professor: string;
  syllabus: string[];
  timetable: string;
  credits: number;
}

export interface Deadline {
  id: string;
  title: string;
  courseId: string;
  dueDate: string;
  type: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
}

export interface MessDay {
  day: string;
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
}

export interface Facility {
  name: string;
  location: string;
  timings: string;
  contact?: string;
}

export interface InstituteData {
  name: string;
  courses: Course[];
  deadlines: Deadline[];
  events: Event[];
  messMenu: MessDay[];
  facilities: Facility[];
}

export interface TimetableEntry {
  id: string;
  day: string;
  subject: string;
  time: string;
  location: string;
}

export interface ImportantLink {
  id: string;
  title: string;
  url: string;
  category: string;
}

export interface Review {
  id: string;
  courseCode?: string;
  placeName?: string;
  rating: number;
  comment: string;
  author: string;
  isAnonymous: boolean;
  timestamp: Date;
}

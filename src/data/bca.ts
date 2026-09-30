export type Subject = { code: string; name: string };
export type Student = { roll: string; name: string };

export const SEMESTERS = [1, 2, 3, 4, 5, 6] as const;
export type Semester = (typeof SEMESTERS)[number];

export const SUBJECTS: Record<Semester, Subject[]> = {
  1: [
    { code: "BCA101", name: "Fundamentals of Computers" },
    { code: "BCA102", name: "Programming in C" },
    { code: "BCA103", name: "Discrete Mathematics" },
    { code: "BCA104", name: "Digital Electronics" },
    { code: "BCA105", name: "Communicative English" },
  ],
  2: [
    { code: "BCA201", name: "Data Structures using C" },
    { code: "BCA202", name: "Object Oriented Programming with C++" },
    { code: "BCA203", name: "Computer Organisation" },
    { code: "BCA204", name: "Numerical Methods" },
    { code: "BCA205", name: "Financial Accounting" },
  ],
  3: [
    { code: "BCA301", name: "Database Management Systems" },
    { code: "BCA302", name: "Operating Systems" },
    { code: "BCA303", name: "Java Programming" },
    { code: "BCA304", name: "Software Engineering" },
    { code: "BCA305", name: "Statistical Techniques" },
  ],
  4: [
    { code: "BCA401", name: "Computer Networks" },
    { code: "BCA402", name: "Web Technologies" },
    { code: "BCA403", name: "Python Programming" },
    { code: "BCA404", name: "Design & Analysis of Algorithms" },
    { code: "BCA405", name: "Business Management" },
  ],
  5: [
    { code: "BCA501", name: "Advanced Java & J2EE" },
    { code: "BCA502", name: "Data Mining & Warehousing" },
    { code: "BCA503", name: "Mobile Application Development" },
    { code: "BCA504", name: "Computer Graphics" },
    { code: "BCA505", name: "Cyber Security" },
  ],
  6: [
    { code: "BCA601", name: "Cloud Computing" },
    { code: "BCA602", name: "Artificial Intelligence" },
    { code: "BCA603", name: "Software Testing" },
    { code: "BCA604", name: "E-Commerce" },
    { code: "BCA605", name: "Major Project Work" },
  ],
};

const NAMES: Record<Semester, string[]> = {
  1: [
    "Aarav Kulkarni","Sneha Patil","Rohan Desai","Ishita Joshi","Vivek Kamble",
    "Priya Shetty","Omkar Hiremath","Anjali Nayak","Siddharth Rao","Meera Gaikwad",
    "Tejas Bhandari","Pooja Mane","Arjun Salunke","Divya Kulkarni","Nikhil Jadhav",
    "Shruti Deshpande","Karan Bagewadi","Aishwarya Pawar","Manoj Teli","Nandini Kori",
  ],
  2: [
    "Prathamesh Naik","Sanika Kulkarni","Yash Chougule","Ankita Sawant","Rahul Biradar",
    "Kavya Hegde","Sagar Patil","Neha Kadam","Akash Shinde","Riya Kulkarni",
    "Vaibhav Magadum","Sonal Bhosale","Harsh Vernekar","Trupti Angadi","Sumit Lokhande",
    "Amruta Hosur","Rakesh Ghatage","Snehal Wadkar","Chetan Mudhol","Gayatri Nadgir",
  ],
  3: [
    "Abhishek Pattar","Rutuja Mali","Sameer Hubballi","Pallavi Kamat","Nitin Karajgi",
    "Bhavana Shirol","Kiran Sindagi","Ashwini Kerur","Govind Talwar","Sakshi Bhavi",
    "Mahesh Tikote","Arti Kalyani","Sachin Belgaonkar","Asmita Rajput","Vishal Koppad",
    "Madhura Kittur","Prasad Hunashyal","Namrata Chavan","Suraj Terdal","Preeti Ainapur",
  ],
  4: [
    "Ganesh Kanamadi","Shweta Betageri","Shivraj Kumbar","Apeksha Mathad","Sunil Banjara",
    "Rachana Muddebihal","Deepak Alagundi","Varsha Yaragatti","Rohit Byahatti","Sushma Bhosle",
    "Pankaj Kadapatti","Shilpa Halagi","Anand Bidari","Rekha Mulla","Nagaraj Guledgudd",
    "Jyoti Chikkodi","Basavaraj Ilkal","Supriya Tegginmani","Lokesh Savadi","Vidya Kembhavi",
  ],
  5: [
    "Santosh Nargund","Anusha Badami","Praveen Gadag","Roopa Hebballi","Manjunath Sirsi",
    "Sridevi Bagalkot","Vinayak Mundewadi","Ashlesha Gokak","Kartik Jamkhandi","Sneha Rabakavi",
    "Girish Mahalingpur","Bhagyashree Lokapur","Ravi Bilagi","Aruna Kaladagi","Shashank Guttal",
    "Pooja Athani","Umesh Kagwad","Swati Chinchali","Veeresh Yadwad","Ranjita Hukkeri",
  ],
  6: [
    "Aniket Sankeshwar","Megha Hindalgi","Shreyas Nippani","Ujwala Gokak","Mallikarjun Saundatti",
    "Prajakta Kittur","Dhanraj Hulyal","Savita Nesargi","Amit Bendigeri","Chaitra Ramdurg",
    "Vishwas Konnur","Asha Gudur","Naveen Mudalgi","Tanuja Hunshyal","Suhas Kalburgi",
    "Poornima Bailhongal","Sagar Kudachi","Rohini Manoli","Balaji Telsang","Nikita Khanapur",
  ],
};

export const STUDENTS: Record<Semester, Student[]> = Object.fromEntries(
  SEMESTERS.map((s) => [
    s,
    NAMES[s].map((name, i) => ({
      roll: `BCA${s}${String(i + 1).padStart(3, "0")}`,
      name,
    })),
  ]),
) as Record<Semester, Student[]>;

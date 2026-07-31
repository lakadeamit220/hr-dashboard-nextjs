const fs = require('fs');

const firstNames = ["Amit", "Aditya", "Ajinkya", "Akshay", "Ameya", "Amol", "Anand", "Aniket", "Ashish", "Avinash", "Chetan", "Chinmay", "Darshan", "Deepak", "Ganesh", "Gaurav", "Harshad", "Hemant", "Kedar", "Kiran", "Kunal", "Mahesh", "Makarand", "Mangesh", "Manoj", "Mayur", "Milind", "Nachiket", "Nikhil", "Nilesh", "Ninad", "Nishant", "Omkar", "Pankaj", "Parth", "Prachi", "Pradeep", "Prakash", "Pramod", "Pranav", "Prasad", "Prashant", "Pratik", "Pravin", "Rahul", "Rajesh", "Rakesh", "Ramesh", "Ranjit", "Ritesh", "Rohan", "Rohit", "Sachin", "Sagar", "Sameer", "Sandeep", "Sanjay", "Sanket", "Santosh", "Sarang", "Satish", "Saurabh", "Shantanu", "Sharad", "Shashank", "Shreyas", "Shrikant", "Shrinivas", "Shubham", "Siddharth", "Subhash", "Sudhir", "Suhas", "Sumit", "Sunil", "Suresh", "Sushant", "Swapnil", "Tejas", "Tushar", "Umesh", "Vaibhav", "Vasant", "Vedant", "Vidyadhar", "Vijay", "Vikas", "Vikram", "Vinay", "Vinayak", "Vishal", "Yash", "Yogesh", "Aarti", "Aditi", "Akshata", "Amruta", "Anagha", "Anjali", "Ankita", "Anuja", "Anuradha", "Aparna", "Apeksha", "Apurva", "Archana", "Ashwini", "Bhakti", "Bhavana", "Chaitrali", "Chetana", "Deepali", "Devika", "Dhanashree", "Diksha", "Disha", "Divya", "Gauri", "Gayatri", "Geeta", "Harshada", "Isha", "Janhavi", "Jyoti", "Kalyani", "Kavita", "Ketaki", "Kirti", "Komal", "Krutika", "Leena", "Madhuri", "Manasi", "Manisha", "Mayuri", "Megha", "Mitali", "Mohini", "Mrunal", "Mugdha", "Namrata", "Neha", "Nidhi", "Nikita", "Nilima", "Nisha", "Pallavi", "Pooja", "Poonam", "Pradnya", "Prajakta", "Pranali", "Pranjal", "Pratiksha", "Priti", "Priyanka", "Purva", "Radhika", "Rajashree", "Rakhi", "Rashmi", "Renuka", "Reshma", "Richa", "Riddhi", "Rohini", "Ruchira", "Rutuja", "Sampada", "Samruddhi", "Sangeeta", "Sanika", "Sanjana", "Sanjivani", "Sanya", "Sarika", "Savita", "Sayali", "Seema", "Shalaka", "Sharvari", "Sheetal", "Shilpa", "Shivani", "Shraddha", "Shravani", "Shreya", "Shruti", "Shubhangi", "Shweta", "Siddhi", "Smita", "Sneha", "Snehal", "Sonali", "Srushti", "Suvarna", "Swaranjali", "Swati", "Tanvi", "Tejaswini", "Urmila", "Utkarsha", "Vaishali", "Vaishnavi", "Varsha", "Vedanti", "Vidya", "Vrushali", "Yogita"];
const lastNames = ["Patil", "Deshmukh", "Kadam", "Chavan", "Pawar", "Shinde", "Gaikwad", "Jadhav", "Bhosale", "More", "Kale", "Mane", "Shirke", "Salunkhe", "Waghmare", "Thorat", "Kamble", "Mali", "Sutar", "Kumbhar", "Gurav", "Dhangar", "Lohar", "Sonar", "Chambar", "Koli", "Vanjari", "Teli", "Koshti", "Ghorpade", "Mahadik", "Dhasal", "Gavali", "Raut", "Munde", "Sawant", "Khandagale", "Shelar", "Nikam", "Magar", "Babar", "Khaire", "Jagdale", "Bhandari", "Gite", "Sable", "Bhalerao", "Khade", "Dhumal", "Kachare", "Zende", "Shelke", "Raskar", "Ghuge", "Kendre", "Sanap", "Avhad", "Darade", "Mhaske", "Pingle", "Tupe", "Zambare"];

const departments = ["Engineering", "Sales", "Human Resources", "Finance", "Marketing", "Operations", "Product", "Design"];
const designations = {
  "Engineering": ["Engineering Manager", "Tech Lead", "Senior Developer", "Developer", "Junior Developer"],
  "Sales": ["Sales Director", "Sales Manager", "Sales Executive", "Account Manager"],
  "Human Resources": ["HR Director", "HR Manager", "HR Coordinator", "Recruiter"],
  "Finance": ["Finance Director", "Financial Analyst", "Accountant"],
  "Marketing": ["Marketing Director", "Marketing Manager", "Marketing Specialist", "SEO Expert"],
  "Operations": ["Operations Director", "Operations Lead", "Operations Analyst"],
  "Product": ["Product Director", "Product Manager", "Product Owner"],
  "Design": ["Design Director", "UI/UX Designer", "Graphic Designer"]
};
const statuses = ["active", "active", "active", "active", "active", "active", "on-leave", "notice-period", "inactive"];
const ratings = ["Outstanding", "Exceeds Expectations", "Meets Expectations", "Meets Expectations", "Needs Improvement"];
const locations = ["Kothrud, Pune", "Baner, Pune", "Viman Nagar, Pune", "Hinjewadi, Pune", "Magarpatta, Pune", "Kharadi, Pune", "Wakad, Pune", "Aundh, Pune", "Shivaji Nagar, Pune", "Pimple Saudagar, Pune", "Hadapsar, Pune", "Koregaon Park, Pune", "Kalyani Nagar, Pune", "Wagholi, Pune", "Bhosari, Pune", "Balewadi, Pune", "Deccan Gymkhana, Pune", "Pashan, Pune", "Camp, Pune", "Warje, Pune", "Sinhagad Road, Pune", "Bavdhan, Pune"];

// Generate random date within past N years
function randomDate(yearsBack, yearsForward = 0) {
  const start = new Date();
  start.setFullYear(start.getFullYear() - yearsBack);
  const end = new Date();
  end.setFullYear(end.getFullYear() + yearsForward);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

const employees = [];

// CEO / Executive (Top Level)
const ceoId = "emp-001";
employees.push({
  id: ceoId,
  firstName: "Amit",
  lastName: "Lakade",
  email: "amit.lakade@company.com",
  phone: "+91-9876500000",
  department: "Executive",
  designation: "Chief Executive Officer",
  status: "active",
  joiningDate: "2015-01-10",
  dateOfBirth: "1980-05-14",
  performanceRating: "Outstanding",
  salary: 5000000,
  avatar: null,
  documents: [],
  address: "Koregaon Park, Pune",
  managerId: null
});

// Directors (Report to CEO)
const directors = [];
departments.forEach((dept, idx) => {
  const id = `emp-00${2 + idx}`;
  directors.push(id);
  const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
  employees.push({
    id,
    firstName: fname,
    lastName: lname,
    email: `${fname.toLowerCase()}.${lname.toLowerCase()}@company.com`,
    phone: `+91-98765${Math.floor(10000 + Math.random() * 90000)}`,
    department: dept,
    designation: designations[dept][0],
    status: "active",
    joiningDate: randomDate(8, -4),
    dateOfBirth: randomDate(45, -35),
    performanceRating: ratings[Math.floor(Math.random() * ratings.length)],
    salary: 2500000 + Math.floor(Math.random() * 1000000),
    avatar: null,
    documents: [],
    address: locations[Math.floor(Math.random() * locations.length)],
    managerId: ceoId
  });
});

// Managers/Leads (Report to Directors)
const managers = [];
directors.forEach((directorId, idx) => {
  const dept = departments[idx];
  const numManagers = Math.floor(Math.random() * 2) + 1; // 1 to 2 managers per dept
  for (let i = 0; i < numManagers; i++) {
    const id = `emp-0${employees.length + 1}`;
    managers.push({ id, dept });
    const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
    employees.push({
      id,
      firstName: fname,
      lastName: lname,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}@company.com`,
      phone: `+91-98765${Math.floor(10000 + Math.random() * 90000)}`,
      department: dept,
      designation: designations[dept][1] || designations[dept][0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      joiningDate: randomDate(5, -2),
      dateOfBirth: randomDate(40, -30),
      performanceRating: ratings[Math.floor(Math.random() * ratings.length)],
      salary: 1500000 + Math.floor(Math.random() * 500000),
      avatar: null,
      documents: [],
      address: locations[Math.floor(Math.random() * locations.length)],
      managerId: directorId
    });
  }
});

// Individual Contributors (Report to Managers)
const targetTotal = 65;
while (employees.length < targetTotal) {
  const manager = managers[Math.floor(Math.random() * managers.length)];
  const dept = manager.dept;
  const desigOptions = designations[dept].slice(2).length > 0 ? designations[dept].slice(2) : designations[dept];
  
  const id = `emp-0${employees.length > 9 ? employees.length + 1 : '0' + (employees.length + 1)}`;
  const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  employees.push({
    id,
    firstName: fname,
    lastName: lname,
    email: `${fname.toLowerCase()}.${lname.toLowerCase()}@company.com`,
    phone: `+91-98765${Math.floor(10000 + Math.random() * 90000)}`,
    department: dept,
    designation: desigOptions[Math.floor(Math.random() * desigOptions.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    joiningDate: randomDate(3),
    dateOfBirth: randomDate(35, -22),
    performanceRating: ratings[Math.floor(Math.random() * ratings.length)],
    salary: 500000 + Math.floor(Math.random() * 800000),
    avatar: null,
    documents: [],
    address: locations[Math.floor(Math.random() * locations.length)],
    managerId: manager.id
  });
}

// Inject upcoming birthdays/anniversaries for the demo (within the next 10 days)
const today = new Date();
for(let i = 10; i < 15; i++) {
  const upcomingDate = new Date(today);
  upcomingDate.setDate(today.getDate() + (i - 9));
  
  // Format as MM-DD
  const m = String(upcomingDate.getMonth() + 1).padStart(2, '0');
  const d = String(upcomingDate.getDate()).padStart(2, '0');
  
  // Set birthdays for a few
  if(i % 2 === 0) {
    employees[i].dateOfBirth = `1990-${m}-${d}`;
  } else {
    // Set anniversaries for a few
    employees[i].joiningDate = `2021-${m}-${d}`;
  }
}


const fileContent = `export const initialEmployees = ${JSON.stringify(employees, null, 2)};\n`;
fs.writeFileSync('src/lib/mock-data.js', fileContent);
console.log('Successfully generated mock data with 65 employees, complete with dateOfBirth and managerId.');

# Student Management System

A simple Student Management System built using ASP.NET Core MVC, Entity Framework Core, jQuery, and Bootstrap.

## 🚀 Features

- Add new student
- Update student details
- Delete student
- Server-side pagination
- Search by Name or Email
- Dynamic sorting (Name, Age, Email)
- Client-side validation
- AJAX-based CRUD operations (No page reload)
- 🤖 AI Chatbot for Student Queries

## 🤖 AI Chatbot Feature (New)
  An integrated AI-powered chatbot that allows users to ask questions about student data directly from the system.

🔹 Chatbot Capabilities
- Get total number of students
- Count students below a certain age
- Count students between age ranges
- Retrieve specific student email
- Real-time response using AJAX
- Bootstrap modal UI

🔹 How It Works

 1.User opens chatbot modal.
 2.User types a question.
 3.AJAX sends the question to
  /Student/AskChatbot
 4.Controller processes the question.
 5.Entity Framework queries the database.
 6.JSON response is returned and displayed in chat UI.

🔹 Sample Questions

- "How many students are there?"
- "How many students below 25?"
- "Students between 30 to 40"
- "What is Dyna's email?"

---

## 🛠 Technologies Used

- ASP.NET Core MVC
- Entity Framework Core
- SQL Server
- jQuery (AJAX)
- Bootstrap 5
- C#
- LINQ
- JSON

---

## 📂 Project Structure

- Models → Student.cs
- Controllers → StudentController.cs
- Views → Index.cshtml
- wwwroot/js → student.js
- 🤖 Chatbot Endpoint → AskChatbot() (POST method)

---

## 📌 Functionalities

### 1️⃣ Create Student
- Uses AJAX POST request
- Validates:
  - Name (Required)
  - Age (1-100)
  - Email (Valid format)

### 2️⃣ Update Student
- Uses AJAX PUT request
- Updates existing student record

### 3️⃣ Delete Student
- Uses AJAX DELETE request
- Confirmation before delete

### 4️⃣ Pagination
- Default page size: 5 records
- Dynamic page navigation buttons

### 5️⃣ Search
- Search by Name
- Search by Email

### 6️⃣ Sorting
- Click column header to sort
- Toggle Ascending / Descending

### 7️⃣ AI Chatbot

- Bootstrap modal interface
- AJAX-based question submission
- Backend logic using Entity Framework
- JSON response handling
- Dynamic chat UI updates

---

## ▶️ How to Run Project

1. Clone the repository
2. Open in Visual Studio
3. Update database connection string
4. Run database migration
5. Press F5 to run

---

## 📸 Screenshot

<img width="852" height="391" alt="image" src="https://github.com/user-attachments/assets/7f115d28-4dd4-4109-b206-771635798fdc" />
Validation :-
<img width="857" height="154" alt="image" src="https://github.com/user-attachments/assets/c48e2bc8-29ef-4401-a1fb-de65ebf8ea84" />
Search :-
<img width="882" height="256" alt="image" src="https://github.com/user-attachments/assets/7c9cdea2-1a12-4183-a92c-b99d0b919f66" />
Chatbot :-
<img width="605" height="419" alt="image" src="https://github.com/user-attachments/assets/14add6cf-d6c1-4994-83a2-3be85bc26af4" />
AI Mode :-
<img width="859" height="433" alt="image" src="https://github.com/user-attachments/assets/c3b636a0-0b9f-497c-a621-ba128a28d320" />

---

## 👨‍💻 Author

Rushikesh Ranmale

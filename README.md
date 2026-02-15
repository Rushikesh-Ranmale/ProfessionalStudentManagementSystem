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

---

## 🛠 Technologies Used

- ASP.NET Core MVC
- Entity Framework Core
- SQL Server
- jQuery (AJAX)
- Bootstrap 5

---

## 📂 Project Structure

- Models → Student.cs
- Controllers → StudentController.cs
- Views → Index.cshtml
- wwwroot/js → student.js

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

---

## ▶️ How to Run Project

1. Clone the repository
2. Open in Visual Studio
3. Update database connection string
4. Run database migration
5. Press F5 to run

---

## 📸 Screenshot

<img width="908" height="422" alt="image" src="https://github.com/user-attachments/assets/4e3d4935-10eb-4b23-8eba-5bd77ee4a836" />
Validation :-
<img width="857" height="154" alt="image" src="https://github.com/user-attachments/assets/c48e2bc8-29ef-4401-a1fb-de65ebf8ea84" />
<img width="863" height="161" alt="image" src="https://github.com/user-attachments/assets/c6eb9b18-0785-4919-ad4f-ad227b9e61c9" />
Search :-
<img width="882" height="256" alt="image" src="https://github.com/user-attachments/assets/7c9cdea2-1a12-4183-a92c-b99d0b919f66" />

---

## 👨‍💻 Author

Rushikesh Ranmale

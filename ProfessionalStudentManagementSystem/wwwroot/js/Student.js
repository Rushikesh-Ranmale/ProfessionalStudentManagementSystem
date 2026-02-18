var currentPage = 1;
var pageSize = 5;
var currentSort = "Name";
var currentDirection = "asc";

$(document).ready(function () {
    loadStudents();
});

function loadStudents() {

    var search = $("#search").val();

    $("#studentTable").html(`
        <tr>
            <td colspan="4" class="text-center">
                <div class="small-dot-loader"></div>
            </td>
        </tr>
    `);
     
    $.get('/Student/GetStudents', {
        page: currentPage,
        pageSize: pageSize,
        search: search,
        sortColumn: currentSort,
        sortDirection: currentDirection
    }, function (response) {
     
        renderTable(response.data);
        renderPagination(response.total);

    });
}

function renderTable(data) {

    var rows = '';

    $.each(data, function (i, s) {
        rows += `<tr>
                    <td>${s.name}</td>
                    <td>${s.age}</td>
                    <td>${s.email}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="edit(${s.id}, '${s.name}', ${s.age}, '${s.email}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${s.id})">Delete</button>
                    </td>
                </tr>`;
    });

    $("#studentTable").html(rows);
}


function clearForm() {
    $("#Name").val("");
    $("#Age").val("");
    $("#Email").val("");
}

function saveStudent() {

    var id = $("#StudentId").val();

    if ($('#Name').val() == '') {
        $("#nameError").text("Please Enter Name.");
        $("#Name").addClass("is-invalid");
        return false;
    }
    else {
        $("#nameError").text("");
        $("#Name").removeClass("is-invalid");
    }
    if ($('#Age').val() == '') {
        $("#ageError").text("Please Enter Age.");
        $("#Age").addClass("is-invalid");
        return false;
    }
    else {
        $("#ageError").text("");
        var age = parseInt($('#Age').val());

        if (isNaN(age) || age < 1 || age > 100) {
            $("#ageError").text("Age must be between 1 and 100.");
            $("#Age").addClass("is-invalid");
            return false;
        } else {
            $("#ageError").text("");
            $("#Age").removeClass("is-invalid");
        }
        
    }

    if ($('#Email').val() == '') {
        $("#emailError").text("Please Enter Email.");
        $("#Email").addClass("is-invalid");
        return false;
    }
    else {
        var email = $('#Email').val();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            $("#emailError").text("Please enter a valid email address.");
            $("#Email").addClass("is-invalid");
            return false;
        } else {
            $("#emailError").text("");
            $("#Email").removeClass("is-invalid");
        }
    }
    var student = {
        Id: id ? parseInt(id) : 0,
        Name: $("#Name").val(),
        Age: parseInt($("#Age").val()),
        Email: $("#Email").val()
    };

    if (id) {
        updateStudent(student);
        clearForm();
    } else {
        createStudent(student);
        clearForm();
    }
}
function createStudent(student) {

    $.ajax({
        url: '/Student/Create',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(student),
        success: function () {
            clearForm();
            loadStudents();
        }
    });
}
function updateStudent(student) {

    $.ajax({
        url: '/Student/Update',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(student),
        success: function () {
            clearForm();
            loadStudents();
        }
    });
}
function deleteStudent(id) {

    if (!confirm("Are you sure?")) return;

    $.ajax({
        url: '/Student/Delete?id=' + id,
        type: 'DELETE',
        success: function () {
            loadStudents();
        }
    });
}
function edit(id, name, age, email) {
    $("#StudentId").val(id);
    $("#Name").val(name);
    $("#Age").val(age);
    $("#Email").val(email);
}
function sort(column) {

    if (currentSort === column) {
        currentDirection = currentDirection === "asc" ? "desc" : "asc";
    } else {
        currentSort = column;
        currentDirection = "asc";
    }

    loadStudents();
}
function renderPagination(totalRecords) {

    var totalPages = Math.ceil(totalRecords / pageSize);
    var buttons = '';

    for (var i = 1; i <= totalPages; i++) {
        buttons += `<button class="btn btn-sm btn-secondary m-1" onclick="goToPage(${i})">${i}</button>`;
    }

    $("#pagination").html(buttons);
}

function goToPage(page) {
    currentPage = page;
    loadStudents();
}

$("#Name").on("input", function () {
    var value = $(this).val();
    $(this).val(value.replace(/[^a-zA-Z '-]/g, ''));
});

$("#aiInput").on("keypress", function (e) {

    if (e.which === 13) {   // Enter key
        e.preventDefault();
        processAIInput();
    }
});

function processAIInput() {

    var input = $("#aiInput").val().trim();

    if (input === "") return;

    var name = "";
    var age = null;
    var email = "";

    // 1️⃣ Extract Email (always easiest to detect first)
    var emailMatch = input.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
    if (emailMatch) {
        email = emailMatch[0];
        input = input.replace(email, "").trim();
    }

    // 2️⃣ Extract Age (number between 1-100)
    var ageMatch = input.match(/\b([1-9][0-9]?|100)\b/);
    if (ageMatch) {
        age = parseInt(ageMatch[0]);
        input = input.replace(ageMatch[0], "").trim();
    }

    // 3️⃣ Remove common words (for natural sentence support)
    input = input
        .replace(/add/i, "")
        .replace(/age/i, "")
        .replace(/email/i, "")
        .replace(/student/i, "")
        .replace(/name/i, "")
        .replace(/,/g, "")
        .trim();

    name = input;

    // Validation
    if (!name || !age || !email) {
        Swal.fire("Error", "Could not understand input format", "error");
        return;
    }

    var student = {
        Id: 0,
        Name: name,
        Age: age,
        Email: email
    };

    createStudent(student);

    Swal.fire("Success", "Student added successfully!", "success");

    $("#aiInput").val("");
}
function openAIMode() {
    window.location.href = '/Student/AIMode';
}
function openChatbot() {
    $("#chatbotModal").modal("show");
}

$("#chatInput").on("keypress", function (e) {
    if (e.which === 13) {
        sendMessage();
    }
});

function sendMessage() {

    var message = $("#chatInput").val();
    if (!message) return;

    $("#chatBody").append(`<div class='text-end mb-2'>
        <span class='badge bg-primary p-2'>${message}</span>
    </div>`);

    $("#chatInput").val("");

    $.post('/Student/AskChatbot', { question: message }, function (response) {

        $("#chatBody").append(`<div class='text-start mb-2'>
            <span class='badge bg-secondary p-2'>${response.answer}</span>
        </div>`);

        $("#chatBody").scrollTop($("#chatBody")[0].scrollHeight);
    });
}

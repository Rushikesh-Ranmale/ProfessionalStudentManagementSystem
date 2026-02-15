var currentPage = 1;
var pageSize = 5;
var currentSort = "Name";
var currentDirection = "asc";

$(document).ready(function () {
    loadStudents();
});

function loadStudents() {

    var search = $("#search").val();

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
        return false;
    }
    else {
        $("#nameError").text("");
    }
    if ($('#Age').val() == '') {
        $("#ageError").text("Please Enter Age.");
        return false;
    }
    else {
        $("#ageError").text("");
        var age = parseInt($('#Age').val());

        if (isNaN(age) || age < 1 || age > 100) {
            $("#ageError").text("Age must be between 1 and 100.");
            return false;
        } else {
            $("#ageError").text("");
        }
        
    }

    if ($('#Email').val() == '') {
        $("#emailError").text("Please Enter Email.");
        return false;
    }
    else {
        $("#emailError").text("");
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

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProfessionalStudentManagementSystem.Data;
using ProfessionalStudentManagementSystem.Models;

namespace ProfessionalStudentManagementSystem.Controllers
{
    public class StudentController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StudentController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult AIMode()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Student student)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();

            return Ok(student);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Student student)
        {
            var existing = await _context.Students.FindAsync(student.Id);
            if (existing == null)
                return NotFound();

            existing.Name = student.Name;
            existing.Age = student.Age;
            existing.Email = student.Email;

            await _context.SaveChangesAsync();

            return Ok(existing);
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return NotFound();

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> GetStudents(
            int page = 1,
            int pageSize = 5,
            string search = "",
            string sortColumn = "Name",
            string sortDirection = "asc")
        {
            var query = _context.Students.AsQueryable();

            // Search
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s =>
                    s.Name.Contains(search) ||
                    s.Email.Contains(search));
            }

            // Sorting
            if (sortDirection == "asc")
                query = query.OrderBy(e => EF.Property<object>(e, sortColumn));
            else
                query = query.OrderByDescending(e => EF.Property<object>(e, sortColumn));

            var totalRecords = await query.CountAsync();

            var students = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Json(new
            {
                data = students,
                total = totalRecords
            });
        }

        [HttpPost]
        public async Task<IActionResult> AskChatbot(string question)
        {
            question = question.ToLower();

            if (question.Contains("how many student"))
            {
                var count = await _context.Students.CountAsync();
                return Json(new { answer = $"Total students are {count}" });
            }

            if (question.Contains("below 25"))
            {
                var count = await _context.Students
                    .CountAsync(s => s.Age <= 25);

                return Json(new { answer = $"Students below 25 age: {count}" });
            }

            if (question.Contains("between 30 to 40") || question.Contains("30 to 40"))
            {
                var count = await _context.Students
                    .CountAsync(s => s.Age >= 30 && s.Age <= 40);

                return Json(new { answer = $"Students age between 30 to 40: {count}" });
            }

            if (question.Contains("dyna") || question.Contains("Robert"))
            {
                var student = await _context.Students
                    .FirstOrDefaultAsync(s => s.Name.ToLower() == "dyna");

                if (student != null)
                    return Json(new { answer = $"Dyna's email is {student.Email}" });
                else
                    return Json(new { answer = "Student Dyna not found" });
            }

            return Json(new { answer = "Sorry, I didn't understand your question." });
        }



    }
}

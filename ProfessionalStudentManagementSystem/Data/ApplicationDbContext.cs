using Microsoft.EntityFrameworkCore;
using ProfessionalStudentManagementSystem.Models;

namespace ProfessionalStudentManagementSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
    }
}

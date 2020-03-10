using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
namespace PermitToWorkEpf.Models{
    public class MachineContext : DbContext{
        public DbSet<Machine> Machines{get;set;}
        public DbSet<Student> Students{get;set;}
        public DbSet<SignIn> SignIns{get;set;}
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder){
            dbContextOptionsBuilder.UseSqlite("Data Source=repf.db");
        }
    }
}
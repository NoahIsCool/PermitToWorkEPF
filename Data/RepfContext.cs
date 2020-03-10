using PermitToWorkRepf.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PermitToWorkRepf.Data
{
public class RepfDbContext : DbContext
{
	public DbSet<Machine> Machines {get;set;}
	public DbSet<SignIn> SignIns {get;set;}
	public DbSet<PermitToWorkRepf.Models.Student> Students {get;set;}

	protected override void OnConfiguring(DbContextOptionsBuilder options)
		            => options.UseSqlite("Data Source=app.db");
}
}

using System;
using System.ComponentModel.DataAnnotations;

namespace PermitToWorkRepf.Models
{
public class Student
{
	[Key]
	public ulong StudentId{get;set;}
	public string Name{get;set;}
	public string Team{get;set;}
	public DateTime Graduation{get;set;}
}
}

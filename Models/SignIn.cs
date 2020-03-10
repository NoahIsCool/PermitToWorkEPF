using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PermitToWorkRepf.Models
{
public class SignIn
{
	[Key]
	public int StudentId{get;set;}
	public List<Student> Students{get;set;}
	public DateTime time{get;set;}
}
}

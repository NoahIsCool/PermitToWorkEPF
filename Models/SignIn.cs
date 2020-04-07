using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PermitToWorkRepf.Models
{
public class SignIn
{
	[Key]
	[DatabaseGenerat‌ed(DatabaseGeneratedOp‌​tion.Identity)]
 	public int Key { get; set; }
	public Student Student{get;set;}
	public Machine Machine{get;set;}
	public DateTime StartTime{get;set;}
	public DateTime EndTime{get;set;}
}
}

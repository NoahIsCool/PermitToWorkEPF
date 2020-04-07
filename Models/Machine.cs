using System;
using System.ComponentModel.DataAnnotations;

namespace PermitToWorkRepf.Models
{
public class Machine
{
	[Key]
    public string Name{get;set;}
    public string Notes{get;set;}
}
}

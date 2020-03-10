using System;
using System.ComponentModel.DataAnnotations;

namespace PermitToWorkRepf.Models
{
public class Machine
{
	[Key]
    public string name{get;set;}
    public string notes{get;set;}
}
}

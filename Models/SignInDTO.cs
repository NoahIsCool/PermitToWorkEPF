using System;
using System.ComponentModel.DataAnnotations;
namespace PermitToWorkRepf.Models{
    //data transfer object hides the automatic key 
    //to keep the db consistent
    //and allows keys to optionally be specified 
    //instead of objects for the Student and Machine
    public class SignInDTO{
        public ulong? StudentId{get;set;}
        public string MachineName{get;set;}
        public Student Student{get;set;}
        public Machine Machine{get;set;}
	    public DateTime StartTime{get;set;}
	    public DateTime EndTime{get;set;}
    }
}
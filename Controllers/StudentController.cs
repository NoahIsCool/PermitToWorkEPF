using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace tmp.Controllers
{
	[Authorize]
	[ApiController]
	[Route("[controller]")]
	public class WeatherForecastController : ControllerBase
	{
		private readonly ILogger<WeatherForecastController> _logger;
		//private readonly IEnumerable<Student> _students;

		public WeatherForecastController(ILogger<WeatherForecastController> logger
				/*, IEnumerable<Student> students*/)
		{
			_logger = logger;
			//_students = students
		}

		/*
		[HttpGet]
		//For all students
			public IEnumerable<Student> GetAllStudents()
			{ 
				return _students;
			}
		[HttpGet("{id}")]
		//for a particular student
			public Student GetStudentById(string id)
			{
				var s = _students.Where(x=>x.id==id).Single();
				if(s==null){
					return NotFound();
				}
				return s;
			}
		[HttpPost]
		public ActionResult<Student> CreateStudent(Student s){
			_students.Add(s);
			return CreatedAtAction( nameof(GetStudentById), new {id = s.id}, s);
		}

		[HttpPut("{id}")]
		//replace a student with the given id
		public IActionResult>(string id, Student s){
			if(id!=s.id){
				return BadRequest();
			}
			var oldS = _students.Where(x=>x.id==id).SingleOrDefault();
			if(oldS == null){
				return NotFound();
			}
			oldS.updateFrom(s);//placeholder
			return NoContent();
		} 

		[HttpDelete("{id}")]
		public IActionResult DeleteStudent(string id){
				var s = _students.Where(x=>x.id==id).Single();
				if(s==null){
					return NotFound();
				}
				_students = _students.Where(x=>!x.isEqualTo(s/*placeholder method*//*));
				return s;
		}
		*/

	}
}

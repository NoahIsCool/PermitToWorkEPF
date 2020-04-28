using System;
using System.Text;
using System.Text.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PermitToWorkRepf.Data;
using System.IO;
using PermitToWorkRepf.Models;

namespace PermitToWorkRepf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController:ControllerBase{
        private readonly RepfDbContext _context;
        public FileController(RepfDbContext context){
            _context=context;
        }
        [Route("Calendar")]
        [HttpPost]
        public async Task<IActionResult> PutCalendar(IFormFile file){
            //file is a csv
            var reader = new StreamReader(file.OpenReadStream());
            await reader.ReadLineAsync();//discard column names
            string v = "";
            while((v = await reader.ReadLineAsync()) != null){
                v=v.Trim('"');
                var split = v.Split("\",\"");//get signInDTO from each line
                string signInJSON = string.Format(
                    "{{\"StartTime\":{0},\"EndTime\":{1},"
                        +"\"StudentId\":{2},\"MachineName\":{4}}}",
                    $"\"{split[0]}\"",
                    $"\"{split[1]}\"",
                    $"\"{split[3]}\"",
                    $"\"{split[2]}\"");
                SignInDTO signInDto
                    = JsonSerializer.Deserialize<SignInDTO>(signInJSON);
                //make SignIn from SignInDTO
                var machine = await
                  _context.Machines.FindAsync(signInDto.Machine.Name);
                var student = await
                  _context.Students.FindAsync(signInDto.StudentId.Value);
                if(machine==null||student==null){
                    return NotFound();
                }
                SignIn signIn = new SignIn();
                signIn.Student=student;
                signIn.Machine=machine;
                signIn.StartTime=signInDto.StartTime;
                signIn.EndTime=signInDto.EndTime;
                //add current record to db
                _context.SignIns.Add(signIn);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
        [Route("Calendar")]
        [HttpGet]
        public FileResult GetCalendar(){
            var content = _context.SignIns
            .Include(s=>s.Student)
            .Include(s=>s.Machine)
            .ToList();
            StringBuilder result = new StringBuilder(
                "\"In\",\"Out\",\"Machine Name\""
                +",\"Student ID\",\"Student Name\"\n");
            foreach(var v in content){
                result.Append($"\"{v.StartTime}\",");
                result.Append($"\"{v.EndTime}\",");
                result.Append($"\"{v.Machine.Name}\",");
                result.Append($"\"{v.Student.StudentId}\",");
                result.AppendLine($"\"{v.Student.Name}\"");
            }
            return File(Encoding.UTF8.GetBytes(result.ToString()),
                "text/csv","Calendar.csv");
        }
                [Route("Users")]
        [HttpGet]
        public FileResult GetUsers(){
            var content = _context.Students.ToList();
            StringBuilder result = new StringBuilder(
                "\"ID\",\"Name\",\"Team\",\"Graduation\"\n");
            foreach(var v in content){
                result.Append($"\"{v.StudentId}\",");
                result.Append($"\"{v.Name}\",");
                result.Append($"\"{v.Team}\",");
                result.AppendLine($"\"{v.Graduation}\",");
            }
            return File(Encoding.UTF8.GetBytes(result.ToString()),
                "text/csv","Students.csv");
        }
        
        [Route("Users")]
        [HttpPost]
        public async Task<IActionResult> PutUsers(IFormFile file){
                        //file is a csv
            var reader = new StreamReader(file.OpenReadStream());
            await reader.ReadLineAsync();//discard column names
            string v = "";
            while((v = await reader.ReadLineAsync()) != null){
                v=v.Trim('"');
                var split = v.Split("\",\"");//get user from each line
                string userJSON = string.Format(
                    "{{\"StudentId\":{0},\"Name\":{1},"
                        +"\"Team\":{2},\"Graduation\":{4}}}",
                    $"\"{split[0]}\"",
                    $"\"{split[1]}\"",
                    $"\"{split[2]}\"",
                    $"\"{split[3]}\"");
                Student student
                    = JsonSerializer.Deserialize<Student>(userJSON);
                //add current record to db
                _context.Students.Add(student);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
    }
}
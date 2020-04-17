using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PermitToWorkRepf.Data;
using PermitToWorkRepf.Models;

namespace PermitToWorkRepf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignInController : ControllerBase
    {
        private readonly RepfDbContext _context;

        public SignInController(RepfDbContext context)
        {
            _context = context;
        }

        // GET: api/SignIn
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SignIn>>> GetSignIns()
        {
            return await _context.SignIns.ToListAsync();
        }

        // GET: api/SignIn/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SignIn>> GetSignIn(int id)
        {
            var signIn = await _context.SignIns.FindAsync(id);

            if (signIn == null)
            {
                return NotFound();
            }

            return signIn;
        }

        // PUT: api/SignIn/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSignIn(int id, SignIn signIn)
        {
            
            _context.Entry(signIn).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SignInExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // POST: api/SignIn
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<SignIn>> PostSignIn(SignInDTO signInDTO)
        {
            Student student = null;
            Machine machine = null;
            SignIn signIn = new SignIn();

            //validate student id
            if(signInDTO.StudentId.HasValue){
                student = await
                  _context.Students.FindAsync(signInDTO.StudentId.Value);
            }else if(signInDTO.Student == null){
                return NotFound();
            }else if(!StudentExists(signInDTO.Student.StudentId)){
                return NotFound();
            }

            //validate machine name
            if(!String.IsNullOrEmpty(signInDTO.MachineName)){
                machine = await
                    _context.Machines.FindAsync(signInDTO.MachineName);
            }else if(signInDTO.Machine == null){
                return NotFound();
            }else if(!MachineExists(signInDTO.Machine.Name)){
                return NotFound();
            }


            student??=signInDTO.Student;
            machine??=signInDTO.Machine;
            if (student == null||machine == null)
            {
                return NotFound();
            }
            
            //validate start and end times or use defaults if not provided
            if(signInDTO.StartTime==null){
                signIn.StartTime=DateTime.Now;
            }else{
                signIn.StartTime=signInDTO.StartTime;
            }
            if(signInDTO.EndTime==null){
                signIn.EndTime=signIn.StartTime.AddHours(1);
            }else if(!signInDTO.EndTime.Date.Equals(signIn.StartTime.Date)){
                return BadRequest();
            }else{
                signIn.EndTime=signInDTO.EndTime;
            }

            signIn.Machine=machine;
            signIn.Student=student;
            _context.SignIns.Add(signIn);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetSignIn", signIn);
        }

        // DELETE: api/SignIn/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SignIn>> DeleteSignIn(int id)
        {
            var signIn = await _context.SignIns.FindAsync(id);
            if (signIn == null)
            {
                return NotFound();
            }

            _context.SignIns.Remove(signIn);
            await _context.SaveChangesAsync();

            return signIn;
        }

        //method for parameter validation
        private bool StudentExists(ulong id)
        {
            return _context.Students.Any(e => e.StudentId == id);
        }
        //method for parameter validation
        private bool SignInExists(int id)
        {
            return _context.SignIns.Any(e => e.Key == id);
        }
        //method for parameter validation
        private bool MachineExists(string MachineName){
            return _context.Machines.Any(e => e.Name == MachineName);
        }
    }
}

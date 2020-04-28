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
    public class FileController:ControllerBase{
        private readonly RepfDbContext _context;
        public FileController(RepfDbContext context){
            _context=context;
        }
        [Route("Calendar")]
        [HttpPost]
        public async Task<IActionResult> PutCalendar(IFormFile file){
            return NoContent();
        }
        [Route("Users")]
        [HttpPost]
        public async Task<IActionResult> PutUsers(IFormFile file){
            return NoContent();
        }
    }
}
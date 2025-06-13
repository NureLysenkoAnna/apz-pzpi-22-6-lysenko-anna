using Microsoft.AspNetCore.Mvc;
using GasDec.Services;
using Microsoft.AspNetCore.Authorization;
using Swashbuckle.AspNetCore.Annotations;

namespace GasDec.Backup
{
    [ApiController]
    [Route("api/[controller]")]
    public class BackupController : ControllerBase
    {
        private readonly BackupService _backupService;

        public BackupController(BackupService backupService)
        {
            _backupService = backupService;
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(Summary = "Резервне копіювання бази даних.")]
        public IActionResult CreateBackup()
        {
            try
            {
                var result = _backupService.BackupDatabase();
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}

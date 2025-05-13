using GasDec.Models;
using Microsoft.EntityFrameworkCore;

namespace GasDec.BusinessLogic
{
    public class SensorCheckAlert
    {
        private readonly GasLeakDbContext _context;
        private readonly EmailService _emailService;

        public SensorCheckAlert(GasLeakDbContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task HandleSensorCheckResultAsync(SensorCheck sensorCheck)
        {
            if (sensorCheck.result.ToLower() != "failed") return;

            var managerEmail = await _context.Users
                .Where(u => u.role == "Manager")
                .Select(u => u.email)
                .FirstOrDefaultAsync();

            var sensor = await _context.Sensors
                           .Include(s => s.Location)
                           .FirstOrDefaultAsync(s => s.sensor_id == sensorCheck.sensor_id);

            if (sensor == null || sensor.Location == null) return;

            var locationName = sensor.Location.name ?? "невідомо";
            var locationFloor = sensor.Location.floor.ToString() ?? "невідомо";

            var subject = "Сенсор не пройшов технічну перевірку";
            var body = $"Сенсор з ID {sensorCheck.sensor_id} не пройшов технічну перевірку та потребує оновлення.\n" +
                       $"Розташування сенсора:\n" +
                       $"- Локація: {locationName}\n" +
                       $"- Поверх: {locationFloor}";

            await _emailService.SendEmailAsync(managerEmail, subject, body);
        }
    }
}

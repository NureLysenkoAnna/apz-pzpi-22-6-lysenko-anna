using GasDec.BusinessLogic;
using GasDec.Models;
using Microsoft.EntityFrameworkCore;

namespace GasDec.Services
{
    public class SensorAlertService
    {
        private readonly GasLeakDbContext _context;
        private readonly EmailService _emailService;
        private readonly UserService _userService;
        private readonly SensorEventEvaluator _evaluator;
        private readonly NotificationComposer _composer;

        public SensorAlertService(GasLeakDbContext context, EmailService emailService, UserService userService)
        {
            _context = context;
            _emailService = emailService;
            _userService = userService;
            _evaluator = new SensorEventEvaluator();
            _composer = new NotificationComposer();
        }

        public async Task MonitorSensorDataAsync(SensorData sensorData)
        {
            double dangerLevel = _evaluator.CalculateDangerLevel(sensorData.gas_level, sensorData.temperature, sensorData.pressure);

            if (_evaluator.IsDangerous(dangerLevel, out string severity))
            {
                var newEvent = new Event
                {
                    data_id = sensorData.data_id,
                    event_time = DateTime.Now,
                    severity = SeverityLevel.High
                };

                _context.Events.Add(newEvent);
                await _context.SaveChangesAsync();

                await NotifyRelevantUsersAsync(newEvent, severity);
            }
        }

        private async Task NotifyRelevantUsersAsync(Event newEvent, string eventSeverity)
        {
            var sensorData = await _context.SensorData
                .Include(sd => sd.Sensor)
                    .ThenInclude(s => s.Location)
                .FirstOrDefaultAsync(sd => sd.data_id == newEvent.data_id);

            if (sensorData == null) return;

            var locationId = sensorData.Sensor?.location_id ?? 0;

            var adminEmails = await _userService.GetAllAdminEmailsAsync();
            var managerEmails = await _userService.GetAllManagerEmailsAsync();
            var residentEmails = await _userService.GetEmailsByLocationIdAsync(locationId);

            var allRecipients = adminEmails.Concat(managerEmails).Concat(residentEmails).Distinct().ToList();

            if (allRecipients.Count == 0) return;

            var message = _composer.ComposeAlertMessage(sensorData, newEvent, eventSeverity);

            foreach (var email in allRecipients)
            {
                await _emailService.SendEmailAsync(email, "Увага! Зафіксовано аномальну подію!", message);
            }
        }
    }
}

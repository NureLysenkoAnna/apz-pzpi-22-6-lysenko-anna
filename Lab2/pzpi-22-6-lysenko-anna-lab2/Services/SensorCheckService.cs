using GasDec.BusinessLogic;
using GasDec.Models;
using Microsoft.EntityFrameworkCore;
using NETCore.MailKit.Core;

namespace GasDec.Services
{
    public class SensorCheckService
    {
        private readonly GasLeakDbContext _context;
        private readonly SensorCheckAlert _alertService;

        public SensorCheckService(GasLeakDbContext context, SensorCheckAlert alertService)
        {
            _context = context;
            _alertService = alertService;
            _alertService = alertService;
        }

        public async Task<List<SensorCheck>> GetAllSensorChecksAsync()
        {
            return await _context.SensorChecks
                                 .Include(sc => sc.Sensor)
                                 .ToListAsync();
        }

        public async Task<SensorCheck> GetSensorCheckByIdAsync(int checkId)
        {
            return await _context.SensorChecks.Include(sc => sc.Sensor)
                                 .FirstOrDefaultAsync(sc => sc.check_id == checkId);
        }

        public async Task<SensorCheck> CreateSensorCheckAsync(SensorCheck sensorCheck)
        {
            _context.SensorChecks.Add(sensorCheck);
            await _context.SaveChangesAsync();

            if (sensorCheck.result.ToLower() == "failed")
            {
                await _alertService.HandleSensorCheckResultAsync(sensorCheck);
            }

            return sensorCheck;
        }

        public async Task<SensorCheck> UpdateSensorCheckAsync(int checkId, SensorCheck updatedSensorCheck)
        {
            var existingCheck = await _context.SensorChecks.FindAsync(checkId);
            if (existingCheck == null)
            {
                throw new System.Exception("Запис перевірки не знайдено");
            }

            existingCheck.check_date = updatedSensorCheck.check_date;
            existingCheck.result = updatedSensorCheck.result;
            existingCheck.sensor_id = updatedSensorCheck.sensor_id;

            await _context.SaveChangesAsync();
            return existingCheck;
        }

        public async Task DeleteSensorCheckAsync(int checkId)
        {
            var sensorCheck = await _context.SensorChecks.FindAsync(checkId);
            if (sensorCheck == null)
            {
                throw new System.Exception("Запис перевірки не знайдено");
            }

            _context.SensorChecks.Remove(sensorCheck);
            await _context.SaveChangesAsync();
        }

        public async Task<List<SensorCheck>> GetSensorChecksByDateAsync(DateTime date)
        {
            return await _context.SensorChecks
                                 .Where(sc => sc.check_date == date)
                                 .Include(sc => sc.Sensor)
                                 .ToListAsync();
        }

        public async Task<List<SensorCheck>> GetSensorChecksByResultAsync(string result)
        {
            string normalizedResult = result.ToLower();

            return await _context.SensorChecks
                                 .Where(sc => sc.result.ToLower() == normalizedResult)
                                 .Include(sc => sc.Sensor)
                                 .ToListAsync();
        }

        public async Task<List<SensorCheck>> GetSensorChecksBySensorIdAsync(int sensorId)
        {
            return await _context.SensorChecks
                                 .Where(sc => sc.sensor_id == sensorId)
                                 .Include(sc => sc.Sensor)
                                 .ToListAsync();
        }
    }
}


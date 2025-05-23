﻿using GasDec.BusinessLogic;
using GasDec.Models;
using Microsoft.EntityFrameworkCore;

namespace GasDec.Services
{
    public class SensorService
    {
        private readonly GasLeakDbContext _context;
        private readonly SensorHealthEvaluator _healthEvaluator;


        public SensorService(GasLeakDbContext context, SensorHealthEvaluator healthEvaluator)
        {
            _context = context;
            _healthEvaluator = healthEvaluator;
        }

        public async Task<List<Sensor>> GetAllSensorsAsync()
        {
            return await _context.Sensors
                                 .Include(s => s.Location)
                                 .ToListAsync();
        }

        public async Task<Sensor> GetSensorByIdAsync(int sensorId)
        {
            return await _context.Sensors
                                 .Include(s => s.Location)
                                 .FirstOrDefaultAsync(s => s.sensor_id == sensorId);
        }

        public async Task<Sensor> CreateSensorAsync(Sensor sensor)
        {
            _context.Sensors.Add(sensor);
            await _context.SaveChangesAsync();
            return sensor;
        }

        public async Task<Sensor> UpdateSensorAsync(int sensorId, Sensor updatedSensor)
        {
            var existingSensor = await _context.Sensors.FindAsync(sensorId);
            if (existingSensor == null)
            {
                throw new System.Exception("Сенсор не знайдено");
            }

            existingSensor.type = updatedSensor.type;
            existingSensor.status = updatedSensor.status;
            existingSensor.installation_date = updatedSensor.installation_date;
            existingSensor.location_id = updatedSensor.location_id;

            await _context.SaveChangesAsync();
            return existingSensor;
        }

        public async Task DeleteSensorAsync(int sensorId)
        {
            var sensor = await _context.Sensors.FindAsync(sensorId);
            if (sensor == null)
            {
                throw new System.Exception("Сенсор не знайдено");
            }

            _context.Sensors.Remove(sensor);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Sensor>> GetSensorsByStatusAsync(string status)
        {
            string normalizedStatus = status.ToLower();
            return await _context.Sensors
                                 .Where(s => s.status.ToLower() == normalizedStatus)
                                 .Include(s => s.Location)
                                 .ToListAsync();
        }

        public async Task<List<int>> GetSensorIdsByStatusAsync(string status)
        {
            string normalizedStatus = status.ToLower();
            return await _context.Sensors
                                 .Where(s => s.status.ToLower() == normalizedStatus)
                                 .Select(s => s.sensor_id) // Отримуємо лише sensor_id
                                 .ToListAsync();
        }

        public async Task<List<Sensor>> GetSensorsByLocationAsync(int locationId)
        {
            return await _context.Sensors
                                 .Where(s => s.location_id == locationId)
                                 .Include(s => s.Location)
                                 .ToListAsync();
        }

        public async Task<string> CalculateSensorLifespanAndCheck(int sensorId, int recommendedLifetime)
        {
            var sensor = await _context.Sensors.FirstOrDefaultAsync(s => s.sensor_id == sensorId);
            if (sensor == null)
                return "Сенсор не знайдено.";

            var checkDates = await _context.SensorChecks
                .Where(sc => sc.sensor_id == sensorId)
                .OrderByDescending(sc => sc.check_date)
                .Select(sc => sc.check_date)
                .ToListAsync();

            return _healthEvaluator.EvaluateSensorStatus(sensor.installation_date, checkDates, recommendedLifetime);
        }
    }
}


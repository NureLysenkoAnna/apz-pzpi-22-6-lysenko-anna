﻿using GasDec.BusinessLogic;
using GasDec.Models;
using Microsoft.EntityFrameworkCore;
using NETCore.MailKit.Core;

namespace GasDec.Services
{
    public class SensorDataService
    {
        private readonly GasLeakDbContext _context;
        private readonly SensorAlertService _alertService;

        public SensorDataService(GasLeakDbContext context, SensorAlertService alertService)
        {
            _context = context;
            _alertService = alertService;
        }

        public async Task<List<SensorData>> GetAllSensorDataAsync()
        {
            return await _context.SensorData
                                 .Include(sd => sd.Sensor)
                                 .ToListAsync();
        }

        public async Task<SensorData> GetSensorDataByIdAsync(int dataId)
        {
            return await _context.SensorData
                                 .Include(sd => sd.Sensor)
                                 .FirstOrDefaultAsync(sd => sd.data_id == dataId);
        }

        public async Task<SensorData> CreateSensorDataAsync(SensorData sensorData)
        {
            _context.SensorData.Add(sensorData);
            await _context.SaveChangesAsync();

            await _alertService.MonitorSensorDataAsync(sensorData);

            return sensorData;
        }

        public async Task<SensorData> UpdateSensorDataAsync(int dataId, SensorData updatedSensorData)
        {
            var existingData = await _context.SensorData.FindAsync(dataId);
            if (existingData == null)
            {
                throw new Exception("Дані не знайдено");
            }

            existingData.gas_level = updatedSensorData.gas_level;
            existingData.temperature = updatedSensorData.temperature;
            existingData.pressure = updatedSensorData.pressure;
            existingData.time_stamp = updatedSensorData.time_stamp;
            existingData.sensor_id = updatedSensorData.sensor_id;

            await _context.SaveChangesAsync();
            return existingData;
        }

        public async Task DeleteSensorDataAsync(int dataId)
        {
            var sensorData = await _context.SensorData.FindAsync(dataId);
            if (sensorData == null)
            {
                throw new Exception("Дані не знайдено");
            }

            _context.SensorData.Remove(sensorData);
            await _context.SaveChangesAsync();
        }

        public async Task<int?> GetLatestSensorDataIdAsync()
        {
            return await _context.SensorData
                .OrderByDescending(sd => sd.time_stamp)
                .Select(sd => (int?)sd.data_id)
                .FirstOrDefaultAsync();
        }
    }
}

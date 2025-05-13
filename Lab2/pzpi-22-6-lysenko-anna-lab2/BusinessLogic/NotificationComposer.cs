using GasDec.Models;

namespace GasDec.BusinessLogic
{
    public class NotificationComposer
    {
        public string ComposeAlertMessage(SensorData data, Event newEvent, string severity)
        {
            string locationName = data.Sensor?.Location?.name ?? "невідомо";
            string locationFloor = data.Sensor?.Location?.floor.ToString() ?? "невідомо";

            return $"Серйозність події: {severity}\n" +
                   $"Час фіксування: {newEvent.event_time}\n\n" +
                   $"Інформація, отримана з сенсора:\n" +
                   $"ID сенсора, що зафіксував подію: {data.sensor_id}\n" +
                   $"Локація: {locationName}\n" +
                   $"Поверх: {locationFloor}\n" +
                   $"Показник вмісту газу: {data.gas_level} ppm\n" +
                   $"Показник температури: {data.temperature} °C\n" +
                   $"Показник тиску: {data.pressure} bar\n\n" +
                   $"Будь ласка, негайно перевірте систему, щоб запобігти будь-яким небезпекам.";
        }
    }
}

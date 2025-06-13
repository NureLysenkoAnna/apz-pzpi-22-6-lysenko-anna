using GasDec.Models;
using MQTTnet;
using MQTTnet.Client;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class MqttService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public MqttService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public async Task StartAsync()
    {
        var mqttFactory = new MqttFactory();
        var mqttClient = mqttFactory.CreateMqttClient();

        var mqttOptions = new MqttClientOptionsBuilder()
            .WithTcpServer("broker.hivemq.com", 1883)
            .Build();

        mqttClient.ApplicationMessageReceivedAsync += async e =>
        {
            string payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);
            Console.WriteLine($"Отримано данi: {payload}");

            if (e.ApplicationMessage.Topic == "iot/gasDec/sensors/data")
            {
                var sensorData = JsonSerializer.Deserialize<SensorData>(payload);
                if (sensorData != null)
                {
                    try
                    {
                        using (var scope = _scopeFactory.CreateScope())
                        {
                            var context = scope.ServiceProvider.GetRequiredService<GasLeakDbContext>();
                            await context.SensorData.AddAsync(sensorData);
                            await context.SaveChangesAsync();
                            Console.WriteLine("Данi успiшно збережено у БД.");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Помилка збереження в БД: {ex.Message}");
                    }
                }
                else
                {
                    Console.WriteLine("Не вдалося десерiалiзувати повiдомлення.");
                }
            }
            else if (e.ApplicationMessage.Topic == "iot/gasDec/sensors/events")
            {
                var eventData = JsonSerializer.Deserialize<Event>(payload);
                if (eventData != null)
                {
                    try
                    {
                        using (var scope = _scopeFactory.CreateScope())
                        {
                            var context = scope.ServiceProvider.GetRequiredService<GasLeakDbContext>();
                            await context.Events.AddAsync(eventData);
                            await context.SaveChangesAsync();
                            Console.WriteLine("Подiя успiшно збережена у БД.");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Помилка збереження події в БД: {ex.Message}");
                    }
                }
                else
                {
                    Console.WriteLine("Не вдалося десерiалізувати подiю.");
                }
            }
        };

        mqttClient.ConnectedAsync += async e =>
        {
            Console.WriteLine("Пiдключено до брокера.");
            await mqttClient.SubscribeAsync("iot/gasDec/sensors/data");
            await mqttClient.SubscribeAsync("iot/gasDec/sensors/events");
            Console.WriteLine("Пiдписано на топiки: iot/gasDec/sensors/data, iot/gasDec/sensors/events");
        };

        mqttClient.DisconnectedAsync += e =>
        {
            Console.WriteLine("Вiдключено вiд брокера.");
            return Task.CompletedTask;
        };

        try
        {
            await mqttClient.ConnectAsync(mqttOptions);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Помилка пiдключення: {ex.Message}");
        }
    }
}

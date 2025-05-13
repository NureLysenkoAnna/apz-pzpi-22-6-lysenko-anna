namespace GasDec.BusinessLogic
{
    public class SensorEventEvaluator
    {
        public double CalculateDangerLevel(double gasLevel, double temperature, double pressure)
        {
            double maxGasLevel = 50000;
            double maxTemperature = 30;
            double maxPressure = 10;

            return (gasLevel / maxGasLevel) + (temperature / maxTemperature)
                 + (pressure / maxPressure);
        }

        public bool IsDangerous(double dangerLevel, out string severity)
        {
            if (dangerLevel > 10)
            {
                severity = dangerLevel > 2 ? "High" : "Medium";
                return true;
            }

            severity = "Low";
            return false;
        }
    }
}

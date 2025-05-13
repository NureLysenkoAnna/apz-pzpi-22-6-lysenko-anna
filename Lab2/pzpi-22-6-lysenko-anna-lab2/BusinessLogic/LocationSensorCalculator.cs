namespace GasDec.BusinessLogic
{
    public class LocationSensorCalculator
    {
        private readonly Dictionary<string, double> _sensorDensity = new()
        {
            { "Residential", 50 },
            { "Industrial", 30 },
            { "Commercial", 40 },
        };

        public int CalculateRequiredSensors(string locationType, double area, int? minRequiredSensors = null)
        {
            double baseDensity = _sensorDensity.ContainsKey(locationType)
                ? _sensorDensity[locationType] : 50;

            int baseSensorCount = (int)Math.Ceiling(area / baseDensity);

            return minRequiredSensors.HasValue
                ? Math.Max(baseSensorCount, minRequiredSensors.Value)
                : baseSensorCount;
        }
    }
}

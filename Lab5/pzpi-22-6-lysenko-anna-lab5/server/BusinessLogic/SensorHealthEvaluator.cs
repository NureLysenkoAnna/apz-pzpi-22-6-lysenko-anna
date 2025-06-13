namespace GasDec.BusinessLogic
{
    public class SensorHealthEvaluator
    {
        public string EvaluateSensorStatus(DateTime installationDate, List<DateTime> checkDates, int recommendedLifetimeYears)
        {
            var sensorAge = DateTime.Now - installationDate;
            var recommendedLifetimeInDays = recommendedLifetimeYears * 365;

            var lastCheckDate = checkDates.FirstOrDefault();
            double averageCheckInterval = 0;

            if (checkDates.Count > 1)
            {
                var intervals = new List<double>();
                for (int i = 0; i < checkDates.Count - 1; i++)
                {
                    var interval = (checkDates[i] - checkDates[i + 1]).TotalDays;
                    intervals.Add(interval);
                }
                averageCheckInterval = intervals.Average();
            }

            if (sensorAge.TotalDays >= recommendedLifetimeInDays)
            {
                return "Сенсор потребує оновлення або заміни через перевищення терміну служби.";
            }

            if (lastCheckDate != default && (DateTime.Now - lastCheckDate).TotalDays > averageCheckInterval * 2)
            {
                return "Сенсор потребує додаткової перевірки.";
            }

            return "Всі перевірки в порядку.";
        }
    }
}

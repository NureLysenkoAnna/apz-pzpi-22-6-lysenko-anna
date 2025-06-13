using System.Diagnostics;

namespace GasDec.Backup
{
    public class BackupService
    {
        private readonly string _sqlServer = @"localhost";
        private readonly string _database = "GasLeakDB";
        private readonly string _username = "UserName";
        private readonly string _password = "Password";

        public string BackupDatabase()
        {
            var timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
            var backupPath = $@"C:\DatabaseBackups\GasLeakDB_backup_{timestamp}.bak";

            var sql = $"BACKUP DATABASE [{_database}] TO DISK = N'{backupPath}' WITH NOFORMAT, INIT, " +
                      $"NAME = N'{_database}-Full Database Backup', SKIP, NOREWIND, NOUNLOAD, STATS = 10;";

            var startInfo = new ProcessStartInfo
            {
                FileName = "sqlcmd",
                Arguments = $"-S {_sqlServer} -U {_username} -P {_password} -Q \"{sql}\"",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            };

            using var process = new Process { StartInfo = startInfo };
            process.Start();
            var output = process.StandardOutput.ReadToEnd();
            var error = process.StandardError.ReadToEnd();
            process.WaitForExit();

            if (process.ExitCode == 0)
            {
                return $"Backup successful. Saved to: {backupPath}";
            }

            throw new Exception($"Backup failed. Error: {error}");
        }
    }
}


namespace Warehouse.Services
{
    public class LogService : ILogService
    {
        private string logDirectory;

        public LogService(IConfiguration configuration)
        {
            logDirectory = configuration["LogDirectory"];
            Directory.CreateDirectory(logDirectory);
        }

        public void MakeLog(string logMessage)
        {
            string logFileName = $"log_{DateTime.Now:yyyy-MM-dd}.txt";
            string logFilePath = Path.Combine(logDirectory, logFileName);
            try
            {
                using (StreamWriter w = File.AppendText(logFilePath))
                {
                    Log(logMessage, w);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error writing to log: " + ex);
            }
        }

        public void Log(string logMessage, TextWriter txtWriter)
        {
            try
            {
                txtWriter.Write("\r\nLog Entry: ");
                txtWriter.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(), DateTime.Now.ToLongDateString());
                txtWriter.WriteLine("Message:");
                txtWriter.WriteLine("  {0}", logMessage);
                txtWriter.WriteLine("-------------------------------");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error writing log entry: " + ex);
            }
        }
    }
}
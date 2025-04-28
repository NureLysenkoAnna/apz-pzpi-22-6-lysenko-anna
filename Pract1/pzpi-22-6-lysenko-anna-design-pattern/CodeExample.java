// Очікуваний інтерфейс логування
public interface Logger {
    void logInfo(String message);
    void logError(String message);
}

// Несумісний сторонній логер
public class ThirdPartyLogger {
    public void writeToConsole(String severity, String text) {
        System.out.println(severity + ": " + text);
    }
}

// Адаптер, що реалізує інтерфейс і використовує сторонню бібліотеку
public class LoggerAdapter implements Logger {
    private ThirdPartyLogger thirdPartyLogger;

    public LoggerAdapter(ThirdPartyLogger thirdPartyLogger) {
        this.thirdPartyLogger = thirdPartyLogger;
    }

    @Override
    public void logInfo(String message) {
        thirdPartyLogger.writeToConsole("INFO", message);
    }

    @Override
    public void logError(String message) {
        thirdPartyLogger.writeToConsole("ERROR", message);
    }
}

// Клієнтській код
public class Application {
    public static void main(String[] args) {
        ThirdPartyLogger thirdPartyLogger =
         new ThirdPartyLogger();

        // Обгортання логера в адаптер
        Logger logger = new LoggerAdapter(thirdPartyLogger);

        logger.logInfo("Application started.");
        logger.logError("An error occurred!");
    }
}

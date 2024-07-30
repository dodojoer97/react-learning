interface ILogger {
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
/**
 * Logger class for handling logging with different severity levels.
 */
export declare class Logger implements ILogger {
    private readonly context;
    /**
     * Constructs a Logger instance.
     * @param context - Context or module from which the log is coming.
     */
    constructor(context: string);
    /**
     * Internal method to output the logs to the console based on the level.
     * @param message - The message to log.
     * @param level - The severity level of the log.
     */
    private log;
    /**
     * Logs a debug message.
     * @param message - The debug message to log.
     */
    debug(message: string): void;
    /**
     * Logs an informational message.
     * @param message - The informational message to log.
     */
    info(message: string): void;
    /**
     * Logs a warning message.
     * @param message - The warning message to log.
     */
    warn(message: string): void;
    /**
     * Logs an error message.
     * @param message - The error message to log.
     */
    error(message: string): void;
}
export {};
//# sourceMappingURL=Logger.d.ts.map
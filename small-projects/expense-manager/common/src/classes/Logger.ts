type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

interface ILogger {
	debug(message: string): void;
	info(message: string): void;
	warn(message: string): void;
	error(message: string): void;
}

/**
 * Logger class for handling logging with different severity levels.
 */
export class Logger implements ILogger {
	private readonly context: string;

	/**
	 * Constructs a Logger instance.
	 * @param context - Context or module from which the log is coming.
	 */
	constructor(context: string) {
		this.context = context;
	}

	/**
	 * Internal method to output the logs to the console based on the level.
	 * @param message - The message to log.
	 * @param level - The severity level of the log.
	 */
	private log(message: string, level: LogLevel): void {
		switch (level) {
			case "ERROR":
				console.error(`[${level}] - ${this.context}: ${message}`);
				break;
			case "WARN":
				console.warn(`[${level}] - ${this.context}: ${message}`);
				break;
			case "INFO":
				console.info(`[${level}] - ${this.context}: ${message}`);
				break;
			case "DEBUG":
				console.log(`[${level}] - ${this.context}: ${message}`);
				break;
			default:
				console.log(`[${level}] - ${this.context}: ${message}`);
				break;
		}
	}

	/**
	 * Logs a debug message.
	 * @param message - The debug message to log.
	 */
	debug(message: string): void {
		this.log(message, "DEBUG");
	}

	/**
	 * Logs an informational message.
	 * @param message - The informational message to log.
	 */
	info(message: string): void {
		this.log(message, "INFO");
	}

	/**
	 * Logs a warning message.
	 * @param message - The warning message to log.
	 */
	warn(message: string): void {
		this.log(message, "WARN");
	}

	/**
	 * Logs an error message.
	 * @param message - The error message to log.
	 */
	error(message: string): void {
		this.log(message, "ERROR");
	}
}

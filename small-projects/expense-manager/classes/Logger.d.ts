// Define the LogLevel type
type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

// Define the ILogger interface
interface ILogger {
	debug(message: string): void;
	info(message: string): void;
	warn(message: string): void;
	error(message: string): void;
}

// Declare the Logger class
declare class Logger implements ILogger {
	constructor(context: string);

	debug(message: string): void;
	info(message: string): void;
	warn(message: string): void;
	error(message: string): void;
}

export { Logger, ILogger, LogLevel };

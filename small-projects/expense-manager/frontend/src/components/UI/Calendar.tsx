import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";

// Css
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import the CSS
import "./Calendar.css";

const localizer = momentLocalizer(moment);

const test = ({ range: { start, end } }: { [key: string]: any }) => {
	console.log("start: ", start);
	console.log("end: ", end);
	return true;
};

const MyCalendar = () => {
	const handleDrillDown = (date: any, view: any) => {
		console.log("date: ", date);
		// Prevent the default day view opening behavior
		if (view === Views.DAY) {
			return false;
		}
	};
	return (
		<div>
			<Calendar
				localizer={localizer}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500 }}
				onSelectSlot={(slotInfo) => {
					console.log(slotInfo);
				}}
				selectable
				popup={true}
				onDrillDown={handleDrillDown}
			/>
		</div>
	);
};
export default MyCalendar;

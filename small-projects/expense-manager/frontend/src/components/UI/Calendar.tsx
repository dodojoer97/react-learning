// React
import type { FC } from "react";
import { useState, useContext } from "react";

// Calendar
import { Calendar, momentLocalizer, Views } from "react-big-calendar";

// Components
import SlidingPanel from "@/components/UI/SlidingPanel";

// Moment
import moment from "moment";

// Store
import { OpenContext } from "@/store/OpenContext";

// CSS
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import the CSS
import "./Calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar: FC = () => {
	// State
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	// Context
	const { isOpen, toggleOpen } = useContext(OpenContext);

	const handleOpenPanel = (date: Date): void => {
		toggleOpen("calendarPanel");
		setSelectedDate(date);
	};

	const handleClosePanel = (): void => {
		toggleOpen("calendarPanel");
		setSelectedDate(null);
	};

	return (
		<div>
			<Calendar
				localizer={localizer}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500 }}
				onSelectSlot={(slotInfo) => {
					handleOpenPanel(slotInfo.start);
				}}
				selectable
				popup={true}
			/>

			<SlidingPanel isOpen={isOpen("calendarPanel")} onClose={handleClosePanel}>
				{selectedDate?.toDateString()}
			</SlidingPanel>
		</div>
	);
};

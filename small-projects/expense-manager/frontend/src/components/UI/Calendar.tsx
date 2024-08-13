// React
import type { FC } from "react";
import { useState } from "react";

// Calendar
import { Calendar, momentLocalizer, Views } from "react-big-calendar";

// Components
import SlidingPanel from "@/components/UI/SlidingPanel";

// Moment
import moment from "moment";

const localizer = momentLocalizer(moment);

// Hooks
import useIsOpen from "@/hooks/useIsOpen";

// CSS
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import the CSS
import "./Calendar.css";

const MyCalendar: FC = () => {
	// State
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	//Hooks
	const { isOpen, toggleOpen } = useIsOpen(true);

	const handleOpenPanel = (date: Date): void => {
		toggleOpen();
		setSelectedDate(date);
	};

	const handleClosePanel = (): void => {
		toggleOpen();
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
				// onDrillDown={handleDrillDown}
			/>

			<SlidingPanel isOpen={isOpen} onClose={handleClosePanel}>
				{selectedDate?.toDateString()}
			</SlidingPanel>
		</div>
	);
};
export default MyCalendar;

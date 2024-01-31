import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventDialog } from "./EventDialog";

export const Calendar = () => {

  const calanderRef = useRef();
  const [events, setEvents] = useState([]);
  const [event, setEvent] = React.useState({});
  const [isEditModal, setIsEditModal] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [allDay, setAllDay] = React.useState(false);
  const [eventModal, setEventModal] = React.useState(false);
  const [eventTitle, setEventTitle] = React.useState("");
  const [radios, setRadios] = React.useState("");
  const [eventDescription, setEventDescription] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState(null);

  const addNewEvent = () => {
    let newEvents = {
      id: events.length + 1,
      title: eventTitle,
      start: startDate,
      end: endDate,
      allDay: allDay,
      className: radios,
      description: eventDescription
    };
    setEvents([...events, newEvents]);
    setEventModal(false);
    setStartDate(undefined);
    setEndDate(undefined);
    setRadios("bg-info");
    setEventTitle("");
    setEventDescription("");
  };

  const handleDateSelect = (info) => {
    console.log("handleDateSelect");
    setStartDate(info.start);
    setEndDate(info.end);
    setRadios("bg-info");
    setIsEditModal(false);
    setEventModal(true);
  };

  const editEvent = (event) => {
    let newEvents = events.map((ev) => {
      if (ev.id.toString() === event.id) {
        console.log("Matche found on ID: ", ev.id);
        event.remove();
        let saveNewEvent = {
          ...ev,
          title: eventTitle,
          className: radios,
          description: eventDescription
        };
        return saveNewEvent;
      } else {
        return ev;
      }
    });
    console.log(newEvents);
    setEvents(newEvents);
    setStartDate(undefined);
    setEndDate(undefined);
    setIsEditModal(false);
    setRadios("bg-info");
    setEventTitle("");
    setEventDescription("");
    setEventModal(false);
  };
  
  const handleEventClick = (info) => {
    // bind with an arrow function
    console.log(`Event ID: ${info.event.id} Selected!`);
    setEvent(info.event);
    setStartDate(info.event.start);
    setEndDate(info.event.end);
    setEventTitle(info.event.title);
    setIsEditModal(true);
    setEventDescription(info.event.extendedProps.description);
    setRadios(info.event.className);
    setEventModal(true);
  };
  const handleDateClick = () => {
    console.log("handleDateClick");
  };

  const renderEventContent = () => {
    console.log("renderEventContent");
  };

  const handleEvents = () => {
    console.log("handleEvents");
  };

  return (
    <div style={{    flexWrap: "nowrap",
    justifyContent: "",
    //backgroundColor: 'none',
    width: "50vw",
    height: "50vw",
    margin: "auto",
    marginTop: "-4rem",
    backgroundColor: "#FFF",
    paddingTop: "4rem",
    borderRadius: ".5rem",
    color: "#8898aa"}}>
      <FullCalendar
          ref={calanderRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={5}
          weekends={true}
          //themeSystem= "bootstrap"
          initialView="dayGridMonth"
          //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed

          events={events}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          select={handleDateSelect}
          eventsSet={handleEvents}
          // called after events are initialized/added/changed/removed
          // you can update a remote database when these fire:
          eventAdd={function () {
            console.log("Event Added");
          }}
          eventChange={function () {
            console.log("Event Changed");
          }}
          eventRemove={function () {
            console.log("Event Removed");
          }}
          headerToolbar={
            false /*{
          left: "title",
          center: "",
          right: "prev,next today dayGridMonth,timeGridWeek,timeGridDay"
        }*/
          }
        />

<EventDialog
  eventModal={eventModal}
  setEventModal={setEventModal}
  event={event}
  eventTitle={eventTitle}
  setEventTitle={setEventTitle}
  radios={radios}
  setRadios={setRadios}
  eventDescription={radios}
  setEventDescription={setEventDescription}
  addNewEvent={addNewEvent}
  editEvent={editEvent}
  isEditModal={isEditModal}
/>
  </div>



  )
}

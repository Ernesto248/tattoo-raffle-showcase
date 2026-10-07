export type TicketStatus = "libre" | "reservada" | "vendida";
export type Reservation = { tickets: number[]; eventId: string };
export type RaffleState = {
  tickets: Record<number, TicketStatus>;
  reservation: Reservation | null;
  processedEvents: string[];
};

/**
 * This state machine drives the browser sandbox. Production must enforce
 * uniqueness and idempotency in database transactions and a verified webhook.
 */
export function reserveTickets(state: RaffleState, numbers: number[], eventId: string): RaffleState {
  if (state.reservation) throw new Error("A reservation is already open");
  if (numbers.length < 1 || numbers.length > 10 || new Set(numbers).size !== numbers.length) {
    throw new Error("Choose one to ten unique tickets");
  }
  if (!eventId || state.processedEvents.includes(eventId)) throw new Error("Event ID is invalid or already processed");
  if (numbers.some((number) => !Number.isSafeInteger(number) || state.tickets[number] !== "libre")) {
    throw new Error("Ticket is not available");
  }
  return {
    ...state,
    tickets: { ...state.tickets, ...Object.fromEntries(numbers.map((number) => [number, "reservada"])) },
    reservation: { tickets: [...numbers], eventId },
  };
}

export function releaseReservation(state: RaffleState): RaffleState {
  if (!state.reservation) return state;
  const numbers = state.reservation.tickets;
  return {
    ...state,
    tickets: { ...state.tickets, ...Object.fromEntries(numbers.map((number) => [number, "libre"])) },
    reservation: null,
  };
}

export function confirmReservation(state: RaffleState): RaffleState {
  const reservation = state.reservation;
  if (!reservation) return state;
  if (state.processedEvents.includes(reservation.eventId)) return { ...state, reservation: null };
  if (reservation.tickets.some((number) => state.tickets[number] !== "reservada")) throw new Error("Reservation was changed");
  return {
    ...state,
    tickets: { ...state.tickets, ...Object.fromEntries(reservation.tickets.map((number) => [number, "vendida"])) },
    reservation: null,
    processedEvents: [...state.processedEvents, reservation.eventId],
  };
}

export function replayEvent(state: RaffleState, eventId: string): RaffleState {
  if (!state.processedEvents.includes(eventId)) throw new Error("Unknown event");
  return state;
}

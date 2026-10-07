import { describe, expect, it } from "vitest";
import { confirmReservation, releaseReservation, replayEvent, reserveTickets } from "./raffle";
import type { RaffleState } from "./raffle";
import { calculateOptimalPrice } from "./pricing";

const initial = (): RaffleState => ({
  tickets: Object.fromEntries(Array.from({ length: 200 }, (_, index) => [index + 1, "libre"])),
  reservation: null,
  processedEvents: [],
});

describe("ticket reservation sandbox", () => {
  it("reserves, confirms and ignores a repeated confirmation", () => {
    const held = reserveTickets(initial(), [79, 80], "evt_demo_001");
    expect(held.tickets[79]).toBe("reservada");
    const confirmed = confirmReservation(held);
    expect(confirmed.tickets[79]).toBe("vendida");
    expect(confirmed.processedEvents).toEqual(["evt_demo_001"]);
    expect(replayEvent(confirmed, "evt_demo_001")).toBe(confirmed);
    expect(() => reserveTickets(confirmed, [79], "evt_demo_002")).toThrow();
  });

  it("releases unconfirmed tickets and rejects duplicate numbers", () => {
    const held = reserveTickets(initial(), [10], "evt_demo_003");
    expect(releaseReservation(held).tickets[10]).toBe("libre");
    expect(() => reserveTickets(initial(), [10, 10], "evt_demo_004")).toThrow();
  });

  it("derives package prices from the source pricing module", () => {
    expect(calculateOptimalPrice(3)).toEqual({ totalPrice: 130, quantity: 3, savings: 20 });
    expect(calculateOptimalPrice(11).totalPrice).toBe(0);
  });
});

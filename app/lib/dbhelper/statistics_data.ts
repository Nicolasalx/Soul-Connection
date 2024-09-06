import { getCustomers } from "./customers";
import { getCoachs } from "./employees";
import { getEncounters } from "./encounters";
import { getEvents } from "./events";
import { getPayments } from "./payments";

export default class CoachStatistic
{
    constructor(
        public coach_gain: number[],
        public coach_encounter: number[],
        public coach_nb_client: number[],
        public coach_nb_event: number[],
        public coach_average_rating: number[],
        public coach_list: string[])
    {
    }
}

export async function fillCoachStatistic(): Promise<CoachStatistic>
{
  // Fetch all necessary data
  const customers = await getCustomers();
  const coachs = await getCoachs();
  const encounters = await getEncounters();
  const events = await getEvents();
  const payments = await getPayments();
  
  // Initialize data arrays
  const coach_gain: number[] = [];
  const coach_encounter: number[] = [];
  const coach_nb_client: number[] = [];
  const coach_nb_event: number[] = [];
  const coach_average_rating: number[] = [];
  const coach_list: string[] = [];

  // Iterate over each coach to compute statistics
  for (const coach of coachs) {
      const coachId = coach.id;
      
      // Filter customers belonging to the current coach
      const coachCustomers = customers.filter(customer => customer.coach_id === coachId);
      
      // Number of clients
      const nbClients = coachCustomers.length;
      coach_nb_client.push(nbClients);
      
      // Gain (total payments received by this coach's customers)
      const coachPayments = payments.filter(payment => coachCustomers.some(c => c.id === payment.customer_id));
      const totalGain = coachPayments.reduce((sum, payment) => sum + payment.amount, 0);
      coach_gain.push(totalGain);
      
      // Number of encounters the coach has had with customers
      const coachEncounters = encounters.filter(encounter => coachCustomers.some(c => c.id === encounter.customer_id));
      const nbEncounters = coachEncounters.length;
      coach_encounter.push(nbEncounters);
      
      // Average rating for the coach from encounters
      const totalRating = coachEncounters.reduce((sum, encounter) => sum + encounter.rating, 0);
      const avgRating = nbEncounters > 0 ? totalRating / nbEncounters : 0;
      coach_average_rating.push(avgRating);
      
      // Number of events organized by the coach
      const nbEvents = events.filter(event => event.employee_id === coachId).length;
      coach_nb_event.push(nbEvents);
      
      // Add the coach name to the list
      coach_list.push(`${coach.name} ${coach.surname}`);
  }

  // Return the filled CoachStatistic object
  return new CoachStatistic(
      coach_gain,
      coach_encounter,
      coach_nb_client,
      coach_nb_event,
      coach_average_rating,
      coach_list
  );
}
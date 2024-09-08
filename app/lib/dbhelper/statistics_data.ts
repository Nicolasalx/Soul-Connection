import { getCustomers } from "./customers";
import { getCoachs } from "./employees";
import { getEncounters } from "./encounters";
import { getEvents } from "./events";
import { getPayments } from "./payments";

interface astrological_sign_data {
    name_astro_sign: string[],
    number_astro_sign: number[]
}

export default class CoachStatistic
{
    constructor(
        public coach_gain: number[],
        public coach_encounter: number[],
        public coach_nb_client: number[],
        public coach_nb_event: number[],
        public coach_average_rating: number[],
        public coach_list: string[],
        public data_astrological_sign: astrological_sign_data)
    {
    }
}

export async function fillCoachStatistic(): Promise<CoachStatistic>
{
    const customers = await getCustomers();
    const coachs = await getCoachs();
    const encounters = await getEncounters();
    const events = await getEvents();
    const payments = await getPayments();

    const coach_gain: number[] = [];
    const coach_encounter: number[] = [];
    const coach_nb_client: number[] = [];
    const coach_nb_event: number[] = [];
    const coach_average_rating: number[] = [];
    const coach_list: string[] = [];

    for (const coach of coachs) {
        const coachId = coach.id;

        const coachCustomers = customers.filter(customer => customer.coach_id === coachId);

        const nbClients = coachCustomers.length;
        coach_nb_client.push(nbClients);

        const coachPayments = payments.filter(payment => coachCustomers.some(c => c.id === payment.customer_id));
        const totalGain = coachPayments.reduce((sum, payment) => sum + payment.amount, 0);
        coach_gain.push(parseFloat(totalGain.toFixed(2)));

        const coachEncounters = encounters.filter(encounter => coachCustomers.some(c => c.id === encounter.customer_id));
        const nbEncounters = coachEncounters.length;
        coach_encounter.push(nbEncounters);

        const totalRating = coachEncounters.reduce((sum, encounter) => sum + encounter.rating, 0);
        const avgRating = nbEncounters > 0 ? totalRating / nbEncounters : 0;
        coach_average_rating.push(parseFloat(avgRating.toFixed(2)));

        const nbEvents = events.filter(event => event.employee_id === coachId).length;
        coach_nb_event.push(nbEvents);

        coach_list.push(`${coach.name} ${coach.surname}`);
    }

    const astrologicalSignCounts: { [key: string]: number } = {};

    for (const customer of customers) {
        const sign = customer.astrological_sign;
        if (astrologicalSignCounts[sign]) {
            astrologicalSignCounts[sign]++;
        } else {
            astrologicalSignCounts[sign] = 1;
        }
    }

    const name_astrological_sign: string[] = [];
    const nb_astrological_sign: number[] = [];

    for (const [sign, count] of Object.entries(astrologicalSignCounts)) {
        name_astrological_sign.push(sign);
        nb_astrological_sign.push(count);
    }

    const data_astrological_sign: astrological_sign_data = {
        name_astro_sign: name_astrological_sign,
        number_astro_sign: nb_astrological_sign
    };

    return new CoachStatistic(
        coach_gain,
        coach_encounter,
        coach_nb_client,
        coach_nb_event,
        coach_average_rating,
        coach_list,
        data_astrological_sign
    );
}

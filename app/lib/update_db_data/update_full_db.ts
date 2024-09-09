import { update_db_clothes_image } from "./update_db_clothes_image";
import { update_db_customers } from "./update_db_customers";
import { update_db_customers_image } from "./update_db_customers_image";
import { update_db_employees } from "./update_db_employees";
import { update_db_employees_image } from "./update_db_employees_image";
import { update_db_encounters } from "./update_db_encounters";
import { update_db_events } from "./update_db_events";
import { update_db_payments } from "./update_db_payments";
import { update_db_tips } from "./update_db_tips";

export async function update_full_db()
{
    update_db_clothes_image();
    update_db_employees_image();
    update_db_customers_image();
    update_db_tips();
    update_db_customers();
    update_db_employees();
    update_db_encounters();
    update_db_events();
    update_db_payments();
}

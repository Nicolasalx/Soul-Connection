import { getEmployees } from "../dbhelper/employees";
import { createEmployeesImage, deleteEmployeesImage, getEmployeesImage } from "../dbhelper/employees_image";

export async function delete_db_employees_image()
{
    try {
        const all_employees = await getEmployees();

        for (const employee of all_employees) {
            await deleteEmployeesImage(employee.id.toString());
        }
    } catch (error) {
      console.error('Error deleting all images:', error);
    }
    alert("Employees Image Deleted !");
}

export async function update_db_employees_image()
{
    try {
        const all_employees = await getEmployees();

        for (const employee of all_employees) {
            if (!await getEmployeesImage(employee.id.toString())) {
                try {
                
                    const imageResponse = await fetch(`/api/employees/${employee.id.toString()}/image`);
                    if (!imageResponse.ok) {
                      throw new Error('Failed to fetch image');
                    }
                    const imageBlob = await imageResponse.blob();
                    createEmployeesImage(employee.id.toString(), imageBlob);
                } catch {}
            }
        }
    } catch (error) {
        console.error('Error fetching or updating employee_image:', error);
    }
    alert("employees Image Updated !");
}

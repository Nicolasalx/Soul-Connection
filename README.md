# Soul Connection Dashboard

## 1. Project Overview

The project aims to develop a frontend and backend for **Soul Connection**, a coaching agency specializing in relationships. The goal is to migrate existing data from the old system to a new dashboard, providing full data management capabilities for both clients and coaches.

### Customer requests:
- **Account Management (Feature A)**: Allows the creation of employee accounts and assignment of clients. Each coach can only see their assigned clients, while managers can view all data, ensuring GDPR compliance.
- **Client Profile (Feature B)**: Displays client information such as name, address, phone number, past meetings (including details like date, rating, and method of meeting), and payment history (accessible only by managers).
- **Statistics (Feature C)**: Provides graphs that allow managers to compare coach performance based on the number of meetings their clients have.
- **Coaching Advice (Feature D)**: A collection of tips to help coaches manage various types of client profiles.
- **Events (Feature E)**: Shows a schedule of events organized by the agency (parties, workshops, speed dating) with a map of the event location and the number of registered clients.
- **Astrological Compatibility (Feature F)**: Allows coaches to analyze the astrological compatibility between two clients based on their zodiac signs.
- **Clothing Style (Feature G)**: Displays photos of clients' clothing and allows coaches to test different clothing combinations to advise clients on their style.

The site is **responsive**, accessible on all devices, and ensures a seamless transition between the existing system’s data and the new interface.

## 2. API Usage

The **Soul Connection API** is critical for managing data in this project. It facilitates employee authentication and access to client information.

### How to Use the API:
- **Authentication**: 
  1. Use a group token in the `X-Group-Authorization` header for every HTTP request.
  2. Once authenticated, employees need to log in using the `/employees/login` route with their email and password.
  3. After logging in, an access token (Bearer token) is provided, which must be used to authorize requests to other routes.
  
- **Required Headers** for most API calls:
  - `X-Group-Authorization: XXXX-XXXX-XXXX-XXXX`
  - `Authorization: Bearer XXXXXXXXXXX`

For more detailed technical specifications, refer to the full API documentation at: [Soul Connection API Documentation](https://soul-connection.fr/docs).

## 3. Main Features

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/3e24fe52-e463-45a4-a698-69745afabf4e)

### Coach List
![Coach List](https://github.com/user-attachments/assets/05af5257-5887-4b5e-b341-df1f160dcced)

### Statistics
![Statistics](https://github.com/user-attachments/assets/650875ba-31a5-4f21-82b2-83f401e15392)

### Events
![Events](https://github.com/user-attachments/assets/742a9c9c-1f22-406e-b18a-0dc1e8d35470)

### Chat
![Chat](https://github.com/user-attachments/assets/625e9370-1d1c-412d-8267-6a6d28b1d8c3)


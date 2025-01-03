# PRICO - Team Project Overview

PRICO is a collaborative e-commerce platform project designed to provide users with a trustworthy price comparison service. The platform enables verified business owners to list their items, allowing users to compare prices across multiple vendors and find the best deals.

## Project Teams

Our team is organized into specialized groups to ensure a smooth development process and high-quality results:

### Frontend Team
The frontend team is responsible for designing and implementing the user interface to deliver a seamless experience. Members include:
- **Amanuel Dagnachew Abebe**
- **Amanuel Mandefro Aslake**
- **Amanuel Aayana**

### Mobile Team
The mobile team focuses on building the mobile application for PRICO using Flutter, ensuring users have a responsive and accessible platform on the go. Member:
- **Amanuel Solomon**

### Backend Team
The backend team develops and maintains the server-side logic and database operations using Laravel. Member:
- **Bamanuel Tesfaye**

## Key Features

- **Price Comparison:** Users can compare prices for similar products from different vendors.
- **Verified Listings:** Only verified businesses can list their products, ensuring reliability.
- **Mobile Accessibility:** A dedicated mobile application for users to access the platform anytime, anywhere.
- **Scalable Backend:** Built with Laravel for efficient data handling and API development.

## Technology Stack

- **Frontend:**
  - React.js
  - Bootstrap
  - CSS

- **Mobile:**
  - Flutter

- **Backend:**
  - Laravel

- **Database:**
  - MySQL

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/prico.git
   cd prico
   ```

2. **Frontend Setup:**
   Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm start
   ```

3. **Mobile Setup:**
   Navigate to the `mobile` directory and run the Flutter application:
   ```bash
   cd mobile
   flutter pub get
   flutter run
   ```

4. **Backend Setup:**
   Navigate to the `backend` directory and configure the Laravel application:
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   ```
   Set up the database and run migrations:
   ```bash
   php artisan migrate
   php artisan serve
   ```

## License

PRICO is licensed under the [GPL-3.0 License](https://www.gnu.org/licenses/gpl-3.0.en.html). Feel free to use, modify, and distribute this project under the terms of the license.

## Contact

For any inquiries or contributions, feel free to reach out to us:
- **Email:** : Amanuelabebe115@gmail.com
- **GitHub Issues:** Submit an issue on this repository.

---

Thank you for supporting PRICO, a collaborative effort to bring transparent and efficient price comparison to user

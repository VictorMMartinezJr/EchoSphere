# 🎵 EchoSphere | Full-Stack Music Streaming Platform

[![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring--Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

EchoSphere is a high-performance, full-stack music streaming application. This project demonstrates enterprise-level architecture, NoSQL data modeling, and seamless media streaming.

[🔗 Live Demo on Railway](https://echosphere-user.netlify.app/login)  
*⚠️ **Note:** Hosted on a free instance. If the page is blank, please allow ~45 seconds for the server to spin up.*

---

## 🚀 Key Features
* **Cloud Media Orchestration:** Real-time audio and image streaming integrated with **Cloudinary API**.
* **Role-Based Access Control (RBAC):** Distinct experiences for **Users** (streaming/browsing) and **Admins** (content management/CRUD).
* **Persistent Audio State:** Custom React implementation ensuring music playback remains uninterrupted during site navigation.
* **Modern Security:** State-of-the-art authentication using **JWT (JSON Web Tokens)** and **Spring Security**.

---

## 🛠 Technical Stack
### Frontend
- **React.js** (Functional Components & Hooks)
- **Tailwind CSS** (Modern, responsive UI/UX)
- **Axios** (Asynchronous API communication)
  
### Backend
- **Java 21** / **Spring Boot 3.x**
- **Spring Data MongoDB** (Flexible, document-based storage)
- **Spring Security** (Custom JWT Filter implementation)
- **Cloudinary SDK** (Audio & Image hosting)

---

## 🏗 Architectural Deep Dive
EchoSphere follows the **Clean Architecture** principle, separating concerns into distinct layers to ensure scalability:

1.  **Controller Layer:** Manages REST endpoints and request mapping.
2.  **Service Layer:** Encapsulates business logic, including audio processing and library validation.
3.  **Repository Layer:** Handles efficient document retrieval from **MongoDB**.

## 🖥️ Experience & Interface

### 👤 User Experience
Designed for a seamless listener journey. Users can browse albums, search for tracks, and manage personal playback.
<img width="1000" height="1000" alt="Image" src="https://github.com/user-attachments/assets/f90dde55-edac-48da-9c4b-3c54af0b17c4" />
<img width="1000" height="1000" alt="Image" src="https://github.com/user-attachments/assets/6f835edd-a831-4010-b476-596cc3d425a9" />
<img width="1000" height="1000" alt="Image" src="https://github.com/user-attachments/assets/c6c1d061-c2e2-4991-a98d-a6d7d6227a02" />
<img width="571" height="1027" alt="Image" src="https://github.com/user-attachments/assets/28f69533-30fa-4285-a5ba-296fe0e0543e" />
<img width="571" height="1027" alt="Image" src="https://github.com/user-attachments/assets/562935eb-25ed-474d-a885-ac7c570303d4" />

### 🔑 Admin Management
A dedicated suite for authorized administrators to manage the platform's library, featuring full CRUD operations and secure file uploads.
<img width="1000" height="1000" alt="Image" src="https://github.com/user-attachments/assets/e88d0c63-3dcf-4106-b611-8b54f6c7efe1" />
<img width="1000" height="1000" alt="Image" src="https://github.com/user-attachments/assets/83848d27-bf0d-49f2-a410-8957659ce9c3" />
<img width="1920" height="726" alt="Image" src="https://github.com/user-attachments/assets/6dbe1837-50c1-42b5-a839-680f16798116" />
<img width="571" height="1027" alt="Image" src="https://github.com/user-attachments/assets/fc39ce17-8c7f-4955-ae12-43540bd90a01" />

---

## ⚙️ Local Setup & Installation
This project utilizes environment variables to keep sensitive credentials secure.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/VictorMMartinezJr/EchoSphere.git](https://github.com/VictorMMartinezJr/EchoSphere.git)
    ```
2.  **Configure Environment Variables:**
    Create a `.env` file in the root directory or add the following to your IDE run configuration:
    - `MONGO_URI`
    - `CLOUD_NAME`, `CLOUD_KEY`, `CLOUD_SECRET`
    - `JWT_SECRET`
3.  **Run Backend:**
    ```bash
    ./mvnw spring-boot:run
    ```
4.  **Run Frontend:**
    ```bash
    cd client && npm install && npm start
    ```

---

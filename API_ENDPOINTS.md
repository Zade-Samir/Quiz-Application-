# Quiz Application - API Endpoints Documentation

## 📚 Swagger Documentation URLs

| Service | Direct Swagger UI | Port |
|---------|-------------------|------|
| **auth-service** | http://localhost:8084/swagger-ui/index.html | 8084 |
| **quiz-service** | http://localhost:8081/swagger-ui/index.html | 8081 |
| **result-service** | http://localhost:8082/swagger-ui/index.html | 8082 |
| **attempt-service** | http://localhost:8083/swagger-ui/index.html | 8083 |

---

## 🔐 Auth Service (Port 8084)

### Authentication Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/auth/register` | Register a new user | `{ "username": "string", "email": "string", "password": "string", "role": "PLAYER/ADMIN" }` | User object with JWT token |
| POST | `/api/auth/login` | Login user | `{ "username": "string", "password": "string" }` | JWT token |
| POST | `/api/auth/forgot-password` | Request password reset | `{ "email": "string" }` | Success message |
| POST | `/api/auth/reset-password` | Reset password with token | `{ "token": "string", "newPassword": "string" }` | Success message |

### User Management Endpoints

| Method | Endpoint | Description | Query Params | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/users` | Get all users (paginated) | `page`, `size`, `search`, `status` | Page of UserDTO |
| GET | `/api/users/{id}` | Get user by ID | - | UserDTO |
| GET | `/api/users/{id}/stats` | Get user statistics | - | UserStatsDTO |

### DTOs

**UserDTO:**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "PLAYER",
  "status": "active"
}
```

**UserStatsDTO:**
```json
{
  "userId": 1,
  "username": "john_doe",
  "quizzesTaken": 15,
  "avgScore": 88.5,
  "totalScore": 1327,
  "status": "active"
}
```

---

## 📝 Quiz Service (Port 8081)

### Quiz Management Endpoints

| Method | Endpoint | Description | Request Body | Query Params | Response |
|--------|----------|-------------|--------------|--------------|----------|
| POST | `/quizzes` | Create a new quiz | QuizRequest | - | Quiz object |
| GET | `/quizzes` | Get all quizzes (admin) | - | `page`, `size`, `published` | Page of Quiz |
| GET | `/quizzes/{id}` | Get quiz by ID | - | - | Quiz object |
| PUT | `/quizzes/{id}` | Update quiz | QuizRequest | - | Updated Quiz |
| DELETE | `/quizzes/{id}` | Delete quiz | - | - | 204 No Content |
| PUT | `/quizzes/{id}/publish` | Publish quiz | - | - | Published Quiz |
| GET | `/quizzes/published` | Get published quizzes | - | `page`, `size`, `category`, `difficulty` | Page of Quiz |

### Question Management Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/quizzes/{id}/questions` | Add question to quiz | QuestionRequest | Question object |
| PUT | `/quizzes/questions/{questionId}` | Update question | QuestionRequest | Updated Question |
| DELETE | `/quizzes/questions/{questionId}` | Delete question | - | 204 No Content |

### DTOs

**QuizRequest:**
```json
{
  "title": "Java Fundamentals",
  "description": "Test your Java knowledge",
  "category": "Java",
  "duration": 60,
  "passingScore": 70,
  "difficulty": "Intermediate"
}
```

**QuestionRequest:**
```json
{
  "text": "What is polymorphism?",
  "type": "MULTIPLE_CHOICE",
  "options": [
    {
      "text": "Option A",
      "isCorrect": true
    },
    {
      "text": "Option B",
      "isCorrect": false
    }
  ]
}
```

**Quiz Response:**
```json
{
  "id": 1,
  "title": "Java Fundamentals",
  "description": "Test your Java knowledge",
  "category": "Java",
  "duration": 60,
  "passingScore": 70,
  "difficulty": "Intermediate",
  "isPublished": true,
  "createdBy": "admin",
  "questions": [...]
}
```

### Categories & Difficulty Levels

**Categories:**
- Java
- React
- Spring
- Security
- Database
- (Custom categories supported)

**Difficulty Levels:**
- Beginner
- Intermediate
- Advanced

---

## 🎯 Attempt Service (Port 8083)

### Attempt Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/attempts/start` | Start a quiz attempt | `{ "quizId": 1 }` | Attempt object |
| POST | `/attempts/{attemptId}/submit` | Submit quiz attempt | Array of answers | Result object |
| GET | `/attempts/{attemptId}` | Get attempt details | - | Attempt object |
| GET | `/attempts/user/{userId}` | Get user's attempts | - | List of Attempts |

### DTOs

**Start Attempt Request:**
```json
{
  "quizId": 1
}
```

**Submit Attempt Request:**
```json
{
  "attemptId": 1,
  "answers": [
    {
      "questionId": 1,
      "selectedOptionId": 3
    },
    {
      "questionId": 2,
      "selectedOptionId": 7
    }
  ]
}
```

---

## 📊 Result Service (Port 8082)

### Result Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/result/create_res` | Create result | Result object | Created Result |
| GET | `/result/{resultId}` | Get result by ID | - | Result object |

### Leaderboard Endpoints

| Method | Endpoint | Description | Query Params | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/result/leaderboard` | Get leaderboard | `quizId` (optional), `limit` (default: 10) | List of LeaderboardDTO |

### Analytics Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/result/analytics/overview` | Get analytics overview | AnalyticsOverviewDTO |
| GET | `/result/analytics/quiz-performance` | Get quiz performance metrics | List of QuizPerformanceDTO |
| GET | `/result/analytics/recent-activity` | Get recent activity | List of RecentActivityDTO |

### DTOs

**Result:**
```json
{
  "resultId": 1,
  "quizId": 1,
  "userId": 1,
  "score": 85,
  "durationSecond": 120,
  "takenAt": "2026-02-02T19:30:00",
  "username": "john_doe",
  "quizTitle": "Java Fundamentals",
  "totalQuestions": 10,
  "correctAnswers": 8,
  "incorrectAnswers": 2
}
```

**LeaderboardDTO:**
```json
{
  "userId": 1,
  "username": "john_doe",
  "score": 95,
  "durationSecond": 120,
  "takenAt": "2026-02-02T19:30:00",
  "rank": 1,
  "quizzesTaken": 15,
  "avgScore": 88.5
}
```

**AnalyticsOverviewDTO:**
```json
{
  "totalQuizzes": 25,
  "totalStudents": 150,
  "totalAttempts": 450,
  "avgCompletionRate": 100.0,
  "avgScore": 75.5
}
```

**QuizPerformanceDTO:**
```json
{
  "quizId": 1,
  "quizTitle": "Java Fundamentals",
  "attempts": 45,
  "avgScore": 78.5,
  "completionRate": 95.5
}
```

**RecentActivityDTO:**
```json
{
  "username": "john_doe",
  "quizTitle": "Spring Boot Basics",
  "score": 85,
  "takenAt": "2026-02-02T19:45:00"
}
```

---

## 🌐 API Gateway (Port 8080)

All services are accessible through the API Gateway with the following prefixes:

| Service | Gateway Path | Direct Path |
|---------|--------------|-------------|
| auth-service | `/api/auth/**` | `http://localhost:8084/api/auth/**` |
| quiz-service | `/quizzes/**` | `http://localhost:8081/quizzes/**` |
| attempt-service | `/attempts/**` | `http://localhost:8083/attempts/**` |
| result-service | `/result/**` | `http://localhost:8082/result/**` |

### Example Gateway URLs:

```
# Via Gateway (Port 8080)
POST http://localhost:8080/api/auth/login
GET  http://localhost:8080/quizzes/published
POST http://localhost:8080/attempts/start
GET  http://localhost:8080/result/leaderboard

# Direct Service URLs
POST http://localhost:8084/api/auth/login
GET  http://localhost:8081/quizzes/published
POST http://localhost:8083/attempts/start
GET  http://localhost:8082/result/leaderboard
```

---

## 🔒 Authentication & Authorization

### JWT Token

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Roles

- **ADMIN**: Full access to all endpoints including user management and quiz CRUD
- **PLAYER**: Access to quiz attempts, results, and leaderboard

### Protected Endpoints

**Admin Only:**
- `GET /api/users` - List all users
- `POST /quizzes` - Create quiz
- `PUT /quizzes/{id}` - Update quiz
- `DELETE /quizzes/{id}` - Delete quiz
- `PUT /quizzes/{id}/publish` - Publish quiz

**Authenticated Users:**
- All `/attempts/**` endpoints
- All `/result/**` endpoints
- `GET /quizzes/published` - View published quizzes

**Public Endpoints:**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`

---

## 📋 Common Query Parameters

### Pagination

Most list endpoints support pagination:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 0 | Page number (0-indexed) |
| `size` | integer | 10 | Number of items per page |

### Filtering

**Quiz Endpoints:**
- `category` - Filter by quiz category
- `difficulty` - Filter by difficulty level
- `published` - Filter by published status (true/false)

**User Endpoints:**
- `search` - Search by username or email
- `status` - Filter by user status

---

## 🚀 Quick Start Examples

### 1. Register a New User

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "role": "PLAYER"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 3. Get Published Quizzes

```bash
curl -X GET "http://localhost:8080/quizzes/published?page=0&size=10&category=Java" \
  -H "Authorization: Bearer <your-token>"
```

### 4. View Leaderboard

```bash
curl -X GET "http://localhost:8080/result/leaderboard?limit=10" \
  -H "Authorization: Bearer <your-token>"
```

### 5. Get Analytics Overview

```bash
curl -X GET http://localhost:8080/result/analytics/overview \
  -H "Authorization: Bearer <your-token>"
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Scores are represented as integers (0-100)
- Duration is in seconds
- All endpoints return JSON responses
- Error responses follow standard HTTP status codes

---

## 🔗 Additional Resources

- **Eureka Dashboard**: http://localhost:8761/
- **Frontend Application**: http://localhost:5173/
- **API Gateway**: http://localhost:8080/

---

**Last Updated:** 2026-02-02

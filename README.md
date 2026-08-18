# Jaime Cardona - Interactive Portfolio

A full-stack interactive portfolio showcasing agrotech and software engineering work, powered by React, FastAPI, and AI integration with JAC-IA conversational assistant.

## Architecture Overview

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with custom design system
- **Design System**: Gamer-Agrotech aesthetic (verde bosque, ámbar, neón verde, azul eléctrico)
- **Pages**:
  - Home (Hero + Intro)
  - Projects (Agropilot CM, Elite Beauty, etc.)
  - Experience (Professional timeline)
  - Research (Papers and explorations)
  - Blog (Articles and thoughts)

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.9+
- **AI Integration**: OpenRouter with fallback cascade
  - Primary: `google/gemma-3-4b-it:free`
  - Fallback: `openrouter/free`
- **RAG**: Prepared for pgvector integration (Supabase-ready)
- **Features**:
  - Conversational JAC-IA endpoint
  - RAG query endpoint
  - Profile information endpoint
  - Health check endpoint

### Infrastructure
- **Deployment**: Render (web service)
- **Static Hosting**: Integrated with backend
- **Database**: PostgreSQL (optional, for pgvector RAG)
- **Environment**: Python/Node.js runtime

## Project Structure

```
jaime-cardona-portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── Intro.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Research.tsx
│   │   │   └── Blog.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/
│   ├── main.py
│   └── requirements.txt
├── content/
│   ├── profile.yml
│   ├── projects.yml
│   ├── experience.yml
│   ├── research.yml
│   └── timeline.yml
├── .env.example
├── render.yaml
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.9+
- pip (Python package manager)

### Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required:
- `OPENROUTER_API_KEY`: Your OpenRouter API key (free tier available)

Optional:
- `DATABASE_URL`: PostgreSQL connection for RAG backend

### Local Development

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

#### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs on `http://localhost:8000`

### Build for Production

#### Frontend
```bash
cd frontend
npm run build
```

Output goes to `backend/static/` for serving by FastAPI.

#### Full Stack Build
```bash
# From project root
cd frontend && npm install && npm run build
cd ../backend && pip install -r requirements.txt
```

## API Endpoints

### Health Check
```
GET /health
```

### Chat with JAC-IA
```
POST /api/chat
Content-Type: application/json

{
  "messages": [
    {"role": "user", "content": "How can I optimize crop yields?"}
  ],
  "model": "google/gemma-3-4b-it:free"
}
```

Response:
```json
{
  "response": "...",
  "model_used": "google/gemma-3-4b-it:free"
}
```

### RAG Query (Placeholder)
```
POST /api/rag
Content-Type: application/json

{
  "text": "query here"
}
```

### Profile
```
GET /api/profile
```

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- CSS3 (with custom design system)

### Backend
- FastAPI
- Python 3.9+
- Uvicorn
- httpx (async HTTP client)
- python-dotenv

### AI/ML
- OpenRouter API
- Google Gemma 3
- RAG framework (pgvector-ready)

### DevOps
- Docker
- Render
- GitHub

## Deployment

### Render Deployment
The project includes `render.yaml` for automated deployment:

1. Connect your GitHub repository to Render
2. Create new Web Service
3. Select this repository
4. Set build command from `render.yaml`
5. Configure environment variables:
   - `OPENROUTER_API_KEY`: Your API key
6. Deploy

## Content Management

Content is managed through YAML files in the `content/` directory:

- `profile.yml`: Personal information and skills
- `projects.yml`: Project descriptions and metadata
- `experience.yml`: Work history and achievements
- `research.yml`: Research papers and explorations
- `timeline.yml`: Key milestones and events

These can be extended to include more detailed information and integrated with the backend for dynamic content loading.

## Features

### Current
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark theme optimized for developer/tech aesthetic
- ✅ Custom gamer-agrotech color palette
- ✅ Interactive navigation
- ✅ Hero section with typewriter effect
- ✅ Feature showcase
- ✅ Project cards
- ✅ OpenRouter AI integration
- ✅ API endpoints for conversational AI

### Planned
- [ ] RAG integration with pgvector
- [ ] Blog post rendering from YAML
- [ ] Project detail pages
- [ ] Dynamic content loading
- [ ] Search functionality
- [ ] Contact form
- [ ] Analytics integration
- [ ] Dark/Light theme toggle

## Performance Optimizations

- Vite for fast development and optimized builds
- CSS-in-JS with minimal runtime overhead
- Async FastAPI endpoints
- Static file caching
- OpenRouter free tier utilization

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Screen reader friendly
- Responsive design for all devices

## License

© 2024 Jaime Cardona. All rights reserved.

## Contact

- Email: jaime.cardona@rckt.es
- GitHub: [ja23cardona1406](https://github.com/ja23cardona1406)
- Website: [jaime-cardona.com](https://jaime-cardona.com)

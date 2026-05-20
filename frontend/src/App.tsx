import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import ClientFormView from './views/ClientFormView';
import OnboardingChecklistView from './views/OnboardingChecklistView';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/cadastro" element={<ClientFormView />} />
          <Route path="/onboarding/:clientId" element={<OnboardingChecklistView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '@/pages/Dashboard';
import { Wellbeing } from '@/pages/Wellbeing';
import { Tracking } from '@/pages/Tracking';
import { More } from '@/pages/More';
import { Supplements } from '@/pages/Supplements';
import { MedicalExport } from '@/pages/MedicalExport';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/wellbeing" element={<Wellbeing />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/supplements" element={<Supplements />} />
      <Route path="/medical-export" element={<MedicalExport />} />
      <Route path="/more" element={<More />} />
      {/* Redirects from old routes */}
      <Route path="/nutrition" element={<Navigate to="/wellbeing" replace />} />
      <Route path="/movement" element={<Navigate to="/wellbeing" replace />} />
      <Route path="/encyclopedia" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

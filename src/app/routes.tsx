import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '@/pages/Dashboard';
import { Nutrition } from '@/pages/Nutrition';
import { Movement } from '@/pages/Movement';
import { Tracking } from '@/pages/Tracking';
import { More } from '@/pages/More';
import { Supplements } from '@/pages/Supplements';
import { Encyclopedia } from '@/pages/Encyclopedia';
import { MedicalExport } from '@/pages/MedicalExport';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/nutrition" element={<Nutrition />} />
      <Route path="/movement" element={<Movement />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/supplements" element={<Supplements />} />
      <Route path="/encyclopedia" element={<Encyclopedia />} />
      <Route path="/medical-export" element={<MedicalExport />} />
      <Route path="/more" element={<More />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

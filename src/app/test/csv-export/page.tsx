"use client";

import { useState } from 'react';
import Button from '@/app/components/ui/Button';

// Données de test pour les étudiants
const mockStudents = [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@viacesi.fr",
    promotion: "2024",
    campus: "Lille"
  },
  {
    id: 2,
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@viacesi.fr",
    promotion: "2024",
    campus: "Paris"
  },
  {
    id: 3,
    firstName: "Pierre",
    lastName: "Bernard",
    email: "pierre.bernard@viacesi.fr",
    promotion: "2025",
    campus: "Arras"
  },
  {
    id: 4,
    firstName: "Sophie",
    lastName: "Petit",
    email: "sophie.petit@viacesi.fr",
    promotion: "2025",
    campus: "Lille"
  },
  {
    id: 5,
    firstName: "Lucas",
    lastName: "Robert",
    email: "lucas.robert@viacesi.fr",
    promotion: "2024",
    campus: "Paris"
  }
];

export default function CSVExportTest() {
  const [students] = useState(mockStudents);

  const exportToCSV = () => {
    // En-têtes du CSV
    const headers = ["ID", "Prénom", "Nom", "Email", "Promotion", "Campus"];
    
    // Conversion des données en format CSV avec point-virgule
    const csvContent = [
      headers.join(";"),
      ...students.map(student => [
        student.id,
        student.firstName,
        student.lastName,
        student.email,
        student.promotion,
        student.campus
      ].join(";"))
    ].join("\n");

    // Ajout du BOM UTF-8
    const BOM = "\uFEFF";
    
    // Création du fichier et téléchargement
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "etudiants_cesi.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Test d'export CSV</h1>
        
        {/* Liste des étudiants */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promotion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campus</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.promotion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.campus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bouton d'export */}
        <div className="flex justify-end">
          <Button
            text="Exporter en CSV"
            color="primary"
            onClick={exportToCSV}
          />
        </div>
      </div>
    </div>
  );
} 
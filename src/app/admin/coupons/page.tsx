'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getAllPromotions, createPromotion, deactivatePromotion, activatePromotion, deletePromotion } from '@/redux/features/promotionSlice';
import { getAllClubs } from '@/redux/features/clubSlice';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { FaEye, FaTrash, FaChevronDown, FaCheck } from 'react-icons/fa';
import Modal from '@/app/components/ui/Modal';
import Button from '@/app/components/ui/Button';
import axiosInstance from '@/utils/axiosConfig';

interface Club {
    _id: string;
    name: string;
}

interface Promotion {
    _id: string;
    promotion_code: string;
    validation_date: string;
    max_use: number;
    id_club: string[] | null;
    activate: boolean;
    value: number;
}

interface PromotionInfoForDeletion {
    _id: string;
    code: string;
}

const PRESETS = ['20', '50', '100', '200'];

export default function CouponsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { promotions, loading, error } = useSelector((state: RootState) => state.promotions);
    const { clubs: storeClubs, loading: clubsLoading, error: clubError } = useSelector((state: RootState) => state.club);
    const [clubs, setClubs] = useState<Club[]>([]);
    const [newPromotion, setNewPromotion] = useState({
        promotion_code: '',
        validation_date: '',
        max_use: 0,
        id_club: [] as string[],
        value: 0
    });
    const [maxUsePreset, setMaxUsePreset] = useState<string>('custom');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promotionToDelete, setPromotionToDelete] = useState<PromotionInfoForDeletion | null>(null);
    const [validationErrors, setValidationErrors] = useState({
        promotion_code: false,
        validation_date: false,
        max_use: false,
        value: false
    });
    const [isClubDropdownOpen, setIsClubDropdownOpen] = useState(false);
    const clubDropdownRef = useRef<HTMLDivElement>(null);
    const [selectedClubNames, setSelectedClubNames] = useState<Record<string, string>>({});

    useEffect(() => {
        dispatch(getAllPromotions());
        console.log('Dispatching getAllClubs action');
        dispatch(getAllClubs());
        
        // Add click outside listener to close dropdown
        const handleClickOutside = (event: MouseEvent) => {
            if (clubDropdownRef.current && !clubDropdownRef.current.contains(event.target as Node)) {
                setIsClubDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch]);

    useEffect(() => {
        console.log('storeClubs updated:', storeClubs);
        if (storeClubs && storeClubs.length > 0) {
            console.log('Setting clubs with length:', storeClubs.length);
            setClubs(storeClubs);
            
            // Update selectedClubNames with existing club names
            const clubNames: Record<string, string> = {};
            storeClubs.forEach((club: Club) => {
                if (newPromotion.id_club.includes(club._id)) {
                    clubNames[club._id] = club.name;
                }
            });
            setSelectedClubNames(clubNames);
        }
    }, [storeClubs]);

    const handlePresetClick = (value: string) => {
        setMaxUsePreset(value);
        if (value !== 'custom') {
            setNewPromotion({ ...newPromotion, max_use: parseInt(value) });
        } else {
            setNewPromotion({ ...newPromotion, max_use: 0 });
        }
    };

    const handleCustomMaxUseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxUsePreset('custom');
        setNewPromotion({ ...newPromotion, max_use: parseInt(e.target.value) || 0 });
    };

    const handleCreatePromotion = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Reset validation errors
        setValidationErrors({
            promotion_code: false,
            validation_date: false,
            max_use: false,
            value: false
        });

        let hasError = false;
        const newErrors = { ...validationErrors };

        if (!newPromotion.promotion_code) {
            newErrors.promotion_code = true;
            hasError = true;
        }
        if (!newPromotion.validation_date) {
            newErrors.validation_date = true;
            hasError = true;
        }
        if ((maxUsePreset === 'custom' && newPromotion.max_use <= 0) || 
            (maxUsePreset !== 'custom' && !PRESETS.includes(maxUsePreset))) {
            newErrors.max_use = true;
            hasError = true;
        }
        if (newPromotion.value <= 0 || newPromotion.value > 100) {
            newErrors.value = true;
            hasError = true;
        }

        setValidationErrors(newErrors);

        if (hasError) {
            return;
        }

        try {
            await dispatch(createPromotion({ 
                ...newPromotion, 
                validation_date: newPromotion.validation_date || null,
                id_club: newPromotion.id_club || null 
            })).unwrap();
            toast.success('Promotion créée avec succès');
            setNewPromotion({ promotion_code: '', validation_date: '', max_use: 0, id_club: [], value: 0 });
            setMaxUsePreset('custom');
            dispatch(getAllPromotions());
        } catch (err: any) {
            toast.error(err || 'Erreur lors de la création de la promotion');
        }
    };

    const handleToggleActivate = async (id: string, currentStatus: boolean) => {
        const action = currentStatus ? deactivatePromotion : activatePromotion;
        const successMessage = currentStatus ? 'Promotion désactivée avec succès' : 'Promotion activée avec succès';
        const errorMessage = currentStatus ? 'Erreur lors de la désactivation' : 'Erreur lors de l\'activation';

        try {
            await dispatch(action(id)).unwrap();
            toast.success(successMessage);
        } catch (err: any) {
            toast.error(err || errorMessage);
        }
    };

    const handleDeletePromotion = (id: string, code: string) => {
        setPromotionToDelete({ _id: id, code: code });
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!promotionToDelete) return;

        try {
            await dispatch(deletePromotion(promotionToDelete._id)).unwrap();
            toast.success(`Promotion ${promotionToDelete.code} supprimée avec succès`);
            dispatch(getAllPromotions());
        } catch (err: any) {
            toast.error(err || 'Erreur lors de la suppression de la promotion');
        } finally {
            closeModal();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPromotionToDelete(null);
    };

    const toggleClubDropdown = () => {
        setIsClubDropdownOpen(!isClubDropdownOpen);
    };
    
    const handleClubCheckboxChange = (clubId: string, clubName: string) => {
        const updatedClubs = [...newPromotion.id_club];
        const clubIndex = updatedClubs.indexOf(clubId);
        
        if (clubIndex === -1) {
            // Add club
            updatedClubs.push(clubId);
            const updatedNames = { ...selectedClubNames, [clubId]: clubName };
            setSelectedClubNames(updatedNames);
        } else {
            // Remove club
            updatedClubs.splice(clubIndex, 1);
            const updatedNames = { ...selectedClubNames };
            delete updatedNames[clubId];
            setSelectedClubNames(updatedNames);
        }
        
        setNewPromotion({ ...newPromotion, id_club: updatedClubs });
    };

    if (loading && !promotions.length) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">Erreur: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Gestion des Coupons</h2>
                
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-lg font-semibold mb-4">Créer un nouveau coupon</h3>
                    <form onSubmit={handleCreatePromotion} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="promotion_code" className="block text-sm font-medium text-gray-700 mb-1">Code du ticket</label>
                                <input
                                    id="promotion_code"
                                    type="text"
                                    placeholder="Ex: SUMMER24"
                                    value={newPromotion.promotion_code}
                                    onChange={(e) => setNewPromotion({...newPromotion, promotion_code: e.target.value.toUpperCase()})}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 h-12 ${validationErrors.promotion_code ? 'border-red-500' : ''}`}
                                    required
                                />
                                {validationErrors.promotion_code && (
                                    <p className="mt-1 text-sm text-red-600">Veuillez entrer un code de promotion</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="validation_date" className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                                <input
                                    id="validation_date"
                                    type="date"
                                    value={newPromotion.validation_date}
                                    onChange={(e) => setNewPromotion({...newPromotion, validation_date: e.target.value})}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 h-12 ${validationErrors.validation_date ? 'border-red-500' : ''}`}
                                />
                                {validationErrors.validation_date && (
                                    <p className="mt-1 text-sm text-red-600">Veuillez sélectionner une date d'expiration</p>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Utilisations maximales</label>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    {PRESETS.map(preset => (
                                        <button
                                            key={preset}
                                            type="button"
                                            onClick={() => handlePresetClick(preset)}
                                            className={`px-4 py-2 h-12 rounded-md border text-sm font-medium transition-colors ${ 
                                                maxUsePreset === preset
                                                ? 'bg-indigo-600 text-white border-indigo-600' 
                                                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                            }`}
                                        >
                                            {preset}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handlePresetClick('custom')}
                                        className={`px-4 py-2 h-12 rounded-md border text-sm font-medium transition-colors ${ 
                                            maxUsePreset === 'custom'
                                            ? 'bg-indigo-600 text-white border-indigo-600' 
                                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                        }`}
                                    >
                                        Personnalisé
                                    </button>

                                    {maxUsePreset === 'custom' && (
                                        <input
                                            id="max_use_custom"
                                            type="number"
                                            min="1"
                                            placeholder="Valeur"
                                            value={newPromotion.max_use > 0 ? newPromotion.max_use : ''}
                                            onChange={handleCustomMaxUseChange}
                                            className="ml-2 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 h-12"
                                            required
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="id_club" className="block text-sm font-medium text-gray-700 mb-1">
                                    Clubs <span className="text-gray-400">(Optionnel)</span>
                                </label>
                                <div className="relative" ref={clubDropdownRef}>
                                    <button
                                        type="button"
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm bg-white py-3 px-4 h-12 text-left focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 relative"
                                        onClick={toggleClubDropdown}
                                    >
                                        <span className="block truncate">
                                            {newPromotion.id_club.length === 0 
                                                ? "Sélectionner un ou plusieurs clubs" 
                                                : Object.values(selectedClubNames).join(', ')}
                                        </span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <FaChevronDown className="h-4 w-4 text-gray-400" />
                                        </span>
                                    </button>
                                    
                                    {isClubDropdownOpen && (
                                        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 max-h-60 overflow-auto">
                                            <ul className="py-1">
                                                {clubs.length === 0 ? (
                                                    <li className="px-4 py-2 text-sm text-gray-500">
                                                        Aucun club disponible
                                                    </li>
                                                ) : clubsLoading ? (
                                                    <li className="px-4 py-2 text-sm text-gray-500">
                                                        Chargement des clubs...
                                                    </li>
                                                ) : clubError ? (
                                                    <li className="px-4 py-2 text-sm text-red-500 flex flex-col gap-2">
                                                        <span>Erreur: Impossible de charger les clubs</span>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                dispatch(getAllClubs());
                                                            }}
                                                            className="text-xs bg-indigo-600 text-white py-1 px-2 rounded hover:bg-indigo-700"
                                                        >
                                                            Réessayer
                                                        </button>
                                                    </li>
                                                ) : (
                                                    clubs.map((club) => (
                                                        <li 
                                                            key={club._id} 
                                                            className="px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center"
                                                            onClick={() => handleClubCheckboxChange(club._id, club.name)}
                                                        >
                                                            <div className="flex items-center justify-center w-5 h-5 mr-2 border rounded border-gray-400">
                                                                {newPromotion.id_club.includes(club._id) && (
                                                                    <FaCheck className="h-3 w-3 text-indigo-600" />
                                                                )}
                                                            </div>
                                                            <span className="text-sm text-gray-700">{club.name}</span>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Cliquez sur plusieurs clubs pour les sélectionner
                                </p>
                            </div>
                            <div>
                                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">Valeur (%)</label>
                                <input
                                    id="value"
                                    type="number"
                                    min="1"
                                    max="100"
                                    step="1"
                                    placeholder="Ex: 30"
                                    value={newPromotion.value > 0 ? newPromotion.value : ''}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        if (!isNaN(value) && value >= 0 && value <= 100) {
                                            setNewPromotion({ ...newPromotion, value });
                                        } else if (e.target.value === '') {
                                            setNewPromotion({ ...newPromotion, value: 0 });
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        // Prevent non-numeric input
                                        if (!/[0-9]/.test(e.key) && 
                                            e.key !== 'Backspace' && 
                                            e.key !== 'Delete' && 
                                            e.key !== 'ArrowLeft' && 
                                            e.key !== 'ArrowRight' &&
                                            e.key !== 'Tab') {
                                            e.preventDefault();
                                        }
                                    }}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 h-12 ${validationErrors.value ? 'border-red-500' : ''}`}
                                    required
                                />
                                {validationErrors.value && (
                                    <p className="mt-1 text-sm text-red-600">Veuillez entrer une valeur valide entre 1 et 100</p>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 h-12"
                            disabled={loading}
                        >
                            {loading ? 'Création...' : 'Créer le coupon'}
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'expiration</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valeur (%)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisations max</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {promotions && promotions.length > 0 ? promotions.map((promotion: Promotion) => (
                                <tr key={promotion._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promotion.promotion_code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {promotion.id_club && promotion.id_club.length > 0
                                            ? promotion.id_club.map((clubId) => selectedClubNames[clubId] || clubId).join(', ')
                                            : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {promotion.validation_date ? format(new Date(promotion.validation_date), 'dd MMMM yyyy', { locale: fr }) : 'Permanente'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promotion.value}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promotion.max_use}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            promotion.activate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {promotion.activate ? 'Actif' : 'Inactif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                                        <button
                                            onClick={() => handleToggleActivate(promotion._id, promotion.activate)}
                                            className={`px-3 rounded-md text-white flex items-center justify-center h-8 ${ 
                                                promotion.activate 
                                                    ? 'bg-yellow-500 hover:bg-yellow-600'
                                                    : 'bg-green-500 hover:bg-green-600'
                                            }`}
                                            disabled={loading}
                                            title={promotion.activate ? 'Désactiver' : 'Activer'}
                                        >
                                            {promotion.activate ? 'Désactiver' : 'Activer'}
                                        </button>
                                        <Button
                                            text=""
                                            color="secondary"
                                            variant="outline"
                                            size="sm"
                                            icon={<FaTrash />}
                                            onClick={() => handleDeletePromotion(promotion._id, promotion.promotion_code)}
                                            className="flex items-center justify-center w-8 h-8"
                                        />
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4">Aucune promotion trouvée.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                title="Confirmer la suppression"
                message={`Êtes-vous sûr de vouloir supprimer la promotion ${promotionToDelete?.code ?? ''} ? Cette action est irréversible.`}
                confirmText="Supprimer"
                cancelText="Annuler"
            />
        </div>
    );
} 
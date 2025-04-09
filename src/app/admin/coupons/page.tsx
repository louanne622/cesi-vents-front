'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getAllPromotions, createPromotion, deactivatePromotion, activatePromotion, deletePromotion } from '@/redux/features/promotionSlice';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { FaEye, FaTrash } from 'react-icons/fa';
import Modal from '@/app/components/ui/Modal';
import Button from '@/app/components/ui/Button';

interface Promotion {
    _id: string;
    promotion_code: string;
    validation_date: string;
    max_use: number;
    id_club: string;
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
    const [newPromotion, setNewPromotion] = useState({
        promotion_code: '',
        validation_date: '',
        max_use: 0,
        id_club: '',
        value: 0
    });
    const [maxUsePreset, setMaxUsePreset] = useState<string>('custom');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promotionToDelete, setPromotionToDelete] = useState<PromotionInfoForDeletion | null>(null);

    useEffect(() => {
        dispatch(getAllPromotions());
    }, [dispatch]);

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
        if (!newPromotion.promotion_code || (maxUsePreset === 'custom' && newPromotion.max_use <= 0) || (maxUsePreset !== 'custom' && !PRESETS.includes(maxUsePreset)) || newPromotion.value <= 0 || newPromotion.value > 100) {
            toast.error('Veuillez remplir tous les champs correctement, y compris une valeur de coupon valide (1-100%).');
            return;
        }
        try {
            await dispatch(createPromotion({ ...newPromotion, validation_date: newPromotion.validation_date || null })).unwrap();
            toast.success('Promotion créée avec succès');
            setNewPromotion({ promotion_code: '', validation_date: '', max_use: 0, id_club: '', value: 0 });
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 h-12"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="validation_date" className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                                <input
                                    id="validation_date"
                                    type="date"
                                    value={newPromotion.validation_date}
                                    onChange={(e) => setNewPromotion({...newPromotion, validation_date: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 h-12"
                                />
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
                                <label htmlFor="id_club" className="block text-sm font-medium text-gray-700 mb-1">ID Club (Optionnel)</label>
                                <input
                                    id="id_club"
                                    type="text"
                                    placeholder="Ex: club-photo-123"
                                    value={newPromotion.id_club}
                                    onChange={(e) => setNewPromotion({...newPromotion, id_club: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 h-12"
                                />
                            </div>
                            <div>
                                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">Valeur (%)</label>
                                <input
                                    id="value"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="Ex: 30"
                                    value={newPromotion.value > 0 ? newPromotion.value : ''}
                                    onChange={(e) => setNewPromotion({ ...newPromotion, value: parseInt(e.target.value) || 0 })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 h-12"
                                    required
                                />
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promotion.id_club || 'N/A'}</td>
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
                                            color="danger"
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
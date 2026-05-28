import { useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function VehiclesPage() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        async function loadVehicles() {
            try {
                const response = await api("/vehicles");

                setVehicles(response);
            } catch (error) {
                console.error("Erro ao buscar veículos:", error);
                alert("Não foi possível carregar a lista de veículos.");
            }
        }

        loadVehicles();
    }, []);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Meus Veículos</h1>
                <button
                    onClick={() => navigate("/vehicles/new")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Adicionar Veículo
                </button>
            </div>

            {vehicles.length === 0 ? (
                <p>Você ainda não possui veículos cadastrados.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="border border-gray-300 p-4 rounded-md shadow-sm">
                            <p className="font-bold text-lg">
                                {vehicle.brand} - {vehicle.model}
                            </p>
                            <p className="text-gray-600">Cor: {vehicle.color}</p>
                            <p className="text-gray-600">Placa: {vehicle.license_plate}</p>
                            <p className="text-gray-600">Ano: {vehicle.year} | Vagas: {vehicle.seats}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
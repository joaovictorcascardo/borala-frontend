import { useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { swal } from "../lib/swal";

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

    async function handleDelete(id) {
        const isConfirmed = await swal.confirm(
            "Tem a certeza?",
            "Esta ação não pode ser desfeita!"
        );

        if (isConfirmed.isConfirmed) {
            try {
                await api(`/vehicles/${id}`, { method: "DELETE" });
                swal.success("Sucesso!", "O veículo foi removido.");
                setVehicles(vehicles.filter((v) => v.id !== id));
            } catch (error) {
                console.error("Erro ao eliminar:", error);
                swal.error("Erro", "Não foi possível remover o veículo.");
            }
        }
    }

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


                            <div className="mt-4 border-t pt-2 flex justify-end gap-4 items-center">

                                <button
                                    onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
                                    className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
                                >
                                    Editar
                                </button>


                                <button
                                    onClick={() => handleDelete(vehicle.id)}
                                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { swal } from "../lib/swal";

export default function EditVehiclePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [color, setColor] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [year, setYear] = useState("");
    const [seats, setSeats] = useState("");

    useEffect(() => {
        async function loadVehicle() {
            try {

                const response = await api("/vehicles");


                const vehicle = response.find((v) => String(v.id) === String(id));


                if (!vehicle) {

                    console.log("Erro", "Veículo não encontrado.");
                    navigate("/vehicles");
                    return;
                }


                setBrand(vehicle.brand);
                setModel(vehicle.model);
                setColor(vehicle.color);
                setLicensePlate(vehicle.license_plate);
                setYear(vehicle.year.toString());
                setSeats(vehicle.seats.toString());
            } catch (error) {
                console.error(error);
                console.log("Erro", "Falha ao carregar as informações do veículo.");
                navigate("/vehicles");
            }
        }

        loadVehicle();
    }, [id, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            const data = {
                brand: brand,
                model: model,
                color: color,
                year: Number(year),
                seats: Number(seats),
            };

            await api(`/vehicles/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
            });

            swal.success("Sucesso!", "Os dados do veículo foram atualizados.");
            navigate("/vehicles");

        } catch (error) {
            console.error(error);
            swal.error("Erro", error.message || "Não foi possível atualizar o veículo.");
        }
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Editar Veículo</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Matrícula (Não modificável)"
                    value={licensePlate}
                    disabled
                    className="bg-gray-100 cursor-not-allowed opacity-70"
                />
                <Input
                    label="Marca"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                />
                <Input
                    label="Modelo"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                />
                <Input
                    label="Cor"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                />

                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input
                            label="Ano"
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            label="Vagas Disponíveis"
                            type="number"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <Button type="submit" text="Guardar Alterações" />
                    <button
                        type="button"
                        onClick={() => navigate("/vehicles")}
                        className="text-gray-600 underline"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
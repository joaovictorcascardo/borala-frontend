import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";
import swal from "../lib/swal";

export default function VehicleFormPage() {
    const navigate = useNavigate();
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [color, setColor] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [year, setYear] = useState("");
    const [seats, setSeats] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = {
                brand: brand,
                model: model,
                color: color,
                license_plate: licensePlate,
                year: Number(year),
                seats: Number(seats),
            };

            await api("/vehicles", {
                method: "POST",
                body: JSON.stringify(data),
            });

            swal.success("Sucesso!", "Veículo adicionado com sucesso.");
            navigate("/vehicles");

        } catch (error) {
            console.error(error);
            swal.error("Erro", "Não foi possível adicionar o veículo.");
        }
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Adicionar Veículo</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    label="Marca"
                    placeholder="Ex: Fiat"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                />
                <Input
                    label="Modelo"
                    placeholder="Ex: Uno"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                />
                <Input
                    label="Cor"
                    placeholder="Ex: Prata"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                />
                <Input
                    label="Placa"
                    placeholder="Ex: ABC1D23"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    required
                />

                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input
                            label="Ano"
                            type="number"
                            placeholder="Ex: 2015"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            label="Vagas Disponíveis"
                            type="number"
                            placeholder="Ex: 4"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <Button type="submit">Salvar Veículo</Button>
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
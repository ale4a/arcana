"use client";

import React, { useState } from "react";
import Modal from "../../../components/ui/Modal";

const VaultPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-base-content mb-8">USDT Vault</h1>

        {/* Botón para abrir modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-content px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
        >
          Abrir Modal de Ejemplo
        </button>

        {/* Modal Component */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Modal de Ejemplo" size="md">
          <div className="space-y-4">
            <p className="text-base-content/70">
              Este es un ejemplo del componente Modal con el estilo minimalista de la aplicación.
            </p>

            <div className="bg-base-200 border border-base-300 p-4">
              <h3 className="font-medium text-base-content mb-2">Características:</h3>
              <ul className="text-sm text-base-content/70 space-y-1">
                <li>• Pantalla completa con blur</li>
                <li>• Botón X para cerrar</li>
                <li>• Responsive design</li>
                <li>• Cierre con Escape</li>
                <li>• Previene scroll del body</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-base-300 text-base-content px-4 py-2 hover:bg-base-300/80 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-primary text-primary-content px-4 py-2 hover:bg-primary/90 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default VaultPage;

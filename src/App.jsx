import { useState } from "react"
import SolicitudForm from "@/components/SolicitudForm"
import FiltrosSolicitudes from "@/components/FiltrosSolicitudes"
import ListaSolicitudes from "@/components/ListaSolicitudes"

function App() {
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      titulo: "No abre el correo",
      descripcion: "Outlook se cierra al iniciar",
      solicitante: "Ana Ruiz",
      prioridad: "alta",
      estado: "pendiente",
    },
  ])
  const [filtro, setFiltro] = useState("todas")

  const agregarSolicitud = (datos) => {
    const nueva = { ...datos, id: Date.now(), estado: "pendiente" }
    setSolicitudes([...solicitudes, nueva])
  }

  const cambiarEstado = (id, nuevoEstado) => {
    setSolicitudes(
      solicitudes.map((s) => (s.id === id ? { ...s, estado: nuevoEstado } : s))
    )
  }

  const eliminarSolicitud = (id) => {
    setSolicitudes(solicitudes.filter((s) => s.id !== id))
  }

  const solicitudesFiltradas = solicitudes.filter(
    (s) => filtro === "todas" || s.estado === filtro
  )

  const pendientes = solicitudes.filter((s) => s.estado === "pendiente").length

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card/60">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-primary">
              Centro de Ayuda
            </h1>
            <p className="text-muted-foreground">
              Cuéntanos qué pasó y nuestro equipo de soporte te ayuda.
            </p>
          </div>
          <p className="text-sm font-semibold text-secondary-foreground bg-secondary rounded-full px-4 py-1.5 w-fit">
            {pendientes} {pendientes === 1 ? "pendiente" : "pendientes"} de {solicitudes.length}
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 grid gap-8 lg:grid-cols-[380px_1fr] items-start">
        <aside className="lg:sticky lg:top-6">
          <SolicitudForm onAgregar={agregarSolicitud} />
        </aside>

        <section className="space-y-4">
          <FiltrosSolicitudes filtroActual={filtro} onCambiarFiltro={setFiltro} />
          <ListaSolicitudes
            solicitudes={solicitudesFiltradas}
            onCambiarEstado={cambiarEstado}
            onEliminar={eliminarSolicitud}
          />
        </section>
      </main>
    </div>
  )
}

export default App
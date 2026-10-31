import { Button } from "@/components/ui/button"

function FiltrosSolicitudes({ filtroActual, onCambiarFiltro }) {
  const opciones = [
    { valor: "todas", etiqueta: "Todas" },
    { valor: "pendiente", etiqueta: "Pendientes" },
    { valor: "en proceso", etiqueta: "En proceso" },
    { valor: "resuelta", etiqueta: "Resueltas" },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-muted-foreground mr-1">Mostrar:</span>
      {opciones.map((op) => (
        <Button
          key={op.valor}
          size="sm"
          className="rounded-full"
          variant={filtroActual === op.valor ? "default" : "outline"}
          onClick={() => onCambiarFiltro(op.valor)}
        >
          {op.etiqueta}
        </Button>
      ))}
    </div>
  )
}

export default FiltrosSolicitudes
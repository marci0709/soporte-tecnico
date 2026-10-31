import SolicitudItem from "./SolicitudItem"

function ListaSolicitudes({ solicitudes, onCambiarEstado, onEliminar }) {
  if (solicitudes.length === 0) {
    return <p className="text-sm text-muted-foreground">No hay solicitudes para mostrar.</p>
  }

  return (
    <div className="grid gap-3">
      {solicitudes.map((s) => (
        <SolicitudItem
          key={s.id}
          solicitud={s}
          onCambiarEstado={onCambiarEstado}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  )
}

export default ListaSolicitudes
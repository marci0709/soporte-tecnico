import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const bordePrioridad = {
  baja: "border-l-emerald-500",
  media: "border-l-amber-500",
  alta: "border-l-rose-600",
}

const badgePrioridad = {
  baja: "bg-emerald-100 text-emerald-800",
  media: "bg-amber-100 text-amber-800",
  alta: "bg-rose-100 text-rose-800",
}

const colorEstado = {
  pendiente: "bg-amber-50 text-amber-900 border-amber-300",
  "en proceso": "bg-sky-50 text-sky-900 border-sky-300",
  resuelta: "bg-emerald-50 text-emerald-900 border-emerald-300",
}

function SolicitudItem({ solicitud, onCambiarEstado, onEliminar }) {
  return (
    <Card
      className={`border-l-4 ${bordePrioridad[solicitud.prioridad]} shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
    >
      <CardContent className="p-5 space-y-4">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold leading-snug">{solicitud.titulo}</h3>
            <Badge className={`border-transparent shrink-0 ${badgePrioridad[solicitud.prioridad]}`}>
              Prioridad {solicitud.prioridad}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{solicitud.descripcion}</p>
          <p className="text-xs font-semibold pt-1">Solicitado por {solicitud.solicitante}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Select
            value={solicitud.estado}
            onValueChange={(nuevo) => onCambiarEstado(solicitud.id, nuevo)}
          >
            <SelectTrigger className={`w-[160px] rounded-full font-semibold ${colorEstado[solicitud.estado]}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en proceso">En proceso</SelectItem>
              <SelectItem value="resuelta">Resuelta</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onEliminar(solicitud.id)}
          >
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default SolicitudItem
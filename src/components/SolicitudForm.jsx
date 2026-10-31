import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const datosIniciales = {
  titulo: "",
  descripcion: "",
  solicitante: "",
  prioridad: "media",
}

function SolicitudForm({ onAgregar }) {
  const [datos, setDatos] = useState(datosIniciales)
  const [errores, setErrores] = useState({})

  const handleChange = (campo, valor) => {
    setDatos({ ...datos, [campo]: valor })
    if (errores[campo]) {
      setErrores({ ...errores, [campo]: "" })
    }
  }

  const validar = () => {
    const nuevos = {}
    if (!datos.titulo.trim()) {
      nuevos.titulo = "El título es obligatorio."
    }
    if (!datos.descripcion.trim()) {
      nuevos.descripcion = "Describe el problema para poder ayudarte."
    }
    if (!datos.solicitante.trim()) {
      nuevos.solicitante = "Indica quién realiza la solicitud."
    }
    return nuevos
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevos = validar()
    if (Object.keys(nuevos).length > 0) {
      setErrores(nuevos)
      return
    }
    onAgregar(datos)
    setDatos(datosIniciales)
    setErrores({})
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Nueva solicitud</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={datos.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
              placeholder="Ej: No abre el correo"
              aria-invalid={!!errores.titulo}
            />
            {errores.titulo && (
              <p className="text-sm text-destructive">{errores.titulo}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={datos.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              placeholder="Describe el problema"
              aria-invalid={!!errores.descripcion}
            />
            {errores.descripcion && (
              <p className="text-sm text-destructive">{errores.descripcion}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="solicitante">Solicitante</Label>
            <Input
              id="solicitante"
              value={datos.solicitante}
              onChange={(e) => handleChange("solicitante", e.target.value)}
              placeholder="Nombre del solicitante"
              aria-invalid={!!errores.solicitante}
            />
            {errores.solicitante && (
              <p className="text-sm text-destructive">{errores.solicitante}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Prioridad</Label>
            <Select
              value={datos.prioridad}
              onValueChange={(valor) => handleChange("prioridad", valor)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baja">Baja</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full rounded-full font-bold">Registrar solicitud</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SolicitudForm
const express = require("express"),
route = express.Router(),
fs = require("fs").promises,
path = require("path")

const jsonPathFile = path.join(__dirname, "../../tareas.json")
const generarIdRapido = () => Math.random().toString(36).substring(2, 9);

const readFile = async() => {
    const file = await fs.readFile(jsonPathFile, "utf8")
    const tareas = JSON.parse(file)
    return tareas
}

const writeFile = async(tareas) => {
    await fs.writeFile(jsonPathFile, JSON.stringify(tareas))
}

route.get("/tareas", async(req, res) => {
    try {
        const tareas = await readFile()
        res.json(tareas)
    } catch (error) {
        res.status(400).json({
            message: "Hubo un erro", error
        })
    }
})

route.post("/tareas", async(req, res) => {
    const {name, description} = req.body
    try {
        const {tareas} = await readFile()
        tareas.push({id: generarIdRapido(), name, description})
        await writeFile({tareas})
        return res.json({
            message: "Se agregaron las nuevas tareas"
        })
    } catch (error) {
        res.status(400).json({
            message: "Hubo un erro", error
        })
    }
})

route.delete("/tareas/:id", async(req, res) => {
    const {id} = req.params
    try {
        const {tareas} = await readFile()
        const newTareas = tareas.filter((tarea) => tarea.id !== id)
        await writeFile({tareas: newTareas})
        res.send("Se borró")
    } catch (error) {
        res.status(400).json({
            message: "Hubo un erro", error
        })
    }
})

route.put("/tareas/:id", async(req, res) => {
    const {id} = req.params
    const {name, description} = req.body
    try {
        const {tareas} = await readFile()
        const newTareasUpdate = tareas.map((tarea) => {
            if(tarea.id === id){
                console.log({
                    id:id, name: name, description: description 
                })
                return {
                    id:id, name: name, description: description 
                }
            }
            return tarea
        })
        await writeFile({"tareas": newTareasUpdate})
        res.send("Se actualizo")
    } catch (error) {
        res.status(400).json({
            message: "Hubo un error", error
        })
    }
})


module.exports = route
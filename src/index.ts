import {AddPet, GetPetById} from "../gen/petstore/Petstore"
import {petstoreClient} from "./client"

const addPet = async () => {
    const body = {id:999, name: "Dog", photoUrls:["woef.png"]}
    const req = AddPet.requestApplicationJson(body)
    const res = await petstoreClient.addPet(req)
    switch(res.status){
        case 200: return res.content.body
        case 405: throw new Error("Oeps")
    }
}

const getPetById = async (id:number) => {
    const req = GetPetById.requestUndefined(id)
    const res = await petstoreClient.getPetById(req)
    switch(res.status){
        case 200: return res.content.body
    }
}

const run = async () => {
    const {id} = await addPet()
    console.log(id)
    const pet = await getPetById(id??0)
    console.log(pet?.name)
}

run()

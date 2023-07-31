import {AddPet, GetPetById} from "../gen/petstore/Petstore"

const baseUrl = "https://petstore.swagger.io/v2"

type PetstoreClient = AddPet.Call & GetPetById.Call

const handleCall = async (req:any) => {
    const headers = req.content ? {"Content-Type": req.content?.type } : undefined
    const body = req.content != undefined ? JSON.stringify(req.content.body) : undefined
    const res = await fetch(baseUrl + req.path, {method:req.method, body, headers})
    const json = await res.json()
    return {
        status: res.status,
        content:{
            type: res.headers.get("Content-Type"),
            body:json
        }
    } as any
}

export const petstoreClient: PetstoreClient = {
    addPet: (req) => handleCall(req),
    getPetById: req => handleCall(req)
}

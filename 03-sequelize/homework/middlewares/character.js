const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    try {
        const {code, name, age, race, hp, mana, date_added} = req.body

        if(!code || !name || !hp || !mana) {
            return res.status(404).send("Falta enviar datos obligatorios")
        }

        const newCharacter = await Character.create({
            code,
            name,
            age,
            race,
            hp,
            mana,
            date_added
        })

        return res.status(201).send(newCharacter)

    } catch (error) {
        return res.status(404).send("Error en alguno de los datos provistos")
    }
    
})

router.get('/', async (req, res) => {
    try {
        const {race, age} = req.query

        const condition = {}
        const where = {}

        if(race) where.race = race
        //where: { race }
        if(age) where.age = age
        //where: { race, age }
        condition.where = where
        //condition: {where: {race, age}}

        const character = await Character.findAll(condition)
        return res.status(200).send(character)




        // if(!race){
        //     const allCharacters = await Character.findAll()

        //     return res.status(200).send(allCharacters)
        // }

        // else{
        //     const charactersByRace = await Character.findAll({
        //         where: { race }
        //     })
            
        //     return res.status(200).send(charactersByRace)
        // }
        
    } catch (error) {
        return res.status(404).send("Error en alguno de los datos provistos")
    }
})

router.get('/young', async (req, res) => {
    try {
        const allCharacters = await Character.findAll({
            where: {
                age: {[Op.lt]: 25}
            }
        })

        res.status(200).send(allCharacters)

    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/:code', async (req, res) => {
    const { code } = req.params
    const characterByPk = await Character.findByPk(code)

    if(!characterByPk) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
    
    return res.status(200).send(characterByPk)
})

router.put('/addAbilities', async (req, res) => {
    try {
        const { codeCharacter, abilities } = req.body

        const character = await Character.findByPk(codeCharacter)

        const promises = abilities.map(ab => character.createAbility(ab))

        await Promise.all(promises)

        return res.status(200).send('salió todo ok')

    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.put('/:attribute', async (req, res) => {
    try {
        const {attribute} = req.params
        const {value} = req.query

        await Character.update({ [attribute]: value }, {
            where: {
                [attribute]: null
            }//todos los que tengan el attribute vacio, se les cambiara su valor por el de value
        })

        return res.status(200).send('Personajes actualizados')

    } catch (error) {
        res.status(404).send(error.message)
    }
})



module.exports = router;
const express = require('express');
const app = express();
const PORTA = 8888;



let data = {'materials': [
    {
        id: 1,
        name: 'Tijolo',
        qtde: 40,
    },
    {
        id: 2,
        name: 'Betoneira',
        qtde: 50,
    },
    {
        id: 3,
        name: 'Lajota',
        qtde: 110,
    }
]};

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
  });


app.get('/materials', (req, res) =>{
    res.status(200).json(data.materials);
})

app.use(express.json());
app.post('/materials', (req, res) => {
    const {name, qtde} = req.body;

    const novoMaterial = {
        id: data.materials.length + 1,
        name: 'Folha A4', 
        qtde: 100, 
    };

    data.materials.push(novoMaterial);
    
    res.status(201).json(novoMaterial);
})

app.get('/materials/:id', (req, res) => {
    const idMaterial = parseInt(req.params.id);
    const searchedMaterial = data.materials.find((x) => x.id === idMaterial);

    if (searchedMaterial) {
        
        const response = {
            material: {
                id: searchedMaterial.id,
                name: searchedMaterial.name,
                qtde: searchedMaterial.qtde,
            }
        };
        res.status(200).json(response);
    } else {
        
        res.status(404).json({ error: 'Material não encontrado' });
    }
});


app.use(express.json());

// Rota para alterar um material por ID
app.put('/materials/:id', (req, res) => {
    const { id } = req.params;
    const { name, qtde} = req.body;

    const newmaterials = {
        id: 1,
        nome: 'Folha A3',
        qtde: 50,
    }

    const materialIndex = data.materials.findIndex(material => data.materials.id == id);
    
    data.materials[materialIndex] = newmaterials;

    return res.json(newmaterials);

});  


app.delete('/materials/:id', (req, res) => {
    const {id} = req.params;

    const materialIndex = data.materials.findIndex(material => data.materials.id == id);

    data.materials.splice(materialIndex, 1);

    return res.status(204).send();
})

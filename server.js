const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/multiply', (req, res) => {
    try {
        const { matrix1, matrix2 } = req.body;
        
        // Validar matrices
        if (!matrix1 || !matrix2 || 
            !Array.isArray(matrix1) || !Array.isArray(matrix2) || 
            matrix1.length === 0 || matrix2.length === 0) {
            return res.status(400).json({ error: 'Matrices no válidas' });
        }
        
        const cols1 = matrix1[0].length;
        const rows2 = matrix2.length;
        
        // Verificar que las dimensiones sean compatibles para multiplicación
        if (cols1 !== rows2) {
            return res.status(400).json({ 
                error: 'Las matrices no se pueden multiplicar. El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2.' 
            });
        }
        
        // Inicializar matriz resultado
        const result = [];
        const rows1 = matrix1.length;
        const cols2 = matrix2[0].length;
        
        for (let i = 0; i < rows1; i++) {
            result[i] = [];
            for (let j = 0; j < cols2; j++) {
                let sum = 0;
                for (let k = 0; k < cols1; k++) {
                    sum += matrix1[i][k] * matrix2[k][j];
                }
                result[i][j] = sum;
            }
        }
        
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al multiplicar matrices' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});